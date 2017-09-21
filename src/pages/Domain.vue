<template>
    <el-row :gutter="20">
        <el-col :span="12">
            <el-row class="dashboard-line" :gutter="20">
                <el-col :span="6">
                    <h4 class="pull-right">用户ID</h4>
                </el-col>
                <el-col :span="18">
                    <h4>{{loginUser._id}}</h4>
                </el-col>
            </el-row>
            <el-row class="dashboard-line" :gutter="20">
                <el-col :span="6">
                    <h4 class="pull-right">电子邮件</h4>
                </el-col>
                <el-col :span="18">
                    <h4>{{loginUser.email}}</h4>
                </el-col>
            </el-row>
            <el-row class="dashboard-line" :gutter="20">
                <el-col :span="6">
                    <h4 class="pull-right">手机号码</h4>
                </el-col>
                <el-col :span="18">
                    <h4>{{loginUser.phone||'<未设置>'}}</h4>
                </el-col>
            </el-row>
            <el-row class="dashboard-line" :gutter="20">
                <el-col :span="6">
                    <h4 class="pull-right">注册时间</h4>
                </el-col>
                <el-col :span="18">
                    <h4>{{loginUser.createAt}}</h4>
                </el-col>
            </el-row>
            <el-row class="dashboard-line" :gutter="20">
                <el-col :span="6">
                    <el-button class="pull-right" type="text">修改密码</el-button>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="6">
                    <el-button class="pull-right" type="text">设置手机号</el-button>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="6">
                    <el-button class="pull-right" type="text">修改个人信息</el-button>
                </el-col>
            </el-row>
        </el-col>
        <el-col :span="12">
            <el-card class="box-card">
            <div class="text item">
                <h4>HyperIdentity 用户登录 - 192.168.31.1</h4>
                <span>2017/9/19 上午11:13:35</span>
            </div>
            <div class="text item">
                <h4>HyperIdentity 用户登录 - 192.168.31.1</h4>
                <span>2017/9/19 上午11:13:35</span>
            </div>
            <div class="text item">
                <h4>HyperIdentity 用户登录 - 192.168.31.1</h4>
                <span>2017/9/19 上午11:13:35</span>
            </div>
            </el-card>
        </el-col>
    </el-row>
</template>

<script>

export default {
    data() {
        return {
            loginUser: {},
        }
    },
    mounted() {
        let _this = this;
        let loginUser = sessionStorage.getItem('user');
        if (loginUser) {
            _this.loginUser = JSON.parse(loginUser);
        }
    },
}
</script>

<style scoped lang="scss">
.el-row.dashboard-line {
    margin-top: 15px;
    margin-bottom: 0px;

    &:first-child {
        margin-top: 40px;
    }

    h4 {
        margin-top: 0px;
        margin-bottom: 0px;
        font-weight: 300;
    }
    .text-right {
        text-align: right;
    }
}

.text {
    font-size: 14px;
}

.item {
    padding: 10px 0;
    h4 {
        margin: 0;
        font-weight: 300;
    }
    span {
        font-weight: 200;
        color: #888;
        font-size: 10px;
    }
}
</style> 

