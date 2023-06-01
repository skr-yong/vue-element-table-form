<template>
  <div class="dynamic-table-demo">
    <dynamic-table
      border
      :table-config="tableData.tableConfig"
      :columns="tableData.columns"
      :data="tableData.data"
    >
    </dynamic-table>
  </div>
</template>

<script>
// @ is an alias to /src
import DynamicTable from "@/components/DynamicTable";
import axios from "axios"; // 引入axios
export default {
  name: "ExpandTable",
  components: {
    DynamicTable,
  },
  data() {
    return {
      tableData: {
        tableConfig: {
          stripe: true,
        },
        columns: [
          {
            type: "expand",
            align: "center",
            headerAlign: "center",
            render: () => {
              return (
                <el-form label-position="left" inline class="demo-table-expand">
                  <el-form-item>
                    <span>测试111</span>
                  </el-form-item>
                </el-form>
              );
            },
          },
          {
            label: "业务编号",
            prop: "businessNo",
            width: "100px",
          },
          {
            label: "产品名称",
            prop: "productName",
            align: "center",
            width: "200px",
            headerAlign: "center",
            render: (h, scope) => {
              return <el-tag>{scope.row[scope.column.property]}</el-tag>;
            },
          },
          {
            label: "金融工具",
            prop: "instrumentName",
          },
          {
            label: "标的",
            prop: "underlying",
            align: "center",
            headerAlign: "center",
            render: (h, scope) => {
              return (
                <div>
                  {scope.row._edit ? (
                    <el-input
                      value={scope.row[scope.column.property]}
                      onInput={(val) => {
                        scope.row[scope.column.property] = val;
                      }}
                    ></el-input>
                  ) : (
                    <span>{scope.row[scope.column.property]}</span>
                  )}
                </div>
              );
            },
          },
          {
            label: "货币对",
            prop: "pair",
            align: "center",
            headerAlign: "center",
          },
          {
            label: "货币对2",
            prop: "pair",
            align: "center",
            headerAlign: "center",
          },
          {
            label: "货币对3",
            prop: "pair",
            align: "center",
            headerAlign: "center",
          },
          {
            label: "平盘数量",
            prop: "quantity",
            align: "center",
          },
          {
            label: "平盘次数",
            prop: "echoTimes",
            align: "center",
          },
          {
            label: "平盘结果",
            prop: "res",
            align: "center",
          },
          {
            label: "平盘价格",
            prop: "exchangePrice",
            align: "center",
          },

          {
            label: "平盘对手",
            prop: "cpty",
            align: "center",
          },
          {
            label: "交易日期",
            prop: "dealDate",
            width: "140px",
            align: "center",
            headerAlign: "center",
            renderHeader: (h, scope) => {
              return (
                <span>
                  <i class="el-icon-time"></i>
                  {scope.column.label}
                </span>
              );
            },
          },
          {
            label: "平盘偏移点差",
            prop: "pair",
            width: "140px",
            headerAlign: "center",
            align: "center",
          },
          {
            label: "原交易编号",
            prop: "instrumentDealId",
            width: "140px",
            headerAlign: "center",
            align: "center",
          },
          {
            label: "买入",
            headerAlign: "center",
            children: [
              {
                label: "交易数量",
                prop: "COUNTNUM",
              },
              {
                label: "交易金额",
                prop: "exchangePrice",
              },
            ],
          },
          {
            label: "卖出",
            headerAlign: "center",
            children: [
              {
                label: "交易数量",
                prop: "COUNTNUM",
              },
              {
                label: "交易金额",
                prop: "exchangePrice",
              },
            ],
          },
          {
            label: "操作",
            width: "140px",
            align: "center",
            headerAlign: "center",
            render: (h, scope) => {
              return (
                <div>
                  <el-button
                    size="small"
                    type="text"
                    onClick={() => {
                      this.handleEdit(scope);
                    }}
                  >
                    编辑row
                  </el-button>
                  <el-button
                    size="small"
                    type="text"
                    style="color:red;"
                    onClick={() => {
                      this.handleDelete(scope);
                    }}
                  >
                    删除
                  </el-button>
                </div>
              );
            },
          },
        ],
        data: [],
        defaultData: [],
      },
    };
  },
  methods: {
    // 编辑
    handleEdit(scope) {
      this.$set(scope.row, "_edit", true);
    },
    // 取消
    handleCancle(scope) {
      this.$set(
        this.tableData.data,
        scope.$index,
        JSON.parse(JSON.stringify(this.tableData.defaultData[scope.$index]))
      );
    },
    // 保存
    handleSave(scope) {
      this.$set(scope.row, "_edit", false);
      this.$set(
        this.tableData.defaultData,
        scope.$index,
        JSON.parse(JSON.stringify(scope.row))
      );
    },
    // 删除
    handleDelete(scope) {
      console.log(scope);
      this.$confirm(
        `此操作将永久删除该条业务编号为<${scope.row.businessNo}>的数据, 是否继续?`,
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
      console.log("scope", scope.row.id);
    },
  },
  mounted() {
    axios.get("/user/list").then((res) => {
      console.log(res);
      if (res.data.code === 200) {
        console.log(
          res.data.data.result.datals,
          "---res.data.data.result.datals"
        );
        this.tableData.data = res.data.data.result.datals;
        this.tableData.defaultData = JSON.parse(
          JSON.stringify(this.tableData.data)
        );
        console.log(this.tableData.defaultData);
      }
    });
  },
};
</script>
