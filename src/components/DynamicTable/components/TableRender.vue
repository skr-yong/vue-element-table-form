<script>
export default {
  name: "TableRender",
  functional: true,
  props: {
    scope: {
      type: Object,
      default: () => {
        return {};
      },
    },
    render: Function,
  },
  render: (h, ctx) => {
    // console.log(h, ctx, "--h, ctx");
    return ctx.props.render ? ctx.props.render(h, ctx.props.scope) : "";
  },
};
</script>
