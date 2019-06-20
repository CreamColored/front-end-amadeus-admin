<template>
  <div class="page-body">
    <div class="page-header">
      <h1 class="page-title">院校基本信息</h1>
      <el-breadcrumb>
        <el-breadcrumb-item :to="{path: '/'}">首页</el-breadcrumb-item>
        <el-breadcrumb-item>院校基本信息</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="box">
      <el-table
        :data="colleges"
        style="width: 100%">
        <el-table-column
          label="院校名称"
          width="180">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>ID: {{ scope.row.collegeId }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.collegeName }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          label="校训"
          width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{scope.row.collegeMotto}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="所在地区"
          width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.province }}{{ scope.row.city }}{{ scope.row.district }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="院校状态"
          width="80">
          <template slot-scope="scope">
            <span style="margin-left: 10px" v-if="scope.row.collegeState===1">可用</span>
            <span style="margin-left: 10px" v-else-if="scope.row.collegeState===0">已冻结</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="success"
              @click="handleEdit(scope.$index, scope.row)">编辑
            </el-button>
            <Dialog ref="myDialog" @findAll="findAll"/>
            <el-button
              size="mini"
              type="warning"
              @click="updateCollegeState(scope.row.collegeId, scope.row.collegeState)"
              v-if="scope.row.collegeState===1">冻结
            </el-button>
            <el-button
              size="mini"
              type="info"
              @click="updateCollegeState(scope.row.collegeId, scope.row.collegeState)"
              v-if="scope.row.collegeState===0">解冻
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import qs from 'querystring'
  import Dialog from '../m/dialog/edit-college-dialog'
  import * as api from '../api/college/api'
  export default {
    name: 'college-info-list',
    components: {
      Dialog
    },
    data () {
      return {
        colleges: [],
        params: {
          'collegeId': '',
          'collegeState': ''
        }
      }
    },
    methods: {
      findAll () {
        api.findAllCollegeInfo().then((response) => {
          this.colleges = response.queryResult.list
        })
      },
      updateCollegeState: function (collegeId, collegeState) {
        if (collegeState === 1) {
          this.$confirm('确定冻结id为' + collegeId + '的院校吗', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.params.collegeId = collegeId
            this.params.collegeState = 0
            var queryData = qs.stringify(this.params)
            api.updateCollegeState(queryData).then((response) => {
              if (response.success === true) {
                this.findAll()
                this.$message({
                  message: '冻结该院校成功!',
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
              message: '已取消冻结该院校!',
              type: 'info'
            })
          })
        } else {
          this.$confirm('确定解冻id为' + collegeId + '的院校吗', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.params.collegeId = collegeId
            this.params.collegeState = 1
            var queryData = qs.stringify(this.params)
            api.updateCollegeState(queryData).then((response) => {
              if (response.success === true) {
                this.findAll()
                this.$message({
                  message: '解冻该院校成功!',
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
              message: '已取消解冻该院校!',
              type: 'info'
            })
          })
        }
      },
      handleEdit (index, row) {
        this.$refs.myDialog.showDialog(row)
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
