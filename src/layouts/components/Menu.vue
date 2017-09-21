<template>
    <el-menu :default-active="$route.path" class="el-menu-vertical-demo" unique-opened router v-if="!collapsed">
        <template v-for="(item,index) in menuList">
            <el-submenu :index="index+''" v-if="item.children && item.children.length>=1">
                <template slot="title"><i :class="item.iconCls"></i>{{item.name}}</template>
                <el-menu-item v-for="child in item.children" :index="child.path" :key="child.path">{{child.name}}</el-menu-item>
            </el-submenu>
            <el-menu-item v-if="!item.children || item.children.length==0" :index="item.path"><i :class="item.iconCls"></i>{{item.name}}</el-menu-item>
        </template>
    </el-menu>
</template>

<script>
import _ from 'lodash';
export default {
    props: ['collapsed'],
    data() {
        return {
            
        }
    },
    computed: {
        menuList: function() {
            let _this = this;
            let adminMenu = _.find(_this.$router.options.routes, {menu: true});
            console.log('adminMenu', adminMenu);
            return adminMenu.children;
        }
    }
}
</script>

