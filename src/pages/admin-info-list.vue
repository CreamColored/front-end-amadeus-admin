<template>
  <div class="page-body">
    <div class="page-header">
      <h1 class="page-title">管理员信息</h1>
      <el-breadcrumb>
        <el-breadcrumb-item :to="{path: '/'}">首页</el-breadcrumb-item>
        <el-breadcrumb-item>管理员信息</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="box">
      <el-button type="primary" round style="margin-bottom: 10px" @click="addAdmin">添加院校管理员</el-button>
      <el-table
        :data="admins"
        style="width: 100%">
        <el-table-column
          label="管理员姓名"
          width="100">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>ID: {{ scope.row.adminId }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.name }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          label="院校名称"
          width="160">
          <template slot-scope="scope">
            <span style="margin-left: 10px" v-if="scope.row.collegeInfo.collegeName===''">无</span>
            <span style="margin-left: 10px" v-else-if="scope.row.collegeInfo.collegeName==null">无</span>
            <span style="margin-left: 10px" v-else>{{scope.row.collegeInfo.collegeName}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="院校状态"
          width="80">
          <template slot-scope="scope">
            <span style="margin-left: 10px" v-if="scope.row.collegeInfo.collegeState===1">可用</span>
            <span style="margin-left: 10px" v-else>已冻结</span>
          </template>
        </el-table-column>
        <el-table-column
          label="手机号"
          width="120">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{scope.row.telephoneNumber}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="邮箱"
          width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{scope.row.email}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="管理员身份"
          width="100">
          <template slot-scope="scope">
            <span style="margin-left: 10px" v-if="scope.row.identity===1">院校管理员</span>
            <span style="margin-left: 10px" v-else-if="scope.row.identity===0">超级管理员</span>
          </template>
        </el-table-column>
        <el-table-column
          label="账号状态"
          width="80">
          <template slot-scope="scope">
            <span style="margin-left: 10px" v-if="scope.row.accountState===1">可用</span>
            <span style="margin-left: 10px" v-else>已冻结</span>
          </template>
        </el-table-column>
        <el-table-column
          label="上次登录时间"
          width="120">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{scope.row.lastLoginTime}}</span>
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
              type="warning"
              @click="updateAccountState(scope.row.adminId, scope.row.accountState)"
              v-if="scope.row.accountState===1">冻结
            </el-button>
            <el-button
              size="mini"
              type="info"
              @click="updateAccountState(scope.row.adminId, scope.row.accountState)"
              v-if="scope.row.accountState===0">解冻
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row.adminId,scope.row.collegeInfo.collegeName)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import qs from 'querystring'
  import * as api from '../api/admin/api'
  export default {
    name: 'admin-info-list',
    data () {
      return {
        admins: [],
        params: {
          'adminId': '',
          'accountState': ''
        }
      }
    },
    methods: {
      findAll () {
        api.findAllAdminInfo().then((response) => {
          this.admins = response.queryResult.list
        })
      },
      updateAccountState: function (adminId, accountState) {
        if (accountState === 1) {
          this.$confirm('确定冻结id为' + adminId + '的管理员吗', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.params.adminId = adminId
            this.params.accountState = 0
            var queryData = qs.stringify(this.params)
            api.updateAccountState(queryData).then((response) => {
              if (response.success === true) {
                this.findAll()
                this.$message({
                  message: '冻结该管理员成功!',
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
              message: '已取消冻结该管理员!',
              type: 'info'
            })
          })
        } else {
          this.$confirm('确定解冻id为' + adminId + '的管理员吗', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.params.adminId = adminId
            this.params.accountState = 1
            var queryData = qs.stringify(this.params)
            api.updateAccountState(queryData).then((response) => {
              if (response.success === true) {
                this.findAll()
                this.$message({
                  message: '解冻该管理员成功!',
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
              message: '已取消解锁该管理员!',
              type: 'info'
            })
          })
        }
      },
      handleEdit (index, row) {
        console.log(index, row)
      },
      handleDelete: function (adminId, collegeName) {
        this.$confirm('此操作将永久删除该管理员并且其管理的院校(' + collegeName + ')也将一并删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          api.deleteAdminInfo(adminId).then((response) => {
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
      addAdmin () {
        this.$router.push({
          path:'/admin/add'
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
