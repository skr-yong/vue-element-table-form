/* eslint-disable */
export default {
  methods: {
    renderType(row) {
      const { params } = this;
      const { config = {} } = row;
      const defaultAttrs = {
        props: {
          value: params[row.prop],
          ...config.props,
        },
        attrs: {
          ...config.attrs,
        },
        on: {
          input(value) {
            params[row.prop] = value;
          },
          ...config.on,
        },
      };
      const types = {
        input: () => {
          const { props, attrs } = defaultAttrs;
          const { clearable } = props;
          const { placeholder } = attrs;
          props.clearable = clearable === undefined ? true : clearable;
          attrs.placeholder =
            placeholder === undefined ? "请输入" : placeholder;
          return <el-input {...defaultAttrs} />;
        },
        select: () => {
          const { attrs, on } = defaultAttrs;
          const { placeholder } = attrs;
          attrs.placeholder =
            placeholder === undefined ? "请选择" : placeholder;
          if (!on.change) {
            on.change = function (value) {
              params[row.prop] = value;
            };
          }
          return (
            <el-select {...defaultAttrs}>
              {row.option &&
                row.option.map((item, index) => {
                  const obj = {
                    props: { ...item },
                    on: { ...item },
                  };
                  return <el-option key={index} {...obj}></el-option>;
                })}
            </el-select>
          );
        },
        datePicker: () => {
          /*
           * type 类型 year/month/date/week/ datetime/datetimerange/daterange
           * 默认 date
           * 日期格式 yyyy-MM-dd HH:mm:ss
           * */
          const { attrs } = defaultAttrs;
          const { startPlaceholder, endPlaceholder } = attrs;
          attrs.startPlaceholder =
            startPlaceholder === undefined ? "开始日期" : startPlaceholder;
          attrs.endPlaceholder =
            endPlaceholder === undefined ? "结束日期" : endPlaceholder;
          return <el-date-picker {...defaultAttrs} />;
        },
        radio: () => {
          return (
            <el-radio-group {...defaultAttrs}>
              {row.option &&
                row.option.map((item, index) => {
                  return (
                    <el-radio
                      key={index}
                      {...{
                        props: { ...item },
                        attrs: { ...item },
                        on: { ...item },
                      }}
                    >
                      {item.text}
                    </el-radio>
                  );
                })}
            </el-radio-group>
          );
        },
        checkbox: () => {
          return (
            <el-checkbox-group {...defaultAttrs}>
              {row.option &&
                row.option.map((item, index) => {
                  return (
                    <el-checkbox
                      key={item.label}
                      {...{
                        props: { ...item },
                        attrs: { ...item },
                        on: { ...item },
                      }}
                    >
                      {item.text}
                    </el-checkbox>
                  );
                })}
            </el-checkbox-group>
          );
        },
      };
      return types[row.type]();
    },
    form(h) {
      const { items, params, $listeners, $attrs, $slots } = this;
      const attrs = {
        props: {
          model: params,
          ...$attrs,
        },
        ref: "form",
        on: { ...$listeners },
      };
      return (
        <el-form {...attrs}>
          {items.map((item, index) => {
            const obj = {
              props: {
                ...item,
              },
              scopedSlots: {
                default: (scope) => {
                  const hasRender = item.hasOwnProperty("render");
                  if (hasRender) {
                    return item.render(h, scope);
                  }
                  const customRender = $slots[item.prop];
                  return customRender || this.renderType(item);
                },
              },
            };
            return <el-form-item key={index} {...obj} />;
          })}
        </el-form>
      );
    },
  },
};
