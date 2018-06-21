export const value = {
  limitValue(minValue, maxValue, mes) {
    return function(rule, value, callback) {
      if (value === undefined || value === "") {
        callback(new Error(mes + "不能为空"));
      } else if (minValue && minValue > value.length) {
        callback(new Error("字数不能小于" + minValue));
      } else if (maxValue && value.length > maxValue) {
        callback(new Error("字数不能大于" + maxValue));
      } else {
        callback();
      }
    };
  }
};

export const required = (opt = {}) => {
  return Object.assign(
    { required: true, message: "不能为空", trigger: "blur" },
    opt
  );
};

export const email = (opt = {}) => {
  return Object.assign(
    {
      required: true,
      type: "email",
      message: "email is not valid",
      trigger: "blur"
    },
    opt
  );
};

export const number = (opt = { required: false }) => {
  return Object.assign(
    { type: "number", message: "is not a number", trigger: "blur" },
    opt
  );
};

export const phoneValidator = (rule, value, callback) => {
  if (!(value && value.match(/^1\d{10}$/) && value.length <= 11)) {
    callback(new Error("手机号格式不合法"));
  }
  callback();
};

export const requiredArrayValidator = (rule, value, callback) => {
  if (!(value instanceof Array) || value.length === 0) {
    callback(new Error("can't be blank"));
  }
  callback();
};

export const requiredDateValidator = (rule, value, callback) => {
  if (!(value instanceof Date)) {
    callback(new Error("can't be blank"));
  }
  callback();
};

export default {
  required,
  email,
  value,
  number,
  phoneValidator,
  requiredArrayValidator,
  requiredDateValidator
};
