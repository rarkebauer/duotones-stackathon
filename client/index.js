const api = require('./api')

document.getElementById('uploadSubmit').addEventListener('submit', (evt) => {
  evt.preventDefault()
  console.dir(evt.target.file)
  const file = evt.target.file.files[0]
  const fileName = file.name
  const data = new FormData(document.getElementById('uploadSubmit'))
  data.append('file', data)

  api.uploadFile(data)
  .then((response) => {
    document.getElementById('myImage').src = response.data
  })
})

