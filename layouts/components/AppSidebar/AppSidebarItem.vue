<template>
  <div v-if="!item.hidden" class="menu-wrapper">
    <!-- 没有子菜单的情况 -->
    <template v-if="!item.children">
      <el-menu-item :key="item.path" :index="item.path">
        <i v-if="item.icon" :class="item.icon"></i>
        <svg-icon
          v-if="!item.icon && item.svgIcon"
          :icon-class="item.svgIcon"
        ></svg-icon>
        <span slot="title" :class="{ 'menu-title': sidebar }">
          {{ item.name }}
        </span>
      </el-menu-item>
    </template>

    <!-- 有子菜单的情况 -->
    <el-submenu
      v-else
      ref="subMenu"
      :key="item.path"
      :index="item.path"
      popper-append-to-body
    >
      <template slot="title">
        <i v-if="item.icon" :class="item.icon"></i>
        <svg-icon
          v-if="!item.icon && item.svgIcon"
          :icon-class="item.svgIcon"
        ></svg-icon>
        <span :class="{ 'menu-title': sidebar }">
          {{ item.name }}
        </span>
      </template>
      <app-sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :index="child.path"
        :is-nest="true"
        :item="child"
        class="nest-menu"
      />
    </el-submenu>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'AppSidebarItem',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters('app', ['sidebar']),
    showTooltip() {
      return this.sidebar
    }
  }
}
</script>

<style lang="scss" scoped>
.menu-title {
  display: inline-block;
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
