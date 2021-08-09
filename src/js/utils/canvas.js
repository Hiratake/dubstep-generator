// canvas.js

/**
 * @param {Object} options Canvas options.
 * @param {String} options.targetId The id of the target canvas.
 * @returns {Promise}
 */
export default (options = { targetId: '' }) =>
  new Promise((resolve, reject) => {
    if (!options.targetId) {
      reject(new Error('Target is not specified.'))
    }

    const targetElement = document.getElementById(options.targetId)
    if (!targetElement) {
      reject(new Error('Target is not found.'))
    }
    else if (targetElement.tagName.toLowerCase() !== 'canvas') {
      reject(new Error('Target other than "canvas" is specified.'))
    }

    const context = targetElement.getContext('2d')

    resolve({
      context: context,
      width: targetElement.width,
      height: targetElement.height,
    })
  })
