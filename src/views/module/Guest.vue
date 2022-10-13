<template>
  <!-- 轮播图配置 -->
  <div>
    <el-card>
      <div slot="header">
        <!-- 操作按钮 -->
        <el-button icon="el-icon-plus" type="primary" @click="open">解除禁用</el-button>
        <el-button icon="el-icon-delete" type="danger" @click="disable">禁用账户</el-button>
      </div>
      <el-table @selection-change="handleSelectionChange" :data="guestList" stripe :header-cell-style="{'text-align':'center'}" :cell-style="{'text-align':'center'}">
        <el-table-column type="selection"></el-table-column>
        <el-table-column label="昵称" prop="nickName"></el-table-column>
        <el-table-column label="登录名" prop="loginName"></el-table-column>
        <el-table-column label="身份状态">
          <template slot-scope="scope">
            <el-switch @change="handleSwitchChange($event,scope.row.userId)" v-model="scope.row.lockedFlag" active-text="正常" inactive-text="禁用" active-color="#13ce66" inactive-color="#ff4949" :active-value="0" :inactive-value="1">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="是否注销">
          <template slot-scope="scope">
            <el-tag type="success" effect="dark" v-if="scope.row.isDeleted === 0">正常</el-tag>
            <el-tag type="danger" effect="dark" v-if="scope.row.isDeleted === 1">注销</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="注册时间" prop="createTime"></el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination @current-change="handleCurrentChange" :page-count="pageNum" :page-size="pageSize" background layout="prev, pager, next" :total="total">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { guestList, openGuest, disableGuest } from '@/api/guest.js'
export default {
  data() {
    return {
      total: 0,
      pageNum: 1,
      pageSize: 5,
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
      // 会员数据
      guestList: [],
      selectGuest: []
    }
  },
  methods: {
    // 处理多选框
    handleSelectionChange(e) {
      this.selectGuest = []
      e.forEach(item => {
        this.selectGuest.push(item.userId)
      })
    },
    // 禁用账户
    async disable() {
      if (this.selectGuest.length === 0) return this.$message.warning('请先选择要禁用的账户')
      const res = await disableGuest(this.selectGuest)
      if (res.resultCode === 200) {
        this.$message.success('禁用账户成功')
        // 刷新数据
        this.getGuestList()
      }
    },
    // 解禁账户
    async open() {
      if (this.selectGuest.length === 0) return this.$message.warning('请先选择要解禁的账户')
      const res = await openGuest(this.selectGuest)
      if (res.resultCode === 200) {
        this.$message.success('解禁账户成功')
        // 刷新数据
        this.getGuestList()
      }
    },
    // 获取所有会员
    async getGuestList() {
      const res = await guestList(this.pageNum, this.pageSize)
      if (res.resultCode === 200) {
        this.guestList = res.data.list
        this.total = res.data.totalCount
        this.pageNum = res.data.currPage
        this.pageSize = res.data.pageSize
        console.log(res)
      }
    },
    // 当前页发生变化
    handleCurrentChange(index) {
      this.pageNum = index
      // 重新请求数据
      this.getGuestList()
    },
    // switch滑块发生变化
    async handleSwitchChange(index, id) {
      // 1代表禁用 就调用禁用的方法
      if (index === 1) {
        const arr = []
        arr.push(id)
        const res = await disableGuest(arr)
        if (res.resultCode === 200) {
          this.$message.success('禁用账户成功')
          // 刷新数据
          this.getGuestList()
        }
      } else if (index === 0) {
        // 解禁
        const arr = []
        arr.push(id)
        const res = await openGuest(arr)
        if (res.resultCode === 200) {
          this.$message.success('解禁账户成功')
          // 刷新数据
          this.getGuestList()
        }
      }
    }
  },
  created() {
    this.getGuestList()
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
