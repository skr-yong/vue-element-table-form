<template>
  <div class="dynamic-table-demo">
    <base-search :params="queryList" :items="queryItems" @search="handleSearch">
      <template slot="mobile">
        <el-input v-model="queryList.mobile" placeholder="请输入手机号" />
      </template>
    </base-search>
    <dynamic-table
      ref="defaultTable"
      border
      :table-config="tableData.tableConfig"
      :columns="tableData.columns"
      :data="tableData.data"
      @selection-change="handleSelectionChange"
    >
    </dynamic-table>
    <div style="margin-top: 20px; float: right">
      <my-pagination :count="total" @pageEvent="fetchData" />
    </div>
    <base-dialog
      :visible.sync="dialogModalVisible"
      :loading="loading"
      title="demo提示弹窗"
      @cancel="handleCancel"
      @ok="handleOk"
    >
      <base-form ref="baseForm" :params="formParams" :items="formItems" />
    </base-dialog>
  </div>
</template>

<script>
// @ is an alias to /src
import DynamicTable from "@/components/DynamicTable";
import BaseSearch from "@/components/DynamicTable/BaseSearch";
import BaseForm from "@/components/DynamicTable/BaseForm";
import BaseDialog from "@/components/DynamicTable/BaseDialog";
import MyPagination from "@/components/DynamicTable/MyPagination";
import axios from "axios"; // 引入axios
const queryItems = [
  {
    label: "ID",
    prop: "id",
    type: "input",
    config: {
      props: {},
      attrs: { placeholder: "请输入交易Id" },
      on: {},
    },
  },
  { label: "交易编号", prop: "dealid", type: "input" },
  { label: "手机号", prop: "mobile", type: "input" },
  {
    label: "管理分行",
    prop: "mgmid",
    type: "select",
    config: {
      props: {},
      attrs: { placeholder: "请选择管理分行" },
      on: {},
    },
    option: [
      { label: "全部", value: 0 },
      { label: "总行", value: 1 },
      { label: "中国银行北京市分行", value: 2 },
      { label: "中国银行山西省分行", value: 3 },
    ],
  },
  {
    label: "交易日",
    prop: "dealtime",
    type: "datePicker",
    config: {
      props: {
        type: "datetimerange",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd",
      },
      attrs: {},
      on: {},
    },
  },
  {
    label: "成交日期",
    prop: "fixturedate",
    type: "datePicker",
    config: {
      props: {
        // type: 'datetime',
        // format: 'yyyy-MM-dd HH:mm:ss',
        // valueFormat: 'yyyy-MM-dd HH:mm:ss'
      },
      attrs: {},
      on: {},
    },
  },
];
const formItems = [
  {
    label: "ID",
    prop: "id",
    type: "input",
    rules: [{ required: true, message: "请输入交易ID" }],
    input: {
      props: {},
      attrs: { placeholder: "请输入交易ID" },
      on: {},
    },
  },
  { label: "交易行", prop: "dealid", type: "input" },
  { label: "交易编号", prop: "dealnum", type: "input" },
  {
    label: "交易状态",
    prop: "status",
    type: "select",
    config: {
      props: {},
      attrs: { placeholder: "请选择交易状态" },
      on: {},
    },
    option: [
      { label: "成功", value: 1 },
      { label: "失败", value: 0 },
    ],
  },
  {
    label: "交易日期",
    prop: "datetimerange",
    type: "datePicker",
    config: {
      props: {
        type: "datetimerange",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd",
      },
      attrs: {},
      on: {},
    },
  },
  {
    label: "交易日",
    prop: "timer",
    type: "datePicker",
    config: {
      props: {
        // type: 'datetime',
        // format: 'yyyy-MM-dd HH:mm:ss',
        // valueFormat: 'yyyy-MM-dd HH:mm:ss'
      },
      attrs: {},
      on: {},
    },
  },
  {
    label: "交易行",
    prop: "resource",
    type: "radio",
    config: {},
    option: [
      { label: "1", text: "总行" },
      { label: "2", text: "分行" },
    ],
  },
  {
    label: "交易单位",
    prop: "resource2",
    type: "checkbox",
    config: {},
    option: [
      { label: "1", text: "北京" },
      { label: "2", text: "杭州" },
    ],
  },
];
export default {
  name: "HomeView",
  components: {
    DynamicTable,
    BaseSearch,
    BaseForm,
    BaseDialog,
    MyPagination,
  },
  data() {
    return {
      tableData: {
        tableConfig: {
          stripe: true,
        },
        columns: [
          {
            type: "selection",
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
            width: "120px",
            sortable: true,
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
            width: "120px",
            sortable: true,
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
      queryList: {
        page: 1,
        limit: 20,
        dealid: "000000008",
        mobile: "",
        mgmid: null,
        timer: null,
        dealtime: [],
        dealnum: "",
        fixturedate: undefined,
        title: undefined,
        type: undefined,
        id: "",
      },
      // 表单参数
      formParams: {
        page: 1,
        limit: 20,
        dealid: "000000008",
        status: null,
        timer: null,
        datetimerange: [],
        dealnum: "",
        importance: undefined,
        title: undefined,
        type: undefined,
        resource: undefined,
        resource2: [],
        id: "",
      },
      queryItems,
      formItems,
      total: 0,

      dialogModalVisible: false,
      loading: false,
    };
  },
  methods: {
    // 查询
    handleSearch() {
      this.queryList.page = 1;
      console.log(this.queryList, "----查询列表");
      this.getList();
    },
    fetchData(currentpage) {
      console.log(currentpage, "----currentpage");
      if (typeof currentpage === "number") {
        // 切换页码
        this.page = currentpage;
      } else {
        // 在输入检索条件进行查询的时候，将当前页设置为 1
        this.page = 1;
      }
      this.getList();
    },
    // 获取列表
    getList() {
      console.log(this.getList);
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
          this.total = res.data.data.result.total;
          console.log(this.tableData.defaultData);
        }
      });
    },
    // 编辑
    handleEdit(scope) {
      this.dialogModalVisible = true;
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
    // 切换选中
    toggleSelection(rows) {
      console.log(rows, "---rows");
      if (rows) {
        rows.forEach((row) => {
          this.$refs.defaultTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.defaultTable.clearSelection();
      }
    },
    // 选中
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 取消
    handleCancel() {
      this.dialogModalVisible = false;
    },
    // 表单提交
    handleOk() {
      this.$refs.baseForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          console.log(this.formParams, "----formParams");
          setTimeout(() => {
            this.loading = false;
            this.dialogModalVisible = false;
          }, 1000);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
  mounted() {
    this.handleSearch();
  },
};
</script>
