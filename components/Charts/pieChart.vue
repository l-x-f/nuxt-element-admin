<template>
  <div :class="className" :style="{ height: height, width: width }"></div>
</template>

<script>
import * as echarts from 'echarts'
import { debounce } from '@/utils'

export default {
  props: {
    className: {
      type: String,
      default: 'pie-chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '280px'
    },
    // yAxisData
    yAxisData: {
      type: Array,
      default: () => [
        { value: 335, name: '直接访问' },
        { value: 310, name: '邮件营销' },
        { value: 234, name: '联盟广告' },
        { value: 135, name: '视频广告' },
        { value: 1548, name: '搜索引擎' }
      ]
    },
    // 图表数据
    series: {
      type: Array,
      default: () => []
    },
    // 标题
    title: {
      type: String,
      default: ''
    },
    // 副标题
    subtext: {
      type: String,
      default: ''
    },
    // chartName
    chartName: {
      type: String,
      default: '百分比'
    },
    // 圆的位置
    centerLocation: {
      type: Array,
      default: () => ['50%', '60%']
    },
    labelFormatter: {
      type: String,
      default: '{b} : {c} ({d}%)'
    },
    legendBottom: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    // 监听标题改变
    title(val) {
      this.reDraw()
    },
    subtext(val) {
      this.reDraw()
    },
    // 监听数据改变
    series(val) {
      this.reDraw()
    },
    // 监听图例改变
    legendData(val) {
      this.reDraw()
    },
    // 监听饼状数据
    yAxisData(val) {
      this.reDraw()
    }
  },
  mounted() {
    this.initChart()
    this.__resizeHanlder = debounce(() => {
      if (this.chart) {
        this.chart.resize()
      }
    }, 100)
    window.addEventListener('resize', this.__resizeHanlder)
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    window.removeEventListener('resize', this.__resizeHanlder)
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.chart.setOption({
        title: {
          text: this.title,
          subtext: this.subtext,
          itemGap: 150,
          subtextStyle: {
            color: '#8c8c8c',
            fontWeight: 400,
            fontSize: 20
          },
          left: 'center',
          textStyle: {
            color: 'black',
            fontSize: 14
          },
          triggerEvent: true
        },
        // color: [
        //   '#c23531',
        //   '#c98622',
        //   '#c4ccd3',
        //   '#61a0a8',
        //   '#d48265',
        //   '#91c7ae',
        //   '#749f83',
        //   '#ca8622',
        //   '#bda29a',
        //   '#6e7074',
        //   '#546570'
        // ],
        label: {
          formatter: '{b|{b}} \n {c}{per|{d}%}  ',
          backgroundColor: '#eee',
          rich: {
            a: {
              color: '#999',
              lineHeight: 22,
              align: 'center'
            },
            hr: {
              borderColor: '#aaa',
              width: '100%',
              borderWidth: 0.5,
              height: 0
            },
            b: {
              align: 'center',
              fontSize: 12,
              lineHeight: 33
            },
            per: {
              color: '#eee',
              backgroundColor: '#334455',
              padding: [2, 4],
              borderRadius: 2
            }
          }
        },
        labelLine: {
          normal: {
            smooth: 0.2,
            length: 0,
            length2: 0
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b} : {c} ({d}%)'
        },
        legend: {
          left: 'center',
          bottom: this.legendBottom,
          textStyle: {
            color: '#999',
            fontSize: 12
          },
          data: this.yAxisData.map(item => item.name)
        },
        calculable: true,
        series: [
          {
            name: this.chartName,
            type: 'pie',
            radius: '55%',
            center: this.centerLocation,
            data: this.yAxisData,
            label: {
              formatter: this.labelFormatter,
              show: false
            },
            rich: {
              a: {
                color: '#6E7079',
                lineHeight: 22,
                align: 'center'
              }
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      })
      this.chart.on('click', params => {
        if (params.componentType && params.componentType === 'title') {
          this.$emit('titleclick', params)
        } else {
          this.$emit('changes', params)
        }
      })
    },
    // 重新绘制
    reDraw() {
      if (!this.chart) {
        return
      }
      window.removeEventListener('resize', this.__resizeHanlder)
      this.chart.dispose()
      this.chart = null
      this.initChart()
    }
  }
}
</script>
