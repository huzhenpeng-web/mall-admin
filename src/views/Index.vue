<template>
  <!-- 数据分析 -->
  <div>
    <el-card>
      <!-- 三个标题 -->
      <div class="title">
        <el-card class="card" shadow="hover">
          <div slot="header">
            <span>订单总数</span>
          </div>
          <p class="num">999</p>
        </el-card>
        <el-card class="card" shadow="hover">
          <div slot="header">
            <span>商品总数</span>
          </div>
          <p class="num">999</p>
        </el-card>
        <el-card class="card" shadow="hover">
          <div slot="header">
            <span>转化率(订单总数/商品总数)</span>
          </div>
          <p class="num">999</p>
        </el-card>
      </div>
      <!-- echarts图表部分 -->
      <div class="line" ref="line"></div>
    </el-card>
  </div>
</template>

<script>
// 引入echarts
import * as echarts from 'echarts'
import options from '@/assets/js/echarts.js'
export default {
  data() {
    return {
      lineOption: null
    }
  },
  methods: {
    init() {
      // 初始化echarts
      const line = echarts.init(this.$refs.line)
      line.setOption(this.lineOption)
    }
  },
  created() {
    this.lineOption = options
  },
  mounted() {
    this.init()
  }
}
</script>

<style lang="less" scoped>
@border:1px solid red;
.title {
  width: 100%;
  display: flex;
  justify-content: space-around;
  font-size: 18px;
  .card {
    width: 400px;
    height: 100px;
    text-align: center;
    padding-bottom: 0;
    .num {
      font-size: 14px;
    }
  }
}

.line {
  width: 100%;
  height: 500px;
  margin-top: 15px;
}
</style>
