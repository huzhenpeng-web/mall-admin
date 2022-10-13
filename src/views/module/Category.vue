<template>
  <div>
    <Category :level="level"></Category>
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
      level: 1 // 一级分类
    }
  }
}
</script>

<style>
</style>
