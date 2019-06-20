<template>
  <div class="page-body">
    <div class="page-header">
      <h1 class="page-title">添加管理员</h1>
      <el-breadcrumb>
        <el-breadcrumb-item :to="{path: '/'}">首页</el-breadcrumb-item>
        <el-breadcrumb-item>添加管理员</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="box">
      <el-button type="primary" round style="margin-bottom: 10px" @click="goBack">返回</el-button>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="管理员姓名" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="院校名称" prop="collegeName">
          <el-input v-model="ruleForm.collegeName"></el-input>
        </el-form-item>
        <el-form-item label="管理员身份" prop="identity">
          <el-select v-model="ruleForm.identity" placeholder="请选择管理员身份">
            <el-option label="院校管理员" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input type="text" v-model="ruleForm.email"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即添加</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import qs from 'querystring'
  import {addAdminInfo} from '../api/admin/api'

  export default {
    name: 'admin-add',
    data () {
      return {
        ruleForm: {
          name: '',
          identity: '',
          email: '',
          collegeName: ''
        },
        rules: {
          name: [
            {required: true, message: '请输入管理员姓名', trigger: 'blur'},
            {max: 10, message: '长度在10位以内', trigger: 'blur'}
          ],
          collegeName: [
            {required: true, message: '请输入院校名称', trigger: 'blur'},
            {max: 20, message: '长度在20位以内', trigger: 'blur'}
          ],
          identity: [
            {required: true, message: '请选择活动区域', trigger: 'change'}
          ],
          email: [
            {required: true, message: '请输入邮箱地址', trigger: 'blur'},
            {type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change'}
          ]
        }
      }
    },
    methods: {
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
            if (valid) {
              var queryParams = qs.stringify(this.ruleForm)
              addAdminInfo(queryParams).then((response) => {
                if (response.success === true) {
                  this.$message({
                    message: '添加管理员成功!',
                    type: 'success'
                  })
                  this.$router.push('/admin/list')
                } else {
                  this.$message({
                    message: '添加失败，请刷新后重试!',
                    type: 'error'
                  })
                }
              }).catch(() => {
                this.$message({
                  message: '已取消添加该管理员!',
                  type: 'info'
                })
              })
            }
          }
        )
      },
      resetForm (formName) {
        this.$refs[formName].resetFields()
      }
      ,
      goBack () {
        this.$router.push('/admin/list')
      }
    }
  }
</script>

<style scoped>
  .box {
    width: 30%;
    margin: 0 auto;
    overflow: auto;
  }
</style>
