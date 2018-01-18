const makeImage = (buffer) => {
  console.log('BUFFER TO BASE64 ', buffer.toString('base64'))
  let base64 = buffer.toString('base64')
  //console.log(JSON.parse(buffer))
  //let img = new Image()
  let imgjpg = 'data:image/jpg;base64,' + base64
  console.log('imgjpg is ', imgjpg)
  return imgjpg
 // document.getElementById('myImage').src = imgjpg

}



module.exports = {
  makeImage
}
