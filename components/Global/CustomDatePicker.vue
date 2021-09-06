<template>
  <div class="custom-date-picker-box">
    <el-date-picker
      v-model="start"
      :type="subType"
      :placeholder="startPlaceholder"
      :value-format="valueFormat"
      :readonly="readonly"
      class="start"
      @change="handleChange"
    >
    </el-date-picker>
    <span class="middle"> {{ rangeSeparator }} </span>
    <el-date-picker
      v-model="end"
      :type="subType"
      :value-format="valueFormat"
      :placeholder="endPlaceholder"
      :readonly="readonly"
      class="end"
      @change="handleChange"
    >
    </el-date-picker>
  </div>
</template>

<script>
export default {
  name: 'CustomDatePicker',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      default: () => [],
      type: Array
    },
    valueFormat: {
      default: '',
      type: String
    },
    rangeSeparator: {
      default: '/',
      type: String
    },
    startPlaceholder: {
      default: '开始日期',
      type: String
    },
    endPlaceholder: {
      default: '结束日期',
      type: String
    },
    type: {
      default: 'daterange',
      type: String,
      validator(value) {
        return ['daterange', 'datetimerange'].includes(value)
      }
    },
    wholeParam: {
      default: false,
      type: Boolean
    },
    readonly: {
      default: false,
      type: Boolean
    }
  },
  data() {
    return {
      start: '',
      end: ''
    }
  },
  computed: {
    subType() {
      if (this.type === 'daterange') {
        return 'date'
      } else {
        return 'datetime'
      }
    }
  },
  watch: {
    value: {
      deep: true,
      handler(val) {
        console.log(val, 'val')
        const [s, e] = val
        this.start = s
        this.end = e
      }
    }
  },
  created() {
    const [s, e] = this.value
    this.start = s
    this.end = e
  },
  methods: {
    handleChange() {
      if (this.wholeParam === true) {
        const res = [this.start, this.end]
        this.$emit('change', res)
      } else if (this.start && this.end && this.wholeParam === false) {
        const res = [this.start, this.end]
        this.$emit('change', res)
      }
    }
  }
}
</script>

<style lang="scss">
.custom-date-picker-box {
  display: flex;
  flex-wrap: nowrap;
  .middle {
    display: inline-block;
    line-height: 34px;
    height: 34px;
    border-top: 1px solid #dcdfe6;
    border-bottom: 1px solid #dcdfe6;
  }
  .start {
    .el-input__inner {
      border-right: 0;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
  }
  .end {
    .el-input__inner {
      border-left: 0;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }
}
</style>
