<template>
    <el-menu class="el-menu-vertical-demo" unique-opened router v-if="!collapsed" :router="true">
        <template v-for="(item, index) in menuList"> 
            <el-submenu v-if="item.hasSubMenus && item.subMenus.length > 0" :index="index+''" v-bind:key="item._id" >
                <template slot="title"><i :class="item.icon"></i>{{item.title}}</template>
                <el-menu-item v-for="child in item.subMenus" :index="'/admin' + item.link + child.link" :key="child.link">{{child.title}}</el-menu-item>
            </el-submenu>
            <el-menu-item v-if="!item.hasSubMenus" v-bind:key="item._id" :index="'/admin' + item.link"><i :class="item.icon"></i>{{item.title}}</el-menu-item>
        </template>
    </el-menu>
</template>

<script>
import _ from "lodash";
export default {
  props: ["collapsed"],
  data() {
    return {};
  },
  computed: {
    menuList: function() {
      let _this = this;

      let allMenuOfUser = _this.$store.state.user.menus;
      var parentMenu = _.sortBy(
        _.filter(allMenuOfUser, { parentId: null }),
        "sort"
      );

      _(parentMenu).forEach(function(item) {
        item.subMenus = _.sortBy(
          _.filter(allMenuOfUser, { parentId: item._id }),
          "sort"
        );

        if (item.subMenus.length > 0) {
          item.hasSubMenus = true;
        } else {
          item.hasSubMenus = false;
        }
      });

      return parentMenu;
    }
  }
};
</script>

