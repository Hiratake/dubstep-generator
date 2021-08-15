// animation.js

'use strict'

/**
 * 描画するアニメーションのフレーム数を計算する関数
 * @param {Number} base デフォルトのフレーム数
 * @param {Number} speed アニメーションの速さ
 * @returns {Number} フレーム数
 */
export const getFrameCount = (base, speed) => {
  const arr = [2, 1.8, 1.6, 1.4, 1.2, 1, 0.9, 0.8, 0.7, 0.6, 0.5]
  return Math.floor(base * arr[speed])
}

/**
 * エフェクトを適用する関数
 * @param {Object} context Canvasのコンテキスト
 * @param {Object} image 描画する画像
 * @param {Object} effect 適用するエフェクト
 * @param {Number} currentFrame 現在のフレーム番号
 * @param {Number} speed アニメーションの速さ
 * @returns {Number} 次のフレーム番号
 */
export const drawFrame = (
  context,
  image,
  effect,
  currentFrame,
  speed,
) => {
  const width = image.width >= image.height
    ? context.canvas.width
    : image.width * (context.canvas.height / image.height)
  const height = image.width >= image.height
    ? image.height * (context.canvas.width / image.width)
    : context.canvas.height
  const framecount = getFrameCount(effect.framecount, speed)
  const rate = currentFrame / framecount

  context.save()
  context.clearRect(0, 0, context.canvas.width, context.canvas.height)
  effect.apply(context, rate)
  context.drawImage(
    image,
    (context.canvas.width - width) / 2,
    (context.canvas.height - height) / 2,
    width,
    height,
  )
  context.restore()
  return currentFrame >= framecount ? 1 : currentFrame + 1
}
