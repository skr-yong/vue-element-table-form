<template>
  <div class="dynamic-table">
    <el-table
      ref="elTable"
      :stripe="tableConifg.stripe"
      :data="data"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <table-column
        v-for="(item, index) in columns"
        :key="index"
        :column="item"
        v-bind="$attrs"
      >
      </table-column>
    </el-table>
  </div>
</template>

<script>
import TableColumn from "./components/TableColumn.vue";
import { transFormType, isEmpty } from "@utils/form-association";
export default {
  name: "dynamic-table",
  components: {
    TableColumn,
  },
  props: {
    tableConifg: {
      type: Object,
      default: () => {
        return {};
      },
    },
    data: {
      type: Array,
      default: () => {
        return [];
      },
    },
    columns: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      ruleForm: {},
    };
  },
  methods: {
    /**
     * 表单方法
     */
    // 表单初始化 初始值
    init() {
      // 初始化 绑定初始值
      if (this.queryFormConfig.length > 0) {
        for (const iterator of this.queryFormConfig) {
          console.log(iterator, "---iterator");
          let initVal = iterator.initVal;
          if (isEmpty(initVal)) initVal = null;
          this.$set(this.ruleForm, iterator.key, initVal);
        }
      }
    },
    // 表单类型获取
    translateType(value) {
      console.log("value表单类型", value);
      return transFormType(value);
    },
    // 表单查询
    handleSearch() {
      console.log(this.ruleForm, "----表单数据");
      // this.$emit('searchForm', this.ruleForm)
    },
    // 用于多选表格，清空用户的选择
    clearSelection() {
      this.$refs.elTable.clearSelection();
    },
    // 用于多选表格，切换某一行的选中状态，如果使用了第二个参数，则是设置这一行选中与否（selected 为 true 则选中）
    toggleRowSelection(row, selected) {
      this.$refs.elTable.toggleRowSelection(row, selected);
    },
    // 用于多选表格，切换所有行的选中状态
    toggleAllSelection() {
      this.$refs.elTable.toggleAllSelection();
    },
    // 用于可展开表格与树形表格，切换某一行的展开状态，如果使用了第二个参数，则是设置这一行展开与否（expanded 为 true 则展开）
    toggleRowExpansion(row, expanded) {
      this.$refs.elTable.toggleRowExpansion(row, expanded);
    },
    // 用于单选表格，设定某一行为选中行，如果调用时不加参数，则会取消目前高亮行的选中状态。
    setCurrentRow(row) {
      this.$refs.elTable.setCurrentRow(row);
    },
    // 	用于清空排序条件，数据会恢复成未排序的状态
    clearSort() {
      this.$refs.elTable.clearSort();
    },
    // 不传入参数时用于清空所有过滤条件，数据会恢复成未过滤的状态，也可传入由columnKey组成的数组以清除指定列的过滤条件
    clearFilter(columnKey) {
      this.$refs.elTable.clearFilter(columnKey);
    },
    //对 Table 进行重新布局。当 Table 或其祖先元素由隐藏切换为显示时，可能需要调用此方法
    doLayout() {
      this.$refs.elTable.doLayout();
    },
    // 手动对 Table 进行排序。参数prop属性指定排序列，order指定排序顺序。
    sort(prop, order) {
      this.$refs.elTable.sort(prop, order);
    },
  },
  watch: {
    queryFormConfig: {
      handler() {
        this.init();
      },
      deep: true,
    },
  },
};
</script>

<style lang="sass" scoped></style>
