// dedding.js

'use strict'

const NAME = 'dedding'
const FRAMECOUNT = 274

/**
 * エフェクトの実行をする関数
 * @param {Object} context Canvasのコンテキスト
 * @param {Number} rate アニメーションの進んだ割合
 * @param {Number} width Canvasの幅
 * @param {Number} height Canvasの高さ
 */
const effect = (context, rate, width, height) => {
  context.translate(width / 2, height / 2)

  // dedding code here

  context.translate((width * (-1)) / 2, (height * (-1)) / 2)
}

export default {
  name: NAME,
  framecount: FRAMECOUNT,
  effect,
}
