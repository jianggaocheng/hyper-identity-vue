<template>
    <div class="middle-box text-center loginscreen">
        <div>
            <div class="login-pic"><img src="../assets/login-lock.png"></div>
            <h2 class="title">Welcome to HyperIdentity</h2>
            <el-form :model="loginForm" :rules="checkForm" ref="loginForm">
                <p>统一身份鉴权平台</p>
                <el-form-item prop="email">
                    <el-input type="text" v-model="loginForm.email" auto-complete="off" placeholder="请输入邮箱"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item style="width:100%;">
                    <el-button type="primary" style="width:100%;" @click.native.prevent="handleLogin" :loading="logining">登录 HyperIdentity</el-button>
                </el-form-item>
                <router-link to="/forget">
                    <small>忘记密码?</small>
                </router-link>
                <p class="text-muted text-center">
                    <small>还没加入HyperIndentity?</small>
                </p>
                <el-button :plain="true" type="text" style="width:100%;" @click.native.prevent="goToRegister">注册 HyperIdentity</el-button>
            </el-form>
        </div>
    </div>
</template>

<script>
import { requestLogin } from '../api/userApi';
export default {
    data() {
        return {
            logining: false,
            loginForm: {},
            checkForm: {
                email: [
                    { required: true, message: '邮箱不能为空', trigger: 'blur' },
                ],
                password: [
                    { required: true, message: '密码不能为空', trigger: 'blur' },
                ]
            },
        }
    },
    methods: {
        handleLogin(ev) {
            let _this = this;
            _this.$refs.loginForm.validate((valid) => {
                if (valid) {
                    this.logining = true;
                    let loginParams = { email: this.loginForm.email, password: this.loginForm.password };
                    requestLogin(loginParams).then(data => {
                        this.logining = false;
                        let { errCode, errMsg, user, token, code } = data;
                        if (errCode) {
                            this.$message({
                                message: errMsg,
                                type: 'error'
                            });
                            return;
                        } else {
                            _this.$store.commit('SET_USER', user);
                            _this.$store.commit('SET_TOKEN', token);
                            this.$router.push({ path: '/admin/dashboard' });
                        }
                    }).catch(err => {
                        _this.logining = false;
                        _this.$message({
                            message: '未知错误',
                            type: 'error'
                        });
                        fundebug.notifyError(err);
                    });
                } else {
                    console.log('Login form invalid');
                }
            });
        },
        goToRegister(ev) {
            var _this = this;
            _this.$router.push('/register');
        }
    }
}
</script>

<style lang="scss" scoped>
/* ERROR & LOGIN & LOCKSCREEN*/

.text-center {
    text-align: center;
}

.middle-box {
    max-width: 400px;
    z-index: 100;
    margin: 0 auto;
    font-weight: 100;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}

.loginscreen.middle-box {
    width: 300px;
}

a {
    color: #337ab7;
    text-decoration: none;
}
</style>