<template>
  <div class="app-search-warp">
    <!-- 数据检索 -->
    <el-card style="padding: 10px">
      <el-row :gutter="40" class="custom-row">
        <slot />
      </el-row>

      <!-- 检索按钮 -->
      <el-row class="margin-top-10 margin-bottom-10">
        <div class="search-component">
          <el-button
            type="primary"
            size="small"
            :loading="searchLoading"
            class="w-90 margin-right-40"
            @click="handleSearch"
          >
            <i class="fa fa-search" /> {{ $t('app.search') }}
          </el-button>
          <el-button
            v-if="hasClearSearch"
            size="small"
            class="w-90"
            @click="handleClear"
          >
            <i class="fa fa-trash" /> {{ $t('app.reset') }}
          </el-button>
        </div>
      </el-row>

      <el-row class="margin-top-20">
        <el-button
          v-if="hasAddSearch"
          type="primary"
          size="small"
          class="w-90"
          @click="handleAdd"
        >
          <i class="fa fa-add" /> {{ addText }}
        </el-button>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'AppSearchWarp',
  props: {
    labelWidth: {
      default: 80,
      type: Number
    },
    searchLoading: {
      default: false,
      type: Boolean
    },
    hasClearSearch: {
      default: true,
      type: Boolean
    },
    hasAddSearch: {
      default: false,
      type: Boolean
    },
    addText: {
      default() {
        return this.$t('app.add')
      },
      type: String
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
    },
    // 新增
    handleAdd() {
      this.$emit('subAdd')
    }
  }
}
</script>

<style lang="scss" scoped>
.search-component {
  text-align: center;
}
.custom-row {
  display: flex;
  flex-wrap: wrap;
}
.w-90 {
  min-width: 90px;
}
</style>
