<template>
  <svg
    id="svg-icon"
    :style="'font-size:' + fontSize"
    :class="svgClass"
    aria-hidden="true"
    v-on="$listeners"
  >
    <use :xlink:href="iconName" :fill="fill" />
  </svg>
</template>

<script>
/* eslint-disable vue/require-default-prop */
export default {
  name: 'SvgIcon',
  props: {
    fill: {
      type: String
    },
    iconClass: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: ''
    },
    fontSize: {
      type: String,
      default: '12px'
    }
  },
  computed: {
    iconName() {
      return `#icon-${this.iconClass}`
    },
    svgClass() {
      if (this.className) {
        return 'svg-icon ' + this.className
      } else {
        return 'svg-icon ' + this.iconClass
      }
    }
  }
}
</script>

<style lang="scss">
#svg-icon {
  width: 24px;
  text-align: center;
  height: 1em;
  fill: currentColor;
  overflow: hidden;
  font-size: 12px;
  padding-left: 2px;
  box-sizing: border-box;
}
</style>
