<template>
  <!--  eslint-disable vue/no-use-v-if-with-v-for  -->
  <div
    :class="{ hideSidebar: sidebar }"
    :style="{
      width: !sidebar ? SIDEBAR_WIDTH : SIDEBAR_MIN_WIDTH
    }"
    class="sidebar-container scroller-vertical"
  >
    <div class="title-logo">
      <!-- <img src="~@/static/logo.png" alt="" width="40" height="40" /> -->
      <h1 v-if="!sidebar" class="title">
        {{ title }}
      </h1>
      <h1 v-else class="title">
        {{ title.slice(0, 4) }}
      </h1>
    </div>

    <el-scrollbar>
      <el-menu
        :collapse="sidebar"
        :default-active="$route.path"
        :collapse-transition="false"
        :background-color="MENU_BG_COLOR"
        :text-color="MENU_TEXT_COLOR"
        :active-text-color="MENU_ACTIVE_TEXT_COLOR"
        router
        unique-opened
        class="aside-menu"
      >
        <!-- 添加递归组件，用来生成多级菜单 -->
        <app-sidebar-item
          v-for="item in permissionRoutes"
          :key="item.path"
          :item="item"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import {
  MENU_BG_COLOR,
  MENU_TEXT_COLOR,
  MENU_ACTIVE_TEXT_COLOR,
  SIDEBAR_WIDTH,
  SIDEBAR_MIN_WIDTH
} from '@/styles/var.scss'
import { mapActions, mapGetters } from 'vuex'
import AppSidebarItem from './AppSidebarItem'
const title = process.env.NUXT_APP_WEB_TITLE
export default {
  components: {
    AppSidebarItem
  },
  props: {
    menuList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      MENU_BG_COLOR,
      MENU_TEXT_COLOR,
      MENU_ACTIVE_TEXT_COLOR,
      SIDEBAR_WIDTH,
      SIDEBAR_MIN_WIDTH,
      title
    }
  },
  computed: {
    ...mapGetters('app', ['sidebar']),
    ...mapGetters(['permissionRoutes'])
  },
  methods: {
    ...mapActions(['app/toggleSideBar']),
    toggleSideBar() {
      this['app/toggleSideBar']()
    }
  }
}
</script>

<style lang="scss">
@import '~@/styles/var.scss';

.sidebar-container {
  transition: width 0.28s;
  height: 100vh;
  // height: calc(100vh - #{$header-height});
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: $sidebar-width;
  flex-shrink: 0;
  position: fixed;
  left: 0;
  // top: $header-height;
  top: 0;
  z-index: 100;
  .el-scrollbar {
    height: calc(100vh - #{$header-height});
    background-color: $menu-bg-color;
  }
  .el-scrollbar__wrap {
    overflow: auto;
    padding-bottom: 50px;
  }
  .title-logo {
    background-color: $background-color-header;
    height: $header-height;
    display: flex;
    align-items: center;
    .title {
      color: #fff;
      font-size: 18px;
      margin-left: 20px;
      white-space: nowrap;
      // overflow: hidden;
      // text-overflow: ellipsis;
    }
  }

  .el-menu {
    box-sizing: border-box;
    flex: 1;
    border: none;
    height: 100% !important;
    width: 100% !important;
  }

  .el-menu-item {
    &:hover {
      color: $menu-active-text-color !important;
      background-color: transparent !important;
    }

    &.is-active {
      background-color: $color-primary !important;
    }
  }

  [class*='icon'] {
    font-size: 14px;
    margin-right: 5px;
  }

  .side-bar-title {
    visibility: visible;
  }

  // 折叠
  &.hideSidebar {
    width: $sidebar-min-width !important;

    .side-bar-title {
      visibility: hidden;
    }

    .logo {
      padding-left: 13px;
    }

    .scrollbar-wrapper {
      height: calc(100vh - 60px - 50px);
    }

    .el-submenu__title {
      text-align: left;
    }

    // 有子菜单
    .sub-menu-title,
    .el-submenu__icon-arrow {
      display: none !important;
    }

    [class*='icon'] {
      font-size: 16px;
      margin: 0;
    }

    .fix-btn-wrap {
      .btn-icon {
        transform: rotate(0deg);
      }
    }
    .menu-title {
      display: none;
    }
  }

  // when menu collapsed
  .menu--vertical {
    // the scroll bar appears when the subMenu is too long
    > .menu--popup {
      max-height: 100vh;
      overflow-y: auto;

      &::-webkit-scrollbar {
        width: 6px;
      }

      &::-webkit-scrollbar-thumb {
        border-radius: 20px;
      }
    }
  }
}
</style>
