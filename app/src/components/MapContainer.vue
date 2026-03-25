<template>
    <div ref="mapRoot" class="nyc-map rounded-4xl max-w-[150vh] max-h-[90vh] overflow-hidden" :class="[themeObject.outline_1, themeObject.glass]"></div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import * as d3 from 'd3';
import type { Feature, Polygon, MultiPolygon, FeatureCollection, GeoJsonProperties } from 'geojson';
import { allCoordinates, themeObject } from '@/store/variable_storage';

type Coord = [number, number];
type BoroughFeature = Feature<Polygon | MultiPolygon, GeoJsonProperties>;

const mapRoot = ref<HTMLElement | null>(null);
let nycGeoJSON: FeatureCollection<Polygon | MultiPolygon> | null = null;

async function fetchNYC(): Promise<FeatureCollection<Polygon | MultiPolygon>> {
    const res = await fetch('https://cdn.jsdelivr.net/gh/codeforgermany/click_that_hood@main/public/data/new-york-city-boroughs.geojson');
    return res.json();
}

function renderMap(coords: Coord[], geo: FeatureCollection<Polygon | MultiPolygon>) {
    if (!mapRoot.value) return;

    d3.select(mapRoot.value).selectAll('*').remove();

    const w = 680, h = 520;
    const boroughColor = themeObject.chart_colors[0];
    const dotColor = themeObject.chart_colors[1];

    const svg = d3.select(mapRoot.value)
        .append('svg')
        .attr('viewBox', `0 0 ${w} ${h}`)
        .attr('width', '100%')
        .style('cursor', 'grab');

    const projection = d3.geoMercator()
        .fitExtent([[40, 40], [w - 40, h - 40]], geo);

    const path = d3.geoPath().projection(projection);

    const g = svg.append('g');

    g.selectAll('.borough')
        .data(geo.features)
        .enter()
        .append('path')
        .attr('class', 'borough')
        .attr('d', (d: BoroughFeature) => path(d) ?? '')
        .attr('fill', boroughColor)
        .attr('fill-opacity', 0.3)
        .attr('stroke', boroughColor)
        .attr('stroke-width', 1.5);

    g.selectAll('.boro-label')
        .data(geo.features)
        .enter()
        .append('text')
        .attr('class', 'boro-label')
        .attr('x', (d: BoroughFeature) => path.centroid(d)[0])
        .attr('y', (d: BoroughFeature) => path.centroid(d)[1])
        .attr('text-anchor', 'middle')
        .attr('dominant-baseline', 'central')
        .attr('font-size', '11px')
        .attr('font-family', 'sans-serif')
        .attr('fill', boroughColor)
        .attr('fill-opacity', 0.7)
        .attr('pointer-events', 'none')
        .text((d: BoroughFeature) => (d.properties?.boro_name ?? d.properties?.name ?? '') as string);

    g.selectAll('.dot')
        .data(coords)
        .enter()
        .append('circle')
        .attr('class', 'dot')
        .attr('cx', (d: Coord) => projection(d)![0])
        .attr('cy', (d: Coord) => projection(d)![1])
        .attr('r', 4)
        .attr('fill', dotColor)
        .attr('fill-opacity', 0.75)
        .attr('stroke', '#fff')
        .attr('stroke-width', 1.5);

    const zoom = d3.zoom()
  .scaleExtent([1, 12])
  .on('zoom', function(this: SVGSVGElement) {
  const transform = d3.zoomTransform(this);
  g.attr('transform', transform.toString());
  svg.style('cursor', transform.k > 1 ? 'grabbing' : 'grab');
  g.selectAll('.dot')
    .attr('r', 4 / transform.k)
    .attr('stroke-width', 1.5 / transform.k);
});

    svg.call(zoom);

    svg.on('dblclick.zoom', null);
}

async function init() {
    if (!nycGeoJSON) {
        nycGeoJSON = await fetchNYC();
    }
    const coords = allCoordinates.value as Coord[];
    if (coords.length > 0) {
        renderMap(coords, nycGeoJSON);
    }
}

watch(allCoordinates, (coords) => {
    if (coords.length > 0 && nycGeoJSON) {
        renderMap(coords as Coord[], nycGeoJSON);
    }
}, { deep: true });

watch(themeObject, () => {
    if (nycGeoJSON && allCoordinates.value.length > 0) {
        renderMap(allCoordinates.value as Coord[], nycGeoJSON);
    }
}, { deep: true });

onMounted(init);
</script>

<style scoped>
.nyc-map {
    width: 100%;
}

.nyc-map :deep(svg) {
    display: block;
}

.nyc-map :deep(.borough) {
    transition: fill-opacity 0.15s;
}

.nyc-map :deep(.borough:hover) {
    fill-opacity: 0.5;
    cursor: pointer;
}

.nyc-map :deep(.dot) {
    cursor: pointer;
}
</style>