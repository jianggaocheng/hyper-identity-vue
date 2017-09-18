<template>
    <div class="middle-box text-center loginscreen">
        <div>
            <div class="login-pic"><img src="../assets/login-lock.png"></div>
            <h2 class="title">Welcome to HyperIdentity</h2>
            <el-form :model="regForm" :rules="checkForm" ref="regForm">
                <p>统一身份鉴权平台</p>
                <el-form-item prop="email">
                    <el-input type="text" v-model="regForm.email" auto-complete="off" placeholder="请输入邮箱"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" v-model="regForm.password" auto-complete="off" placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item prop="confirmPassword">
                    <el-input type="password" v-model="regForm.confirmPassword" auto-complete="off" placeholder="请确认密码"></el-input>
                </el-form-item>
                <el-form-item style="width:100%;">
                    <el-button type="primary" style="width:100%;" @click.native.prevent="handleRegister" :loading="logining">注册 HyperIdentity</el-button>
                </el-form-item>
                <router-link to="/forget">
                    <small>忘记密码?</small>
                </router-link>
                <p class="text-muted text-center">
                    <small>已经有HyperIndentity账号?</small>
                </p>
                <el-button :plain="true" type="text" style="width:100%;" @click.native.prevent="goToLogin">登录 HyperIdentity</el-button>
            </el-form>
        </div>
    </div>
</template>

<script>
import { requestRegister } from '../api/loginApi';
export default {
    data() {
        let checkConfirmPassword = (rule, value, callback) => {
            if (value !== this.regForm.password) {
                callback(new Error('两次输入密码不一致'));
            } else {
                callback();
            }
        };
        return {
            logining: false,
            regForm: {},
            checkForm: {
                email: [
                    { required: true, message: '邮箱不能为空', trigger: 'blur' },
                ],
                password: [
                    { required: true, message: '密码不能为空', trigger: 'blur' },
                    { min: 8, max: 20, message: '密码长度在 8 到 20 个字符', trigger: 'blur' }
                ],
                confirmPassword: [
                    { required: true, message: '确认密码不能为空', trigger: 'blur' },
                    { min: 8, max: 20, message: '密码长度在 8 到 20 个字符', trigger: 'blur' },
                    { validator: checkConfirmPassword, trigger: 'blur' },
                ]
            },
        }
    },
    methods: {
        handleRegister(ev) {
            let _this = this;
            _this.$refs.regForm.validate((valid) => {
                if (valid) {
                    this.logining = true;
                    let regParams = { email: this.regForm.email, password: this.regForm.password, confirmPassword: this.regForm.confirmPassword };
                    requestRegister(regParams).then(data => {
                        this.logining = false;
                        let { errCode, errMsg, account, code } = data;
                        if (errCode) {
                            this.$message({
                                message: errMsg,
                                type: 'error'
                            });
                            return;
                        } else {
                            alert('注册成功');
                        }
                        // if (code !== 200) {

                        // } else {
                        //     sessionStorage.setItem('user', JSON.stringify(user));
                        //     this.$router.push({ path: '/table' });
                        // }
                    }).catch(err => {
                        this.logining = false;
                        this.$message({
                            message: '未知错误',
                            type: 'error'
                        });
                    });
                } else {
                    alert('invalid');
                }
            });
        },
        goToLogin(ev) {
            var _this = this;
            _this.$router.push('/login');
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