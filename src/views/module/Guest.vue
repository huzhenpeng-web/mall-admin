<template>
  <!-- 轮播图配置 -->
  <div>
    <el-card>
      <div slot="header">
        <!-- 操作按钮 -->
        <el-button icon="el-icon-plus" type="primary" @click="add">解除禁用</el-button>
        <el-button icon="el-icon-delete" type="danger">禁用账户</el-button>
      </div>
      <el-table stripe :header-cell-style="{'text-align':'center'}" :cell-style="{'text-align':'center'}">
        <el-table-column type="selection" @selection-change="handleSelectionChange"></el-table-column>
        <el-table-column label="昵称"></el-table-column>
        <el-table-column label="登录名"></el-table-column>
        <el-table-column label="身份状态"></el-table-column>
        <el-table-column label="是否注销"></el-table-column>
        <el-table-column label="注册时间"></el-table-column>
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
      // 添加轮播图对话框
      addDialogVisible: false,
      addForm: {
        img: '',
        link: '',
        sort: ''
      },
      addFormRules: {
        img: [{ required: true, message: '图片不能为空', trigger: 'blur' }],
        link: [{ required: true, message: '跳转链接不能为空', trigger: 'blur' }],
        sort: [{ required: true, message: '排序不能为空', trigger: 'blur' }]
      }
    }
  },
  methods: {
    // 处理多选框
    handleSelectionChange(e) {
      console.log(e)
    },
    add() {
      // 打开添加轮播图对话框
      this.addDialogVisible = true
    }
  }
}
</script>

<style lang="less" scoped>
@top: 30px;
.el-pagination {
  text-align: center;
  margin-top: @top;
}
.addForm {
  display: flex;
  flex-direction: column;

  .el-form-item {
    width: 300px;
    .el-input {
      width: 200px;
    }
  }
}
</style>
