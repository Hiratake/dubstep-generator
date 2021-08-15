// main.js

'use strict'

import { FRAMERATE } from './constants/animation'

import EFFECT_DUBSTEP from './effects/dubstep'
import EFFECT_HOPPING from './effects/hopping'
import EFFECT_DEDDING from './effects/dedding'

const effects = [
  EFFECT_DUBSTEP,
  EFFECT_HOPPING,
  EFFECT_DEDDING,
]

const file = require('./utils/file')
const image = require('./utils/image')
const canvas = require('./utils/canvas')

const fileInputId = 'file'
const fileDropAreaId = 'upload'
const canvasId = 'preview'

const options = {
  effect: document.options.effect.value,
  speed: document.options.speed.value,
}

let animation

/**
 * ページの初期化
 */
(() => {
  // オプション
  document.options.addEventListener('change', (e) => {
    try {
      const name = e.target.name
      const value = e.target.value
      options[name] = value
    }
    catch (e) {
      console.error(e)
    }
  })
})()

/**
 * 描画するアニメーションのフレーム数を計算する関数
 * @param {Number} base デフォルトのフレーム数
 * @param {Number} speed アニメーションの速さ
 * @returns {Number} フレーム数
 */
const getFrameCount = (base, speed) => {
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
const drawFrame = (
  context,
  image,
  effect,
  currentFrame,
  speed = options.speed,
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

file({ targetId: fileInputId, dropAreaId: fileDropAreaId }, async (file) => {
  const uploadImage = await image({ image: file })
  const preview = await canvas({ targetId: canvasId })

  const dropArea = document.getElementById(fileDropAreaId)
  const dropAreaImageList = [
    ...dropArea.getElementsByClassName('c-upload__image'),
  ]
  dropAreaImageList.forEach((item) => {
    item.remove()
  })
  dropArea.prepend((() => {
    const element = uploadImage.element.cloneNode()
    element.classList.add('c-upload__image')
    return element
  })())

  const effect = effects.find((item) => item.name === options.effect)
  let currentFrame = 1
  clearInterval(animation)
  animation = setInterval(() => {
    try {
      currentFrame = drawFrame(
        preview.context,
        uploadImage.element,
        effect,
        currentFrame,
      )
    }
    catch (e) {
      console.error(e)
      clearInterval(animation)
    }
  }, 1000 / FRAMERATE)
})
