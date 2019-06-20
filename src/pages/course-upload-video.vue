<template>
  <div class="page-body">
    <div class="page-header">
      <h1 class="page-title">上传课程视频</h1>
      <el-breadcrumb>
        <el-breadcrumb-item :to="{path: '/'}">首页</el-breadcrumb-item>
        <el-breadcrumb-item>上传课程视频</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="box">
      <el-upload
        class="upload-demo"
        drag
        action="http://localhost:65532/api/fdfs/uploadFileToFastDFS"
        multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传mp4文件，且不超过100mb</div>
      </el-upload>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'course-upload-video',

  }
</script>

<style scoped>
  .box-body {
    width: 100%;
    overflow: auto;
  }
</style>
