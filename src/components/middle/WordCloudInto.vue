<template>
  <div>
    {{ updateData }}
    <div :id="id" :style="{ height: '300px', width: '100%' }" />
  </div>
</template>

<script>
// 引入 ECharts 主模块
let echarts = require('echarts/lib/echarts');
require('echarts-wordcloud');

export default {
  props: ['user'],
  data() {
    return {
      id: 'wordCloudInto',
      chart: null,
      wordCloudIntoData: [
        {
          name: '无',
          value: 0,
        },
      ],
    };
  },
  mounted() {
    this.initChart();
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  computed: {
    updateData() {
      if (this.user.id != null) {
        this.axios
          .get(`/api/${this.user.type}/trace/into/${this.user.id}`)
          .then((res) => {
            let json = res.data;
            let data = [];
            if (Object.keys(json).length === 4) {
              for (let i in json) {
                if (i === 'east' && json[i] != 0) {
                  data.push({ name: '东大门', value: json[i] });
                } else if (i === 'west' && json[i] != 0) {
                  data.push({ name: '西大门', value: json[i] });
                } else if (i === 'south' && json[i] != 0) {
                  data.push({ name: '南大门', value: json[i] });
                } else if (i === 'north' && json[i] != 0) {
                  data.push({ name: '北大门', value: json[i] });
                }
              }
            } else {
              for (let i in json) {
                if (json[i] != 0) {
                  data.push({ name: i, value: json[i] });
                }
              }
            }
            if (data.length === 0) {
              data.push({ name: '无', value: 0 });
            }
            this.wordCloudIntoData = data;
            this.initChart();
          })
          .catch((err) => {
            console.log(err);
            let data = [];
            data.push({ name: '无', value: 0 });
            this.wordCloudIntoData = data;
            this.initChart();
          });
      }
    },
  },
  methods: {
    reload() {
      alert('1');
      this.$forceUpdate();
    },
    initChart() {
      this.chart = echarts.init(document.getElementById(this.id));
      const option = {
        backgroundColor: '#fff',
        tooltip: {
          trigger: 'item',
        },
        series: [
          {
            type: 'wordCloud',
            gridSize: 10,
            sizeRange: [14, 60],
            rotationRange: [0, 0],
            autoSize: {
              enable: true,
              minSize: 6,
            },
            textStyle: {
              normal: {
                color: function() {
                  return (
                    'rgb(' +
                    Math.round(Math.random() * 255) +
                    ', ' +
                    Math.round(Math.random() * 255) +
                    ', ' +
                    Math.round(Math.random() * 255) +
                    ')'
                  );
                },
              },
            },
            width: '200%',
            height: '200%',
            data: this.wordCloudIntoData,
          },
        ],
      };
      this.chart.setOption(option);
    },
  },
};
</script>
