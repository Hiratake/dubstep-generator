// canvas.js

'use strict'

/**
 * @param {Object} options Options.
 * @param {String} options.targetId The id of the target canvas.
 * @return {Promise} Return value.
 */
module.exports = async (options) => {
  const targetId = options.targetId

  if (!targetId) {
    throw Error('Target is not specified.')
  }

  const targetElement = document.getElementById(targetId)

  if (!targetElement) {
    throw Error('Target is not found.')
  }
  if (targetElement.tagName.toLowerCase() !== 'canvas') {
    throw Error('Target other than "canvas" is specified.')
  }

  return {
    context: targetElement.getContext('2d'),
    width: targetElement.width,
    height: targetElement.height,
    clear () {
      this.context.clearRect(0, 0, this.width, this.height)
    },
  }
}
