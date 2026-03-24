<template>
  <div ref="chartContainer" class="w-full h-full"></div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'
import * as d3 from 'd3'
import { themes } from '@/store/variable_storage'

import type { Selection, BaseType } from 'd3-selection'
import type { allDataTemplate } from '@/store/variable_storage'

interface DataPoint {
  value: string | number
  amount: number
}

const props = defineProps<{
  trait: string
  allDataInBorough: allDataTemplate
  theme: keyof typeof themes
}>()

const chartContainer = ref<HTMLDivElement | null>(null)
let resizeObserver: ResizeObserver | null = null

const MARGIN = { top: 16, right: 16, bottom: 64, left: 48 }

function getBarColor(theme: keyof typeof themes, index: number, total: number): string {
  const colorMap: Record<string, string[]> = {
    dark:   ['#9f7fe8', '#c084fc', '#a855f7', '#7c3aed', '#6d28d9', '#8b5cf6', '#d8b4fe'],
    light:  ['#3b82f6', '#0ea5e9', '#6366f1', '#1d4ed8', '#0369a1', '#4f46e5', '#2563eb'],
    sunset: ['#f97316', '#ef4444', '#fb923c', '#dc2626', '#fdba74', '#f87171', '#fca5a5'],
  }
  const palette = colorMap[theme] ?? colorMap['dark']
  return ((palette as string[])[index % (palette as string[]).length]) as string
}

function drawChart() {
  const container = chartContainer.value
  if (!container) return

  const data: DataPoint[] = (props.allDataInBorough as unknown as Record<string, DataPoint[]>)[props.trait] ?? []

  d3.select(container).selectAll('*').remove()

  const totalWidth = container.clientWidth || 400
  const totalHeight = container.clientHeight || 320
  const width = totalWidth - MARGIN.left - MARGIN.right
  const height = totalHeight - MARGIN.top - MARGIN.bottom

  const svg = d3
    .select(container)
    .append('svg')
    .attr('width', totalWidth)
    .attr('height', totalHeight)

  const g = svg
    .append('g')
    .attr('transform', `translate(${MARGIN.left},${MARGIN.top})`)

  const x = d3
    .scaleBand()
    .domain(data.map((d: DataPoint) => String(d.value)))
    .range([0, width])
    .padding(0.25)

  const maxAmount = d3.max(data, (d: DataPoint) => d.amount) ?? 0

  const y = d3
    .scaleLinear()
    .domain([0, maxAmount * 1.1])
    .range([height, 0])
    .nice()

  // Gridlines
  g.append('g')
    .attr('class', 'grid')
    .call(
      d3.axisLeft(y)
        .tickSize(-width)
        .tickFormat(() => '')
        .ticks(5)
    )
    .call((gEl: Selection<SVGGElement, unknown, null, undefined>) => gEl.select('.domain').remove())
    .call((gEl: Selection<SVGGElement, unknown, null, undefined>) =>
      gEl.selectAll('.tick line')
        .attr('stroke', 'rgba(128,128,128,0.15)')
        .attr('stroke-dasharray', '3,3')
    )

  // Bars
  g.selectAll('.bar')
    .data(data)
    .enter()
    .append('rect')
    .attr('class', 'bar')
    .attr('x', (d: DataPoint) => x(String(d.value))!)
    .attr('y', height)
    .attr('width', (_: DataPoint) => x.bandwidth())
    .attr('height', 0)
    .attr('rx', 4)
    .attr('fill', (_: DataPoint, i: number) => getBarColor(props.theme, i, data.length))
    .attr('opacity', 0.9)
    .transition()
    .duration(600)
    .delay((_: DataPoint, i: number) => i * 60)
    .ease(d3.easeCubicOut)
    .attr('y', (d: DataPoint) => y(d.amount))
    .attr('height', (d: DataPoint) => height - y(d.amount))

  // Value labels on top of bars
  g.selectAll('.bar-label')
    .data(data)
    .enter()
    .append('text')
    .attr('class', 'bar-label')
    .attr('x', (d: DataPoint) => x(String(d.value))! + x.bandwidth() / 2)
    .attr('y', (d: DataPoint) => y(d.amount) - 6)
    .attr('text-anchor', 'middle')
    .attr('font-size', '11px')
    .attr('fill', 'currentColor')
    .attr('opacity', 0)
    .text((d: DataPoint) => d.amount > 0 ? String(d.amount) : '')
    .transition()
    .duration(400)
    .delay((_: DataPoint, i: number) => i * 60 + 500)
    .attr('opacity', 0.7)

  // X axis
  g.append('g')
    .attr('transform', `translate(0,${height})`)
    .call(d3.axisBottom(x).tickSize(0))
    .call((gEl: Selection<SVGGElement, unknown, null, undefined>) =>
      gEl.select('.domain').attr('stroke', 'rgba(128,128,128,0.25)')
    )
    .call((gEl: Selection<SVGGElement, unknown, null, undefined>) =>
      gEl.selectAll('.tick text')
        .attr('fill', 'currentColor')
        .attr('opacity', 0.65)
        .attr('font-size', '11px')
        .attr('dy', '1.2em')
        .each(function (this: BaseType, d: unknown) {
          const label = String(d)
          const el = d3.select(this)
          if (label.length > 12) {
            el.text('')
            label.split(' ').forEach((word: string, wi: number) => {
              el.append('tspan')
                .attr('x', 0)
                .attr('dy', wi === 0 ? '1.2em' : '1.1em')
                .text(word)
            })
          }
        })
    )

  // Y axis
  g.append('g')
    .call(d3.axisLeft(y).ticks(5).tickSize(0))
    .call((gEl: Selection<SVGGElement, unknown, null, undefined>) => gEl.select('.domain').remove())
    .call((gEl: Selection<SVGGElement, unknown, null, undefined>) =>
      gEl.selectAll('.tick text')
        .attr('fill', 'currentColor')
        .attr('opacity', 0.55)
        .attr('font-size', '11px')
        .attr('dx', '-4px')
    )
}

onMounted(() => {
  nextTick(() => {
    drawChart()
    resizeObserver = new ResizeObserver(() => drawChart())
    if (chartContainer.value) resizeObserver.observe(chartContainer.value)
  })
})

onBeforeUnmount(() => {
  resizeObserver?.disconnect()
})

watch(
  () => [props.trait, props.theme, props.allDataInBorough],
  () => nextTick(drawChart),
  { deep: true }
)
</script>