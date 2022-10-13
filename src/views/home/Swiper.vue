<template>
  <!-- 轮播图配置 -->
  <div>
    <el-card>
      <div slot="header">
        <!-- 操作按钮 -->
        <el-button icon="el-icon-plus" type="primary" @click="add">增加</el-button>
        <el-button icon="el-icon-delete" type="danger" @click="del">批量删除{{selectSwiper.length === 0 ? '' : '(' + selectSwiper.length +')'}}</el-button>
      </div>
      <el-table :data="swiperList" stripe @selection-change="handleSelectionChange" :header-cell-style="{'text-align':'center'}" :cell-style="{'text-align':'center'}">
        <el-table-column type="selection"></el-table-column>
        <el-table-column label="轮播图">
          <template slot-scope="scope">
            <el-image :preview-src-list="imgs" :src="baseURL + scope.row.carouselUrl" alt="this is a image" width="150px;" height="150px;" lazy></el-image>
          </template>
        </el-table-column>
        <el-table-column label="跳转链接" prop="redirectUrl"></el-table-column>
        <el-table-column label="排序值" prop="carouselRank"></el-table-column>
        <el-table-column label="添加时间" prop="createTime"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" class="el-icon-edit-outline set" @click="edit(scope.row.carouselId)">
              修改
            </el-button>
            <el-popconfirm @confirm="delOne(scope.row.carouselId)" title="确定要删除吗?">
              <el-button style="color:red;" type="text" class="el-icon-close delete" slot="reference">
                删除
              </el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination @current-change="handleCurrentChange" :page-count="pageNumber" :page-size="pageSize" background layout="prev, pager, next" :total="total">
      </el-pagination>

      <!-- 添加轮播图的对话框 -->
      <el-dialog title="添加轮播图" :visible.sync="addDialogVisible" width="35%">
        <el-form :rules="addFormRules" ref="addFormRef" :model="addForm" label-width="80px" class="addForm">
          <el-form-item label="图片" prop="carouselUrl">
            <el-upload :file-list="fileList" :on-remove="handlePictureCardRemove" :limit="1" :action="imgUrl" list-type="picture-card" :on-success="handlePictureCardSuccess">
              <i class="el-icon-plus"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="跳转链接" prop="redirectUrl">
            <el-input @input="onInput" clearable placeholder="跳转链接" v-model="addForm.redirectUrl"></el-input>
          </el-form-item>
          <el-form-item label="排序值" prop="carouselRank">
            <el-input @input="onInput" placeholder="排序值" clearable type="number" v-model="addForm.carouselRank"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="subSwiper">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import { uploadImgServer, baseURL } from '@/utils/index.js'
import { delImg } from '@/api/image'
import { swiperList, insertSwiper, deleteSwipers, selectOneSwiper, updateSwiper } from '@/api/home'
export default {
  data() {
    return {
      // 分页数据
      pageNumber: 1,
      pageSize: 5,
      total: 0,
      // 添加轮播图对话框
      addDialogVisible: false,
      addForm: {},
      addFormRules: {
        carouselUrl: [{ required: true, message: '图片不能为空', trigger: 'blur' }],
        redirectUrl: [{ required: true, message: '跳转链接不能为空', trigger: 'blur' }],
        carouselRank: [{ required: true, message: '排序不能为空', trigger: 'blur' }]
      },
      // 存放要选择删除的轮播图id
      selectSwiper: [],
      // 图片上传路径
      imgUrl: uploadImgServer,
      baseURL: baseURL,
      swiperList: [],
      // 图片预览的数组
      imgs: [],
      fileList: [],
      // add还是update 0-add 1-update
      flag: 0
    }
  },
  methods: {
    onInput() {
      this.$forceUpdate()
    },
    // 处理多选框
    handleSelectionChange(val) {
      this.selectSwiper = []
      val.forEach(item => {
        this.selectSwiper.push(item.carouselId)
      })
    },
    // 获取轮播图数据
    async getSwiper(pageNum, pageSize) {
      const res = await swiperList(pageNum, pageSize)
      if (res.resultCode === 200) {
        this.swiperList = res.data.list
        this.imgs = []
        this.swiperList.forEach(item => {
          const url = baseURL + item.carouselUrl
          this.imgs.push(url)
        })
        this.total = res.data.totalCount
      }
      console.log(res)
    },
    add() {
      // 打开添加轮播图对话框
      this.addDialogVisible = true
      this.addForm = {}
      this.flag = 0
    },
    // 删除商品
    del() {
      if (this.selectSwiper.length === 0) return this.$message.warning('请选择要删除的轮播图')
      this.$confirm('此操作将永久删除选中的轮播图,是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const res = await deleteSwipers(this.selectSwiper)
          if (res.resultCode === 200) {
            // 重新请求数据
            this.getSwiper(this.pageNumber, this.pageSize)
            this.$message.success('删除成功')
          }
          console.log(res)
        })
        .catch(() => {
          this.$message.info('取消操作')
        })
    },
    // 移出图片的操作
    async handlePictureCardRemove(file) {
      try {
        const res = await delImg(file.response.message)
        if (res.resultCode === 200) {
          this.$message.success('移除图片成功')
        }
      } catch (e) {
        console.log('无此图片')
      }
    },
    // 图片上传成功的操作
    handlePictureCardSuccess(response) {
      this.addForm.carouselUrl = response.message
    },
    // 处理分页变化
    handleCurrentChange(index) {
      this.pageNumber = index
      // 重新请求数据
      this.getSwiper(this.pageNumber, this.pageSize)
    },
    // 提交轮播图数据
    subSwiper() {
      if (this.flag === 0) {
        this.$refs.addFormRef.validate(async valid => {
          if (!valid) return this.$message.warning('请先将表单填完整T^T')
          const res = await insertSwiper(this.addForm)
          if (res.resultCode === 200) {
            this.$message.success('新增轮播图成功!')
            this.addDialogVisible = false
            // 重新请求数据
            this.getSwiper(this.pageNumber, this.pageSize)
          }
        })
      } else {
        this.$refs.addFormRef.validate(async valid => {
          if (!valid) return this.$message.warning('请先将表单填完整T^T')
          const obj = {
            carouselId: this.addForm.carouselId,
            carouselUrl: this.addForm.carouselUrl,
            redirectUrl: this.addForm.redirectUrl,
            carouselRank: this.addForm.carouselRank
          }
          const res = await updateSwiper(obj)
          console.log(res)
          if (res.resultCode === 200) {
            this.$message.success('更新轮播图数据成功!')
            this.addDialogVisible = false
            // 重新请求数据
            this.getSwiper(this.pageNumber, this.pageSize)
          }
        })
      }
    },
    // 编辑轮播图
    async edit(id) {
      this.fileList = []
      const res = await selectOneSwiper(id)
      if (res.resultCode === 200) {
        this.addForm = res.data
        const url = baseURL + res.data.carouselUrl
        this.fileList.push({
          url: url
        })
        this.addDialogVisible = true
        this.flag = 1
      }
      console.log(res)
    },
    // 删除单个轮播图的数据
    async delOne(id) {
      const arr = []
      arr.push(id)
      const res = await deleteSwipers(arr)
      // 重新请求数据
      this.getSwiper(this.pageNumber, this.pageSize)
      console.log(res)
    }
  },
  created() {
    this.getSwiper(this.pageNumber, this.pageSize)
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
