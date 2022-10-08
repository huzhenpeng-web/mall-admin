<template>
  <div>
    <el-card>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="修改昵称" name="first">修改昵称</el-tab-pane>
        <el-tab-pane label="修改密码" name="second">修改密码</el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
export default {}
</script>

<style>
</style>
