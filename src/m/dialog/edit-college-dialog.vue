<template>
  <el-dialog title="修改院校信息" :visible.sync="dialogFormVisible">
    <el-form :model="params">
      <el-form-item label="院校id" :label-width="formLabelWidth">
        <el-input v-model="params.collegeId" auto-complete="off" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="院校名称" :label-width="formLabelWidth">
        <el-input v-model="params.collegeName" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="校训" :label-width="formLabelWidth">
        <el-input v-model="params.collegeMotto" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="校徽" :label-width="formLabelWidth">
        <el-input v-model="params.collegeBadge" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="省份" :label-width="formLabelWidth">
        <el-input v-model="params.province" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="城市" :label-width="formLabelWidth">
        <el-input v-model="params.city" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="区" :label-width="formLabelWidth">
        <el-input v-model="params.district" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="院校简介" :label-width="formLabelWidth">
        <el-input v-model="params.description" auto-complete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="updateCollegeInfo">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
  import qs from 'querystring'
  import {update} from '../../api/college/api'

  export default {
    name: 'edit-college-dialog',
    data () {
      return {
        dialogFormVisible: false,
        params: {
          collegeId: '',
          collegeName: '',
          collegeMotto: '',
          collegeBadge: '',
          province: '',
          city: '',
          district: '',
          description: ''
        },
        formLabelWidth: '120px'
      }
    },
    methods: {
      showDialog: function (params) {
        this.dialogFormVisible = true
        this.params.collegeId = params.collegeId
        this.params.collegeName = params.collegeName
        this.params.collegeMotto = params.collegeMotto
        this.params.collegeBadge = params.collegeBadge
        this.params.province = params.province
        this.params.city = params.city
        this.params.district = params.district
        this.params.description = params.description
      },
      updateCollegeInfo: function () {
        var queryParams = qs.stringify(this.params)
        update(queryParams).then((response) => {
          if (response.success === true) {
            this.$message({
              message: '修改院校信息成功!',
              type: 'success'
            })
          } else {
            this.$message({
              message: '修改院校信息失败，请刷新后重试!',
              type: 'error'
            })
          }
        }).catch(() => {
          this.$message({
            message: '已取消修改院校信息!',
            type: 'info'
          })
        })
        this.dialogFormVisible = false
      },
      findAll:function () {
        this.$emit('findAll')
      }
    }
  }
</script>

<style scoped>

</style>
