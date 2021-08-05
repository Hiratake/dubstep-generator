const canvas = document.getElementById('preview')
const width = canvas.getAttribute('width')
const height = canvas.getAttribute('height')

console.log(width)
console.log(height)

if (canvas.getContext) {
  const ctx = canvas.getContext('2d')
  ctx.fillStyle = 'rgb(200, 0, 0)'
  ctx.fillRect(10, 10, 50, 50)
  ctx.fillStyle = 'rgba(0, 0, 200, 0.5)'
  ctx.fillRect(30, 30, 50, 50)
}
