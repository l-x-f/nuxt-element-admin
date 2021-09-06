<template>
  <div :class="className" :style="{ height: height, width: width }"></div>
</template>

<script>
import * as echarts from 'echarts'
import { debounce } from '@/utils'

const defaultSeriesItem = [
  {
    name: 'week',
    itemStyle: {
      normal: {
        color: 'rgba(41, 150, 254, 1)',
        lineStyle: {
          color: 'rgba(41, 150, 254, 1)',
          width: 2
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: 'rgba(41, 150, 254, 0.5)' // 0% 处的颜色
              },
              {
                offset: 1,
                color: 'rgba(41, 150, 254, 1)' // 100% 处的颜色
              }
            ],
            globalCoord: false // 缺省为 false
          }
        }
      }
    },
    smooth: true,
    type: 'line',
    data: [],
    animationDuration: 2800,
    animationEasing: 'cubicInOut'
  },
  {
    name: 'week',
    itemStyle: {
      normal: {
        color: 'rgba(46, 194, 91, 1)',
        lineStyle: {
          color: 'rgba(46, 194, 91, 1)',
          width: 2
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: 'rgba(46, 194, 91, 0.5)' // 0% 处的颜色
              },
              {
                offset: 1,
                color: 'rgba(46, 194, 91, 1)' // 100% 处的颜色
              }
            ],
            globalCoord: false // 缺省为 false
          }
        }
      }
    },
    smooth: true,
    type: 'line',
    data: [],
    animationDuration: 2800,
    animationEasing: 'cubicInOut'
  }
]

export default {
  props: {
    className: {
      type: String,
      default: 'line-chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '350px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    // 数据
    series: {
      type: Array,
      default: () => [
        { data: [100, 200, 6500, 450, 600, 7890, 658], name: '销量' },
        { data: [200, 500, 6800, 600, 1200, 8000, 800], name: '浏览量' }
      ]
    },
    // 图例
    legendData: {
      type: Array,
      default: () => []
    },
    // 横轴的坐标标签
    xAxisData: {
      type: Array,
      default: () => ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
    },
    // 横轴的坐标名称
    xAxisName: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      chart: null,
      subSeries: []
    }
  },
  watch: {
    series: {
      deep: true,
      handler(val) {
        this.subSeries = val
        this.setOptions()
      }
    },
    xAxisData() {
      this.setOptions()
    }
  },
  mounted() {
    this.initChart()
    if (this.autoResize) {
      this.__resizeHanlder = debounce(() => {
        if (this.chart) {
          this.chart.resize()
        }
      }, 100)
      window.addEventListener('resize', this.__resizeHanlder)
    }

    // 监听侧边栏的变化
    const sidebarElm = document.getElementsByClassName('sidebar-container')[0]
    if (sidebarElm) {
      sidebarElm.addEventListener('transitionend', this.__resizeHanlder)
    }
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    if (this.autoResize) {
      window.removeEventListener('resize', this.__resizeHanlder)
    }

    const sidebarElm = document.getElementsByClassName('sidebar-container')[0]
    if (sidebarElm) {
      sidebarElm.removeEventListener('transitionend', this.__resizeHanlder)
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    setOptions() {
      this.chart.setOption({
        type: 'category',
        xAxis: {
          name: this.xAxisName,
          data: this.xAxisData,
          boundaryGap: false,
          // 坐标轴刻度相关设置。
          axisTick: {
            inside: false,
            length: 5,
            lineStyle: {
              color: 'gray',
              shadowColor: 'gray',
              shadowOffsetY: 0
            }
          },
          // 刻度标签与轴线之间的距离。
          axisLabel: {
            margin: 16
          },
          // 设置坐标轴字体颜色和宽度
          axisLine: {
            lineStyle: {
              color: 'gray',
              width: 2
            }
          }
        },
        // 直角坐标系内绘图网格设置
        grid: {
          left: 30,
          right: 50,
          bottom: 50,
          top: 30,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          padding: [5, 10]
        },
        yAxis: {
          // 坐标轴刻度相关设置。
          axisTick: {
            inside: false,
            length: 5,
            lineStyle: {
              color: 'gray',
              shadowColor: 'gray',
              shadowOffsetY: 0
            }
          },
          // 刻度标签与轴线之间的距离。
          axisLabel: {
            margin: 16
          },
          // 设置坐标轴字体颜色和宽度
          axisLine: {
            lineStyle: {
              color: 'gray',
              width: 2
            }
          }
        },
        legend: {
          icon: 'rect',
          left: 'center',
          bottom: 0,
          textStyle: {
            color: '#999',
            fontSize: 12
          },
          data: this.series.map(item => item.name)
        },
        series: this.subSeries.map((item, index) => {
          return { ...defaultSeriesItem[index], ...item }
        })
      })
    },
    initChart() {
      this.subSeries = this.series
      this.chart = echarts.init(this.$el, 'macarons')
      this.setOptions()
    }
  }
}
</script>
