<template>
  <div class="custom-upload">
    <input
      :id="id"
      type="file"
      style="display: none"
      name="single"
      :accept="accept"
      @change="onChange"
    />
    <el-button
      v-if="buttonType === 'button'"
      size="small"
      type="primary"
      :loading="loading"
      @click="handleOpenFile()"
    >
      <i class="fa fa-upload" />
      {{ buttonText }}
    </el-button>

    <span v-else @click="handleOpenFile()">
      <slot />
    </span>
    <div v-if="tips" class="tips clear-margin-top">{{ tips }}</div>
  </div>
</template>

<script>
// 自动上传文件组件
import {
  isAppropriateResolution,
  isAppRatio,
  isLegalFile,
  isMaxFileSize
} from '@/utils/upload'
import {
  fileUpload as uploadImage,
  fileDownload,
  publicFileUpload
} from '@/api/file'
import { Message } from 'element-ui'

export default {
  name: 'AppUpload',
  props: {
    // accept
    accept: {
      type: String,
      default: 'image/*'
    },
    // 是否开启类型强制限制
    isFileTypes: {
      type: Boolean,
      default: false
    },
    // 文件类型限制，默认限制为图片
    fileTypes: {
      type: Array,
      default: () => [
        'image/png',
        'image/gif',
        'image/jpeg',
        'image/jpg',
        'image/bmp',
        'image/x-icon'
      ]
    },
    //  按钮文字
    buttonText: {
      type: String,
      default: '添加文件'
    },
    //  按钮类型
    buttonType: {
      type: String,
      default: 'button'
    },
    // 最大上传文件的大小 单位 M
    maxFileSize: {
      type: Number,
      default: 5
    },
    // 提示内容
    tips: {
      default: '',
      type: String
    },
    // 图片文件分辨率的宽度
    width: {
      type: Number,
      default: 460
    },
    // 图片文件分辨率的高度
    height: {
      type: Number,
      default: 300
    },
    // 是否限制分辨率
    isResolution: {
      type: Boolean,
      default: false
    },
    // 是否限制比列
    isRatio: {
      type: Boolean,
      default: false
    },
    // 是否需要下载文件
    hasFileDownload: {
      type: Boolean,
      default: true
    },
    // 是否公开
    isPublic: {
      type: Boolean,
      default: false
    },
    // 比列
    ratio: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      id: 'upload-input-' + +new Date(),
      loading: false
    }
  },
  methods: {
    // 打开文件
    handleOpenFile() {
      const input = document.getElementById(this.id)
      // 解决同一个文件不能监听的问题
      input.addEventListener(
        'click',
        function () {
          this.value = ''
        },
        false
      )
      // 点击input
      input.click()
    },
    // 选择好文件
    async onChange($event) {
      this.loading = true
      const file = $event.target.files[0]
      if (!file) {
        this.loading = false
        return Message.error('选择文件失败')
      }

      // 限制文件类型
      if (
        this.isFileTypes &&
        this.fileTypes.length &&
        !isLegalFile(file, this.fileTypes)
      ) {
        this.loading = false
        return
      }

      // 限制文件上传大小，maxFileSize 存在则限制
      if (this.maxFileSize && !isMaxFileSize(file, this.maxFileSize)) {
        this.loading = false
        return
      }

      try {
        // 限制图片分辨率 ，如果填写了width和height，且开启了isResolution
        if (this.width !== 0 && this.height !== 0 && this.isResolution) {
          await isAppropriateResolution(file, {
            width: this.width,
            height: this.height
          })
        }

        // 限制图片比列，ratio存在，开启isRatio
        if (this.isRatio && this.ratio && this.ratio.length === 2) {
          await isAppRatio(file, this.ratio)
        }
        this.upload(file)
      } catch (error) {
        Message.error(error.message || '上传失败')
        console.log(error)
        this.loading = false
      }
    },

    // 自定义上传
    async upload(file) {
      try {
        // 创建formData
        const formData = new FormData()
        // 文件时间戳
        const date = Date.parse(new Date())
        // 文件名
        const filename = `${date}.${file.name}`
        // 需要上传的文件file
        formData.append('file', file, filename)
        const { data: path } = await this.$axios(
          this.isPublic ? publicFileUpload(formData) : uploadImage(formData)
        )
        let allPath = ''
        if (this.hasFileDownload) {
          const { data } = await this.$axios(fileDownload(path))
          allPath = data
        }
        const obj = {
          originPath: path,
          allPath,
          file,
          size: file.size,
          name: file.name
        }
        this.$emit('subUploadSucceed', obj)
        Message.success('上传成功')
        this.loading = false
      } catch (error) {
        this.loading = false
        console.log(error)
        Message.error(error.message || '上传失败')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.custom-upload {
  .tips {
    margin-top: 10px;
    color: red;
    font-size: 12px;
  }

  .clear-margin-top {
    margin-top: 0;
  }
}
</style>
