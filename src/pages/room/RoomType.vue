<template>
  <section>
    <tutu-table entity="roomType" :col-configs="colConfigs" ref="tutuTable" :dialogTemp.sync="dialogTemp">
      <el-table-column slot="opt">
        <template slot-scope="{ row }">
              <el-button size="small" @click.native="$refs.tutuTable.handleEdit(row)">编辑</el-button>
              <el-button type="danger" size="small" @click.native="$refs.tutuTable.handleDel(row)">删除</el-button>
</template>
      </el-table-column>
<template slot="form-items">
  <el-form-item label="房间类型" prop="name">
    <el-input v-model="dialogTemp.name" auto-complete="off"></el-input>
  </el-form-item>
</template>
    </tutu-table>
  </section>
</template>

<script>
import Table from "~/layouts/components/Table.vue";
import _ from "lodash";

export default {
  data() {
    this.colConfigs = [
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
            message: "请输入房间类型",
            trigger: "blur"
          }
        ]
      },
      dialogTemp: {
        _id: undefined,
        name: ""
      },
    };
  },
  methods: {
    getMenus: function() {
    }
  },
  mounted() {
  },
  components: {
    "tutu-table": Table
  }
};
</script>

<style scoped lang="scss">

</style>

