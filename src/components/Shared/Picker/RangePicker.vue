<template>
  <el-date-picker
    v-model="selectDate"
    type="datetimerange"
    :disabled="disabled"
    :placeholder="placeholder"
    :picker-options="pickerOptions0">
  </el-date-picker>
</template>

<script>
  import { DatePicker } from "element-ui";
  export default {
    name: "RangePicker",
    props: {
      value: [Number, Array],
      disabled: [Boolean],
      placeholder: [String]
    },
    data() {
      return {
        pickerOptions0: {
          shortcuts: [{
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          }, {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          }, {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }]
        },
        selectDate: this.value || []
      };
    },
    watch: {
      selectDate: function(newVal) {
        this.$emit("input", newVal);
      },
      value: function(newVal) {
        if (newVal !== this.selectDate) {
          this.selectDate = this.value;
        }
      }
    },
    components: {
      [DatePicker.name]: DatePicker
    }
  };
</script>
