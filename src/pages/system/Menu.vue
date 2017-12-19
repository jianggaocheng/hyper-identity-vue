<template>
  <section>
    <tutu-table entity="menu" :col-configs="colConfigs" ref="tutuTable" :dialogTemp.sync="dialogTemp">
      <el-table-column slot="opt">
        <template slot-scope="{ row }">
          <el-button size="small" @click.native="$refs.tutuTable.handleEdit(row)">编辑</el-button>
          <el-button type="danger" size="small" @click.native="$refs.tutuTable.handleDel(row)">删除</el-button>
        </template>
      </el-table-column>
      <template slot="form-items">
        <el-form-item label="标题" prop="title">
          <el-input v-model="dialogTemp.title" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="链接" prop="link">
          <el-input v-model="dialogTemp.link" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="图标" prop="icon">
          <el-input v-model="dialogTemp.icon" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input v-model="dialogTemp.sort" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="父菜单">
          <el-select v-model="dialogTemp.parentId" placeholder="请选择">
            <el-option
              v-for="item in rootMenus"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </template>
    </tutu-table>
  </section>
</template>

<script>
import Table from "~/layouts/components/Table.vue";
import { commonGetQuery } from "~/api/resourceApi";

export default {
  data() {
    this.colConfigs = [
      {
        prop: "title",
        label: "名称"
      },
      {
        prop: "link",
        label: "链接"
      },
      {
        prop: "icon",
        label: "图标"
      },
      {
        prop: "sort",
        label: "排序"
      },
      {
        prop: "parentMenu.title",
        label: "父菜单"
      },
      { slot: "opt" }
    ];
    return {
      dialogFormRules: {
        title: [
          {
            required: true,
            message: "请输入标题",
            trigger: "blur"
          }
        ]
      },
      dialogTemp: {
        _id: undefined,
        title: ""
      },
      rootMenus: [],
    };
  },
  methods: {
    getRootMenus: function() {
      let _this = this;
      this.rootMenus = [];
      commonGetQuery("menu")
        .then(res => {
          let { code, list, errCode, errMsg } = res;

          if (errCode) {
            _this.$message({
              message: errMsg,
              type: "error"
            });
          } else if (code === 200) {
            _.forEach(list, function(menu) {
              if (!menu.parentId) {
                _this.rootMenus.push({
                  key: menu._id,
                  label: menu.title,
                  value: menu._id,
                });
              }
            });
          }
        })
        .catch(err => {
          console.error(err);
          _this.$message({
            message: "未知错误",
            type: "error"
          });
        });
    }
  },
  mounted() {
    this.getRootMenus();
  },
  components: {
    "tutu-table": Table
  }
};
</script>

<style scoped lang="scss">

</style>

