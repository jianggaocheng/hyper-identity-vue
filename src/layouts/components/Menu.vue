<template>
    <el-menu :default-active="$route.path" class="el-menu-vertical-demo" unique-opened router v-show="!collapsed">
        <template v-for="(item,index) in $router.options.routes">
            {{item.name}}
        </template>
    </el-menu>
</template>

<script>
export default {
    props: ['collapsed'],
    data() {
        console.log('menu',this.$router.options.routes);
        return {
            
        }
    },
    mounted() {
    }
}
</script>

