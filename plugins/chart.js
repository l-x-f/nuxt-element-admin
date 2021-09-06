import Vue from 'vue'
import LineChart from '@/components/Charts/lineChart'
import PieChart from '@/components/Charts/pieChart'
if (process.client) {
  Vue.component('LineChart', LineChart)
  Vue.component('PieChart', PieChart)
}
