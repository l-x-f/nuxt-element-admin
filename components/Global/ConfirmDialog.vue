<template>
  <div>
    <el-dialog
      ref="dialog"
      top="30vh"
      :title="title"
      :before-close="cancelDialog"
      :visible.sync="dialogVisible"
      width="30%"
      left
    >
      <div class="text-center">{{ text }}</div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="cancelDialog">
          <i class="fa fa-history" />
          {{ $t('app.cancel') }}
        </el-button>
        <el-button
          size="small"
          type="primary"
          :loading="loading"
          @click="deleteConfirm"
        >
          <i class="fa fa-check" />
          {{ $t('app.confirm') }}
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
    noClearIds: {
      default: true,
      type: Boolean
    },
    text: {
      default: '请确认是否执行本次操作？',
      type: String
    },
    loading: {
      default: false,
      type: Boolean
    },
    title: {
      default: '重要提示',
      type: String
    }
  },
  methods: {
    deleteConfirm() {
      this.$emit('confirm')
    },
    cancelDialog() {
      this.$emit('cancel')
    }
  }
}
</script>

<style lang="scss" scoped>
.text-center {
  text-align: center;
}
button {
  width: 70px;
  margin: 0 20px;
}
</style>
