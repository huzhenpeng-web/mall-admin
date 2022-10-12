<template>
  <!-- 轮播图配置 -->
  <div>
    <el-card>
      <div slot="header" class="header">
        <!-- 操作按钮 -->
        <el-button icon="el-icon-plus" type="primary" @click="$router.push('/add')">新增商品</el-button>
        <el-button icon="el-icon-delete" type="info" @click="delGoods">批量操作{{this.selectGood.length === 0 ? '' : '('+  this.selectGood.length + ')'}}</el-button>
        <el-button icon="el-icon-check" type="success" @click="selectGoods(0)">查看上架的商品</el-button>
        <el-button icon="el-icon-minus" type="danger" @click="selectGoods(1)">查看下架的商品</el-button>
        <el-input @input="search" v-model="goodsName" clearable placeholder="请输入想查询的商品"></el-input>
      </div>
      <el-table :data="goodsList" stripe @selection-change="handleSelectionChange" :header-cell-style="{'text-align':'center'}" :cell-style="{'text-align':'center'}">
        <el-table-column type="selection"></el-table-column>
        <el-table-column label="商品编号" prop="goodsId"></el-table-column>
        <el-table-column label="商品名" prop="goodsName"></el-table-column>
        <el-table-column label="商品简介" prop="goodsIntro"></el-table-column>
        <el-table-column label="商品图片">
          <template slot-scope="scope">
            <el-image :preview-src-list="imgs" :src="baseURL + scope.row.goodsCoverImg" alt="this is a image" width="150px;" height="150px;" lazy></el-image>
          </template>
        </el-table-column>
        <el-table-column label="商品库存" prop="stockNum"></el-table-column>
        <el-table-column label="商品售价" prop="sellingPrice"></el-table-column>
        <el-table-column label="上架状态">
          <template slot-scope="scope">
            <el-tag :type="scope.row.goodsSellStatus === 0 ? '' :'danger'">{{scope.row.goodsSellStatus === 0 ? '销售中' :'已下架'}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" class="el-icon-edit-outline set" @click="edit(scope.row.goodsId)">
              修改
            </el-button>
            <el-button @click="delSingleGoods(scope.row.goodsId)" :style="{'color':(scope.row.goodsSellStatus === 0) ? 'red' : 'green'}" type="text">
              {{scope.row.goodsSellStatus === 0 ? '下架' : '上架'}}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { baseURL } from '@/utils/index.js'
import { goodsList, deleteGoodsList } from '@/api/goods.js'
export default {
  data () {
    return {
      // 当前页
      currentPage: 1,
      // 总数
      total: 0,
      // 当前页的条数
      pagesize: 10,
      // 搜索的商品名
      goodsName: '',
      goodsList: [],
      goodsSellStatus: null,
      baseURL: '',
      // 防抖计时器
      timer: null,
      imgs: [],
      selectGood: []
    }
  },
  methods: {
    // 处理多选框
    handleSelectionChange (val) {
      this.selectGood = []
      val.forEach(item => {
        this.selectGood.push(item.goodsId)
      })
    },
    // 获取商品数据
    async getGoods () {
      const res = await goodsList(this.currentPage, this.pagesize, this.goodsName, this.goodsSellStatus)
      this.goodsList = res.data.list
      this.total = res.data.totalCount
      this.currentPage = res.data.currPage
      res.data.list.forEach(item => {
        // 提取图片数组
        this.imgs.push(this.baseURL + item.goodsCoverImg)
      })
    },
    // 页的条数变化
    handleSizeChange (e) {
      this.pagesize = e
      this.getGoods()
    },
    // 当前页发生变化
    handleCurrentChange (e) {
      this.currentPage = e
      this.getGoods()
    },
    // 查询上架或下架的商品
    selectGoods (index) {
      this.goodsSellStatus = index
      this.getGoods()
    },
    // 根据id编辑商品
    edit (id) {
      this.$router.push(`/add?id=${id}`)
    },
    // 搜索框input事件
    search (e) {
      clearTimeout(this.timer)
      // 做一下防抖处理
      this.timer = setTimeout(() => {
        this.goodsName = e
        this.getGoods()
      }, 500)
    },
    // 删除下架商品
    async delGoods () {
      if (this.selectGood.length === 0) {
        return this.$message.warning('请先选择要操作的商品')
      }
      const res = await deleteGoodsList(this.selectGood)
      console.log(res)
      if (res.resultCode === 200) {
        this.$message.success('下架成功')
        // 刷新数据
        this.getGoods()
        this.selectGood = []
      } else {
        this.$message.error(res.message)
      }
    },
    // 根据id上架/下架商品
    async delSingleGoods (id) {
      const arr = []
      arr.push(id)
      const res = await deleteGoodsList(arr)
      if (res.resultCode === 200) {
        this.$message.success(res.message)
        this.getGoods()
      } else {
        this.$message.error(res.message)
      }
    }
  },
  created () {
    this.getGoods()
    this.baseURL = baseURL
  }
}
</script>

<style lang="less" scoped>
@top: 30px;
.el-pagination {
  text-align: center;
  margin-top: @top;
}

.header {
  .el-input {
    width: 300px;
    float: right;
  }
}
</style>
