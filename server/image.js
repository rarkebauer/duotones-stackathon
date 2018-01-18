const makeImage = (buffer) => {
  console.log('BUFFER TO BASE64 ', buffer.toString('base64'))
  let base64 = buffer.toString('base64')
  let imgjpg = 'data:image/jpeg;base64,' + base64
  return imgjpg
 // document.getElementById('myImage').src = imgjpg

}

module.exports = {
  makeImage
}
