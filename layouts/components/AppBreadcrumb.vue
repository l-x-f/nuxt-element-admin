<template>
  <el-header class="breadcrumb-header" :height="BREADCRUMB_HEIGHT">
    <el-breadcrumb class="bread-crumb">
      <el-breadcrumb-item
        v-for="(item, index) of breads"
        :key="index"
        :to="index == 0 && !item.redirect ? '' : item.redirect || item.path"
      >
        {{ item.name }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </el-header>
</template>

<script>
// 面包屑
import { mapGetters } from 'vuex'
import { BREADCRUMB_HEIGHT } from '@/styles/var.scss'
import { generateRouter } from '@/utils'
import routers from '@/routers'

export default {
  name: 'BreadCrumb',
  data() {
    return {
      BREADCRUMB_HEIGHT
    }
  },
  computed: {
    ...mapGetters('app', ['breads', 'language'])
  },
  // 监听路由设置面包屑
  watch: {
    '$route.fullPath': {
      handler() {
        const { fullPath } = this.$route
        const breadcrumb = fullPath
          .split('/')
          .filter(item => item)
          .filter(item => item !== this.language && item !== 'index')
        const res = generateRouter(breadcrumb, routers)
        this.$store.dispatch('app/setBreadcrumb', res)
      },
      immediate: true
    }
  },
  mounted() {}
}
</script>

<style>
.breadcrumb-header {
  display: flex;
  align-items: center;
}
.el-breadcrumb__inner {
  color: rgb(167, 168, 173);
}
.el-breadcrumb__inner a,
.el-breadcrumb__inner.is-link {
  font-weight: 700;
  text-decoration: none;
  transition: color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  color: #606266;
}
.el-breadcrumb__item:last-child .el-breadcrumb__inner,
.el-breadcrumb__item:last-child .el-breadcrumb__inner a,
.el-breadcrumb__item:last-child .el-breadcrumb__inner a:hover,
.el-breadcrumb__item:last-child .el-breadcrumb__inner:hover {
  font-weight: 400;
  color: #606266;
  cursor: text;
}
</style>
