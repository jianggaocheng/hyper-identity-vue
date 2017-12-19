<template>
    <div class='middle-box text-center loginscreen'>
        <div>
            <div class='login-pic'><img src='../assets/login-lock.png'></div>
            <h2 class='title'>
              Welcome to HyperIdentity
            </h2>
            <p>统一身份鉴权平台</p>
            <el-form :model='loginForm' :rules='checkForm' ref='loginForm'>
                <el-form-item prop='email'>
                    <el-input type='text' v-model='loginForm.email' auto-complete='off' placeholder='请输入邮箱'></el-input>
                </el-form-item>
                <el-form-item prop='password'>
                    <el-input type='password' v-model='loginForm.password' auto-complete='off' placeholder='请输入密码'></el-input>
                </el-form-item>
                <el-form-item style='width:100%;'>
                    <el-button type='primary' style='width:100%;' @click.native.prevent='handleLogin' :loading='logining'>登录管理平台</el-button>
                </el-form-item>
                <router-link to='/forget'>
                    <small>忘记密码?</small>
                </router-link>
            </el-form>
        </div>
    </div>
</template>

<script>
import { requestLogin } from "~/api/userApi";
import Cookies from "js-cookie";

export default {
  metaInfo: {
    title: "登录"
  },
  data() {
    return {
      logining: false,
      loginForm: {
        email: "test@test.com",
        password: "test"
      },
      checkForm: {
        email: [{ required: true, message: "邮箱不能为空", trigger: "blur" }],
        password: [{ required: true, message: "密码不能为空", trigger: "blur" }]
      }
    };
  },
  methods: {
    handleLogin(ev) {
      let _this = this;
      _this.$refs.loginForm.validate(valid => {
        if (valid) {
          _this.logining = true;
          let loginParams = {
            email: _this.loginForm.email,
            password: _this.loginForm.password
          };
          requestLogin(loginParams)
            .then(data => {
              _this.logining = false;
              let { errCode, errMsg, user, token, code, menus } = data;
              if (errCode) {
                _this.$message({
                  message: errMsg,
                  type: "error"
                });
              } else if (code === 200) {
                Cookies.set("email", _this.loginForm.email);
                Cookies.set("password", _this.loginForm.password);

                _this.$store.commit("SET_USER", user);
                _this.$store.commit("SET_TOKEN", token);
                _this.$store.commit("SET_MENUS", menus);

                _this.$message({
                  message: `欢迎回来，${user.name}`,
                  type: "success"
                });

                _this.$router.push({ path: "/admin/dashboard" });
              }
            })
            .catch(err => {
              _this.logining = false;
              _this.$message({
                message: "未知错误",
                type: "error"
              });
              console.error(err);
            });
          this.logining = false;
        } else {
          console.log("Login form invalid");
        }
      });
    },
    goToRegister(ev) {
      var _this = this;
      _this.$router.push("/register");
    }
  },
};
</script>

<style lang='scss' scoped>
.text-center {
  text-align: center;
}

.middle-box {
  max-width: 400px;
  z-index: 100;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.loginscreen.middle-box {
  .login-pic > img {
    width: 200px;
  }

  .el-form {
    width: 300px;
    margin: auto;
    margin-top: 20px;
  }
}

a {
  color: #337ab7;
  text-decoration: none;
}
</style>