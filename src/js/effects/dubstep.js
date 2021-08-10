// dubstep.js

'use strict'

/**
 * @param {Object} context Canvasのコンテキスト
 * @param {Number} width Canvasの幅
 * @param {Number} height Canvasの高さ
 * @param {Number} rate アニメーションの進んだ割合
 */
module.exports = (context, width, height, rate) => {
  context.translate(width / 2, height / 2)
  context.rotate(Math.PI * 2 * rate)
  context.translate((width * (-1)) / 2, (height * (-1)) / 2)
}
