const makeImage = (buffer) => {
  let base64 = buffer.toString('base64')
  let imgjpg = 'data:image/jpeg;base64,' + base64
  return imgjpg

}

module.exports = {
  makeImage
}
