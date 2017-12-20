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
        <el-form-item label="标识符" prop="domainId">
          <el-input v-model="dialogTemp.domainId" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="名称" prop="name">
          <el-input v-model="dialogTemp.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="跳转URL" prop="callbackURL">
          <el-input v-model="dialogTemp.callbackURL" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="父域">
          <el-select v-model="dialogTemp.parentId" clearable placeholder="请选择">
            <el-option
              v-for="item in rootDomains"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所有者">
          <el-select v-model="dialogTemp.masterAdminId" placeholder="请选择">
            <el-option
              v-for="item in rootDomains"
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
          prop: "parentDomain.name",
          label: "父域"
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
        rootDomains: [],
      };
    },
    methods: {
      getRootMenus: function() {
      let _this = this;
      this.rootDomains = [];
      commonGetQuery("domain")
        .then(res => {
          let { code, list, errCode, errMsg } = res;

          if (errCode) {
            _this.$message({
              message: errMsg,
              type: "error"
            });
          } else if (code === 200) {
            _.forEach(list, function(domain) {
              // if (!domain.parentId) {
                _this.rootDomains.push({
                  key: domain._id,
                  label: domain.name,
                  value: domain._id,
                });
              // }
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
    watch: {
      'dialogTemp._id': function() {
        this.getRootMenus();
      }
    },
    components: {
      "tutu-table": Table
    }
  };
</script>

<style scoped lang="scss">
  
</style>

