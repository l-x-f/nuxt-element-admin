<template>
  <!--  eslint-disable vue/no-v-html  -->
  <div class="html-parse-component" v-html="content"></div>
</template>

<script>
import axios from 'axios'
import { fileDownload } from '@/api/file'
import { http2https } from '@/utils'
export default {
  name: 'HtmlParse',
  props: {
    html: {
      type: String,
      default: ''
    }
  },
  data() {
    return { content: '' }
  },
  watch: {
    html(val) {
      this.getHtml(val)
    }
  },
  mounted() {
    this.getHtml(this.html)
  },
  methods: {
    async getHtml(html) {
      if (html && typeof html === 'string' && html.endsWith('.html')) {
        try {
          const { data: path } = await this.$axios(fileDownload(html))
          const isProd = process.env.NUXT_APP_MODE === 'production'
          const formatPath = isProd ? http2https(path) : path
          const { data } = await axios.get(formatPath)
          this.content = data
        } catch (error) {
          this.content = '服务器错误'
        }
      } else {
        this.content = html
      }
    }
  }
}
</script>

<style lang="scss">
.html-parse-component {
  color: #303133;
  img {
    max-width: 100%;
  }
}
</style>
