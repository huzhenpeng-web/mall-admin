<template>
  <!-- 轮播图配置 -->
  <div>
    <el-card>
      <div slot="header">
        <!-- 操作按钮 -->
        <el-button icon="el-icon-plus" type="primary" @click="add">增加</el-button>
        <el-button icon="el-icon-delete" type="danger">批量删除</el-button>
      </div>
      <el-table stripe :header-cell-style="{'text-align':'center'}" :cell-style="{'text-align':'center'}">
        <el-table-column type="selection" @selection-change="handleSelectionChange"></el-table-column>
        <el-table-column label="轮播图"></el-table-column>
        <el-table-column label="跳转链接"></el-table-column>
        <el-table-column label="排序值"></el-table-column>
        <el-table-column label="添加时间"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <i class="el-icon-edit-outline set">
              修改
            </i>
            <i class="el-icon-close delete">
              删除
            </i>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination background layout="prev, pager, next" :total="1000">
      </el-pagination>

      <el-dialog title="添加轮播图" :visible.sync="addDialogVisible" width="35%">
        <el-form :rules="addFormRules" :model="addForm" label-width="80px" class="addForm">
          <el-form-item label="图片" prop="img">
            <el-upload drag action="https://jsonplaceholder.typicode.com/posts/" multiple>
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-form-item>
          <el-form-item label="跳转链接" prop="link">
            <el-input clearable placeholder="跳转链接"></el-input>
          </el-form-item>
          <el-form-item label="排序值" prop="sort">
            <el-input placeholder="排序值" clearable type="number" v-model="addForm.sort"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addDialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
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
