<template>
  <div title="切换语言">
    <el-dropdown trigger="click">
      <span class="el-dropdown-link">
        <i class="fa fa-language" aria-hidden="true"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item v-for="(item, key) in langes" :key="key">
          <nuxt-link
            class="item"
            :class="{ active: key === language }"
            :to="switchLocalePath(key)"
          >
            <span @click="handleClick(key)">
              {{ item.langeName }}
            </span>
          </nuxt-link>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
// 设置语言组件
import { mapActions, mapGetters } from 'vuex'
import { langes } from '@/locales'

export default {
  name: 'SetLanguage',
  data() {
    return { langes }
  },
  computed: {
    ...mapGetters('app', ['language'])
  },
  created() {},
  methods: {
    ...mapActions(['app/setLanguage']),
    handleClick(key) {
      this['app/setLanguage'](key)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/var.scss';
.fa-language {
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
}
.item {
  text-decoration: none;
  color: $color-text-main;
}
.active {
  color: #409eff;
}
</style>
