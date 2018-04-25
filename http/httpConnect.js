const axios = require('axios')
const URL = 'http://localhost:8888'

const output = (res, method) => {
  console.log(`<========== ${method} ==========>`)
  console.log('[ status ]')
  console.log(res.status)
  console.log()

  console.log('[ headers ]')
  console.log(res.headers)
  console.log()

  console.log('[ data ]')
  console.log(res.data)
  console.log()
}

axios.all([
  axios.get(URL, { params: { name: 'namae' } }).then(res => {
    output(res, 'GET')
  }),
  axios.post(URL, { hoge: 'hoge', foo: 'bar' }).then(res => {
    output(res, 'POST')
  })
]).then(() => {
  console.log('done.')
})
