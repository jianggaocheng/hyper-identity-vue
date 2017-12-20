<template>
  <section>
    <el-col :span="24" class="toolbar">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-input class="filter-text" v-model="filters.query" placeholder="请输入关键词"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="getList">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleAdd">新增</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-table :data="list">
      <template v-for="colConfig in colConfigs">
                      <slot v-if="colConfig.slot" :name="colConfig.slot"></slot>
                      <el-table-column v-bind="colConfig"></el-table-column>
      </template>
  </el-table>
  <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[10, 20, 50, 100]" :current-page="1" :page-size="limit" :total="total" layout="total, sizes, prev, pager, next, jumper" style="float:right;">
  </el-pagination>
  <el-dialog :title="textMap[dialogStatus]" size="small" :visible.sync="dialogFormVisible" :close-on-click-modal="false" slot="dialog">
      <el-form :model.sync="dialogTemp" label-width="80px" :rules="dialogFormRules" ref="dialogForm">
          <slot name="form-items"></slot>
      </el-form>
      <div slot="footer" class="dialog-footer">
          <el-button @click.native="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click.native="handleSubmit" :loading="dialogFormLoading">提交</el-button>
      </div>
  </el-dialog>
  </section>
</template>

<script>
import NProgress from "nprogress";
import { commonGetQuery, commonCreate, commonUpdate } from "~/api/resourceApi";

export default {
  props: ["colConfigs", "entity", "dialogTemp", "dialogFormRules"],
  data() {
    return {
      filters: {
        query: ""
      },
      list: [],
      total: 0,
      page: 1,
      limit: 10,
      listLoading: false,
      dialogStatus: "",
      textMap: {
        update: "编辑",
        create: "创建"
      },
      dialogFormVisible: false,
      dialogFormLoading: false,
      dialogTempCopy: null
    };
  },
  methods: {
    getList() {
      let _this = this;
      let para = {
        page: _this.page,
        limit: _this.limit,
        query: _this.filters.query
      };
      _this.listLoading = true;
      NProgress.start();

      commonGetQuery(_this.entity, para)
        .then(res => {
          _this.total = res.total;
          _this.list = res.list;
          _this.listLoading = false;
          NProgress.done();
        })
        .catch(err => {
          _this.listLoading = false;
          _this.$message({
            message: "未知错误",
            type: "error"
          });
          NProgress.done();
        });
    },
    handleSizeChange(val) {
      this.limit = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getList();
    },
    handleDel(row) {
      this.$confirm("确认删除该记录吗?", "提示", {
        type: "warning"
      }).then(() => {
        this.listLoading = true;

        this.listLoading = false;
      });
    },
    handleAdd() {
      this.dialogStatus = "create";
      this.dialogFormVisible = true;
      // this.$nextTick(function() {
      //     this.$refs['dialogForm'].resetFields();
      // });
    },
    handleEdit(row) {
      this.$emit("update:dialogTemp", row);
      // this.$emit('updateDialogTemp', row);

      // this.dialogTemp = Object.assign({}, row);
      this.dialogStatus = "update";
      this.dialogFormVisible = true;
    },
    handleSubmit() {
      let _this = this;

      debugger;
      _this.$refs["dialogForm"].validate(valid => {
        if (valid) {
          if (_this.dialogStatus == "create") {
            this.dialogFormLoading = true;

            let para = Object.assign({}, this.dialogTempCom);
            commonCreate(_this.entity, para)
              .then(data => {
                this.dialogFormLoading = false;
                this.dialogFormVisible = false;

                let { errCode, errMsg, code } = data;

                if (errCode) {
                  this.$message({
                    message: errMsg,
                    type: "error"
                  });
                  return;
                }

                this.$notify({
                  title: "成功",
                  message: "创建成功",
                  type: "success",
                  duration: 2000
                });

                this.getList();
              })
              .catch(error => {
                this.dialogFormLoading = false;
                this.dialogFormVisible = false;

                this.$message({
                  message: "未知错误" + error.response.status,
                  type: "error"
                });
              });
          } else if (this.dialogStatus == "update") {
            this.dialogFormLoading = true;
            let para = Object.assign({}, this.dialogTempCom);
            
            // 空字符转换成null
            _.forEach(para, function(n, key) {
              if (n == '') {
                para[key] = null;
              }
            });

            commonUpdate(_this.entity, para)
              .then(data => {
                this.dialogFormLoading = false;
                this.dialogFormVisible = false;

                let { errCode, errMsg, code } = data;

                if (errCode) {
                  this.$message({
                    message: errMsg,
                    type: "error"
                  });
                  return;
                }

                this.$notify({
                  title: "成功",
                  message: "修改成功",
                  type: "success",
                  duration: 2000
                });

                this.getList();
              })
              .catch(error => {
                this.dialogFormLoading = false;
                this.dialogFormVisible = false;

                this.$message({
                  message: "未知错误" + error.response.status,
                  type: "error"
                });
              });
          }
        }
      });
    }
  },
  computed: {
    dialogTempCom() {
      return this.dialogTemp;
    }
  },
  watch: {
    dialogFormVisible: function(val) {
      let _this = this;
      if (!val) {
        setTimeout(function() {
          _this.$emit("update:dialogTemp", _.cloneDeep(_this.dialogTempCopy));
        }, 100);
      }
    }
  },
  mounted() {
    this.getList();
    this.dialogTempCopy = _.cloneDeep(this.dialogTempCom);
  }
};
</script>
