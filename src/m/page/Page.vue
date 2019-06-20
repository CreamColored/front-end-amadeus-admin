<template>
  <div class="block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      background
      :current-page.sync="currentPage"
      :page-size="pageSize"
      layout="total, prev, pager, next"
      :total="totalNumber">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    name: 'Page',
    methods: {
      handleSizeChange (val) {
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange (val) {
        console.log(`当前页: ${val}`)
        this.$emit('handleCurrentChange',val,1)
      }
    },
    data () {
      return {
        currentPage: 1
      }
    },
    props:[
      'totalNumber','page-size'
    ]
  }
</script>

<style scoped>
  .block{
    text-align: center;
  }
</style>
