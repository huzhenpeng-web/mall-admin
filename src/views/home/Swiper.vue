<template>
  <!-- 轮播图配置 -->
  <div>
    <el-card>
      <div slot="header">
        <!-- 操作按钮 -->
        <el-button icon="el-icon-plus" type="primary" @click="add">增加</el-button>
        <el-button icon="el-icon-delete" type="danger" @click="del">批量删除</el-button>
      </div>
      <el-table stripe :header-cell-style="{'text-align':'center'}" :cell-style="{'text-align':'center'}">
        <el-table-column type="selection" @selection-change="handleSelectionChange"></el-table-column>
        <el-table-column label="轮播图">
          <template slot-scope="scope">
            <!-- <el-image :preview-src-list="imgs" :src="baseURL + scope.row.goodsCoverImg" alt="this is a image" width="150px;" height="150px;" lazy></el-image> -->
          </template>
        </el-table-column>
        <el-table-column label="跳转链接"></el-table-column>
        <el-table-column label="排序值"></el-table-column>
        <el-table-column label="添加时间"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <i class="el-icon-edit-outline set">
              修改
            </i>
            <el-popover placement="top" width="160" v-model="popVisible">
              <p>这是一段内容这是一段内容确定删除吗？</p>
              <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" @click="popVisible = false">取消</el-button>
                <el-button type="primary" size="mini" @click="popVisible = false">确定</el-button>
              </div>
              <i class="el-icon-close delete" slot="reference">
                删除
              </i>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination background layout="prev, pager, next" :total="1000">
      </el-pagination>

      <!-- 添加轮播图的对话框 -->
      <el-dialog title="添加轮播图" :visible.sync="addDialogVisible" width="35%">
        <el-form :rules="addFormRules" :model="addForm" label-width="80px" class="addForm">
          <el-form-item label="图片" prop="img">
            <el-upload :on-remove="handlePictureCardRemove" :limit="1" :action="imgUrl" list-type="picture-card" :on-success="handlePictureCardSuccess">
              <i class="el-icon-plus"></i>
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
import { uploadImgServer, baseURL } from '@/utils/index.js'
import { delImg } from '@/api/image'
export default {
  data () {
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
      },
      // 控制弹出框的显示与隐藏
      popVisible: false,
      // 存放要选择删除的轮播图id
      selectSwiper: [],
      // 图片上传路径
      imgUrl: uploadImgServer,
      baseURL: baseURL
    }
  },
  methods: {
    // 处理多选框
    handleSelectionChange (e) {
      console.log(e)
    },
    add () {
      // 打开添加轮播图对话框
      this.addDialogVisible = true
    },
    // 删除商品
    del () {
      this.$confirm('此操作将永久删除选中的轮播图,是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$message.success('删除成功')
        })
        .catch(() => {
          this.$message.info('取消操作')
        })
    },
    // 移出图片的操作
    async handlePictureCardRemove (file) {
      const res = await delImg(file.response.message)
      if (res.resultCode === 200) {
        this.$message.success('移除图片成功')
      }
    },
    // 图片上传成功的操作
    handlePictureCardSuccess (response) {
      this.addForm.img = response.message
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
