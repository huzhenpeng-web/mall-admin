<template>
  <div>
    <el-card>
      <el-tabs v-model="activeName">
        <el-tab-pane label="修改昵称" name="first">
          <el-form ref="nameFormRef" :rules="nameFormRules" :model="nameForm" label-width="80px">
            <el-form-item label="登录名:" prop="loginName">
              <el-input v-model="nameForm.loginUserName" disabled></el-input>
            </el-form-item>
            <el-form-item label="昵称:" prop="nickName">
              <el-input v-model="nameForm.nickName" clearable></el-input>
            </el-form-item>
          </el-form>
          <div class="btns">
            <!-- 提交按钮 -->
            <el-button type="primary" size="medium" @click="subNickName">确认修改</el-button>
            <el-button type="warning" size="medium" @click="resetNameForm">重置</el-button>
          </div>
        </el-tab-pane>
        <el-tab-pane label="修改密码" name="second">
          <el-form label-width="80px" ref="pwdFormRef" :rules="pwdFormRules" :model="pwdForm">
            <el-form-item label="原密码:" prop="oldPassword">
              <el-input show-password v-model="pwdForm.oldPassword"></el-input>
            </el-form-item>
            <el-form-item label="新密码:" prop="newPassword">
              <el-input show-password v-model="pwdForm.newPassword"></el-input>
            </el-form-item>
          </el-form>
          <div class="btns">
            <!-- 提交按钮 -->
            <el-button type="primary" size="medium" @click="editPwd">确认修改</el-button>
            <el-button type="warning" size="medium" @click="resetPwdForm">重置</el-button>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { updateNickName, updatePwd } from '@/api/user'
export default {
  data () {
    const checkPwd = (rule, value, callback) => {
      if (value === this.pwdForm.oldPassword) {
        return callback(new Error('旧密码和新密码不能保持一致'))
      }
    }
    return {
      // 名称表单
      nameForm: {
        loginUserName: '',
        nickName: ''
      },
      // 密码表单
      pwdForm: {
        oldPassword: '',
        newPassword: ''
      },
      // 当前激活的是哪一个面板
      activeName: 'first',
      // 名称表单校验规则
      nameFormRules: {
        loginUserName: [{ required: true, message: '请输入登录名', trigger: 'blur' }],
        nickName: [{ required: true, message: '请输入昵称', trigger: 'blur' }]
      },
      // 密码表单校验规则
      pwdFormRules: {
        oldPassword: [{ required: true, message: '请输入原密码', trigger: 'blur' }],
        newPassword: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { validator: checkPwd, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    ...mapMutations({ update_Admin: 'UPDATE_ADMIN', clear_Admin: 'CLEAR_ADMIN' }),
    // 重置名称表单
    resetNameForm () {
      this.nameForm.nickName = ''
    },
    // 重置密码表单
    resetPwdForm () {
      this.$refs.pwdFormRef.resetFields()
    },
    // 修改昵称
    subNickName () {
      this.$refs.nameFormRef.validate(async valid => {
        if (!valid) return this.$message.warning('未填写昵称')
        const res = await updateNickName(this.nameForm.nickName)
        if (res.resultCode === 200) {
          this.update_Admin(res.data)
          this.$message.success('修改昵称成功')
        }
      })
    },
    // 修改密码
    editPwd () {
      this.$refs.pwdFormRef.validate(async valid => {
        if (!valid) return this.$message.warning('请将表单填写完整')
        const res = await updatePwd(this.pwdForm)
        console.log(res)
        if (res.resultCode === 200) {
          this.clear_Admin()
          this.$message.success('修改密码成功,请重新登录')
          this.$router.replace('/login')
        } else {
          this.$message.error(res.message)
        }
      })
    }
  },
  computed: {
    ...mapState(['user'])
  },
  created () {
    this.nameForm.loginUserName = this.user.loginUserName
    this.nameForm.nickName = this.user.nickName
  }
}
</script>

<style lang="less" scoped>
.el-input {
  width: 200px;
}

.btns {
  display: flex;
  width: 300px;
  margin-top: 15px;
  justify-content: flex-end;
  align-items: center;
  margin-top: 40px;
}
</style>
