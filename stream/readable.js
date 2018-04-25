// 非同期が入り混じる readable, readable2
// $ mkfile 1m dummy.file -> 1MB のダミー生成
const fs = require('fs')
const path = require('path')

const readable = fs.createReadStream(path.resolve(__dirname, './dummy.file'))
readable.on('data', chunk => {
  console.log(chunk)
})

const readable2 = fs.createReadStream(path.resolve(__dirname, './dummy2.txt'), {highWaterMark: 8})
readable2.pipe(process.stdout)
