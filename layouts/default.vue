<template>
  <section class="main-container">
    <!-- 头部 -->
    <app-header />

    <section
      class="sub-container"
      :style="{
        marginLeft: sidebar ? SIDEBAR_MIN_WIDTH : SIDEBAR_WIDTH
      }"
    >
      <!-- 侧边栏 -->
      <app-sidebar />
      <!-- 返回顶部 -->
      <back-to-top />
      <section :class="[sidebar ? 'hide-main-content' : 'main-content']">
        <section class="sub-content">
          <!-- <el-scrollbar wrap-class="scrollbar-wrapper"> -->
          <!-- 主内容区域 -->
          <section class="content">
            <nuxt />
          </section>
          <!-- </el-scrollbar> -->
        </section>
      </section>
    </section>
  </section>
</template>

<script>
import BackToTop from '@/components/BackToTop'
import { mapGetters } from 'vuex'
import { SIDEBAR_WIDTH, SIDEBAR_MIN_WIDTH } from '@/styles/var.scss'
import AppHeader from './components/AppHeader'
import AppSidebar from './components/AppSidebar/index'
export default {
  components: {
    AppHeader,
    AppSidebar,
    BackToTop
  },
  data() {
    return {
      SIDEBAR_WIDTH,
      SIDEBAR_MIN_WIDTH
    }
  },
  computed: {
    ...mapGetters('app', ['sidebar'])
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/var.scss';

.main-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: $background-color-base;
  color: $color-text-main;

  .sub-container {
    flex: 1;
    margin-top: calc(#{$header-height} + 20px);
    padding-bottom: 150px;
    transition: all 0.3s;
  }

  .main-content {
    flex: 1;
    max-width: calc(100vw - #{$sidebar-width} - 40px);
    margin: 0 auto;
    transition: all 0.3s;
  }
  .hide-main-content {
    flex: 1;
    max-width: calc(100vw - #{$sidebar-min-width} - 40px);
    margin: 0 auto;
    transition: all 0.3s;
  }

  .sub-content {
    min-height: calc(100vh - #{$header-height} - #{$breadcrumb-height});
  }

  .content {
    box-sizing: border-box;
    // margin: 0 20px;
    min-height: calc(
      100vh - #{$header-height} - #{$breadcrumb-height} - #{$footer-height}
    );
  }
}
</style>
