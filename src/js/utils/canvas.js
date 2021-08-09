// canvas.js

'use strict'

/**
 * @param {Object} options オプション
 * @param {String} options.targetId 対象となるキャンバスのID
 * @return {Promise}
 */
module.exports = async (options) => {
  const targetId = options.targetId

  if (!targetId) {
    throw Error('Target is not specified.')
  }

  const target = document.getElementById(targetId)

  if (!target) {
    throw Error('Target is not found.')
  }
  if (target.tagName.toLowerCase() !== 'canvas') {
    throw Error('Other than "canvas" is specified.')
  }

  return {
    context: target.getContext('2d'),
    width: target.width,
    height: target.height,
    clear () {
      this.context.clearRect(0, 0, this.width, this.height)
    },
  }
}
