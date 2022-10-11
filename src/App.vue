<template>
  <div class="index-container">
    <el-container class="el" v-if="isLogin">
      <el-aside width="200px">
        <Aside></Aside>
      </el-aside>
      <el-container>
        <el-header>
          <Header></Header>
        </el-header>
        <!-- 修改滚动条 -->
        <el-scrollbar class="scrollbar-wrapper">
          <el-main>
            <router-view>
            </router-view>
          </el-main>
        </el-scrollbar>
      </el-container>
    </el-container>
    <Login v-else></Login>
  </div>
</template>

<script>
import Header from '@/components/layout/Header.vue'
import Aside from '@/components/layout/Aside.vue'
import Login from '@/views/login/Login.vue'
import { mapState } from 'vuex'
export default {
  components: {
    Header,
    Aside,
    Login
  },
  computed: {
    ...mapState(['activeIndex', 'isLogin'])
  },
  watch: {
    activeIndex: {
      handler (newVal) {
        if (newVal.includes('/login')) {
          this.isShow = false
        }
      },
      immediate: true
    }
  }
}
</script>

<style lang="less" scoped>
.index-container {
  width: 100%;
  height: 100%;
  .el {
    width: 100%;
    height: 100%;
    .el-aside {
      overflow: hidden;
    }
  }
  .el-header {
    padding: 0;
  }
}

.scrollbar-wrapper {
  height: 100%;
}

/deep/ .el-scrollbar__wrap {
  overflow-x: hidden !important;
}
</style>
