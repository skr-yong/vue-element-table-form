<script>
/* eslint-disable */
import createForm from "./createForm";
export default {
  name: "BaseSearch",
  mixins: [createForm],
  props: {
    params: {
      type: Object,
      default() {
        return {};
      },
    },
    items: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      defaultParams: {},
    };
  },
  mounted() {
    this.defaultParams = JSON.parse(JSON.stringify(this.params));
  },
  methods: {
    handleReset() {
      for (const key in this.defaultParams) {
        this.params[key] = this.defaultParams[key];
      }
      this.$listeners.search();
    },
  },
  render(h) {
    const { form, $listeners } = this;
    this.$attrs.inline = true;
    return (
      <el-card class={["filter-container"]}>
        {form(h)}
        <el-row
          type="flex"
          justify="space-between"
          {...{ style: { marginBottom: "10px" } }}
        >
          <el-col {...{ style: { textAlign: "right" } }}>
            <el-button
              {...{
                props: { type: "primary", size: "small" },
                on: { click: $listeners.search },
              }}
            >
              查询
            </el-button>
            <el-button
              {...{
                props: { size: "small" },
                on: { click: this.handleReset },
              }}
            >
              重置
            </el-button>
          </el-col>
        </el-row>
      </el-card>
    );
  },
};
</script>

<style scoped>
.filter-container {
  margin-bottom: 10px;
}
</style>
