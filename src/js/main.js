const file = require('./utils/file')
const canvas = require('./utils/canvas')

file({ targetId: 'file', dropAreaId: 'upload' }, (res) => {
  const name = res.name
  createImage(res).then((res) => {
    showImage(name, res.cloneNode())
    draw(res)
  })
})

const draw = async (image) => {
  const res = await canvas({ targetId: 'preview' })

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

const createImage = async (image) => {
  return new Promise((resolve, reject) => {
    const node = new Image()
    const reader = new FileReader()
    node.file = image
    reader.onload = ((image) => (e) => {
      image.src = e.target.result
      image.onload = () => {
        resolve(image)
      }
    })(node)
    reader.onerror = (e) => {
      reject(e)
    }
    reader.readAsDataURL(image)
  })
}

const showImage = (name, image) => {
  image.classList.add('c-upload__image')
  // upload.prepend(image)
}
