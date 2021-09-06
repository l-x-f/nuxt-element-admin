<template>
  <el-card class="card-panel" @click="handleClick">
    <span v-if="prefix">{{ prefix }}</span>
    <count-to
      class="card-panel-num"
      :start-val="0"
      :end-val="value"
      :duration="3000"
      :decimals="decimals"
    ></count-to>

    <div class="card-panel-text">
      <span> {{ title }}</span>
    </div>
  </el-card>
</template>

<script>
// 统计数据的小卡片
import CountTo from 'vue-count-to'
export default {
  name: 'CardPanel',
  components: {
    CountTo
  },
  props: {
    // 标题
    title: {
      default: '用户量',
      type: String
    },
    // 数值
    value: {
      type: Number,
      default: 0
    },
    // 小数位
    decimals: {
      default: 2,
      type: Number
    },
    // 前缀
    prefix: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    // 点击事件
    handleClick() {
      this.$emit('subClick')
    }
  }
}
</script>

<style lang="scss">
.card-panel {
  box-sizing: border-box;
  height: 160px;
  width: 160px;
  text-align: center;

  .el-card__body {
    height: 100%;
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .card-panel-text {
    color: rgba(0, 0, 0, 0.45);
    font-size: 20px;
    font-weight: bold;
    padding-top: 20px;
    width: 100%;
    span {
      display: inline-block;
      padding-bottom: 10px;
      border-bottom: 1px solid #ccc;
    }
  }

  .card-panel-num {
    padding-top: 20px;
    font-size: 18px;
  }
}
</style>
