  <template>
  <div class="login-container">
    <div class="login-part">
      <div class="login-info">
        <div class="login-name">后台管理系统</div>
        <div class="user-login-container">
          <div class="line"></div>
          <div class="user-ligin">用户登录</div>
          <div class="line"></div>
        </div>
        <div class="login-main-container">
          <div class="login-main">
            <div class="login-title">账号</div>
            <el-input class="login-content" clearable v-model="loginInfoParameter.username" placeholder="请输入账号" @keyup.enter.native="handleLogin"></el-input>
          </div>
          <div class="login-main">
            <div class="login-title">密码</div>
            <el-input class="login-content" clearable placeholder="请输入密码" v-model="loginInfoParameter.password" show-password @keyup.enter.native="handleLogin"></el-input>
          </div>
          <div class="password-container">
            <el-checkbox class="remember-password" v-model="isRememberPassword" @change="handleRememberPassword">记住密码</el-checkbox>
            <div class="forget-password">忘记密码？</div>
          </div>
          <div class="login-main btn-center">
            <el-button class="login-btn" type="primary" :disabled="(!loginInfoParameter.password) || (!loginInfoParameter.username)" @click="handleLogin">登录</el-button>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "homeLogin",
  created() {
    /**
     * 思路梳理：
     * 1、进入登录页面，首先判断是不是记住密码
     * 2、如果之前选择记住密码，那么要获取缓存信息，对账号信息进行赋值处理；
     * 3、如果之前没有记住密码，那么不需要获取缓存；
     * 注意：所有的缓存之值都是字符串（number、boolean）
     */
    this.isRememberPassword =
      localStorage.getItem("isRememberPassword") == "true" ? true : false;
      console.log('是否记住密码？', true);
    if (this.isRememberPassword) {
      this.loginInfoParameter = JSON.parse(
        localStorage.getItem("loginInfoParameter")
      );
    }
  },
  data() {
    return {
      isRememberPassword: false,
      loginInfoParameter: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    // 处理记住密码
    handleRememberPassword(flag) {
      console.log(flag);
      console.log(this.isRememberPassword);
      if (this.isRememberPassword) {
        localStorage.setItem(
          "loginInfoParameter",
          JSON.stringify(this.loginInfoParameter)
        );
      } else {
        localStorage.setItem("loginInfoParameter", "");
      }
      localStorage.setItem("isRememberPassword", this.isRememberPassword);
    },

    // 处理登录
    handleLogin() {
      if (!this.loginInfoParameter.username) {
        this.$message.warning("请输入账号");
      } else if (!this.loginInfoParameter.password) {
        this.$message.warning("请输入登录密码");
      } else {
        if (this.isRememberPassword) {
          localStorage.setItem(
            "loginInfoParameter",
            JSON.stringify(this.loginInfoParameter)
          );
        }
        console.log("handle login");
        this.$parent.CreateID = 1;
        console.log(this.$parent.CreateID)
        localStorage.setItem("CreateID", this.$parent.CreateID);
        this.$router.push({
          path:'/index'
        })
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../css/login";
</style>

<style lang="scss">
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
input[type="number"] {
  -moz-appearance: textfield;
}
</style>

