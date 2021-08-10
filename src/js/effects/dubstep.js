// dubstep.js

'use strict'

/**
 * @param {Number} rate 対象区間のアニメーションの進んだ割合
 * @param {Number} beforeScale 開始時点の拡大率
 * @param {Number} afterScale 終了時点の拡大率
 * @param {Number} beforeAngle 開始時点の角度
 * @param {Number} afterAngle 終了時点の角度
 * @param {Object} context Canvasのコンテキスト
 */
const transform = (
  rate,
  beforeScale, afterScale,
  beforeAngle, afterAngle,
  context,
) => {
  const scale = ((afterScale - beforeScale) * rate) + beforeScale
  const angle = ((afterAngle - beforeAngle) * rate) + beforeAngle
  context.scale(scale, scale)
  context.rotate(Math.PI * angle / 180)
}

/**
 * @param {Object} context Canvasのコンテキスト
 * @param {Number} width Canvasの幅
 * @param {Number} height Canvasの高さ
 * @param {Number} rate アニメーションの進んだ割合
 */
module.exports = (context, width, height, rate) => {
  context.translate(width / 2, height / 2)

  const points = [0, 0.06579, 0.18202, 0.24123, 0.29825, 0.62061, 0.75219, 1]
  const scales = [0, 2.2524, 2.5631, 1.3981, 1.7678, 2.4854, 0, 0]
  const angles = [0, -24.47, -24.47, 0, 31.46, 115.34, 108.09, 108.09]

  const index = points.findIndex(item => rate <= item)
  transform(
    (rate - points[index - 1]) / (points[index] - points[index - 1]),
    scales[index - 1],
    scales[index],
    angles[index - 1],
    angles[index],
    context,
  )

  context.translate((width * (-1)) / 2, (height * (-1)) / 2)
}
