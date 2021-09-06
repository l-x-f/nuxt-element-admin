<template>
  <el-header :height="HEADER_HEIGHT" class="layout-header">
    <section class="layout-header-content">
      <div
        class="fix-btn-wrap"
        :style="{
          left: !sidebar ? SIDEBAR_WIDTH : SIDEBAR_MIN_WIDTH,
          paddingLeft: '10px'
        }"
      >
        <div class="collapse-btn" @click="toggleSideBar">
          <i v-if="sidebar" class="el-icon-s-unfold"></i>
          <i v-else class="el-icon-s-fold"></i>
        </div>
        <!-- 面包屑 -->
        <AppBreadcrumb />
      </div>

      <div class="right-content action">
        <!-- 重载 -->
        <i
          v-show="showRefresh"
          class="fa fa-refresh"
          aria-hidden="true"
          title="刷新"
          @click="handleRefresh"
        ></i>

        <!-- 设置语言 -->
        <SetLanguage />

        <el-dropdown placement="bottom-end" trigger="click">
          <span class="dropdown-area">
            <img v-show="headImg" :src="headImg" class="avatar" alt="" />
            <p class="username">{{ userInfo.name }}</p>
            <i class="el-icon-caret-bottom el-icon--right"></i>
          </span>

          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="handleLogout">
              退出登录
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </section>
  </el-header>
</template>

<script>
import {
  HEADER_HEIGHT,
  SIDEBAR_WIDTH,
  SIDEBAR_MIN_WIDTH
} from '@/styles/var.scss'
import { mapActions, mapGetters } from 'vuex'
import SetLanguage from '@/components/SetLanguage'
// import logo from '@/static/logo.png'
import EventEmitter, { Refresh } from '@/utils/eventEmitter'
import { fileDownload } from '@/api/file'
import AppBreadcrumb from './AppBreadcrumb'
export default {
  name: 'LayoutHeader',
  components: {
    SetLanguage,
    AppBreadcrumb
  },
  data() {
    return {
      HEADER_HEIGHT,
      SIDEBAR_WIDTH,
      SIDEBAR_MIN_WIDTH,
      avatar: '',
      headImg: ''
    }
  },
  computed: {
    ...mapGetters('app', ['sidebar']),
    ...mapGetters(['userInfo']),
    showRefresh() {
      return this.$route.path === '/home/homePage'
    }
  },
  mounted() {
    const { headImg } = this.userInfo
    if (headImg && headImg.startsWith('saifu/')) {
      this.getHeadImg()
    }
  },
  methods: {
    async getHeadImg() {
      try {
        const { data } = await this.$axios(fileDownload(this.userInfo.headImg))
        this.headImg = data
      } catch (error) {}
    },

    handleRefresh() {
      // 发布事件
      EventEmitter.emit(Refresh)
    },
    ...mapActions(['app/toggleSideBar', 'logout']),
    // 切换侧边栏
    toggleSideBar() {
      this['app/toggleSideBar']()
    },
    //  退出登录
    async handleLogout() {
      try {
        await this.logout()
        this.$message.success(this.$t('login.logoutSuccessTip'))
      } catch (error) {}
    },
    handleTitle() {}
  }
}
</script>

<style lang="scss">
@import '~@/styles/var.scss';

.layout-header {
  width: 100%;
  min-width: calc(#{$min-width} + 10px);
  // background-color: $background-color-header;
  background-color: #fff;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  user-select: none;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;

  .iconfont {
    font-size: 20px;
  }
  .fa-refresh {
    background-color: rgba(0, 0, 0, 0.1);
    color: #000;
    border-radius: 50%;
    box-sizing: border-box;
    width: 24px;
    height: 24px;
    line-height: 24px;
    padding: 0;
    text-align: center;
    user-select: none;
    cursor: pointer;
    margin-right: 10px;
  }

  .layout-header-content {
    height: 100%;
    margin: 0 auto;

    .navigation {
      color: $color-text-secondary;
      justify-content: center;

      .navigation-menu {
        height: 100%;
        margin: 0 16px;
        line-height: $header-height;
        cursor: pointer;
        position: relative;

        &:hover {
          color: $color-white;
        }

        &.active {
          color: $color-white;

          &::after {
            content: '';
            position: absolute;
            bottom: 4px;
            display: block;
            width: 100%;
            height: 2px;
            background-color: $color-white;
            border-radius: 2px;
          }
        }
      }
    }

    .action {
      justify-content: flex-end;
      color: #fff;

      .icon-button {
        background-color: transparent;
        border: none;
        width: 40px;
        height: 100%;
        color: inherit;
        margin: 0;
        font-size: 16px;

        + .icon-button {
          margin-left: 8px;
        }

        &:hover {
          color: $color-white;
        }
      }

      .dropdown-area {
        display: flex;
        align-items: center;
        color: $color-text-secondary;
        margin-left: 16px;
        cursor: pointer;
        .avatar {
          width: 24px;
          height: 24px;
          border-radius: 50%;
        }

        &:hover {
          color: #606266;
        }
      }

      .username {
        margin-left: 8px;
        width: 50px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
    }

    .title {
      color: $color-white;
      font-size: 20px;
      line-height: $header-height;
      cursor: pointer;
    }
  }
  .right-content {
    height: $header-height;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: fixed;
    width: 270px;
    top: 0;
    right: 20px;
    padding: 10px;
  }
  .fix-btn-wrap {
    position: fixed;
    top: 2px;
    left: 200px;
    padding: 10px 10px 10px 0;
    transition: all 0.3s;
    display: flex;
    .collapse-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      // background: $background-color-header;
      cursor: pointer;
      font-size: 24px;
      color: #606266;
    }

    .btn-icon {
      transform: rotate(180deg);
      font-size: 16px;
      width: 16px;
    }
  }
}
</style>
