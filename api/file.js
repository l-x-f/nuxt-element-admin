import axios from 'axios'
const COMMON = '/'
// 文件上传
export function fileUpload(formData) {
  return {
    url: `${COMMON}/file/upload`,
    method: 'post',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }
}

// 公开文件上传
export function publicFileUpload(formData) {
  return {
    url: `${COMMON}/file/public/upload`,
    method: 'post',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }
}

// 文件下载
export function fileDownload(path) {
  return {
    url: `${COMMON}/file/download`,
    method: 'get',
    params: { path }
  }
}

// 获取HTML文件内容
export function getHtmlContent(url) {
  return axios({
    url,
    method: 'get'
  })
}

// 批量文件下载
export function batchFileDownload(paths) {
  return {
    url: '/file/download/list',
    method: 'get',
    params: { paths: String(paths) }
  }
}
