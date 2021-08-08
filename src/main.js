const canvas = document.getElementById('preview')
const upload = document.getElementById('upload')
const file = document.getElementById('file')

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

const draw = (image) => {
  if (canvas.getContext) {
    const ctx = canvas.getContext('2d')
    const canvasWidth = canvas.getAttribute('width')
    const canvasHeight = canvas.getAttribute('height')
    const imageWidth = image.width
    const imageHeight = image.height
    const renderWidth = image.width >= image.height
      ? 200
      : imageWidth * (200 / imageHeight)
    const renderHeight = image.width >= image.height
      ? imageHeight * (200 / imageWidth)
      : 200
    ctx.drawImage(
      image,
      (canvasWidth - renderWidth) / 2,
      (canvasHeight - renderHeight) / 2,
      renderWidth,
      renderHeight,
    )
    let degree = 0
    setInterval(function () {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight)
      ctx.translate(canvasWidth / 2, canvasHeight / 2)
      ctx.rotate(++degree * Math.PI / 180)
      ctx.translate(-canvasWidth / 2, -canvasHeight / 2)
      ctx.drawImage(
        image,
        (canvasWidth - renderWidth) / 2,
        (canvasHeight - renderHeight) / 2,
        renderWidth,
        renderHeight,
      )
    }, 1)
  }
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
