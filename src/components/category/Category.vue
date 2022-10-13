<template>
  <div>
    <el-card>
      <div slot="header">
        <!-- 返回按钮插槽 -->
        <slot name="back" style="margin-right:10px;"></slot>
        <!-- 操作按钮 -->
        <el-button icon="el-icon-plus" type="primary" @click="add">增加</el-button>
        <el-button icon="el-icon-delete" type="danger" @click="delCategory">批量删除{{selectCategory.length === 0 ? '' : '(' + selectCategory.length +')'}}</el-button>
      </div>
      <el-table :data="categoryList" @selection-change="handleSelectionChange" stripe :header-cell-style="{'text-align':'center'}" :cell-style="{'text-align':'center'}">
        <template slot="empty">
          <el-empty description="没有分类数据">
            <el-button type="primary" @click="$router.go(-1)">返回</el-button>
          </el-empty>
        </template>
        <el-table-column type="selection"></el-table-column>
        <el-table-column label="分类名称" prop="categoryName"></el-table-column>
        <el-table-column label="排序值" prop="categoryRank"></el-table-column>
        <el-table-column label="添加时间" prop="createTime"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="edit(scope.row)" class="el-icon-edit" type="primary" size="mini">
              修改
            </el-button>
            <el-button @click="downLevel(scope.row)" v-if="level !== 3" type="success" class="el-icon-caret-bottom" size="mini">
              下级分类
            </el-button>
            <el-popconfirm @confirm="delOneCategory(scope.row.categoryId)" :title="'确定要删除'+scope.row.categoryName+'这个分类吗?'">
              <el-button style="margin-left:8px;" slot="reference" type="danger" class="el-icon-delete" size="mini">
                删除
              </el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination :current-page="pageNum" @current-change="handleCurrentChange" :page-size="pageSize" background layout="prev, pager, next" :total="total">
      </el-pagination>
      <el-dialog :title="dialogTitle" :visible.sync="addDialogVisible" width="35%">
        <el-form ref="addFormRef" :rules="addFormRules" :model="addForm" label-width="80px" class="addForm">
          <el-form-item label="分类名称" prop="categoryName">
            <el-input v-model="addForm.categoryName"></el-input>
          </el-form-item>
          <el-form-item label="排序值" prop="categoryRank">
            <el-input v-model="addForm.categoryRank" type="number"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitForm">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import { Notification } from 'element-ui'
import { categoryLevel, delCategory, addCategory, updateCategory } from '@/api/category'
export default {
  props: ['level'],
  data() {
    return {
      // 添加轮播图对话框
      addDialogVisible: false,
      addForm: {
        categoryName: '',
        categoryRank: ''
      },
      addFormRules: {
        categoryName: [{ required: true, message: '分类名称不能为空', trigger: 'blur' }],
        categoryRank: [{ required: true, message: '排序值不能为空', trigger: 'blur' }]
      },
      total: 0,
      pageNum: 1,
      pageSize: 6,
      // 分类数据
      categoryList: [],
      parentId: null,
      selectCategory: [],
      dialogTitle: '添加分类',
      categoryId: 0
    }
  },
  methods: {
    // 修改分类
    edit(data) {
      this.dialogTitle = '修改分类'
      this.addForm.categoryName = data.categoryName
      this.addForm.categoryRank = data.categoryRank
      this.categoryId = data.categoryId
      this.addDialogVisible = true
    },
    // 处理多选框
    handleSelectionChange(e) {
      this.selectCategory = []
      e.forEach(item => {
        this.selectCategory.push(item.categoryId)
      })
    },
    add() {
      this.addForm = {}
      // 打开添加轮播图对话框
      this.addDialogVisible = true
    },
    // 获取分类数据
    async getCategoryLevel() {
      const res = await categoryLevel(this.level, this.parentId, this.pageNum, this.pageSize)
      if (res.resultCode === 200) {
        this.total = res.data.totalCount
        this.pageNum = res.data.currPage
        this.pageSize = res.data.pageSize
        this.categoryList = res.data.list
      }
      console.log(res)
    },
    // 页码发生变化
    handleCurrentChange(index) {
      this.pageNum = index
      this.getCategoryLevel()
    },
    // 跳转到下级路由
    downLevel(data) {
      if (data.categoryLevel === 1) {
        // 一级路由跳转到二级
        this.$router.push('/category/level2?parentId=' + data.categoryId)
      } else if (data.categoryLevel === 2) {
        this.$router.push('/category/level3?parentId=' + data.categoryId)
      }
    },
    // 批量删除分类
    delCategory() {
      if (this.selectCategory.length === 0) return this.$message.warning('请先选择要删除的分类')
      this.$confirm('此操作将永久删出分类, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const res = await delCategory(this.selectCategory)
          if (res.resultCode === 200) {
            this.getCategoryLevel()
            return this.$message.success('删除分类成功')
          }
        })
        .catch(err => {
          this.$message.error(err)
        })
    },
    // 删除单个分类
    async delOneCategory(id) {
      const arr = []
      arr.push(id)
      const res = await delCategory(arr)
      if (res.resultCode === 200) {
        this.getCategoryLevel()
        return this.$message.success('删除分类成功')
      }
    },
    // 新增分类或修改分类
    submitForm() {
      if (this.dialogTitle === '修改分类') {
        this.$refs.addFormRef.validate(async valid => {
          if (!valid) return this.$message.warning('请将表单填写完整')
          const obj = {
            categoryLevel: this.level,
            categoryId: this.categoryId,
            categoryName: this.addForm.categoryName,
            categoryRank: this.addForm.categoryRank
          }
          try {
            const res = await updateCategory(obj)
            if (res.resultCode === 200) {
              Notification.success('更新分类成功')
              // 刷新数据
              this.getCategoryLevel()
              this.addDialogVisible = false
            } else {
              Notification.error('更新分类失败')
            }
          } catch (e) {
            Notification.error(e)
          }
        })
      } else {
        this.$refs.addFormRef.validate(async valid => {
          if (!valid) return this.$message.warning('请将表单填写完整')
          const obj = {
            categoryLevel: this.level,
            parentId: this.parentId,
            categoryName: this.addForm.categoryName,
            categoryRank: this.addForm.categoryRank
          }
          try {
            const res = await addCategory(obj)
            if (res.resultCode === 200) {
              Notification.success('新增分类成功')
              // 刷新数据
              this.getCategoryLevel()
              this.addDialogVisible = false
            }
          } catch (e) {
            Notification.error(e)
          }
        })
      }
    }
  },
  created() {
    if (JSON.stringify(this.$route.query) === '{}') {
      // 处于一级分类
      this.parentId = 0
    } else {
      // 二级分类和三级分类
      this.parentId = this.$route.query.parentId
    }
    this.getCategoryLevel()
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
