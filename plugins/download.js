import FileSaver from 'file-saver'
import Vue from 'vue'

const fileName = +new Date() + '.xls'

/**
 * @description 下载文件
 * @param data
 * @param filename
 * @param options
 */
const download = (data, filename = fileName, options) => {
  FileSaver.saveAs(data, filename, options)
}

Vue.prototype.$download = download
