<template>
    <Bar aria-label="results-bar" :options="chartOptions" :data="chartData" class="max-w-[47%] max-h-[60%]" />
</template>

<script lang="ts">
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import { currentQuestion } from '@/store/variable_storage';
import { themeObject } from '@/store/variable_storage';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
    name: 'BarChart',
    components: { Bar },
    computed: {
        chartOptions() {
            return {
                responsive: true,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    x: {
                        grid: {
                            color: themeObject.chart_colors[2],
                            lineWidth: 2
                        },
                        ticks: {
                            color: themeObject.chart_colors[2],
                            font: {
                                family: "Saira Stencil One",
                                weight: 700
                            }
                        }
                    },
                    y: {
                        grid: {
                            color: themeObject.chart_colors[2],
                            lineWidth: 2
                        },
                        ticks: {
                            color: themeObject.chart_colors[2],
                            font: {
                                family: "Saira Stencil One",
                                weight: 700
                            }
                        }
                    }
                }
            }
        },
        chartData() {
            return {
                labels: [
                    `${currentQuestion.option_one.param.name} = ${currentQuestion.option_one.tested_value}`,
                    `${currentQuestion.option_two.param.name} = ${currentQuestion.option_two.tested_value}`
                ],
                datasets: [{
                    data: [currentQuestion.option_one.amount, currentQuestion.option_two.amount],
                    backgroundColor: [
                        themeObject.chart_colors[0],
                        themeObject.chart_colors[1]
                    ]
                }]
            }
        }
    }
}

</script>

<style scoped></style>