<template>
  <div>
    <!-- 卡片 -->
    <el-card>
      <el-form label-width="100px" class="addForm">
        <el-form-item label="商品分类">
          <el-select></el-select>
        </el-form-item>
        <el-form-item label="商品名称">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="商品简介">
          <el-input type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="商品价格">
          <el-input type="number"></el-input>
        </el-form-item>
        <el-form-item label="商品售卖价">
          <el-input type="number"></el-input>
        </el-form-item>
        <el-form-item label="商品库存">
          <el-input type="number"></el-input>
        </el-form-item>
        <el-form-item label="商品标签">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="上架状态">
          <el-radio-group v-model="radio">
            <el-radio :label="3">上架</el-radio>
            <el-radio :label="6">下架</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="商品主图">
          <el-upload class="upload-demo" drag action="https://jsonplaceholder.typicode.com/posts/" multiple>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="详情内容">
          <quill-editor>
          </quill-editor>
        </el-form-item>
      </el-form>
      <el-button type="primary">立即创建</el-button>
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
export default {
  components: {
    quillEditor
  },
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
