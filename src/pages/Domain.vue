<template>
  <section>
    <tutu-table entity="domain" :col-configs="colConfigs" ref="tutuTable" :dialogTemp.sync="dialogTemp">
      <el-table-column slot="opt">
        <template slot-scope="{ row }">
                  <el-button size="small" @click.native="$refs.tutuTable.handleEdit(row)">编辑</el-button>
                  <el-button type="danger" size="small" @click.native="$refs.tutuTable.handleDel(row)">删除</el-button>
</template>
      </el-table-column>
<template slot="form-items">
  <el-form-item label="标识符">
    <el-input v-model="dialogTemp.domainId" auto-complete="off"></el-input>
  </el-form-item>
  <el-form-item label="名称">
    <el-input v-model="dialogTemp.name" auto-complete="off"></el-input>
  </el-form-item>
</template>
    </tutu-table>
  </section>
</template>

<script>
  import Table from "~/layouts/components/Table.vue";
  import utils from "~/utils/utils";
  import _ from "lodash";
  
  export default {
    data() {
      this.colConfigs = [{
          prop: "domainId",
          label: "域ID"
        },
        {
          prop: "name",
          label: "域名称"
        },
        {
          slot: "opt"
        }
      ];
      return {
        dialogFormRules: {
          name: [{
            required: true,
            message: "请输入域名称",
            trigger: "blur"
          }]
        },
        dialogTemp: {
          _id: undefined,
          name: ""
        },
      };
    },
    components: {
      "tutu-table": Table
    }
  };
</script>

<style scoped lang="scss">
  
</style>

