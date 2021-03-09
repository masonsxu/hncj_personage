<template>
  <div>
    {{ updateLineData }}
    <div :id="id" :style="{ height: '300px', width: '100%' }" />
  </div>
</template>
<script>
// 引入 ECharts 主模块
let echarts = require('echarts/lib/echarts');
// 引入柱状图
require('echarts/lib/chart/bar');
require('echarts/lib/chart/line');
require('echarts/lib/chart/pictorialBar');
// 引入提示框和标题组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
require('echarts/lib/component/dataZoom');
require('echarts/lib/component/legend');

export default {
  props: ['user'],
  data() {
    return {
      id: 'lineChart',
      lineChart: null,
      barData: [],
      lineData: [],
      category: [],
    };
  },
  mounted() {
    this.initLineChart();
  },
  beforeDestroy() {
    if (!this.lineChart) {
      return;
    }
    this.lineChart.dispose();
    this.lineChart = null;
  },
  computed: {
    updateLineData() {
      if (this.user.id != null) {
        this.axios
          .get(`/api/${this.user.type}/health/temperature/${this.user.id}`)
          .then((res) => {
            let json = res.data;
            for (let v = 0; v < json.length; v++) {
              this.category.push(json[v].date);
              this.barData.push(json[v].temperature);
              if (v === 0) {
                this.lineData.push(0);
              } else {
                let subV = v - 1;
                this.lineData.push(
                  (json[v].temperature * 10 - json[subV].temperature * 10) / 10
                );
              }
            }
            this.initLineChart();
          })
          .catch((err) => {
            console.log(err);
            this.barData = [];
            this.lineData = [];
            this.category = [];
            this.initLineChart();
          });
      }
    },
  },
  methods: {
    reload() {
      alert('1');
      this.$forceUpdate();
    },
    initLineChart() {
      this.lineChart = echarts.init(document.getElementById(this.id));
      const option = {
        title: {
          text: '',
          x: 'center',
          color: '#fff',
          size: 40,
        },
        backgroundColor: '#0f375f',
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
            label: {
              show: true,
              backgroundColor: '#333',
            },
          },
        },
        legend: {
          data: ['体温变化趋势', '体温'],
          textStyle: {
            color: '#ccc',
          },
        },
        xAxis: {
          name: '上报时间',
          data: this.category,
          axisLine: {
            lineStyle: {
              color: '#ccc',
            },
          },
        },
        yAxis: {
          name: '体温(℃)',
          splitLine: { show: false },
          axisLine: {
            lineStyle: {
              color: '#ccc',
            },
          },
        },
        dataZoom: [
          {
            type: 'inside',
            start: 0,
            end: 10,
          },
          {
            start: 0,
            end: 10,
            handleIcon:
              'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
            handleSize: '80%',
            handleStyle: {
              color: '#fff',
              shadowBlur: 3,
              shadowColor: 'rgba(0, 0, 0, 0.6)',
              shadowOffsetX: 2,
              shadowOffsetY: 2,
            },
          },
        ],
        series: [
          {
            name: '体温变化趋势',
            type: 'line',
            smooth: true,
            showAllSymbol: true,
            symbol: 'emptyCircle',
            symbolSize: 15,
            data: this.lineData,
          },
          {
            name: '体温',
            type: 'bar',
            barWidth: 10,
            itemStyle: {
              normal: {
                barBorderRadius: 5,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#14c8d4' },
                  { offset: 1, color: '#43eec6' },
                ]),
              },
            },
            data: this.barData,
          },
        ],
      };
      this.lineChart.setOption(option);
    },
  },
};
</script>
