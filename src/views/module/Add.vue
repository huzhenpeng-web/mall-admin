<template>
  <div>
    <!-- 卡片 -->
    <el-card>
      <div slot="header">
        <span style="cursor:pointer;" @click="$router.go(-1)" class="el-icon-back">返回</span>
      </div>
      <!-- 表单数据 -->
      <el-form :rules="addFormRules" ref="addFormRef" :model="addForm" label-width="100px" class="addForm">
        <el-form-item label="商品分类" prop="goodsCategoryId">
          <el-cascader @change="handleChange" v-model="addForm.goodsCategoryId" :props="goodsProps" :options="categoryOptions">
          </el-cascader>
        </el-form-item>
        <el-form-item label="商品名称" prop="goodsName">
          <el-input v-model="addForm.goodsName" clearable></el-input>
        </el-form-item>
        <el-form-item label="商品简介" prop="goodsIntro">
          <el-input type="textarea" v-model="addForm.goodsIntro"></el-input>
        </el-form-item>
        <el-form-item label="商品价格" prop="originalPrice">
          <el-input type="number" v-model="addForm.originalPrice"></el-input>
        </el-form-item>
        <el-form-item label="商品售卖价" prop="sellingPrice">
          <el-input type="number" v-model="addForm.sellingPrice"></el-input>
        </el-form-item>
        <el-form-item label="商品库存" prop="stockNum">
          <el-input type="number" v-model="addForm.stockNum"></el-input>
        </el-form-item>
        <el-form-item label="商品标签" prop="tag">
          <el-input v-model="addForm.tag"></el-input>
        </el-form-item>
        <el-form-item label="上架状态" prop="goodsSellStatus">
          <el-radio-group v-model="addForm.goodsSellStatus">
            <el-radio :label="0">上架</el-radio>
            <el-radio :label="1">下架</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="商品主图">
          <el-upload :file-list="fileList" :on-remove="handlePictureCardRemove" :limit="1" :action="imgUrl" list-type="picture-card" :on-success="handlePictureCardSuccess">
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <!-- 富文本 -->
        <el-form-item label="详情内容" prop="goodsDetailContent">
          <quill-editor v-model="addForm.goodsDetailContent">
          </quill-editor>
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="submit">立即提交</el-button>
    </el-card>
  </div>
</template>

<script>
// 调用富文本编辑器
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import '@/assets/css/editor.css'
import { uploadImgServer, baseURL } from '@/utils/index.js'
import { findGoodsById, addGood, updateGood } from '@/api/goods.js'
import { delImg } from '@/api/image'
import { categoryList } from '@/api/category.js'
export default {
  components: {
    quillEditor
  },
  data() {
    return {
      // 图片上传的数组
      fileList: [],
      radio: 3,
      addForm: {},
      // 添加商品表单校验规则
      addFormRules: {
        goodsCategoryId: [{ required: true, message: '请选择商品分类', trigger: 'blur' }],
        goodsName: [{ required: true, message: '请填入商品名称', trigger: 'blur' }],
        goodsIntro: [{ required: true, message: '请填入商品简介', trigger: 'blur' }],
        originalPrice: [{ required: true, message: '请填入商品价格', trigger: 'blur' }],
        sellingPrice: [{ required: true, message: '请填入商品卖价', trigger: 'blur' }],
        stockNum: [{ required: true, message: '请选择商品库存', trigger: 'blur' }],
        tag: [{ required: true, message: '请选择商品标签', trigger: 'blur' }],
        goodsSellStatus: [{ required: true, message: '请选择上架状态', trigger: 'blur' }],
        goodsDetailContent: [{ required: true, message: '请填入商品详情', trigger: 'blur' }]
      },
      // 分类列表数据
      categoryOptions: [],
      imgUrl: uploadImgServer,
      baseURL: '',
      goodsProps: {
        label: 'categoryName',
        value: 'categoryId',
        children: 'secondLevelCategoryVOS'
      }
    }
  },
  methods: {
    // 根据商品id查询商品详情
    async getGoodsById() {
      const res = await findGoodsById(this.$route.query.id)
      console.log(res)
      this.baseURL = baseURL + res.data.goodsCoverImg
      this.addForm = res.data
      // 清空数组
      this.fileList = []
      this.fileList.push({
        url: this.baseURL
      })
    },
    // 获取商品分类列表
    async getCategoryList() {
      const res = await categoryList()
      res.data.forEach(item => {
        // 第二个分类不为空
        if (item.secondLevelCategoryVOS.length !== 0) {
          item.secondLevelCategoryVOS.forEach(item2 => {
            if (item2.thirdLevelCategoryVOS.length === 0) {
              return delete item2.thirdLevelCategoryVOS
            }
            // 保存第二层children的值
            const arr = item2.thirdLevelCategoryVOS
            delete item2.thirdLevelCategoryVOS
            // 修改key值
            item2.secondLevelCategoryVOS = arr
          })
        } else {
          delete item.secondLevelCategoryVOS
        }
      })
      this.categoryOptions = res.data
      console.log(res)
    },
    // 上传图片成功的操作
    handlePictureCardSuccess(response) {
      this.addForm.goodsCoverImg = response.message
      this.addForm.goodsCarousel = response.message
    },
    // 删除图片
    async handlePictureCardRemove(file) {
      const res = await delImg(file.response.message)
      if (res.resultCode === 200) {
        this.$message.success('移除图片成功')
      }
    },
    handleChange(e) {
      this.addForm.goodsCategoryId = e[e.length - 1]
    },
    // 添加商品或编辑商品
    submit() {
      if (this.$route.query.id) {
        // 更新商品
        this.$refs.addFormRef.validate(async valid => {
          if (!valid) return this.$message.warning('请先完整地填完表单^-^!')
          const res = await updateGood(this.addForm)
          console.log(this.addForm)
          if (res.resultCode === 200) {
            // 重新请求数据
            this.getGoodsById()
            this.$message.success('修改商品成功')
          }
        })
      } else {
        // 添加商品
        this.$refs.addFormRef.validate(async valid => {
          if (!valid) return this.$message.warning('请先完整地填完表单^-^!')
          const res = await addGood(this.addForm)
          if (res.resultCode === 200) {
            this.$message.success('添加商品成功')
            this.$refs.addFormRef.resetFields()
            this.fileList = []
          }
        })
      }
    }
  },
  created() {
    if (this.$route.query.id) {
      this.getGoodsById()
      this.$store.commit('SET_ACTIVENAME', '修改商品')
    }
    this.getCategoryList()
  }
}
</script>

<style lang="less" scoped>
.addForm {
  .el-input,
  .el-textarea {
    width: 250px;
  }
}

.el-button {
  margin-left: 100px;
}
</style>
