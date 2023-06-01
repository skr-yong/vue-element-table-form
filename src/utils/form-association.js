/**
 * 定义表单组件名
 * @returns {String}
 */
export function transFormType(typeNum) {
  let componentName = "";
  switch (typeNum) {
    case 0:
      componentName = "FormInput";
      break;
    case 1:
      componentName = "FormSelect";
      break;
    case 2:
      componentName = "FormDate";
      break;
    case 3:
      componentName = "Date";
      break;
    case 4:
      componentName = "iSwitch";
      break;
    case 5:
      componentName = "Radio";
      break;
    default:
      return new Error(
        'formType "' + typeNum + '" does not exist.open fn.js and add it'
      );
  }
  return componentName;
}
/**
 * 校验是否为空的方法
 * @returns {Bollean}
 */
export function isEmpty(value) {
  return value === undefined || value === null || value === "";
}
