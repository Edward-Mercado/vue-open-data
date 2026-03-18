<template>
  <Doughnut aria-label="results-doughnut" :options="chartOptions" :data="chartData" class="max-w-[47%] max-h-[60%]" />
</template>
<script lang="ts">
import { Doughnut } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js'
import { currentQuestion } from '@/store/variable_storage';
import { themeObject } from '@/store/variable_storage';
ChartJS.register(Title, Tooltip, Legend, ArcElement)

export default {
  name: 'DoughnutChart',
  components: { Doughnut },
  computed: {
    chartOptions() {
      return {
        responsive: true,
        plugins: {
          legend: {
            display: false
          }
        }
      }
    },
    chartData() {
      return {
        labels: [
          `${currentQuestion.option_one.param.name} = ${currentQuestion.option_one.tested_value} 
          (${ (((currentQuestion.option_one.amount) / (currentQuestion.option_one.amount + currentQuestion.option_two.amount))*100).toFixed(2)}%)`,
          `${currentQuestion.option_two.param.name} = ${currentQuestion.option_two.tested_value}
          (${ (((currentQuestion.option_two.amount) / (currentQuestion.option_one.amount + currentQuestion.option_two.amount))*100).toFixed(2)}%)`
        ],
        datasets: [{
          data: [currentQuestion.option_one.amount, currentQuestion.option_two.amount],
          backgroundColor: [
            themeObject.chart_colors[0],
            themeObject.chart_colors[1]
          ],
          borderColor: themeObject.chart_colors[2],
          borderWidth: 2
        }]
      }
    }
  }
}
</script>
<style scoped></style>