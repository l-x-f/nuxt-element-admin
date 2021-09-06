<template>
  <!--  eslint-disable vue/no-v-html  -->
  <div>
    <app-big-image
      v-if="bigImageVisible"
      :img-src="bigImageSrc"
      @clickit="handelClickToDisableBigImage()"
    />
    <div v-if="label" class="margin-bottom-20 font-size-18">{{ label }}</div>
    <el-table
      :ref="ref"
      v-loading="listLoading"
      :reserve-selection="true"
      :row-key="rowKey"
      class="width-percentage-100"
      :data="tableData"
      :border="isBorder"
      :stripe="isStripe"
      highlight-current-row
      size="small"
      empty-text="暂无数据"
      :default-sort="defaultSort"
      :element-loading-text="loadingText"
      :header-cell-style="handleHeaderStyle"
      @selection-change="handleSelectionChange"
      @sort-change="handleSortChange"
      @current-change="handleTableCurrentChange"
    >
      <el-table-column v-if="isSelection" type="selection" width="55" />
      <el-table-column
        v-if="isShowNumber"
        label="#"
        fixed="left"
        type="index"
        class="custom-fixed-column"
        :index="tableIndex"
        width="80"
      />
      <el-table-column
        v-for="(item, index) in config"
        :key="index"
        :prop="item.prop"
        :label="item.label"
        :width="item.width"
        :sortable="item.sortable"
        :show-overflow-tooltip="!!item.showOverflowTooltip"
      >
        <template slot-scope="scope">
          <!-- format = icon, 显示图片 -->
          <span v-if="item.format == 'img'">
            <img
              title="点击查看大图"
              alt="图片"
              class="image-size"
              :src="scope.row[item.prop]"
              @click="handelClickToEnlargeImage($event)"
            />
          </span>

          <span
            v-else-if="item.format == 'link'"
            class="link"
            @click="item.click(scope.row)"
          >
            {{ scope.row[item.prop] }}
          </span>

          <!-- 格式化时间 -->
          <span v-else-if="item.format == 'time' && scope.row[item.prop]">
            {{ scope.row[item.prop] | parseDatetime }}
          </span>

          <!-- 格式化金钱 -->
          <span v-else-if="item.format == 'money'">
            {{ scope.row[item.prop] | parseMoney }}
          </span>

          <!-- a -->
          <span v-else-if="item.format == 'a'">
            <a
              :href="scope.row[item.prop]"
              class="link"
              target="_blank"
              rel="noopener noreferrer"
            >
              {{ scope.row[item.prop] }}
            </a>
          </span>

          <!-- input -->
          <span v-else-if="item.format == 'input'">
            <el-input
              v-model="scope.row[item.prop]"
              :placeholder="$t('app.pleaseEnter')"
              clearable
            ></el-input>
          </span>

          <!-- 没有format -->
          <span v-else>{{ scope.row[item.prop] }}</span>
        </template>
      </el-table-column>

      <el-table-column
        v-if="isHasButtons"
        class="clearfix custom-fixed-column"
        :width="optionColumnWidth + 'px'"
        fixed="right"
        label="操作"
      >
        <template slot-scope="scope">
          <!-- 自定义按钮 -->
          <slot name="custom-button" :row="scope.row"></slot>
          <span
            v-for="(option, index) in getOptionsName(scope.row.buttonKey).slice(
              0,
              buttonCount
            )"
            :key="index"
            class="button-margin-left"
          >
            <a
              class="link"
              @click="
                handleClickOption(scope.$index, scope.row, option, $event)
              "
            >
              <span v-html="getButtonHtml(option)" />
            </a>
          </span>

          <el-dropdown
            v-if="getOptionsName(scope.row.buttonKey).length > buttonCount"
            trigger="click"
          >
            <span class="el-dropdown-link">
              {{ $t('app.more') }}
              <i class="el-icon-arrow-down el-icon--right" />
            </span>
            <el-dropdown-menu slot="dropdown" class="custom-dropdown-menu">
              <el-dropdown-item
                v-for="(option, index) in getOptionsName(
                  scope.row.buttonKey
                ).slice(buttonCount)"
                :key="index"
                class="custom-dropdown-menu-item"
              >
                <span
                  class="link"
                  @click="
                    handleClickOption(scope.$index, scope.row, option, $event)
                  "
                >
                  <span v-html="getButtonHtml(option)" />
                </span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div v-if="isShowPagination && total > 0" class="pagination-container">
      <el-pagination
        :current-page="page"
        :page-sizes="pageSizeList"
        :page-size="limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
// 表格组件
import AppBigImage from '@/components/BigImage'

