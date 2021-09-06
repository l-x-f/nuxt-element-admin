<template>
  <div>
    <div
      class="search-component"
      :style="paddingLeft >= 0 ? 'padding-left:' + paddingLeft : ''"
    >
      <el-button type="primary" size="small" @click="handleSearch()">
        <i class="fa fa-search" /> {{ $t('app.search') }}
      </el-button>
      <el-button size="small" @click="handleClear()">
        <i class="fa fa-trash" /> {{ $t('app.reset') }}
      </el-button>
    </div>
  </div>
</template>

<script>
// 筛选，清除按钮组
export default {
  props: {
    paddingLeft: {
      default: '',
      type: [Number, String]
    }
  },
  methods: {
    // 筛选事件
    handleSearch() {
      this.$emit('subSearch')
    },
    // 清除事件
    handleClear() {
      this.$emit('subClear')
    }
  }
}
</script>
