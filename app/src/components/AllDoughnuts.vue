<template>
    <div ref="chartContainer" class="w-[90%] h-[90%]"></div>
  </template>
  
  <script setup lang="ts">
  import { ref, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'
  import * as d3 from 'd3'
  import { themes } from '@/store/variable_storage'
  
  import type { allDataTemplate } from '@/store/variable_storage'

  interface DataPoint {
    value: string | number
    amount: number
  }
  
  type ArcDatum = ReturnType<ReturnType<typeof d3.pie>>['0']
  
  const props = defineProps<{
    trait: string
    allDataInBorough: allDataTemplate
    theme: keyof typeof themes
  }>()
  
  const chartContainer = ref<HTMLDivElement | null>(null)
  let resizeObserver: ResizeObserver | null = null
  
  const MARGIN = { top: 16, right: 16, bottom: 64, left: 16 }
  const INNER_RADIUS_RATIO = 0.35
  
  function getSliceColor(theme: keyof typeof themes, index: number): string {
    const colorMap: Record<string, string[]> = {
      dark:   ['#9f7fe8', '#c084fc', '#a855f7', '#7c3aed', '#6d28d9', '#8b5cf6', '#d8b4fe'],
      light:  ['#3b82f6', '#0ea5e9', '#6366f1', '#1d4ed8', '#0369a1', '#4f46e5', '#2563eb'],
      sunset: ['#f97316', '#ef4444', '#fb923c', '#dc2626', '#fdba74', '#f87171', '#fca5a5'],
    }
    const palette = colorMap[theme] ?? colorMap['dark']!
    return palette[index % palette.length]!
  }
  
  function drawChart() {
    const container = chartContainer.value
    if (!container) return
  
    const data: DataPoint[] = (props.allDataInBorough as unknown as Record<string, DataPoint[]>)[props.trait] ?? []
  
    d3.select(container).selectAll('*').remove()
  
    if (data.length === 0) return
  
    const totalWidth = container.clientWidth || 400
    const totalHeight = container.clientHeight || 320
    const width = totalWidth - MARGIN.left - MARGIN.right
    const height = totalHeight - MARGIN.top - MARGIN.bottom
  
    const cx = MARGIN.left + width / 2
    const cy = MARGIN.top + height / 2
  
    const maxOuterRadius = Math.min(width, height) / 2
    const innerRadius = maxOuterRadius * INNER_RADIUS_RATIO
  
    const svg = d3
      .select(container)
      .append('svg')
      .attr('width', totalWidth)
      .attr('height', totalHeight)
  
    const g = svg.append('g').attr('transform', `translate(${cx},${cy})`)
  
    const maxAmount = d3.max(data, (d: DataPoint) => d.amount) ?? 1
  
    const pie = d3.pie()
      .value(() => 1)
      .sort(null)
      .padAngle(0.03)
  
    const arcs: ArcDatum[] = pie(data)
  
    const outerRadiusScale = d3.scaleLinear()
      .domain([0, maxAmount])
      .range([innerRadius + (maxOuterRadius - innerRadius) * 0.15, maxOuterRadius])
  
    // Draw slices
    const sliceGroup = g.selectAll('.slice')
      .data(arcs)
      .enter()
      .append('g')
      .attr('class', 'slice')
  
    sliceGroup.each(function(this: SVGGElement, d: ArcDatum, i: number) {
      const outerR = outerRadiusScale(d.data.amount)
  
      const arcGen = d3.arc()
        .innerRadius(innerRadius)
        .outerRadius(outerR)
        .cornerRadius(4)
  
      d3.select(this)
        .append('path')
        .datum(d)
        .attr('d', (datum: ArcDatum) => arcGen(datum) ?? '')
        .attr('fill', getSliceColor(props.theme, i))
        .attr('opacity', 0)
        .transition()
        .duration(600)
        .delay(i * 60)
        .ease(d3.easeCubicOut)
        .attr('opacity', 0.9)
        .attrTween('d', function(this: SVGPathElement, arcDatum: ArcDatum) {
          const interp = d3.interpolate(
            { ...arcDatum, endAngle: arcDatum.startAngle },
            arcDatum
          )
          return (t: number) => arcGen(interp(t)) ?? ''
        })
    })
  
    // Labels
    sliceGroup.each(function(this: SVGGElement, d: ArcDatum, i: number) {
      const outerR = outerRadiusScale(d.data.amount)
  
      const arcGen = d3.arc()
        .innerRadius(innerRadius)
        .outerRadius(outerR)
  
      const [lx, ly] = arcGen.centroid(d)
      const label = String(d.data.value)
      const angleSpan = d.endAngle - d.startAngle
  
      if (angleSpan < 0.3) return
  
      const labelGroup = d3.select(this)
        .append('g')
        .attr('opacity', 0)
  
      labelGroup.append('text')
        .attr('x', lx)
        .attr('y', ly - 6)
        .attr('text-anchor', 'middle')
        .attr('dominant-baseline', 'central')
        .attr('font-size', '11px')
        .attr('font-weight', '500')
        .attr('fill', 'white')
        .attr('opacity', 0.95)
        .text(label.length > 10 ? label.slice(0, 9) + '…' : label)
  
      labelGroup.append('text')
        .attr('x', lx)
        .attr('y', ly + 9)
        .attr('text-anchor', 'middle')
        .attr('dominant-baseline', 'central')
        .attr('font-size', '10px')
        .attr('fill', 'white')
        .attr('opacity', 0.7)
        .text(String(d.data.amount))
  
      labelGroup
        .transition()
        .duration(400)
        .delay(i * 60 + 500)
        .attr('opacity', 1)
    })
  
    // Center text
    g.append('text')
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'central')
      .attr('y', -8)
      .attr('font-size', '13px')
      .attr('font-weight', '500')
      .attr('fill', 'currentColor')
      .attr('opacity', 0.7)
  
    g.append('text')
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'central')
      .attr('y', 10)
      .attr('font-size', '11px')
      .attr('fill', 'currentColor')
      .attr('opacity', 0.45)
  
    // Legend at bottom
    const legendY = cy + maxOuterRadius + 20
    const itemWidth = Math.min(120, totalWidth / data.length)
    const startX = MARGIN.left + (width - itemWidth * Math.min(data.length, 6)) / 2
  
    const legend = svg.append('g').attr('class', 'legend')
  
    data.slice(0, 6).forEach((d: DataPoint, i: number) => {
      const lx = startX + i * itemWidth
      const color = getSliceColor(props.theme, i)
  
      if (legendY + 24 > totalHeight) return
  
      legend.append('rect')
        .attr('x', lx)
        .attr('y', legendY)
        .attr('width', 10)
        .attr('height', 10)
        .attr('rx', 2)
        .attr('fill', color)
        .attr('opacity', 0.9)
  
      const label = String(d.value)
      legend.append('text')
        .attr('x', lx + 14)
        .attr('y', legendY + 5)
        .attr('dominant-baseline', 'central')
        .attr('font-size', '11px')
        .attr('fill', 'currentColor')
        .attr('opacity', 0.6)
        .text(label.length > 10 ? label.slice(0, 9) + '…' : label)
    })
  
    if (data.length > 6) {
      const lx = startX + 6 * itemWidth
      svg.append('text')
        .attr('x', lx)
        .attr('y', legendY + 5)
        .attr('dominant-baseline', 'central')
        .attr('font-size', '11px')
        .attr('fill', 'currentColor')
        .attr('opacity', 0.45)
        .text(`+${data.length - 6} more`)
    }
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