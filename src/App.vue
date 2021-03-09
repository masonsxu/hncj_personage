<template>
  <div id="app">
    <el-container>
      <el-header style="font-weight:700;font-size:18px;">{{
        mseeage.title
      }}</el-header>

      <el-main>
        <el-row :gutter="21" type="flex" class="row-bg" justify="center">
          <!-- 查询人员 -->
          <el-col :span="8">
            <h3>
              <i class="el-icon-user-solid" style="color:#4074bf"></i
              >&nbsp;特定人员查询
              <i>
                <el-button type="primary" icon="el-icon-s-promotion"
                  ><a href="./student-health-info.html"
                    >学生健康记录查询
                  </a></el-button
                ></i
              >
            </h3>
            <el-card>
              <div>
                <span style="font-weight:600;">人员类型: </span>
                <el-select
                  v-model="user.type"
                  style="margin-left:20px;width:65%"
                >
                  <el-option
                    v-for="item in items"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </div>
              <div style="margin-top:20px">
                <span style="font-weight:600;">请输入ID:</span>
                <el-input v-model="user.id" style="width:65%;margin-left:22px;">
                </el-input>
              </div>
            </el-card>
            <el-card style="margin-top:10px">
              <el-row>
                <el-col :span="12"
                  ><span style="font-weight:600;">当前查询类型：</span
                  >{{ usertype }}
                </el-col>
                <el-col :span="12"
                  ><span style="font-weight:600;">ID：</span>{{ user.id }}
                </el-col>
              </el-row>
            </el-card>

            <!-- 打卡天数 -->
            <h3 style="margin-top:20px">
              <i class="el-icon-date" style="color:#0ab589"></i>&nbsp;打卡天数
            </h3>
            <el-card style="margin-top:20px">
              <Student :user="user" />
            </el-card>
          </el-col>

          <el-col :span="16">
            <div>
              <h3>
                <i class="el-icon-info" style="color:#4a90e2"></i
                >&nbsp;特定人员信息
              </h3>
              <el-card body-style="padding-top:2px;padding-bottom:10px">
                <Info :user="user" />
              </el-card>
            </div>
            <div>
              <h3>
                <i class="el-icon-first-aid-kit" style="color:#ff0000"></i
                >&nbsp;身体状况
              </h3>
              <el-card body-style="padding-top:2px;padding-bottom:10px">
                <Symptom :user="user" />
              </el-card>
            </div>
            <div>
              <h3>
                <i
                  class="el-icon-location-information"
                  style="color:#053d75"
                ></i
                >&nbsp;返程信息
              </h3>
              <el-card body-style="padding-top:2px;padding-bottom:10px">
                <BackInfo :user="user" />
              </el-card>
            </div>
          </el-col>
        </el-row>

        <el-row :gutter="21" type="flex" class="row-bg" justify="center">
          <el-col :span="14">
            <h3>
              <i class="el-icon-data-line" style="color:#5dbfff"></i
              >&nbsp;体温信息
            </h3>
            <p style="margin-top:-10px;font-size:12px;">
              注：此图记录该人员的体温变化趋势
            </p>
            <LineChart :user="user" />
          </el-col>
          <el-col :span="6">
            <h3>
              <i class="el-icon-tickets" style="color:#2292ff"></i
              >&nbsp;离校记录
            </h3>
            <p style="margin-top:-10px;font-size:12px;">
              注：学校大门——人员进出词频图
            </p>
            <el-card>
              <WordCloudOut :user="user" />
            </el-card>
          </el-col>
          <el-col :span="6">
            <h3>
              <i class="el-icon-position" style="color:#115394"></i
              >&nbsp;入校记录
            </h3>
            <p style="margin-top:-10px;font-size:12px;">
              注：学校大门——人员进出词频图
            </p>
            <el-card>
              <WordCloudInto :user="user" />
            </el-card>
          </el-col>
        </el-row>
      </el-main>
      <el-footer>{{ mseeage.footer }}</el-footer>
    </el-container>
    <router-view></router-view>
  </div>
</template>

<script>
import Student from './components/left/Student';
import WordCloudOut from './components/left/WordCloudOut';
import Info from './components/middle/Info';
import Symptom from './components/right/Symptom';
import BackInfo from './components/right/BackInfo';
import WordCloudInto from './components/middle/WordCloudInto';
import LineChart from './components/right/LineChart';
export default {
  computed: {
    usertype() {
      if (this.user.type === 'student') {
        return '学生';
      } else if (this.user.type === 'teacher') {
        return '教师';
      } else {
        return '访客';
      }
    },
    mseeage() {
      return this.$store.getters.getMseeage;
    },
    user() {
      return this.$store.getters.getUser;
    },
    items() {
      return this.$store.getters.getAllItems;
    },
  },
  components: {
    Student,
    WordCloudOut,
    Info,
    Symptom,
    BackInfo,
    WordCloudInto,
    LineChart,
  },
};
</script>

<style lang="stylus" scope>
.el-header, .el-footer
  background-color #B3C0D1;
  color #333;
  text-align center;
  line-height 60px;

.el-main
  background-color #E9EEF3;
  color #333;

body > .el-container
  margin-bottom 40px;

a
  text-decoration none;
  font-weight bold;
  font-size 18px
  color #000
</style>
