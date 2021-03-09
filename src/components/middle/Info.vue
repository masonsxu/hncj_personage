<template>
  <div class="info">
    {{ updateInfo }}
    <el-table :data="infos">
      <el-table-column prop="id" label="学号"></el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="grade" label="年级"></el-table-column>
      <el-table-column prop="department" label="学院"></el-table-column>
      <el-table-column prop="major" label="专业"></el-table-column>
      <el-table-column prop="classNumber" label="班级"></el-table-column>
      <el-table-column prop="area" label="家庭住址"></el-table-column>
      <el-table-column prop="phone" label="联系电话"></el-table-column>
      <el-table-column prop="instructor" label="导员姓名"></el-table-column>
      <el-table-column
        prop="instructorPhone"
        label="导员电话"
      ></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: ['user'],
  data() {
    return {
      infos: [
        {
          id: '无',
          name: '无',
          grade: '无',
          department: '无',
          major: '无',
          classNumber: '无',
          area: '无',
          phone: '无',
          instructor: '无',
          instructorPhone: '无',
        },
      ],
    };
  },
  computed: {
    updateInfo: function() {
      if (this.user.id != null) {
        this.axios
          .get(`/api/${this.user.type}/info/${this.user.id}`)
          .then((res) => {
            const json = res.data;
            if (json.length < 1) {
              this.infos[0]['id'] = '无';
              this.infos[0]['name'] = '无';
              this.infos[0]['grade'] = '无';
              this.infos[0]['department'] = '无';
              this.infos[0]['major'] = '无';
              this.infos[0]['classNumber'] = '无';
              this.infos[0]['area'] = '无';
              this.infos[0]['phone'] = '无';
              this.infos[0]['instructor'] = '无';
              this.infos[0]['instructorPhone'] = '无';
            } else if (this.user.type === 'otherguy') {
              for (let i = 0; i < json.length; i++) {
                this.infos[i]['id'] = json[i]['id'];
                this.infos[i]['name'] = json[i]['name'];
                this.infos[i]['grade'] = json[i]['grade'];
                this.infos[i]['department'] = json[i]['department'];
                this.infos[i]['major'] = json[i]['major'];
                this.infos[i]['classNumber'] = json[i]['classNumber'];
                this.infos[i]['area'] = json[i]['area'];
                this.infos[i]['phone'] = json[i]['phone'];
                this.infos[i]['instructor'] = json[i]['instructor'];
                this.infos[i]['instructorPhone'] = json[i]['instructorPhone'];
              }
            } else {
              this.infos[0]['id'] = json['id'];
              this.infos[0]['name'] = json['name'];
              this.infos[0]['grade'] = json['grade'];
              this.infos[0]['department'] = json['department'];
              this.infos[0]['major'] = json['major'];
              this.infos[0]['classNumber'] = json['classNumber'];
              this.infos[0]['area'] = json['area'];
              this.infos[0]['phone'] = json['phone'];
              this.infos[0]['instructor'] = json['instructor'];
              this.infos[0]['instructorPhone'] = json['instructorPhone'];
            }
          })
          .catch((err) => {
            this.infos[0]['id'] = '无';
            this.infos[0]['name'] = '无';
            this.infos[0]['grade'] = '无';
            this.infos[0]['department'] = '无';
            this.infos[0]['major'] = '无';
            this.infos[0]['classNumber'] = '无';
            this.infos[0]['area'] = '无';
            this.infos[0]['phone'] = '无';
            this.infos[0]['instructor'] = '无';
            this.infos[0]['instructorPhone'] = '无';
            console.log(err);
          });
      }
    },
  },
};
</script>
