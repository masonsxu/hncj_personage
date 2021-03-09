<template>
  <div>
    {{ updateSymptomInfo }}
    <el-table :data="symptomInfos">
      <el-table-column prop="symptom" label="症状"></el-table-column>
      <el-table-column prop="symptomDesc" label="症状描述"></el-table-column>
      <el-table-column prop="illnessDate" label="发病日期"></el-table-column>
      <el-table-column prop="diagnoseResult" label="诊断结果"></el-table-column>
      <el-table-column
        prop="hadContacPatient"
        label="是否去过武汉或者接触过病人"
      ></el-table-column>
      <el-table-column prop="healthState" label="自身状态"></el-table-column>
      <el-table-column prop="createTime" label="上传日期"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: ['user'],
  data() {
    return {
      symptomInfos: [
        {
          symptom: '无',
          symptomDesc: '无',
          illnessDate: '无',
          diagnoseResult: '无',
          hadContacPatient: '无',
          healthState: '无',
          createTime: '无',
        },
      ],
    };
  },
  computed: {
    updateSymptomInfo: function() {
      if (this.user.id != null) {
        this.axios
          .get(`/api/${this.user.type}/health/symptom/${this.user.id}`)
          .then((res) => {
            const json = res.data;
            if (json.length < 1) {
              this.symptomInfos[0]['symptom'] = '无';
              this.symptomInfos[0]['symptomDesc'] = '无';
              this.symptomInfos[0]['illnessDate'] = '无';
              this.symptomInfos[0]['diagnoseResult'] = '无';
              this.symptomInfos[0]['hadContacPatient'] = '无';
              this.symptomInfos[0]['healthState'] = '无';
              this.symptomInfos[0]['createTime'] = '无';
            } else {
              for (let i = 0; i < json.length; i++) {
                this.symptomInfos[i]['symptom'] = json[i]['symptom'];
                this.symptomInfos[i]['symptomDesc'] = json[i]['symptomDesc'];
                this.symptomInfos[i]['illnessDate'] = json[i]['illnessDate'];
                this.symptomInfos[i]['diagnoseResult'] =
                  json[i]['diagnoseResult'];
                this.symptomInfos[i]['hadContacPatient'] =
                  json[i]['hadContacPatient'];
                this.symptomInfos[i]['healthState'] = json[i]['healthState'];
                this.symptomInfos[i]['createTime'] = json[i]['createTime'];
              }
            }
          })
          .catch((err) => {
            this.symptomInfos[0]['symptom'] = '无';
            this.symptomInfos[0]['symptomDesc'] = '无';
            this.symptomInfos[0]['illnessDate'] = '无';
            this.symptomInfos[0]['diagnoseResult'] = '无';
            this.symptomInfos[0]['hadContacPatient'] = '无';
            this.symptomInfos[0]['healthState'] = '无';
            this.symptomInfos[0]['createTime'] = '无';
            console.log(err);
          });
      }
    },
  },
};
</script>
