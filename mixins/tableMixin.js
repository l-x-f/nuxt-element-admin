import AppTable from '@/components/Table'
import { DefaultTableQuery, data } from '@/utils/table'

export default {
  components: {
    AppTable
  },
  computed: {
    // 表格默认属性
    defaultTableAttrs() {
      return {
        config: this.tableConfig,
        tableData: this.tableData,
        loadingStatus: this.loadingStatus,
        buttonsName: this.buttonsName,
        optionColumnWidth: this.optionWidth,
        setupColumnWidth: this.setupWidth,
        setupButtonName: this.setupButtonName
      }
    },
    // 表格默认事件
    defaultTableEvent() {
      return {
        subOpitonButton: this.handleTableOption,
        subClickPagination: this.handleRefreshList
      }
    }
  },
  data() {
    return {
      // 默认的操作栏宽度
      optionWidth: 200,
      // 表格加载laoding
      loadingStatus: false,
      // 按钮操作
      buttonsName: {},
      setupButtonName: {},
      // 表格数据
      tableData: [],
      // 表格的查询属性
      listQueryParams: { ...DefaultTableQuery }
    }
  },
  mounted() {
    const isShow = true
    // 测试数据
    if (isShow) {
      const tableData = [...data]
      const listQueryParams = { ...DefaultTableQuery, total: 5 }
      tableData.forEach(val => {
        val.buttonKey = 'normal'
      })
      this.tableData = tableData
      this.listQueryParams = listQueryParams
    }
  },
  methods: {
    // 重新刷新列表
    handleRefreshList() {
      this.getList()
    },
    handleTableOption() {}
  }
}
