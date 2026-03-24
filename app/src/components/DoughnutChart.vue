<template>
    <div ref="chartContainer" class="w-full h-full"></div>
  </template>
  
  <script lang="ts">
  import * as d3 from 'd3'
  import { PieArcDatum } from 'd3'
  import { currentQuestion } from '@/store/variable_storage'
  import { themeObject } from '@/store/variable_storage'
  
  interface ChartDataItem {
    label: string
    percentage: string
    value: number
    color: string
  }
  
  export default {
    name: 'DoughnutChart',
    data() {
      return {
        themeObject,
        currentQuestion,
        observer: null as IntersectionObserver | null
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.drawChart(true)
      })
    },
    beforeUnmount() {
      this.observer?.disconnect()
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
  
        const total = currentQuestion.option_one.amount + currentQuestion.option_two.amount
  
        const data: ChartDataItem[] = [
          {
            label: `${currentQuestion.option_one.param.name} = ${currentQuestion.option_one.tested_value}`,
            percentage: ((currentQuestion.option_one.amount / total) * 100).toFixed(2),
            value: currentQuestion.option_one.amount,
            color: themeObject.chart_colors[0] as string
          },
          {
            label: `${currentQuestion.option_two.param.name} = ${currentQuestion.option_two.tested_value}`,
            percentage: ((currentQuestion.option_two.amount / total) * 100).toFixed(2),
            value: currentQuestion.option_two.amount,
            color: themeObject.chart_colors[1] as string
          }
        ]
  
        const size = Math.min(container.clientWidth, container.clientHeight * 0.8)
        const radius = size / 2
        const innerRadius = radius * 0.55
        const borderColor = themeObject.chart_colors[2]
  
        const svg = d3.select(container)
          .append('svg')
          .attr('width', container.clientWidth)
          .attr('height', container.clientHeight)
          .append('g')
          .attr('transform', `translate(${container.clientWidth / 2}, ${container.clientHeight / 2})`)
  
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
  
        const pie = d3.pie()
          .value((d: ChartDataItem) => d.value)
          .sort(null)
  
        const arc = d3.arc()
          .innerRadius(innerRadius)
          .outerRadius(radius)
  
        const arcHover = d3.arc()
          .innerRadius(innerRadius)
          .outerRadius(radius + 8)
  
        const arcs = pie(data)
  
        const paths = svg.selectAll('path')
          .data(arcs)
          .join('path')
          .attr('fill', (d: any) => d.data.color)
          .attr('stroke', borderColor)
          .attr('stroke-width', 2)
          .style('cursor', 'pointer')
          .on('mousemove', function (this:SVGPathElement, event: MouseEvent, d: any) {
            d3.select(this)
              .transition().duration(150)
              .attr('d', arcHover(d) as string)
  
            const bounds = container.getBoundingClientRect()
            const x = event.clientX - bounds.left
            const y = event.clientY - bounds.top
  
            tooltip
              .style('opacity', '1')
              .style('left', `${x + 12}px`)
              .style('top', `${y - 28}px`)
              .html(`${d.data.label}<br/><strong>${d.data.percentage}%</strong>`)
          })
          .on('mouseleave', function (this:SVGPathElement, _: MouseEvent, d: any) {
            d3.select(this)
              .transition().duration(150)
              .attr('d', arc(d) as string)
  
            tooltip.style('opacity', '0')
          })
  
        if (animate) {
          const observerCallback = () => {
            paths
              .transition()
              .duration(900)
              .ease(d3.easeCubicOut)
              .attrTween('d', (d: any) => {
                const interpolate = d3.interpolate(
                  { startAngle: d.startAngle, endAngle: d.startAngle },
                  d
                )
                return (t: number) => arc(interpolate(t)) as string
              })
          }
  
          this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                observerCallback()
                this.observer?.disconnect()
              }
            })
          }, { threshold: 0.3 })
          this.observer.observe(container)
        } else {
          paths.attr('d', arc)
        }
      }
    }
  }
  </script>
  
  <style scoped></style>