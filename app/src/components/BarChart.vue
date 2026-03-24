<template>
    <div ref="chartContainer" class="w-full h-full relative"></div>
</template>

<script lang="ts">
import * as d3 from 'd3'
import { type Selection } from 'd3-selection'
import { currentQuestion } from '@/store/variable_storage'
import { themeObject } from '@/store/variable_storage'

interface ChartDatum {
    label: string
    value: number
    percentage: string
    color: string
}

type GSelection = Selection<SVGGElement, unknown, null, undefined>

export default {
    name: 'BarChart',
    data() {
        return {
            themeObject,
            currentQuestion
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.drawChart(true)
        })
    },
    watch: {
        currentQuestion: {
            deep: true,
            handler() {
                this.$nextTick(() => {
                    this.drawChart(false)
                })
            }
        },
        themeObject: {
            deep: true,
            handler() {
                this.$nextTick(() => {
                    this.drawChart(false)
                })
            }
        }
    },
    methods: {
        drawChart(animate: boolean) {
            const container = this.$refs.chartContainer as HTMLElement
            d3.select(container).selectAll('*').remove()

            const margin = { top: 20, right: 20, bottom: 50, left: 50 }
            const width = Math.max(0, container.clientWidth - margin.left - margin.right)
            const height = Math.max(0, container.clientHeight - margin.top - margin.bottom)

            const total = currentQuestion.option_one.amount + currentQuestion.option_two.amount

            const labels: string[] = [
                `${currentQuestion.option_one.param.name} = ${currentQuestion.option_one.tested_value}`,
                `${currentQuestion.option_two.param.name} = ${currentQuestion.option_two.tested_value}`
            ]

            const data: ChartDatum[] = [
                {
                    label: labels[0] ?? '',
                    value: currentQuestion.option_one.amount,
                    percentage: ((currentQuestion.option_one.amount / total) * 100).toFixed(2),
                    color: themeObject.chart_colors[0] ?? ''
                },
                {
                    label: labels[1] ?? '',
                    value: currentQuestion.option_two.amount,
                    percentage: ((currentQuestion.option_two.amount / total) * 100).toFixed(2),
                    color: themeObject.chart_colors[1] ?? ''
                }
            ]

            const svg = d3.select(container)
                .append('svg')
                .attr('width', width + margin.left + margin.right)
                .attr('height', height + margin.top + margin.bottom)
                .append('g')
                .attr('transform', `translate(${margin.left},${margin.top})`)

            const x = d3.scaleBand()
                .domain(labels)
                .range([0, width])
                .padding(0.3)

            const y = d3.scaleLinear()
                .domain([0, d3.max(data, (d: ChartDatum) => d.value) ?? 0])
                .nice()
                .range([height, 0])

            const gridColor: string = themeObject.chart_colors[2] ?? ''
            const fontStyle = { family: 'Saira Stencil One', weight: '700' }

            // Tooltip
            const tooltip = d3.select(container)
                .append('div')
                .style('position', 'absolute')
                .style('pointer-events', 'none')
                .style('background', 'rgba(0,0,0,0.75)')
                .style('color', '#fff')
                .style('padding', '6px 10px')
                .style('border-radius', '6px')
                .style('font-size', '12px')
                .style('white-space', 'nowrap')
                .style('opacity', '0')
                .style('transition', 'opacity 0.15s ease')

            // Y gridlines
            svg.append('g')
                .attr('class', 'grid')
                .call(
                    d3.axisLeft(y)
                        .tickSize(-width)
                        .tickFormat(() => '')
                )
                .call((g: GSelection) => g.select('.domain').remove())
                .call((g: GSelection) => g.selectAll('.tick line')
                    .attr('stroke', gridColor)
                    .attr('stroke-width', 2)
                )

            // X axis
            svg.append('g')
                .attr('transform', `translate(0,${height})`)
                .call(d3.axisBottom(x).tickSize(0))
                .call((g: GSelection) => g.select('.domain')
                    .attr('stroke', gridColor)
                    .attr('stroke-width', 2)
                )
                .selectAll('text')
                .attr('fill', gridColor)
                .style('font-family', fontStyle.family)
                .style('font-weight', fontStyle.weight)

            // Y axis
            svg.append('g')
                .call(d3.axisLeft(y))
                .call((g: GSelection) => g.select('.domain')
                    .attr('stroke', gridColor)
                    .attr('stroke-width', 2)
                )
                .call((g: GSelection) => g.selectAll('.tick line')
                    .attr('stroke', gridColor)
                    .attr('stroke-width', 2)
                )
                .selectAll('text')
                .attr('fill', gridColor)
                .style('font-family', fontStyle.family)
                .style('font-weight', fontStyle.weight)

            // Bars
            const bars = svg.selectAll('.bar')
                .data(data)
                .join('rect')
                .attr('class', 'bar')
                .attr('x', (d: ChartDatum) => x(d.label) ?? 0)
                .attr('width', x.bandwidth())
                .attr('fill', (d: ChartDatum) => d.color)
                .style('cursor', 'pointer')
                .on('mousemove', function (this: SVGRectElement, event: MouseEvent, d: ChartDatum) {
                    d3.select(this)
                        .transition().duration(150)
                        .attr('opacity', 0.8)

                    const [mx, my] = d3.pointer(event, container)
                    tooltip
                        .style('opacity', '1')
                        .style('left', `${mx + 12}px`)
                        .style('top', `${my - 28}px`)
                        .html(`${d.label}<br/><strong>${d.percentage}%</strong>`)
                })
                .on('mouseleave', function (this: SVGRectElement) {
                    d3.select(this)
                        .transition().duration(150)
                        .attr('opacity', 1)

                    tooltip.style('opacity', '0')
                })

            if (animate) {
                bars
                    .attr('y', height)
                    .attr('height', 0)
                    .transition()
                    .duration(800)
                    .ease(d3.easeCubicOut)
                    .attr('y', (d: ChartDatum) => y(d.value))
                    .attr('height', (d: ChartDatum) => height - y(d.value))
            } else {
                bars
                    .attr('y', (d: ChartDatum) => y(d.value))
                    .attr('height', (d: ChartDatum) => height - y(d.value))
            }
        }
    }
}
</script>

<style scoped></style>