<template>
  <div>
    <el-dialog
      ref="dialog"
      top="20vh"
      :title="title"
      :before-close="cancelDialog"
      :visible.sync="dialogVisible"
      width="400px"
      center
    >
      <span class="padding-left-10">
        {{ $t('app.number') }}
        ：</span
      >
      <el-input-number
        v-model="inputValue"
        :placeholder="$t('app.pleaseEnter')"
        :min="0"
        :max="2 ** 53 - 1"
        style="width: 240px"
      />
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" size="small" @click="save">
          <i class="fa fa-sort" />
          {{ $t('app.confirm') }}
        </el-button>
        <el-button size="small" @click="cancelDialog">
          <i class="fa fa-history" />
          {{ $t('app.cancel') }}
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: {
    dialogVisible: {
      required: true,
      default: false,
      type: Boolean
    },
    title: {
      default() {
        return this.$t('btn.edit') + this.$t('app.number')
      },
      type: String
    },
    sortValue: {
      default: null,
      type: [Number, String]
    }
  },
  data() {
    return { inputValue: '' }
  },
  watch: {
    sortValue(val) {
      this.inputValue = Number(val)
    },
    inputValue(val) {
      this.$emit('update:sortValue', Number(val))
    }
  },
  created() {
    this.inputValue = Number(this.sortValue)
  },
  methods: {
    save() {
      if (!this.inputValue && this.inputValue !== 0) {
        this.$message.warning(this.$t('app.pleaseEnter'))
        return
      }
      this.$emit('save', this.inputValue)
    },
    cancelDialog() {
      this.inputValue = null
      this.$emit('cancel')
    }
  }
}
</script>
