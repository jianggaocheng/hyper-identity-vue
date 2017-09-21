<template>
    <el-row class="container">
        <el-col :span="24" class="header">
            <el-col :span="10" class="logo" :class="collapsed?'logo-collapse-width':'logo-width'">
                {{collapsed?'':sysName}}
            </el-col>
            <el-col :span="4">
                <div class="tools" @click.prevent="collapse">
                    <i class="el-icon-fa-align-justify"></i>
                </div>
            </el-col>
            <el-col :span="10" class="userinfo">
                <a class="nav-item" @click.prevent="handleLogout">
                    <i class="el-icon-fa-sign-out"></i>
                    退出登录
                </a>
                <span> {{loginUserName}} </span>
            </el-col>
        </el-col>
        <el-col :span="24" class="main">
            <aside :class="collapsed?'menu-collapsed':'menu-expanded'">
                <tutu-menu :collapsed="collapsed"></tutu-menu>
            </aside>
            <section class="content-container">
                <div class="grid-content bg-purple-light">
                    <el-col :span="24" class="breadcrumb-container">
                        <strong class="title">{{$route.name}}</strong>
                        <el-breadcrumb separator="/" class="breadcrumb-inner">
                            <el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
                                {{ item.name }}
                            </el-breadcrumb-item>
                        </el-breadcrumb>
                    </el-col>
                    <el-col :span="24" class="content-wrapper">
                        <transition name="fade" mode="out-in">
                            <router-view></router-view>
                        </transition>
                    </el-col>
                </div>
            </section>
        </el-col>
    </el-row>
</template>

<script>
import config from '../config/config.default';
import Menu from './components/Menu.vue';

export default {
    data() {
        return {
            sysName: config.sysName,
            collapsed: false,
            loginUserName: '',
            loginUserAvatar: '',
        }
    },
    methods: {
        handleLogout: function(ev) {
            var _this = this;
            this.$confirm('确认退出吗?', '提示', {
                type: 'warning'
            }).then(() => {
                _this.$store.commit('LOGOUT');
                _this.$router.push('/login');
            }).catch(() => {
            });
        },
        collapse: function() {
            this.collapsed = !this.collapsed;
        },
    },
    mounted() {
        let _this = this;
        let loginUser = _this.$store.state.user.user;
        if (loginUser) {
            this.loginUserName = loginUser.name || loginUser.email;
            this.loginUserAvatar = loginUser.avatar || config.defaultAvatar;
        }
    },
    components: {
        'tutu-menu': Menu,
    },

}
</script>

<style lang="scss">
@import '../style/vars.scss';
$lato-font-path: '../../node_modules/lato-font/fonts';
@import '../../node_modules/lato-font/scss/lato-font';

.container {
    position: absolute;
    top: 0px;
    bottom: 0px;
    width: 100%;
    .header {
        height: 60px;
        line-height: 60px;
        background: $color-primary;
        color: #fff;
        .userinfo {
            text-align: right;
            padding-right: 35px;
            float: right;
            .nav-item {
                padding-right: 15px;
                cursor: pointer;
            }
        }
        .logo {
            //width:230px;
            height: 60px;
            font-size: 22px;
            padding-left: 20px;
            padding-right: 20px;
            border-color: rgba(238, 241, 146, 0.3);
            border-right-width: 1px;
            border-right-style: solid;
            img {
                width: 40px;
                float: left;
                margin: 10px 10px 10px 18px;
            }
            .txt {
                color: #fff;
            }
        }
        .logo-width {
            width: 230px;
        }
        .logo-collapse-width {
            width: 60px
        }
        .tools {
            padding: 0px 23px;
            width: 14px;
            height: 60px;
            line-height: 60px;
            cursor: pointer;
        }
    }
    .main {
        display: flex; // background: #324057;
        position: absolute;
        top: 60px;
        bottom: 0px;
        overflow: hidden;
        aside {
            flex: 0 0 230px;
            width: 230px; // position: absolute;
            // top: 0px;
            // bottom: 0px;
            .el-menu {
                height: 100%;
            }
            .collapsed {
                width: 60px;
                .item {
                    position: relative;
                }
                .submenu {
                    position: absolute;
                    top: 0px;
                    left: 60px;
                    z-index: 99999;
                    height: auto;
                    display: none;
                }
            }
        }
        .menu-collapsed {
            flex: 0 0 60px;
            width: 60px;
        }
        .menu-expanded {
            flex: 0 0 230px;
            width: 230px;
        }
        .content-container {
            // background: #f1f2f7;
            flex: 1; // position: absolute;
            // right: 0px;
            // top: 0px;
            // bottom: 0px;
            // left: 230px;
            overflow-y: scroll;
            padding: 20px;
            .breadcrumb-container {
                //margin-bottom: 15px;
                .title {
                    width: 200px;
                    float: left;
                    color: #475669;
                }
                .breadcrumb-inner {
                    float: right;
                }
            }
            .content-wrapper {
                background-color: #fff;
                box-sizing: border-box;
            }
        }
    }
}
</style>

