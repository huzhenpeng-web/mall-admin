<template>
  <!-- 热销、新品、推荐模块一致 抽离出来成为一个公共模块 -->
  <div>
    <el-card>
      <div slot="header">
        <!-- 操作按钮 -->
        <el-button icon="el-icon-plus" type="primary" @click="add">增加</el-button>
        <el-button icon="el-icon-delete" type="danger" @click="delGoods">批量删除{{selectGoods.length === 0 ? '' : '(' + selectGoods.length +')'}}</el-button>
      </div>
      <el-table :data="goodsList" stripe @selection-change="handleSelectionChange" :header-cell-style="{'text-align':'center'}" :cell-style="{'text-align':'center'}">
        <el-table-column type="selection"></el-table-column>
        <el-table-column label="商品名称" prop="configName"></el-table-column>
        <el-table-column label="跳转链接" prop="redirectUrl"></el-table-column>
        <el-table-column label="排序值" prop="configRank"></el-table-column>
        <el-table-column label="商品编号" prop="goodsId"></el-table-column>
        <el-table-column label="添加时间" prop="createTime"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button style="margin-right:10px;" type="text" @click="editGoods(scope.row.configId)">
              修改
            </el-button>
            <el-popconfirm :title="'您确定要删除' + scope.row.configName + '吗?'" @confirm="handleConfirm(scope.row.configId)">
              <el-button slot="reference" type="text" style="color:red;" class="el-icon-close">
                删除
              </el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination @current-change="handleCurrentChange" :page-count="pageNum" :page-size="pageSize" background layout="prev, pager, next" :total="total">
      </el-pagination>

      <el-dialog title="添加商品" :visible.sync="addDialogVisible" width="35%">
        <el-form ref="addFormRef" :rules="addFormRules" :model="addForm" label-width="80px" class="addForm">
          <el-form-item label="商品名称" prop="configName">
            <el-input @input="onInput" clearable placeholder="请输入商品名称" v-model="addForm.configName"></el-input>
          </el-form-item>
          <el-form-item label="跳转链接" prop="redirectUrl">
            <el-input @input="onInput" clearable placeholder="请输入跳转链接" v-model="addForm.redirectUrl"></el-input>
          </el-form-item>
          <el-form-item label="商品编号" prop="goodsId">
            <el-input @input="onInput" placeholder="请输入商品编号" clearable type="number" v-model="addForm.goodsId"></el-input>
          </el-form-item>
          <el-form-item label="排序值" prop="configRank">
            <el-input @input="onInput" placeholder="请输入排序值" clearable type="number" v-model="addForm.configRank"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="subGoodsForm">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import { goods, addGoods, findOneGoods, updateGoods, deleteGoods } from '@/api/home'
export default {
  data() {
    return {
      pageNum: 1,
      pageSize: 5,
      total: 0,
      // 添加轮播图对话框
      addDialogVisible: false,
      addForm: {},
      addFormRules: {
        configName: [{ required: true, message: '请输入商品名称', trigger: 'blur' }],
        redirectUrl: [{ required: true, message: '请输入跳转链接', trigger: 'blur' }],
        goodsId: [{ required: true, message: '请输入商品编号', trigger: 'blur' }],
        configRank: [{ required: true, message: '请输入排序值', trigger: 'blur' }]
      },
      goodsList: [],
      selectGoods: [],
      // 请求的是哪一个模块的数据
      status: 3,
      configId: null
    }
  },
  methods: {
    onInput() {
      this.$forceUpdate()
    },
    // 处理多选框
    handleSelectionChange(val) {
      this.selectGoods = []
      val.forEach(item => {
        this.selectGoods.push(item.configId)
      })
    },
    add() {
      this.addForm = {}
      // 打开添加轮播图对话框
      this.addDialogVisible = true
    },
    async getGoods() {
      const res = await goods(this.pageNum, this.pageSize, this.status)
      this.total = res.data.totalCount
      this.goodsList = res.data.list
      console.log(res)
    },
    // 当前页发生变化
    handleCurrentChange(index) {
      this.pageNum = index
      // 重新请求数据
      this.getGoods()
    },
    // 批量删除商品
    delGoods() {
      if (this.selectGoods.length === 0) return this.$message.warning('请先选择商品再进行操作')
      this.$confirm('此操作将永久删除选中的商品,是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const res = await deleteGoods(this.selectGoods)
          if (res.resultCode === 200) {
            this.$message.success(res.message)
            this.getGoods()
          }
        })
        .catch(() => {
          this.$message.info('取消操作')
        })
    },
    // 进入页面初始化方法
    init() {
      if (this.$route.fullPath === '/hot') {
        this.status = 3
      } else if (this.$route.fullPath === '/new') {
        this.status = 4
      } else if (this.$route.fullPath === '/recommend') {
        this.status = 5
      }
    },
    // 更新或者新增商品
    subGoodsForm() {
      this.addForm.configType = this.status
      if (this.configId !== null) {
        this.addForm.configId = this.configId
        this.$refs.addFormRef.validate(async valid => {
          if (!valid) return this.$message.warning('请先将表单数据填写完整,再进行操作T^T')
          // 更新操作
          console.log(this.addForm)
          const res = await updateGoods(this.addForm)
          console.log(res)
          if (res.resultCode === 200) {
            this.getGoods()
            this.addDialogVisible = false
            this.$message.success('更新商品成功')
          }
        })
      } else {
        this.addForm.configId = null
        this.$refs.addFormRef.validate(async valid => {
          if (!valid) return this.$message.warning('请先将表单数据填写完整,再进行操作T^T')
          // 添加操作
          const res = await addGoods(this.addForm)
          if (res.resultCode === 200) {
            this.getGoods()
            this.addDialogVisible = false
            this.$message.success('新增商品成功')
          }
        })
      }
    },
    // 气泡确认框确定删除的操作
    async handleConfirm(id) {
      const arr = []
      arr.push(id)
      const res = await deleteGoods(arr)
      if (res.resultCode === 200) {
        this.$message.success(res.message)
        this.getGoods()
      }
    },
    // 修改商品
    async editGoods(id) {
      this.configId = id
      const res = await findOneGoods(id)
      const { configName, redirectUrl, goodsId, configRank } = res.data
      this.addForm.configName = configName
      this.addForm.redirectUrl = redirectUrl
      this.addForm.goodsId = goodsId
      this.addForm.configRank = configRank
      this.addDialogVisible = true
    }
  },
  created() {
    this.init()
    this.getGoods()
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
