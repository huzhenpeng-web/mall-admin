<template>
  <div>
    <!-- 卡片 -->
    <el-card>
      <!-- 头部操作区域 -->
      <div slot="header" class="option">
        <!-- 搜索框 -->
        <el-input v-model="orderNo" placeholder="请输入订单号" @clear="getOrderList" clearable></el-input>
        <!-- 选择框 -->
        <el-select @change="handleChangeSelect" v-model="selectValue" placeholder="默认查询全部">
          <el-option v-for="(item,index) in options" :key="index" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-button type="primary" size="medium" icon="el-icon-box" @click="changeStatus(2)">配货完成</el-button>
        <el-button type="success" size="medium" icon="el-icon-receiving" @click="changeStatus(3)">
          出库
        </el-button>
        <el-button type="danger" size="medium" icon="el-icon-delete" @click="changeStatus(-3)">关闭订单</el-button>
      </div>
      <el-table :data="orderList" stripe @selection-change="handleSelectionChange" :header-cell-style="{'text-align':'center'}" :cell-style="{'text-align':'center'}">
        <el-table-column type="selection"></el-table-column>
        <el-table-column label="订单号" prop="orderNo"></el-table-column>
        <el-table-column label="订单总价" prop="totalPrice"></el-table-column>
        <el-table-column label="订单状态" prop="orderStatus"></el-table-column>
        <el-table-column label="支付方式">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.payType === 0" type="danger">无</el-tag>
            <el-tag v-if="scope.row.payType === 1" type="primary">支付宝</el-tag>
            <el-tag v-if="scope.row.payType === 2" type="success">微信</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" prop="createTime"></el-table-column>
        <el-table-column label="操作" width="300">
          <template slot-scope="scope">
            <el-button size="mini" type="success" v-if="scope.row.orderStatus === '已支付'" @click="finshSigleOrder(scope.row)">配货完成</el-button>
            <el-popconfirm title="确定关闭订单吗?" style="margin:0px 5px;" @confirm="closeSingleOrder(scope.row)">
              <el-button slot="reference" size="mini" type="danger" v-if="scope.row.orderStatus === '已支付'">关闭订单</el-button>
            </el-popconfirm>
            <el-button size="mini" type="primary" @click="orderDetail(scope.row.orderId)">订单详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNum" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { orderList, updateOrderStatus } from '@/api/order'
import { orderMap } from '@/utils/proxy'
import { Notification } from 'element-ui'
export default {
  data () {
    return {
      // 分页数据
      total: 0,
      pageNum: 1,
      pageSize: 10,
      orderNo: '',
      orderList: [],
      // 定时器
      timer: null,
      // 选中的订单
      selectionOrder: [],
      selectValue: '',
      options: [
        {
          value: '',
          label: '全部'
        },
        {
          value: 0,
          label: orderMap(0)
        },
        {
          value: 1,
          label: orderMap(1)
        },
        {
          value: 2,
          label: orderMap(2)
        },
        {
          value: 3,
          label: orderMap(3)
        },
        {
          value: 4,
          label: orderMap(4)
        },
        {
          value: -1,
          label: orderMap('-1')
        },
        {
          value: -2,
          label: orderMap('-2')
        },
        {
          value: -3,
          label: orderMap('-3')
        }
      ]
    }
  },
  methods: {
    // 处理分页size产生变化
    handleSizeChange (index) {
      this.pageSize = index
      this.getOrderList()
    },
    // 处理当前页发生变化
    handleCurrentChange (index) {
      this.pageNum = index
      this.getOrderList()
    },
    // 获取订单数据
    async getOrderList () {
      const res = await orderList(this.pageNum, this.pageSize, this.orderNo, this.selectValue)
      if (res.resultCode === 200) {
        res.data.list.forEach(item => {
          item.orderStatus = orderMap(item.orderStatus)
        })
        this.orderList = res.data.list
        this.total = res.data.totalCount
        this.pageNum = res.data.currPage
      }
      console.log(res)
    },
    handleSelectionChange (e) {
      this.selectionOrder = e.map(item => {
        return {
          orderId: item.orderId
        }
      })
      console.log(this.selectionOrder)
    },
    // 查询订单详情
    orderDetail (orderId) {
      this.$router.push('order_detail?id=' + orderId)
    },
    // 关闭单个订单
    async closeSingleOrder (order) {
      const obj = {
        orderId: order.orderId,
        status: -3
      }
      const arr = []
      arr.push(obj)
      const res = await updateOrderStatus(arr)
      if (res.resultCode === 200) {
        this.getOrderList()
        Notification.success(`${order.orderNo}订单状态成功更新为商家关闭`)
      }
    },
    // 更改多个订单的状态
    async changeStatus (index) {
      if (this.selectionOrder.length === 0) return this.$message.warning('请先中订单再进行操作')
      this.selectionOrder.forEach(item => {
        item.status = index
      })
      const res = await updateOrderStatus(this.selectionOrder)
      if (res.resultCode === 200) {
        this.getOrderList()
        Notification.success(`多个订单状态成功更新为${orderMap(index)}`)
      }
    },
    // 单个订单配货完成
    async finshSigleOrder (order) {
      const obj = {
        orderId: order.orderId,
        status: 2
      }
      const arr = []
      arr.push(obj)
      const res = await updateOrderStatus(arr)
      if (res.resultCode === 200) {
        this.getOrderList()
        Notification.success(`${order.orderNo}订单状态成功更新为配货完成`)
      }
    },
    handleChangeSelect () {
      this.getOrderList()
    }
  },
  created () {
    this.getOrderList()
  },
  watch: {
    orderNo (newVal) {
      if (newVal !== '') {
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.getOrderList()
        }, 500)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.option {
  display: flex;
  align-items: center;
  .el-select,
  .el-input {
    margin-right: 10px;
  }
  .el-input {
    width: 300px;
  }
}

.el-pagination {
  margin-top: 30px;
  text-align: center;
}
</style>
