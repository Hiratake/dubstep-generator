// main.js

'use strict'

import GIFEncoder from './lib/GIFEncoder'
import encode64 from './lib/b64'

import { FRAMERATE } from './constants/animation'

import { drawFrame } from './utils/animation'
import { createUploadImageElement, validateImageFormat } from './utils/image'

import EFFECT_DUBSTEP from './effects/dubstep'
import EFFECT_HOPPING from './effects/hopping'
import EFFECT_DEDDING from './effects/dedding'

const effects = [
  EFFECT_DUBSTEP,
  EFFECT_HOPPING,
  EFFECT_DEDDING,
]

const options = {
  effect: document.options.effect.value,
  speed: document.options.speed.value,
}

const uploadDropAreaElement = document.getElementById('upload')
const uploadInputElement = uploadDropAreaElement.getElementsByTagName('input')[0]
const previewCanvasElement = document.getElementById('preview')
const downloadButtonElement = document.getElementById('download')

let animation

/* ページの初期化 */
(() => {
  try {
    const dragoverClass = 'is-dragover'
    const uploadPreviewClass = 'c-upload__image'

    uploadDropAreaElement.addEventListener('dragover', (e) => {
      e.preventDefault()
      uploadDropAreaElement.classList.add(dragoverClass)
    })
    uploadDropAreaElement.addEventListener('dragleave', (e) => {
      e.preventDefault()
      uploadDropAreaElement.classList.remove(dragoverClass)
    })
    uploadDropAreaElement.addEventListener('drop', (e) => {
      const files = e.dataTransfer.files
      e.preventDefault()
      uploadDropAreaElement.classList.remove(dragoverClass)
      if (validateImageFormat(files[0])) {
        uploadInputElement.files = files
        resetUploadFilePreview()
        addUploadFilePreview(uploadInputElement.files[0], uploadPreviewClass)
        showPreview(uploadInputElement.files[0])
      }
    })
    uploadInputElement.addEventListener('change', (e) => {
      if (validateImageFormat(e.target.files[0])) {
        resetUploadFilePreview()
        addUploadFilePreview(uploadInputElement.files[0], uploadPreviewClass)
        showPreview(uploadInputElement.files[0])
      }
      else {
        uploadInputElement.value = ''
      }
    })
    downloadButtonElement.addEventListener('click', async () => {
      const file = uploadInputElement.files[0]
      if (validateImageFormat(file)) {
        const res = await generateEmoji({
          image: file,
          effect: options.effect,
          speed: options.speed,
        })
        const link = document.createElement('a')
        link.download = 'emoji.gif'
        link.href = res
        link.click()
      }
    })
    document.options.addEventListener('change', (e) => {
      const name = e.target.name
      const value = e.target.value
      options[name] = value
      showPreview(uploadInputElement.files[0])
    })
  }
  catch (e) {
    console.error(e)
  }
})()

/**
 * アップロードしたファイルのプレビュー表示を初期化する関数
 * @returns {Boolean} 削除した画像の数
 */
const resetUploadFilePreview = () => {
  const items = [...uploadDropAreaElement.getElementsByTagName('img')]
  items.forEach((item) => {
    item.remove()
  })
  return items.length
}

/**
 * アップロードしたファイルのプレビュー表示を追加する関数
 * @param {Object} file アップロードされたファイル
 * @param {String} className 付与するクラス名
 */
const addUploadFilePreview = async (file, className = '') => {
  const image = await createUploadImageElement(file)
  if (className) {
    image.classList.add(className)
  }
  uploadDropAreaElement.prepend(image)
}

/**
 * アニメーションのプレビューを表示する関数
 * @param {Object} file アップロードされたファイル
 */
const showPreview = async (file) => {
  const image = await createUploadImageElement(file)
  const context = previewCanvasElement.getContext('2d')
  const effect = effects.find((item) => item.name === options.effect)
  let currentFrame = 1

  clearInterval(animation)
  animation = setInterval(() => {
    try {
      currentFrame = drawFrame(
        context,
        image,
        effect,
        currentFrame,
        options.speed,
      )
    }
    catch (e) {
      clearInterval(animation)
    }
  }, 1000 / FRAMERATE)
}

/**
 * GIFファイルを生成する関数
 * @param {Object} options オプション
 * @param {Object} options.image 描画する画像
 * @param {String} options.effect 適用するエフェクト
 * @param {Number} options.speed アニメーションの速さ
 * @returns 生成したアニメーションGIF画像
 */
const generateEmoji = async (options = {}) => {
  const encoder = new GIFEncoder()
  const canvas = document.createElement('canvas')
  const effect = effects.find((item) => item.name === options.effect)
  const image = await createUploadImageElement(options.image)
  let currentFrame = 1

  encoder.setRepeat(0)
  encoder.setFrameRate(FRAMERATE)
  encoder.start()
  canvas.width = 260
  canvas.height = 260

  do {
    currentFrame = drawFrame(
      canvas.getContext('2d'),
      image,
      effect,
      currentFrame,
      options.speed,
    )
    encoder.addFrame(canvas.getContext('2d'))
  } while (currentFrame !== 1)

  return `data:image/gif;base64,${encode64(encoder.stream().getData())}`
}
