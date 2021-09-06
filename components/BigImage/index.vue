<template>
  <div class="img-view" @click="bigImg">
    <!-- 遮罩层 -->
    <div class="img-layer" />
    <div class="img">
      <img :src="imgSrc" />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    imgSrc: {
      type: String,
      default: ''
    }
  },
  methods: {
    bigImg() {
      // 发送事件
      this.$emit('clickit')
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
/* bigimg */

.img-view {
  position: relative;
  width: 100%;
  height: 100%;
}

/* 遮罩层样式 */
.img-view .img-layer {
  position: fixed;
  z-index: 1999;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.7);
  width: 100%;
  height: 100%;
  overflow: hidden;
}

/* 不限制图片大小，实现居中 */
.img-view .img img {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 100px;
  left: 0;
  max-width: 50%;
  max-height: 70%;
  display: block;
  margin: auto;
  z-index: 2000;
}
</style>
