<template>
  <div :class="className" :style="{height:height,width:width}" :chartListdata="chartListdata" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

const animationDuration = 2000

// const data = data

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    chartListdata: {
      type: Array,
      default: () => [123, 2345, 1234]
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '115px'
    }
  },
  data() {
    return {
      chart: null,
      maxData: []
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      for (var i = 0; i < this.chartListdata.length; i++) {
        var max = Math.max.apply(null, this.chartListdata)
        this.maxData.push(max + 1000)
      }
      this.chart = echarts.init(this.$el, 'macarons')
      this.chart.setOption({
        tooltip: {
          show: true,
          position: 'right'
        },
        legend: {
          show: false
        },
        grid: {
          top: 10,
          left: '0',
          right: '50%',
          bottom: '0',
          containLabel: true
        },
        xAxis: [{
          type: 'value',
          splitLine: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: false
          },
          splitArea: {
            show: false
          }
        }],
        yAxis: [{
          type: 'category',
          inverse: true,
          data: ['微信', '支付宝', '其他'],
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            color: '#666666',
            fontSize: 16
          }
        }],

        series: [
          { // For shadow
            type: 'bar',
            itemStyle: {
              normal: {
                color: '#e6ebf5',
                barBorderRadius: 3
              }
            },
            silent: true,
            barWidth: 5,
            barGap: '-100%',
            data: this.maxData,
            animation: false,
            barMinHeight: 146
          },
          {
            type: 'bar',
            barWidth: 5,
            barMinHeight: 10,
            z: 10,
            itemStyle: {
              normal: {
                barBorderRadius: 3,
                color: function(params) {
                  const colorList = [
                    '#13ce66',
                    '#1890ff',
                    '#f5637b'
                  ]
                  return colorList[params.dataIndex]
                }
              }
            },
            data: this.chartListdata,
            label: {
              show: true,
              position: ['160', '-100%'],
              color: '#666666',
              fontSize: 16
            },
            animationDuration
          }
        ]
      })
    }
  }
}
</script>
