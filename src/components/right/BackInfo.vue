<template>
  <div>
    <!-- {{ updateBackInfo }} -->
    <el-table :data="backInfos">
      <!-- <el-table-column prop="FCSSX" label="返程省市县"></el-table-column> -->
      <el-table-column prop="time" label="返程时间"></el-table-column>
      <el-table-column prop="vehicle" label="外出交通工具"></el-table-column>
      <el-table-column
        prop="trainNumber"
        label="车次/航班/车牌号"
      ></el-table-column>
      <el-table-column prop="detail" label="详细路径"></el-table-column>
      <el-table-column prop="arrivalTime" label="返校时间"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: ['user'],
  data() {
    return {
      backInfos: [
        {
          // FCSSX: "未知",
          time: '无',
          vehicle: '无',
          trainNumber: '无',
          detail: '无',
          arrivalTime: '无',
        },
      ],
    };
  },
  computed: {
    updateBackInfo: function() {
      if (this.user.id != '') {
        this.axios
          .get(`/api/${this.user.type}/back/${this.user.id}`)
          .then((res) => {
            const json = res.data;
            // this.backInfos[0]["FCSSX"] = json["FCSSX"];
            this.backInfos[0]['time'] = json['time'];
            this.backInfos[0]['vehicle'] = json['vehicle'];
            this.backInfos[0]['trainNumber'] = json['trainNumber'];
            this.backInfos[0]['detail'] = json['detail'];
            this.backInfos[0]['arrivalTime'] = json['arrivalTime'];
          })
          .catch((err) => {
            // this.backInfos[0]["FCSSX"] = '无';
            this.backInfos[0]['time'] = '无';
            this.backInfos[0]['vehicle'] = '无';
            this.backInfos[0]['trainNumber'] = '无';
            this.backInfos[0]['detail'] = '无';
            this.backInfos[0]['arrivalTime'] = '无';
            console.log(err);
          });
      }
    },
  },
};
</script>
