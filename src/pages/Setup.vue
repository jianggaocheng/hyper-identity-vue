<template>
  <section>
    <el-container>
      <el-header>系统参数设置</el-header>
      <el-main>
        <el-form ref="form" :model="settings" label-width="100px">
          <el-form-item label="酒店ID">
            <el-input v-model="settings.hotelID"></el-input>
          </el-form-item>
          <el-form-item label="数据库">
            <el-input v-model="settings.dbStr"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSubmitSettings">保存设置</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </el-main>
    </el-container>
  </section>
</template>

<script>
export default {
  metaInfo: {
    title: "系统设置"
  },
  data() {
    return {
      settings: {}
    };
  },
  methods: {
    handleSubmitSettings() {

    },
  }
}
</script>

<style lang="scss" scoped>
  
</style>