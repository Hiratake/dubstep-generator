// file.js

'use strict'

/**
 * @param {Object} file ファイルオブジェクト
 * @returns {Boolean} ファイルの形式がJPEGもしくはPNG形式であるか
 */
const checkFormat = (file) => {
  return typeof file !== 'undefined' && file.type
    ? !!(file.type === 'image/jpeg' || file.type === 'image/png')
    : false
}

/**
 * @param {Object} options オプション
 * @param {String} options.targetId 対象となるファイル形式のインプットタグのID
 * @param {String} options.dropAreaId 対象となるドラッグ＆ドロップエリアのID
 * @param {Function} callback 画像が選択された場合に実行される関数
 */
module.exports = (options = {}, callback = null) => {
  const targetId = options.targetId ? options.targetId : ''
  const dropAreaId = options.dropAreaId ? options.dropAreaId : ''
  const dragoverClass = options.dragoverClass
    ? options.dragoverClass
    : 'is-dragover'

  if (!targetId) {
    throw Error('Target is not specified.')
  }

  const target = document.getElementById(targetId)
  const dropArea = dropAreaId ? document.getElementById(dropAreaId) : null

  if (!target) {
    throw Error('Target is not found.')
  }
  if (target.tagName.toLowerCase() !== 'input' || target.type !== 'file') {
    throw Error('Other than the file format "input" is specified.')
  }

  if (dropArea) {
    dropArea.addEventListener('dragover', (e) => {
      e.preventDefault()
      dropArea.classList.add(dragoverClass)
    })
    dropArea.addEventListener('dragleave', (e) => {
      e.preventDefault()
      dropArea.classList.remove(dragoverClass)
    })
    dropArea.addEventListener('drop', (e) => {
      const files = e.dataTransfer.files
      e.preventDefault()
      dropArea.classList.remove(dragoverClass)
      if (checkFormat(files[0])) {
        target.files = files
        if (callback) {
          callback(target.files[0])
        }
      }
    })
  }

  target.addEventListener('change', (e) => {
    if (checkFormat(e.target.files[0]) && callback) {
      callback(target.files[0])
    }
    else {
      target.value = ''
    }
  })
}
