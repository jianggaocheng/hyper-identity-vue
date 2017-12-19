<template>
  <section>
    <tutu-table entity="role" :col-configs="colConfigs" ref="tutuTable" :dialogTemp.sync="dialogTemp">
      <el-table-column slot="opt">
        <section slot-scope="{ row }">
              <el-button size="small" @click.native="$refs.tutuTable.handleEdit(row)">编辑</el-button>
              <el-button type="danger" size="small" @click.native="$refs.tutuTable.handleDel(row)">删除</el-button>
        </section>
      </el-table-column>
      <section slot="form-items">
        <el-form-item label="名称" prop="name">
          <el-input v-model="dialogTemp.name" auto-complete="off"></el-input>
        </el-form-item>
        
        <el-form-item label="菜单">
          <el-transfer v-model="checkedMenus" :data.sync="allMenus" :titles="['待选择', '已选择']" @change="dialogTemp.menus = checkedMenus"></el-transfer>
        </el-form-item>
      </section>
    </tutu-table>
  </section>
</template>

<script>
import Table from "~/layouts/components/Table.vue";
import { commonGetQuery } from "~/api/resourceApi";
import _ from "lodash";

export default {
  data() {
    this.colConfigs = [
      {
        prop: "_id",
        label: "ID"
      },
      {
        prop: "name",
        label: "名称"
      },
      {
        slot: "opt"
      }
    ];
    return {
      dialogFormRules: {
        name: [
          {
            required: true,
            message: "请输入角色名",
            trigger: "blur"
          }
        ]
      },
      dialogTemp: {
        _id: undefined,
        name: ""
      },
      checkedMenus: [],
      allMenus: []
    };
  },
  methods: {
    getMenus: function() {
      let _this = this;
      this.allMenus = [];
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
              _this.allMenus.push({
                key: menu._id,
                label: menu.title,
                value: menu._id
              });
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
  watch: {
    'dialogTemp.menus': function(val) {
      this.checkedMenus = _.flatMap(val, function(n) {
        if (n._id) {
          return [n._id];
        } else {
          return [n];
        }
      });
    },
  },
  mounted() {
    this.getMenus();
  },
  components: {
    "tutu-table": Table
  }
};
</script>

<style scoped lang="scss">

</style>

