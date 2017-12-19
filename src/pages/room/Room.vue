<template>
  <section>
    <tutu-table entity="room" :col-configs="colConfigs" ref="tutuTable" :dialogTemp.sync="dialogTemp">
      <el-table-column slot="opt">
        <template slot-scope="{ row }">
                        <el-button size="small" @click.native="$refs.tutuTable.handleEdit(row)">编辑</el-button>
                        <el-button type="danger" size="small" @click.native="$refs.tutuTable.handleDel(row)">删除</el-button>
</template>
      </el-table-column>
<template slot="form-items">
  <el-form-item label="房号" prop="roomNum">
    <el-input v-model="dialogTemp.roomNum" auto-complete="off"></el-input>
  </el-form-item>
  <el-form-item label="RCU地址" prop="rcuAddr">
    <el-input v-model="dialogTemp.rcuAddr" auto-complete="off"></el-input>
  </el-form-item>
  <el-form-item label="房间类型">
    <el-select v-model="dialogTemp.typeId" placeholder="请选择">
      <el-option v-for="item in roomTypes" :key="item.value" :label="item.label" :value="item.value">
      </el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="楼层">
    <el-select v-model="dialogTemp.floorId" placeholder="请选择">
      <el-option v-for="item in floors" :key="item.value" :label="item.label" :value="item.value">
      </el-option>
    </el-select>
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
    this.colConfigs = [
      {
        prop: "roomNum",
        label: "房号"
      },
      {
        prop: "rcuAddr",
        label: "RCU地址"
      },
      {
        prop: "floor.name",
        label: "楼层"
      },
      {
        prop: "roomType.name",
        label: "房间类型"
      },
      {
        prop: "updateAt",
        label: "更新时间"
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
        roomNum: "",
        typeId: "",
        floorId: ""
      },
      roomTypes: [],
      floors: []
    };
  },
  methods: {
    getRoomTypes: function() {
      let _this = this;
      utils.commonSelectOption("roomType", _this, "_id", "name").then(array => {
        _this.roomTypes = _.cloneDeep(array);
      });
    },
    getFloors: function() {
      let _this = this;

      utils.commonSelectOption("floor", _this, "_id", "name").then(array => {
        _this.floors = _.cloneDeep(array);
      });
    }
  },
  mounted() {
    this.getRoomTypes();
    this.getFloors();
  },
  components: {
    "tutu-table": Table
  }
};
</script>

<style scoped lang="scss">

</style>

