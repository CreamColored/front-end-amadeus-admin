<template>
  <div class="page-body">
    <div class="page-header">
      <h1 class="page-title">课程基本信息</h1>
      <el-breadcrumb>
        <el-breadcrumb-item :to="{path: '/'}">首页</el-breadcrumb-item>
        <el-breadcrumb-item>课程基本信息</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="box">
      <el-table
        :data="courses"
        style="width: 100%">
        <el-table-column
          label="课程名称"
          width="180">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>ID: {{ scope.row.courseId }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.courseName }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          label="收藏数量"
          width="80">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.favorNumber }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="访问数量"
          width="80">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.clickNumber }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="课程难度"
          width="80">
          <template slot-scope="scope">
            <span style="margin-left: 10px" v-if="scope.row.courseLevel==='BEGINNER LEVEL'">初级</span>
            <span style="margin-left: 10px" v-else-if="scope.row.courseLevel==='INTERMEDIATE LEVEL'">中级</span>
            <span style="margin-left: 10px" v-else-if="scope.row.courseLevel==='ADVANCED LEVEL'">高级</span>
          </template>
        </el-table-column>
        <el-table-column
          label="课程状态"
          width="80">
          <template slot-scope="scope">
            <span style="margin-left: 10px" v-if="scope.row.courseState===1">可用</span>
            <span style="margin-left: 10px" v-else-if="scope.row.courseState===0">已冻结</span>
          </template>
        </el-table-column>
        <el-table-column
          label="发布日期"
          width="120">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{scope.row.releaseDate.substring(0,10)}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="教师信息"
          width="80">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>ID: {{ scope.row.teacherLogin.teacherId }}</p>
              <p>手机号: {{ scope.row.teacherLogin.telephoneNumber }}</p>
              <p>邮箱: {{ scope.row.teacherLogin.email }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.teacherLogin.teacherInfo.teacherName }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="warning"
              @click="updateCourseState(scope.row.courseId, scope.row.courseState)"
              v-if="scope.row.courseState===1">冻结
            </el-button>
            <el-button
              size="mini"
              type="info"
              @click="updateCourseState(scope.row.courseId, scope.row.courseState)"
              v-if="scope.row.courseState===0">解冻
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row.courseId)">删除
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
  import * as api from '../api/course/api'
  import Page from '../m/page/Page'

  export default {
    name: 'course-info-list',
    components: {Page},
    data () {
      return {
        courses: [],
        params: {
          'courseId': '',
          'courseState': ''
        },
        currentPage: 1,
        pageSize: 10,
        totalNumber: 100
      }
    },
    methods: {
      findAll (val) {
        if (val == null) {
          val = 1
        }
        this.currentPage = val
        api.findAllCourseInfo(this.currentPage, this.pageSize).then((response) => {
          console.log(response)
          this.courses = response.queryResult.list
          this.getTotalNumber()
        })
      },
      updateCourseState: function (courseId, courseState) {
        if (courseState === 1) {
          this.$confirm('确定冻结id为' + courseId + '的课程吗', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.params.courseId = courseId
            this.params.courseState = 0
            var queryData = qs.stringify(this.params)
            api.updateCourseState(queryData).then((response) => {
              if (response.success === true) {
                this.findAll(this.currentPage)
                this.$message({
                  message: '冻结该课程成功!',
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
              message: '已取消冻结该课程!',
              type: 'info'
            })
          })
        } else {
          this.$confirm('确定解冻id为' + courseId + '的课程吗', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.params.courseId = courseId
            this.params.courseState = 1
            var queryData = qs.stringify(this.params)
            api.updateCourseState(queryData).then((response) => {
              if (response.success === true) {
                this.findAll(this.currentPage)
                this.$message({
                  message: '解冻该课程成功!',
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
              message: '已取消解冻该课程!',
              type: 'info'
            })
          })
        }
      },
      handleDelete: function (courseId) {
        this.$confirm('此操作将永久删除该课程, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          api.deleteCourse(courseId).then((response) => {
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
        api.getTotalCourseInfoNumber().then((response) => {
          console.log(response)
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
