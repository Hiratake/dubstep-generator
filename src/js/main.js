import canvas from './utils/canvas'

const upload = document.getElementById('upload')
const file = document.getElementById('file')

const draw = (image) => {
  canvas({ targetId: 'preview' })
    .then((res) => {
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
        res.context.clearRect(0, 0, res.width, res.height)
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
    })
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

const checkImage = (image) => {
  if (typeof image !== 'undefined') {
    const jpeg = image.type && image.type === 'image/jpeg'
    const png = image.type && image.type === 'image/png'
    return !!(jpeg || png)
  }
  else {
    return false
  }
}

const showImage = (name, image) => {
  image.classList.add('c-upload__image')
  upload.prepend(image)
}

const uploadImage = (image) => {
  const name = image.name
  createImage(image).then((res) => {
    showImage(name, res.cloneNode())
    draw(res)
  })
}

upload.addEventListener('dragover', (e) => {
  e.preventDefault()
  upload.classList.add('is-dragover')
})
upload.addEventListener('dragleave', (e) => {
  e.preventDefault()
  upload.classList.remove('is-dragover')
})

upload.addEventListener('drop', (e) => {
  const image = e.dataTransfer.files
  e.preventDefault()
  upload.classList.remove('is-dragover')
  if (checkImage(image[0])) {
    file.files = image
    uploadImage(file.files[0])
  }
})
file.addEventListener('change', (e) => {
  if (checkImage(e.target.files[0])) {
    uploadImage(file.files[0])
  }
  else {
    file.value = ''
  }
}, false)
