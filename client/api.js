const axios = require('axios')

const uploadFile = (data) => {
  return axios.post('/uploadFile', data, { headers: {'content-type': 'multipart/form-data'}
})
    .then(response => response)
    .catch(err => console.error(err))
}

module.exports = {
  uploadFile
}
