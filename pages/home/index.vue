<template>
  <div>
    <app-table
      :list-query-params="listQueryParams"
      :config="tableConfig"
      :table-data="tableData"
      :option-column-width="160"
      :buttons-name="buttonsName"
    ></app-table>
  </div>
</template>

<script>
import tableMixin from '@/mixins/tableMixin'
import AppTable from '@/components/Table'

export default {
  name: 'HomeIndex',
  components: {
    AppTable
  },
  mixins: [tableMixin],
  data() {
    return {
      // 表格按钮数组
      buttonsName: {
        normal: ['查看', '编辑', '排序'],
        special: ['查看', '编辑', '排序', '删除']
      },
      tableConfig: [
        {
          label: '名称',
          width: '120px',
          prop: 'title'
        },
        {
          label: '时间',
          prop: 'time'
        }
      ]
    }
  }
}
</script>
