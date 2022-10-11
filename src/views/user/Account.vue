<template>
  <div>
    <el-card>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="修改昵称" name="first">
          <el-form ref="nameFormRef" :rules="nameFormRules" :model="nameForm" label-width="80px">
            <el-form-item label="登录名:" prop="loginName">
              <el-input v-model="nameForm.loginName" clearable></el-input>
            </el-form-item>
            <el-form-item label="昵称:" prop="nickName">
              <el-input v-model="nameForm.nickName" clearable></el-input>
            </el-form-item>
          </el-form>
          <div class="btns">
            <!-- 提交按钮 -->
            <el-button type="primary" size="medium">确认修改</el-button>
            <el-button type="warning" size="medium" @click="resetNameForm">重置</el-button>
          </div>
        </el-tab-pane>
        <el-tab-pane label="修改密码" name="second">
          <el-form label-width="80px" ref="pwdFormRef" :rules="pwdFormRules" :model="pwdForm">
            <el-form-item label="原密码:" prop="oldPwd">
              <el-input show-password v-model="pwdForm.oldPwd"></el-input>
            </el-form-item>
            <el-form-item label="新密码:" prop="newPwd">
              <el-input show-password v-model="pwdForm.newPwd"></el-input>
            </el-form-item>
          </el-form>
          <div class="btns">
            <!-- 提交按钮 -->
            <el-button type="primary" size="medium">确认修改</el-button>
            <el-button type="warning" size="medium" @click="resetPwdForm">重置</el-button>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    const checkPwd = (rule, value, callback) => {
      if (value !== this.pwdForm.oldPwd) {
        return callback(new Error('两次输入密码不一致'))
      }
    }
    return {
      // 名称表单
      nameForm: {
        loginName: '',
        nickName: ''
      },
      // 密码表单
      pwdForm: {
        oldPwd: '',
        newPwd: ''
      },
      activeName: 'first',
      // 名称表单校验规则
      nameFormRules: {
        loginName: [{ required: true, message: '请输入登录名', trigger: 'blur' }],
        nickName: [{ required: true, message: '请输入昵称', trigger: 'blur' }]
      },
      // 密码表单校验规则
      pwdFormRules: {
        oldPwd: [{ required: true, message: '请输入原密码', trigger: 'blur' }],
        newPwd: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { validator: checkPwd, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    },
    // 重置名称表单
    resetNameForm() {
      this.$refs.nameFormRef.resetFields()
    },
    // 重置密码表单
    resetPwdForm() {
      this.$refs.pwdFormRef.resetFields()
    }
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
}
</style>
