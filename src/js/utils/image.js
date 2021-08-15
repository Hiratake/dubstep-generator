// image.js

'use strict'

/**
 * ファイルから画像のHTMLImageElementを生成する関数
 * @param {Object} file アップロードされたファイル
 * @returns {Object} 画像のHTMLImageElement
 */
export const createUploadImageElement = (file) => {
  return new Promise((resolve, reject) => {
    const elem = new Image()
    const reader = new FileReader()
    if (!file) {
      reject(Error('File is not found.'))
    }
    elem.file = file
    reader.onload = (e) => {
      elem.src = e.target.result
      elem.onload = () => {
        resolve(elem)
      }
    }
    reader.readAsDataURL(file)
  })
}

/**
 * 対応している画像ファイルであるかどうかを判定する関数
 * @param {Object} file アップロードされたファイル
 * @returns {Boolean} 対応している画像ファイルであるか
 */
export const validateImageFormat = (file) => {
  if (!file) {
    return false
  }
  const arr = ['image/jpeg', 'image/png']
  return file.type && arr.includes(file.type)
}
