const hexToRGB = (hex) => {
  let red = parseInt(hex.slice(1, 3), 16),
      green = parseInt(hex.slice(3, 5), 16),
      blue = parseInt(hex.slice(5, 7), 16)
  return {red, green, blue}
}

const gradientMap = (color1, color2) => {
  let gradient = []
  //build an array of length 256 between color 1 and color 2 to match the values from 0 to 255
  for (let k = 0; k < (256 * 4); k += 4){
    gradient[k] = ((256 - (k / 4)) * color1.red + (k / 4) * color2.red) / 256
    gradient[k + 1] = ((256 - (k / 4)) * color1.green + (k / 4) * color2.green) / 256
    gradient[k + 2] = ((256 - (k / 4)) * color1.blue + (k / 4) * color2.blue) / 256
    gradient[k + 3] = 255
  }
  return gradient
}

const convertToGrayScale = (data) => {
  for (let i = 0; i < data.length; i += 4){
    let red = data[i]
    let green = data[i + 1]
    let blue = data[i + 2]
    let average = ((1 / 3) * red) + ( (1 / 3) * green) + ((1 / 3) * blue)
    data[i] = data[i + 1] = data[i + 2] = average
  }
  return data
}

const convertToDuotone = (gradient, data) => {
  for (let i = 0; i < data.length; i += 4){
    data[i] = gradient[data[i] * 4]
    data[i + 1] = gradient[data[i + 1] * 4 + 1]
    data[i + 2] = gradient[data[i + 2] * 4 + 1]
  }
  return data
}

const makeGradient = (color1, color2) => {
  return gradientMap(hexToRGB(color1), hexToRGB(color2))
}

const processImg = (color1, color2, data) => {
  let gradient = makeGradient(color1, color2)
  let grayData = convertToGrayScale(data)
  let duoTone = convertToDuotone(gradient, grayData)
  return duoTone
}

module.exports = {
  processImg
}
