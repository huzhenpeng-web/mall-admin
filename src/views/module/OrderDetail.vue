<template>
  <!-- 订单详情页 -->
  <div>
    <el-card>
      <!-- 三个标题 -->
      <div class="title">
        <el-card class="card" shadow="hover">
          <div slot="header">
            <span>订单状态</span>
          </div>
          <p class="num">{{order.orderStatus}}</p>
        </el-card>
        <el-card class="card" shadow="hover">
          <div slot="header">
            <span>创建时间</span>
          </div>
          <p class="num">{{order.createTime}}</p>
        </el-card>
        <el-card class="card" shadow="hover">
          <div slot="header">
            <span>订单号</span>
          </div>
          <p class="num">{{order.orderNo}}</p>
        </el-card>
      </div>
      <!-- 订单数据 -->
      <el-card class="order-data">
        <el-table :data="goodsList" :header-cell-style="{'text-align':'center'}" :cell-style="{'text-align':'center'}">
          <el-table-column label="商品图片">
            <template slot-scope="scope">
              <el-image :src="baseURL + scope.row.mallGoods.goodsCoverImg" alt="this is a image" width="150px;" height="150px;" lazy></el-image>
            </template>
          </el-table-column>
          <el-table-column label="商品编号" prop="goodsId"></el-table-column>
          <el-table-column label="商品名" prop="mallGoods.goodsName"></el-table-column>
          <el-table-column label="商品数量" prop="goodsCount"></el-table-column>
          <el-table-column label="价格" prop="mallGoods.sellingPrice"></el-table-column>
        </el-table>
      </el-card>
    </el-card>
  </div>
</template>

<script>
import { orderOne, orderGoods } from '@/api/order'
import { orderMap } from '@/utils/proxy'
import { baseURL } from '@/utils/index'
export default {
  data() {
    return {
      order: {},
      goodsList: [],
      baseURL: baseURL
    }
  },
  methods: {
    // 订单详情
    async orders() {
      const res = await orderOne(this.$route.query.id)
      if (res.resultCode === 200) {
        res.data.orderStatus = orderMap(res.data.orderStatus)
        this.order = res.data
      }
    },
    // 订单id查询商品详情
    async orderGoodDetail() {
      const res = await orderGoods(this.$route.query.id)
      console.log(res)
      if (res.resultCode === 200) {
        this.goodsList = res.data.itemGoodsVos
      }
    }
  },
  created() {
    this.orders()
    this.orderGoodDetail()
  }
}
</script>

<style lang="less" scoped>
.title {
  width: 100%;
  display: flex;
  justify-content: space-around;
  font-size: 18px;
  .card {
    width: 400px;
    height: 100px;
    text-align: center;
    padding-bottom: 0;
    .num {
      font-size: 14px;
    }
  }
}

.order-data {
  margin-top: 30px;
}
</style>
