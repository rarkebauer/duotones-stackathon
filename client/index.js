const api = require('./api')
const color = require('./color')

let canvas = document.getElementById('canvasId')
let ctx = canvas.getContext('2d')
let img = document.getElementById('myImage')


let staticColor1 = document.getElementById('color1').value
let staticColor2 = document.getElementById('color2').value

const setCanvas = () => {
  canvas.height = img.height
  canvas.width = img.width
  ctx.drawImage(img, 0, 0)
}

document.getElementById('uploadSubmit').addEventListener('submit', (evt) => {
  evt.preventDefault()
  const formData = new FormData(document.getElementById('uploadSubmit'))
  formData.append('file', formData)

  api.uploadFile(formData)
  .then((response) => {
    img.src = response.data
    return img
  })
  .then(img => {
    setCanvas()
    //returns Image obj with data as Uint8ClampedArray with 4 values per pixel
    return ctx.getImageData(0, 0, img.width, img.height)
  })
  .then(pixelsObj => {
    pixelsObj.data = color.processImg(staticColor1, staticColor2, pixelsObj.data)
    ctx.putImageData(pixelsObj, 0, 0)
    return pixelsObj
  })
  .catch(err => console.error(err))
})

document.getElementById('color1').addEventListener('change', function(evt){
  setCanvas()
  let pixelsChange = ctx.getImageData(0, 0, img.width, img.height)
  staticColor1 = evt.target.value
  pixelsChange.data = color.processImg(staticColor1, staticColor2, pixelsChange.data)
  ctx.putImageData(pixelsChange, 0, 0)
})

document.getElementById('color2').addEventListener('change', function(evt){
  setCanvas()
  let pixelsChange = ctx.getImageData(0, 0, img.width, img.height)
  staticColor2 = evt.target.value
  pixelsChange.data = color.processImg(staticColor1, staticColor2, pixelsChange.data)
  ctx.putImageData(pixelsChange, 0, 0)
})
