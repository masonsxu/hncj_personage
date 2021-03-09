<template>
  <div>
    {{ updateReportdays }}
    <el-table :data="reportdays">
      <el-table-column prop="reportCount" label="打卡天数"></el-table-column>
      <el-table-column prop="abnormal" label="异常天数"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: ['user'],
  data() {
    return {
      reportdays: [
        {
          reportCount: '无',
          abnormal: '无',
        },
      ],
    };
  },
  computed: {
    updateReportdays() {
      if (this.user.id != null) {
        this.axios
          .get(`/api/${this.user.type}/health/reportday/${this.user.id}`)
          .then((res) => {
            const json = res.data;
            this.reportdays[0]['reportCount'] = json['reportCount'];
            this.reportdays[0]['abnormal'] = json['abnormal'];
          })
          .catch((err) => {
            this.reportdays[0]['reportCount'] = '无';
            this.reportdays[0]['abnormal'] = '无';
            console.log(err);
          });
      }
    },
  },
};
</script>
