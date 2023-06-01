<template>
  <el-table-column
    v-bind="$attrs"
    v-on="$listeners"
    :label="column.label"
    :prop="column.prop"
    :type="column.type"
    :width="column.width"
    :min-width="column.minWidth"
    :index="column.index"
    :align="column.align || 'left'"
    :header-align="column.headerAlign || 'left'"
    :column-key="column.columnKey"
    :render-header="column.renderHeader"
    :fixed="column.fixed"
    :sortable="column.sortable || false"
    :sort-method="column.sortMethod"
    :sort-by="column.sortBy"
    :sort-orders="column.sortOrders"
    :resizable="column.resizable || true"
    :formatter="column.formatter"
    :show-overflow-tooltip="column.showOverflowTooltip || false"
    :class-name="column.className"
    :label-class-name="column.labelClassName"
    :selectable="column.selectable"
    :reserve-selection="column.reserveSelection || false"
    :filters="column.filters"
    :filter-placement="column.filterPlacement"
    :filter-multiple="column.filterMultiple"
    :filter-method="column.filterMethod"
    :filtered-value="column.filteredValue"
  >
    <template slot="header" slot-scope="scope">
      <lb-render
        v-if="column.renderHeader"
        :scope="scope"
        :render="column.renderHeader"
      >
      </lb-render>
      <span v-else>{{ scope.column.label }}</span>
    </template>
    <template v-if="column.children">
      <table-column
        v-for="(col, index) in column.children"
        :key="index"
        :column="col"
      >
      </table-column>
    </template>
    <template slot-scope="scope">
      <table-render :scope="scope" :render="column.render"></table-render>
    </template>
  </el-table-column>
</template>

<script>
/* eslint-disable */
import TableRender from "./TableRender.vue";
import tableColumnType from "@utils/table-column-type.js";
export default {
  name: "TableColumn",
  components: {
    TableRender,
  },
  props: {
    column: Object,
  },
  methods: {
    setTableColumn() {
      if (this.column.formatter) {
        this.column.render = (h, scope) => {
          return (
            <span>
              {scope.column.formatter(
                scope.row,
                scope.column,
                scope.row,
                scope.$index
              )}
            </span>
          );
        };
      }
      if (this.column.type) {
        this.column.renderHeader =
          tableColumnType[this.column.type].renderHeader;
        this.column.render =
          this.column.render || tableColumnType[this.column.type].renderCell;
      }
      if (!this.column.render) {
        this.column.render = (h, scope) => {
          return <span>{scope.row[scope.column.property]}</span>;
        };
      }
    },
  },

  watch: {
    column: {
      handler() {
        // console.log(newVal, "-----newVal");
        this.setTableColumn();
      },
      immediate: true,
    },
  },
};
</script>

<style lang="sass" scoped></style>
