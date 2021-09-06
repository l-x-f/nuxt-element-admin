<template>
  <el-col v-bind="attr" class="custom-col">
    <label class="custom-col-label" :style="style">{{ label }}</label>
    <div class="custom-col-item">
      <slot />
    </div>
  </el-col>
</template>

<script>
export default {
  name: 'AppSearchItem',
  props: {
    label: {
      default: '',
      type: String
    },
    labelItemWidth: {
      default: 60,
      type: Number
    },
    itemAttr: {
      type: Object,
      default: () => null
    }
  },
  data() {
    return {
      DefaultAttr: {
        xs: 24,
        sm: 12,
        md: 12,
        lg: 12,
        xl: 8
      }
    }
  },
  computed: {
    parent() {
      const parent =
        (this.$parent &&
          this.$parent.$parent &&
          this.$parent.$parent.$parent) ||
        {}
      return parent
    },
    style() {
      const width = this.parent.labelWidth
        ? this.parent.labelWidth
        : this.labelItemWidth
      return {
        'flex-basis': width + 'px',
        'text-align': 'right',
        'margin-right': '10px'
      }
    },
    attr() {
      return this.itemAttr || this.parent.$attrs.attr || this.DefaultAttr
    }
  }
}
</script>

<style lang="scss">
.custom-col {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  font-size: 14px;
  margin-bottom: 15px;
  .custom-col-label {
    font-weight: normal;
    flex-basis: 90px;
    flex-shrink: 0;
  }

  .custom-col-item {
    flex: 1;
    .el-date-editor {
      width: 100%;
    }
    .el-select {
      width: 100%;
    }
  }
}
</style>
