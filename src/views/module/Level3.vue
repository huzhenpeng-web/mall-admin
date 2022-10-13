<template>
  <div>
    <Category :level="level">
      <template #back>
        <el-button @click="$router.go(-1)" class="el-icon-back" type="text">返回</el-button>
      </template>
    </Category>
  </div>
</template>

<script>
import Category from '@/components/category/Category.vue'
export default {
  components: {
    Category
  },
  data() {
    return {
      level: 3 // 三级分类
    }
  }
}
</script>

<style>
</style>
