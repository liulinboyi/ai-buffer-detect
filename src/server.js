//1.导入模块
const http = require('http')
const fs = require('fs')
const path = require('path')

export let port = 3450
let count = 0

function open(server, resolve) {
  server.listen(port, () => {
    // console.log('服务器开启成功')
    resolve(server)
  })
}

//3.开启服务器
export const start = () => {
  // debugger
  //2.创建服务器
  let server = http.createServer((req, res) => {
    //(1)请求：req
    // console.log(req.url)

    //(2)处理
    if (req.url == '/model.json') {
      //读取html文件响应返回
      fs.readFile(path.join(__dirname, '../model/model.json'), (err, data) => {
        if (err) throw err
        //(3)响应：res
        res.end(data)
      })
    } else if (req.url.indexOf('/weights.bin') == 0) {
      fs.readFile(path.join(__dirname, '../model/weights.bin'), (err, data) => {
        if (err) throw err
        //(3)响应：res
        res.end(data)
      })
    } else {
      //错误路径
      res.end('404 not found')
    }
  })
  return new Promise((resolve, reject) => {
    server.on('error', (err) => {
      // console.log(err)
      port++
      count++
      if (count >= 10) {
        server.close()
        reject(err)
      } else {
        server.close()
        open(server, resolve)
      }
    })
    server.listen(port, () => {
      // console.log('服务器开启成功')
      resolve(server)
    })
  })
}
