/* eslint-disable no-unused-vars */
import { fileDownload } from '@/api/file'
import Vue from 'vue'

const setImge = (el, value, $axios) => {
  if (value && typeof value === 'string') {
    if (value.startsWith('http')) {
      el.src = value
      return
    }
    if (value.startsWith('saifu/')) {
      $axios(fileDownload(value))
        .then(res => {
          el.src = res.data
        })
        .catch(() => {})
    }
  }
}

// 图片根据半路径自动下载全路径
export default function ({ $axios }) {
  Vue.directive('src', {
    inserted(el, { value }) {
      setImge(el, value, $axios)
    },
    update(el, { value, oldValue }) {
      if (oldValue !== value) {
        setImge(el, value, $axios)
      }
    }
  })
}
