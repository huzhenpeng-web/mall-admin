<template>
  <div>
    <!-- 卡片 -->
    <el-card>
      <!-- 头部操作区域 -->
      <div slot="header" class="option">
        <!-- 搜索框 -->
        <el-input placeholder="请输入订单号" clearable></el-input>
        <!-- 选择框 -->
        <el-select></el-select>
        <el-button type="primary" size="medium" icon="el-icon-box">配货完成</el-button>
        <el-button type="success" size="medium" icon="el-icon-receiving">
          出库
        </el-button>
        <el-button type="danger" size="medium" icon="el-icon-delete">关闭订单</el-button>
      </div>
      <el-table stripe :header-cell-style="{'text-align':'center'}" :cell-style="{'text-align':'center'}">
        <el-table-column type="selection" @selection-change="handleSelectionChange"></el-table-column>
        <el-table-column label="订单号"></el-table-column>
        <el-table-column label="订单总价"></el-table-column>
        <el-table-column label="订单状态"></el-table-column>
        <el-table-column label="支付方式"></el-table-column>
        <el-table-column label="创建时间"></el-table-column>
        <el-table-column label="操作"></el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination background layout="prev, pager, next" :total="1000">
      </el-pagination>
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
.option {
  display: flex;
  align-items: center;
  .el-select,
  .el-input {
    margin-right: 10px;
  }
  .el-input {
    width: 300px;
  }
}

.el-pagination {
  margin-top: 30px;
  text-align: center;
}
</style>