export default {
  name: 'AppTable',
  components: {
    AppBigImage
  },
  props: {
    // 是否需要序号
    isShowNumber: {
      type: Boolean,
      default: true
    },
    // 是否需要翻页组件
    isShowPagination: {
      type: Boolean,
      default: true
    },
    // 是否需要栅格
    isBorder: {
      type: Boolean,
      default: false
    },
    // 是否
    isStripe: {
      type: Boolean,
      default: true
    },
    // 是否是多选表格，默认非多选 :ref="'multipleTable'"
    isSelection: {
      type: Boolean,
      default: false
    },
    // 是否有操作按钮
    isHasButtons: {
      type: Boolean,
      default: true
    },
    // 是否有设置按钮
    isHasSetup: {
      type: Boolean,
      default: false
    },
    // 表头名称
    label: {
      default: null,
      type: String
    },
    // 表格数据
    tableData: {
      type: Array,
      default: () => []
    },
    // 表格配置信息
    config: {
      type: Array,
      default: () => []
    },
    load: {
      type: String,
      default: 'id'
    },
    // 表格操作列
    options: {
      type: Array,
      default: null
    },
    // loading提示框
    loadingText: {
      type: String,
      default: '加载中...'
    },
    // loading状态
    loadingStatus: {
      type: Boolean,
      default: false
    },
    // 表格查询列表参数
    listQueryParams: {
      default: null,
      type: Object
    },
    // 根据当前行的状态显示按钮的名称
    buttonsName: {
      default: null,
      type: Object
    },
    setupButtonName: {
      default: null,
      type: Object
    },
    // 操作列表宽度，如果设置了，就证明有操作列表
    optionColumnWidth: {
      type: Number,
      default: 100
    },
    // 显示的操作栏按钮个数
    buttonCount: {
      type: Number,
      default: 3
    },
    // 分页数据
    pageSizeList: {
      type: Array,
      default() {
        return [20, 30, 50, 100]
      }
    },
    // 排序数据
    defaultSort: {
      type: Object,
      default() {
        return {}
      }
    },
    // rowKey
    rowKey: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      bigImageVisible: false
    }
  },
  computed: {
    // 看是否是多选表格
    ref() {
      return this.isSelection ? 'multipleTable' : undefined
    },
    // 第几页
    page() {
      return this.listQueryParams.page
    },
    // 每页数据数
    limit() {
      return this.listQueryParams.limit
    },
    // 数据总数
    total() {
      return this.listQueryParams.total
    },
    // 获取当前loading的状态
    listLoading() {
      return this.loadingStatus
    }
  },
  methods: {
    // 根据按钮的名称，获取按钮的html样式
    getButtonHtml(name) {
      return name
    },
    // 选中哪一个
    handleSelectionChange(val) {
      this.$emit('subSelected', val)
    },
    // 选中表格行
    handleTableCurrentChange(val) {
      this.$emit('subCurrent', val)
    },
    // 排序
    handleSortChange(val) {
      this.$emit('subSortChange', val)
    },
    // 点击按钮传递给父组件
    handleClickOption(index, row, option, e) {
      this.$emit('subOpitonButton', index, row, option, e)
    },
    // 改变翻页组件中每页数据总数
    handleSizeChange(val) {
      this.listQueryParams.limit = val
      // 改变翻页数目，必须将页面=1
      this.listQueryParams.page = 1
      this.$emit('update:listQueryParams', this.listQueryParams)
      this.$emit('subClickPagination', this.listQueryParams)
    },
    // 跳到当前是第几页
    handleCurrentChange(val) {
      this.listQueryParams.page = val
      this.$emit('update:listQueryParams', this.listQueryParams)
      this.$emit('subClickPagination', this.listQueryParams)
    },
    // 设置表头样式
    handleHeaderStyle() {
      return { backgroundColor: '#e5e9f2', color: '#333' }
    },
    // 获取当前操作的按钮组
    getOptionsName(key) {
      // 如果父组件定义了按钮的状态
      if (this.buttonsName) {
        return this.buttonsName[key] || []
      } else {
        return []
      }
    },
    // 获取当前设置的按钮组
    getsetupName(key) {
      // 如果父组件定义了按钮的状态
      if (this.setupButtonName) {
        return this.setupButtonName[key] || []
      } else {
        return []
      }
    },
    // 点击放大图片
    handelClickToEnlargeImage(e) {
      this.bigImageVisible = true
      this.bigImageSrc = e.currentTarget.src
    },
    // 隐藏放大图
    handelClickToDisableBigImage() {
      this.bigImageVisible = false
    },
    // 重写索引生成方法
    tableIndex(index) {
      const i = (this.page - 1) * this.limit + index + 1
      return i
    }
  }
}
</script>

<style lang="scss" scoped>
.custom-fixed-column {
  background-color: #ccc;
}
.expand-content {
  padding: 20px;
}
.pagination-container {
  margin: 50px 30px 0;
  height: 50px;
  line-height: 50px;
}

.el-dropdown {
  cursor: pointer;
  margin-left: 20px;

  .el-dropdown-link {
    user-select: none;
    cursor: pointer;
    font-size: 12px;
  }
}
.image-size {
  width: 30px;
  height: 30px;
  cursor: pointer;
}

.button-margin-left {
  margin-left: 8px;
}
</style>

<style lang="scss">
.el-table .cell.el-tooltip {
  max-width: 300px;
}

.el-table__expanded-cell[class*='cell'] {
  padding: 0;
}
.custom-dropdown-menu {
  .custom-dropdown-menu-item {
    // margin-top: 10px;
    text-align: center;
  }
  .el-dropdown-menu__item:focus,
  .el-dropdown-menu__item:not(.is-disabled):hover {
    background-color: #fff;
    color: #fff;
  }
}
.link {
  cursor: pointer;
  color: #4876ff;
  user-select: none;
}
</style>
