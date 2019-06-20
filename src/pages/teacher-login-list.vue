<template>
  <div class="page-body">
    <div class="page-header">
      <h1 class="page-title">教师登陆信息</h1>
      <el-breadcrumb>
        <el-breadcrumb-item :to="{path: '/'}">首页</el-breadcrumb-item>
        <el-breadcrumb-item>教师基本信息</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="box">
      <el-table
        :data="teachers"
        style="width: 100%">
        <el-table-column
          label="ID"
          width="300">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.teacherId }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="手机号"
          width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.telephoneNumber }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="邮箱"
          width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.email }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="账号状态"
          width="80">
          <template slot-scope="scope">
            <span style="margin-left: 10px" v-if="scope.row.accountState===1">可用</span>
            <span style="margin-left: 10px" v-else-if="scope.row.accountState===0">已冻结</span>
          </template>
        </el-table-column>
        <el-table-column
          label="激活状态"
          width="80">
          <template slot-scope="scope">
            <span style="margin-left: 10px" v-if="scope.row.activationState===1">已激活</span>
            <span style="margin-left: 10px" v-else-if="scope.row.activationState===0">未激活</span>
          </template>
        </el-table-column>
        <el-table-column
          label="所属院校"
          width="180">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>ID: {{ scope.row.collegeInfo.collegeId }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium" v-if="scope.row.collegeInfo.collegeId!=null">{{ scope.row.collegeInfo.collegeName }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="warning"
              @click="updateAccountState(scope.row.teacherId, scope.row.accountState)"
              v-if="scope.row.accountState===1">冻结
            </el-button>
            <el-button
              size="mini"
              type="info"
              @click="updateAccountState(scope.row.teacherId, scope.row.accountState)"
              v-if="scope.row.accountState===0">解冻
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row.teacherId)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <Page :totalNumber="totalNumber" :pageSize="pageSize" @handleCurrentChange="findAll"></Page>
    </div>
  </div>
</template>

<script>
  import qs from 'querystring'
  import * as api from '../api/teacher/api'
  import Page from '../m/page/Page'

  export default {
    name: 'teacher-login-list',
    components: {Page},
    data () {
      return {
        teachers: [],
        params: {
          'teacherId': '',
          'accountState': ''
        },
        currentPage: 1,
        pageSize: 2,
        totalNumber: 100
      }
    },
    methods: {
      findAll (val) {
        if (val == null) {
          val = 1
        }
        this.currentPage = val
        api.findAllTeacherLogin(this.currentPage, this.pageSize).then((response) => {
          console.log(response)
          this.teachers = response.queryResult.list
          this.getTotalNumber()
        })
      },
      updateAccountState: function (teacherId, accountState) {
        if (accountState === 1) {
          this.$confirm('确定冻结id为' + teacherId + '的用户吗', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.params.teacherId = teacherId
            this.params.accountState = 0
            var queryData = qs.stringify(this.params)
            api.updateAccountState(queryData).then((response) => {
              if (response.success === true) {
                this.findAll(this.currentPage)
                this.$message({
                  message: '冻结该用户成功!',
                  type: 'success'
                })
              } else {
                this.$message({
                  message: '冻结失败，请刷新后重试!',
                  type: 'error'
                })
              }
            })
          }).catch(() => {
            this.$message({
              message: '已取消冻结该用户!',
              type: 'info'
            })
          })
        } else {
          this.$confirm('确定解冻id为' + teacherId + '的用户吗', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.params.teacherId = teacherId
            this.params.accountState = 1
            var queryData = qs.stringify(this.params)
            api.updateAccountState(queryData).then((response) => {
              if (response.success === true) {
                this.findAll(this.currentPage)
                this.$message({
                  message: '解冻该用户成功!',
                  type: 'success'
                })
              } else {
                this.$message({
                  message: '解冻失败，请刷新后重试!',
                  type: 'error'
                })
              }
            })
          }).catch(() => {
            this.$message({
              message: '已取消解冻该用户!',
              type: 'info'
            })
          })
        }
      },
      handleDelete: function (teacherId) {
        this.$confirm('此操作将永久删除该账户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          api.deleteTeacher(teacherId).then((response) => {
            if (response.success === true) {
              this.findAll()
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
            } else {
              this.$message({
                type: 'error',
                message: '删除失败，请刷新后重试!'
              })
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      getTotalNumber () {
        api.getTotalTeacherLoginNumber().then((response) => {
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
