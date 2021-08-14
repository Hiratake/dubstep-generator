// main.js

'use strict'

import { FRAMERATE } from './constants/animation'

import EFFECT_DUBSTEP from './effects/dubstep'

const effects = [
  EFFECT_DUBSTEP,
]

const file = require('./utils/file')
const image = require('./utils/image')
const canvas = require('./utils/canvas')

const fileInputId = 'file'
const fileDropAreaId = 'upload'
const canvasId = 'preview'

let animation

file({ targetId: fileInputId, dropAreaId: fileDropAreaId }, async (file) => {
  const uploadImage = await image({ image: file })
  const preview = await canvas({ targetId: canvasId })

  uploadImage.renderWidth = uploadImage.width >= uploadImage.height
    ? 200
    : uploadImage.width * (200 / uploadImage.height)
  uploadImage.renderHeight = uploadImage.width >= uploadImage.height
    ? uploadImage.height * (200 / uploadImage.width)
    : 200

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

  const effect = effects.find((item) => item.name === 'dubstep')
  let currentFrame = 1
  clearInterval(animation)
  animation = setInterval(() => {
    try {
      const rate = currentFrame / effect.framecount

      preview.context.save()
      preview.clear()

      effect.effect(preview.context, rate, preview.width, preview.height)

      preview.context.drawImage(
        uploadImage.element,
        (preview.width - uploadImage.renderWidth) / 2,
        (preview.height - uploadImage.renderHeight) / 2,
        uploadImage.renderWidth,
        uploadImage.renderHeight,
      )
      preview.context.restore()

      currentFrame = currentFrame + 1
      if (currentFrame > effect.framecount) {
        currentFrame = 1
      }
    }
    catch (e) {
      console.error(e)
      clearInterval(animation)
    }
  }, 1000 / FRAMERATE)
})
