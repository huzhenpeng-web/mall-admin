<template>
  <div>
    <!-- 卡片 -->
    <el-card>
      <!-- 搜索框 -->
      <el-input></el-input>
      <!-- 选择框 -->
      <el-select></el-select>
      <el-button type="primary">配货完成</el-button>
      <el-button type="success">出库</el-button>
      <el-button type="danger">关闭订单</el-button>
      <el-form label-width="100px" class="addForm">
        <el-form-item label="订单号">
          <el-select></el-select>
        </el-form-item>
        <el-form-item label="订单总价">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="订单状态">
          <el-input type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="支付方式">
          <el-input type="number"></el-input>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-input type="number"></el-input>
        </el-form-item>
        <el-form-item label="操作">
          <el-input type="number"></el-input>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      radio: 3
    }
  }
}
</script>

<style lang="less" scoped>
.addForm {
  .el-input,
  .el-textarea {
    width: 224px;
  }
}

.el-button {
  margin-left: 100px;
}
</style>
