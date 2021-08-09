// image.js

'use strict'

/**
 * @param {Object} options オプション
 * @param {Object} options.image 画像ファイルのオブジェクト
 * @return {Promise}
 */
module.exports = async (options = {}) => {
  return new Promise((resolve, reject) => {
    const image = options.image ? options.image : ''

    if (!image) {
      reject(Error('Image file is not found.'))
    }

    const element = new Image()
    const reader = new FileReader()

    element.file = image

    reader.onload = (e) => {
      const dataURL = e.target.result
      element.src = dataURL
      element.onload = () => {
        resolve({
          name: image.name,
          dataURL,
          element,
        })
      }
    }
    reader.readAsDataURL(image)
  })
}
