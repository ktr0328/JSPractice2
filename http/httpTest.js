/*
 * httpConnect.js or curlかなんかで http://localhost:8888
 * 補完効かなくてJSDoc. TypeScriptにするべきですはい。
*/

const http = require('http')
const fs = require('fs')
const path = require('path')
const moment = require('moment')

/**
 * @param {http.IncomingMessage} req - hoge
 */
const extractedRequest = req => {
  return {
    method: req.method,
    url: req.url,
    headers: req.headers,
    timeStamp: moment().format('YYYY/MM/DD HH:mm:ss')
  }
}

const server = http.createServer()

server
  .on(
    'request',
    /**
     * @param {http.IncomingMessage} req
     * @param {http.ServerResponse} res
     */
    (req, res) => {
      req.setEncoding('utf-8')
      fs.appendFile(
        path.resolve(__dirname, './server.log'),
        JSON.stringify(extractedRequest(req)) + '\r\n',
        { encoding: 'utf-8' },
        err => {
          if (err) console.err(err)
        }
      )

      let data = ''
      req.on('data', chunk => {
        data += chunk
      })

      req.on('end', () => {
        res.writeHead(200, { 'Content-Type': 'application/json' })

        if (data) {
          res.end(JSON.stringify(data))
        } else {
          res.end('{"message": "message 空です!!"}')
        }
      })
    }
  )
  .on('connection', socket => {
    console.log(socket.address())
  })
  .listen(8888, 'localhost', () => {
    console.log('server running on localhost:8888')
  })
