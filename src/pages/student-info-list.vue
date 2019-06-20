<template>
  <div class="page-body">
    <div class="page-header">
      <h1 class="page-title">学生基本信息</h1>
      <el-breadcrumb>
        <el-breadcrumb-item :to="{path: '/'}">首页</el-breadcrumb-item>
        <el-breadcrumb-item>学生基本信息</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="box">
      <el-table
        :data="students"
        style="width: 100%">
        <el-table-column
          label="姓名"
          width="80">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>ID: {{ scope.row.infoId }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.studentName }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          label="证件类型"
          width="80">
          <template slot-scope="scope">
            <span style="margin-left: 10px" v-if=" scope.row.certificateType===1 ">身份证</span>
            <span style="margin-left: 10px" v-else-if="scope.row.certificateType===2">军官证</span>
            <span style="margin-left: 10px" v-if=" scope.row.certificateType===3 ">护照</span>
          </template>
        </el-table-column>
        <el-table-column
          label="证件号"
          width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.certificateCode }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="性别"
          width="80">
          <template slot-scope="scope">
            <span style="margin-left: 10px" v-if="scope.row.gender==='MALE'">男</span>
            <span style="margin-left: 10px" v-else-if="scope.row.gender==='FEMALE'">女</span>
            <span style="margin-left: 10px" v-else-if="scope.row.gender==='UNKNOWN'">保密</span>
          </template>
        </el-table-column>
        <el-table-column
          label="所在地"
          width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.province }}{{ scope.row.city }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="生日"
          width="120">
          <template slot-scope="scope">
            <span style="margin-left: 10px" v-if="scope.row.birthday">{{ scope.row.birthday.substring(0,10) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="用户积分"
          width="80">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.userPoint }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="用户余额"
          width="120">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.userBalance }}元</span>
          </template>
        </el-table-column>
        <el-table-column
          label="会员等级"
          width="80">
          <template slot-scope="scope">
            <span style="margin-left: 10px" v-if=" scope.row.memberLevel===5 ">钻石</span>
            <span style="margin-left: 10px" v-else-if=" scope.row.memberLevel===4 ">黄金</span>
            <span style="margin-left: 10px" v-else-if=" scope.row.memberLevel===3 ">白银</span>
            <span style="margin-left: 10px" v-else-if=" scope.row.memberLevel===2 ">青铜</span>
            <span style="margin-left: 10px" v-else-if=" scope.row.memberLevel===1 ">普通</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="success"
              @click="handleEdit(scope.$index, scope.row)">编辑
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <Page :totalNumber="totalNumber" :pageSize="pageSize" @handleCurrentChange="findAll"></Page>
    </div>
  </div>
</template>

<script>
  import * as api from '../api/student/api'
  import Page from '../m/page/Page'

  export default {
    name: 'student-list',
    components: {Page},
    data () {
      return {
        students: [],
        currentPage: 1,
        pageSize: 1,
        totalNumber: 100
      }
    },
    methods: {
      findAll (val) {
        if (val == null) {
          val = 1
        }
        this.currentPage = val
        api.findAllStudentInfo(this.currentPage, this.pageSize).then((response) => {
          console.log(response)
          this.students = response.queryResult.list
          this.getTotalNumber()
        })
      },
      handleEdit (index, row) {
        console.log(index, row)
      },
      handleDelete (index, row) {
        console.log(index, row)
      },
      getTotalNumber () {
        api.getTotalNumber().then((response) => {
          this.totalNumber = response
        })
      }
    },
    mounted () {
      this.findAll()
    }
  }
</script>

<style scoped>
  .box-body {
    width: 100%;
    overflow: auto;
  }
</style>
