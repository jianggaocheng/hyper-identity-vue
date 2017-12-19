<template>
  <section>
    <tutu-table entity="floor" :col-configs="colConfigs" ref="tutuTable" :dialogTemp.sync="dialogTemp">
      <el-table-column slot="opt">
        <template slot-scope="{ row }">
              <el-button size="small" @click.native="$refs.tutuTable.handleEdit(row)">编辑</el-button>
              <el-button type="danger" size="small" @click.native="$refs.tutuTable.handleDel(row)">删除</el-button>
</template>
      </el-table-column>
<template slot="form-items">
  <el-form-item label="楼层名称" prop="name">
    <el-input v-model="dialogTemp.name" auto-complete="off"></el-input>
  </el-form-item>
  <el-form-item label="排序" prop="sort">
    <el-input v-model="dialogTemp.sort" auto-complete="off"></el-input>
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
        prop: "sort",
        label: "排序"
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
            message: "请输入楼层名称",
            trigger: "blur"
          }
        ]
      },
      dialogTemp: {
        _id: undefined,
        name: "",
        sort: 999,
      },
    };
  },
  methods: {
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

