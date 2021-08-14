// dubstep.js

'use strict'

const NAME = 'dubstep'
const FRAMECOUNT = 274

/**
 * ベースとなる回転と拡大・縮小の実行をする関数
 * @param {Object} context Canvasのコンテキスト
 * @param {Number} rate 対象区間のアニメーションの進んだ割合
 */
const baseTransform = (context, rate) => {
  const points = [0, 0.06579, 0.18202, 0.24123, 0.29825, 0.62061, 0.75219, 1]
  const scales = [0, 1.216296, 1.384074, 0.754974, 0.954612, 1.342116, 0, 0]
  const angles = [0, -24.47, -24.47, 0, 31.46, 115.34, 108.09, 108.09]

  const i = points.findIndex(item => rate <= item)
  const currentRate = (rate - points[i - 1]) / (points[i] - points[i - 1])

  const scaling = (beforeScale, afterScale) => {
    const scale = ((afterScale - beforeScale) * currentRate) + beforeScale
    context.scale(scale, scale)
  }
  const rotating = (beforeAngle, afterAngle) => {
    const angle = ((afterAngle - beforeAngle) * currentRate) + beforeAngle
    context.rotate(Math.PI * angle / 180)
  }

  scaling(scales[i - 1], scales[i])
  rotating(angles[i - 1], angles[i])
}

/**
 * エフェクトの実行をする関数
 * @param {Object} context Canvasのコンテキスト
 * @param {Number} rate アニメーションの進んだ割合
 * @param {Number} width Canvasの幅
 * @param {Number} height Canvasの高さ
 */
const effect = (context, rate, width, height) => {
  context.translate(width / 2, height / 2)
  baseTransform(context, rate)
  context.translate((width * (-1)) / 2, (height * (-1)) / 2)
}

export default {
  name: NAME,
  framecount: FRAMECOUNT,
  effect,
}
