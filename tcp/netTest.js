const net = require('net')

net
  .createServer(socket => {
    socket.setEncoding('utf-8')

    socket.on('data', chunk => {
      console.log(chunk)
      socket.end('201 connection succeeded')
    })
  })
  .on('listening', () => {
    console.log('server listening on localhost:8888..')
  })
  .listen(8888, 'localhost')
