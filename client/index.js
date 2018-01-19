const api = require('./api')

const gradientMap = function(){
  let tone1 = {red: 0, green: 0, blue: 0}
  let tone2 = {red: 240, green: 132, blue: 20}
  let gradient = []
  //build an array of length 256 between color 1 and color 2 to match the values from 0 to 255
  for (let k = 0; k < (256 * 4); k += 4){
    gradient[k] = ((256 - (k / 4)) * tone1.red + (k / 4) * tone2.red) / 256
    gradient[k + 1] = ((256 - (k / 4)) * tone1.green + (k / 4) * tone2.green) / 256
    gradient[k + 2] = ((256 - (k / 4)) * tone1.blue + (k / 4) * tone2.blue) / 256
    gradient[k + 3] = 255
  }
  return gradient
}

let canvas = document.getElementById('canvasId')
let ctx = canvas.getContext('2d')

document.getElementById('uploadSubmit').addEventListener('submit', (evt) => {
  evt.preventDefault()
  const formData = new FormData(document.getElementById('uploadSubmit'))
  formData.append('file', formData)

  api.uploadFile(formData)
  .then((response) => {
    let img = document.getElementById('myImage')
    img.src = response.data
    return img
  })
  .then(img => {
    console.log('GOT IMG')
    console.dir(img)
    console.log('canvas is ', canvas)

    canvas.height = img.height
    canvas.width = img.width
    ctx.drawImage(img, 0, 0)

    //returns Image obj with data as Uint8ClampedArray with 4 values per pixel
   // console.log(ctx.getImageData(0, 0, img.width, img.height))
    return ctx.getImageData(0, 0, img.width, img.height)
  })
  .then(pixelsObj => {
    //convert to grayscale
    let data = pixelsObj.data
    console.log('DATA is ', data)
    for (let i = 0; i < data.length; i += 4){
      let red = data[i]
      let green = data[i + 1]
      let blue = data[i + 2]
      let average = ((1 / 3) * red) + ( (1 / 3) * green) + ((1 / 3) * blue)
      data[i] = data[i + 1] = data[i + 2] = average
    }
    ctx.putImageData(pixelsObj, 0, 0)
    return pixelsObj
  })
  .then(pixelsObj => {
    //duotones
    let duoGradient = gradientMap()
    let duoData = pixelsObj.data
    for (let z = 0; z < duoData.length; z += 4){
      duoData[z] = duoGradient[duoData[z] * 4]
      duoData[z + 1] = duoGradient[duoData[z + 1] * 4 + 1]
      duoData[z + 2] = duoGradient[duoData[z + 2] * 4 + 1]
    }
    ctx.putImageData(pixelsObj, 0, 0)
    return pixelsObj
  })
  .catch(err => console.error(err))
})

