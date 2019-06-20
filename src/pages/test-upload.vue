<template>
  <div id="box">
    <el-upload
      class="upload-demo"
      ref="upload"
      action="http://localhost:65532/api/fdfs/fileUpload/1d4f0d8c58674c029c6d87618dad79a9"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :file-list="fileList"
      :auto-upload="false">
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
      <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
    <form action="http://localhost:65532/api/fdfs/fileUpload/1d4f0d8c58674c029c6d87618dad79a9" method="post" enctype="multipart/form-data">
      <input type="file" name="file" multiple>
      <input type="submit" value="上传">
    </form>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        fileList: []
      }
    },
    methods: {
      submitUpload () {
        this.$refs.upload.submit()
      },
      handleRemove (file, fileList) {
        console.log(file, fileList)
      },
      handlePreview (file) {
        console.log(file)
      }
    }
  }
</script>

<style scoped>

</style>
