<template>
  <!-- 头部组件 -->
  <div>
    <div class="header">
      <!-- 点击的页面名称 -->
      <span>
        {{activeName}}
      </span>
      <!-- 用户 -->

      <el-dropdown @visible-change="handleVisbleChange">
        <span class="el-dropdown-link">
          <i class="el-icon-user"></i>
          用户<i class="el-icon-arrow-down el-icon--right" v-show="!iconShow"></i>
          <i class="el-icon-arrow-up el-icon--right" v-show="iconShow"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Header',
  data() {
    return {
      iconShow: false
    }
  },
  methods: {
    handleVisbleChange(e) {
      e === true ? (this.iconShow = true) : (this.iconShow = false)
    }
  },
  computed: {
    ...mapState(['activeName'])
  }
}
</script>

<style lang="less" scoped>
.header {
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  line-height: 60px;
  height: 60px;
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
}

.user {
  margin-right: 50px;
}

.el-dropdown-link {
  cursor: pointer;
}
</style>
