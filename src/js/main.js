// main.js

'use strict'

const file = require('./utils/file')
const image = require('./utils/image')
const canvas = require('./utils/canvas')

const fileInputId = 'file'
const fileDropAreaId = 'upload'
const canvasId = 'preview'

file({ targetId: fileInputId, dropAreaId: fileDropAreaId }, async (file) => {
  const uploadImage = await image({ image: file })

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

  draw(uploadImage.element)
})

const draw = async (image) => {
  const res = canvas({ targetId: canvasId })

  const imageWidth = image.width
  const imageHeight = image.height
  const renderWidth = image.width >= image.height
    ? 200
    : imageWidth * (200 / imageHeight)
  const renderHeight = image.width >= image.height
    ? imageHeight * (200 / imageWidth)
    : 200
  res.context.drawImage(
    image,
    (res.width - renderWidth) / 2,
    (res.height - renderHeight) / 2,
    renderWidth,
    renderHeight,
  )
  let degree = 0
  setInterval(function () {
    res.clear()
    res.context.translate(res.width / 2, res.height / 2)
    res.context.rotate(++degree * Math.PI / 180)
    res.context.translate((res.width * (-1)) / 2, (res.height * (-1)) / 2)
    res.context.drawImage(
      image,
      (res.width - renderWidth) / 2,
      (res.height - renderHeight) / 2,
      renderWidth,
      renderHeight,
    )
  }, 1)
}
