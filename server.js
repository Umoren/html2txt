const http = require('http');
const fs = require('fs');
const { parse } = require('querystring')

http.createServer((req, res) => {
      
  fs.readFile('./form.html', null, (error, data) => {
    if (error) {
      res.setHeader(404);
      res.write("Not Found")
    } else {
      res.write(data)
      
    }
    res.end();
  })

    if (req.method == 'POST') {
        whole = ''
        req.on('data', (chunk) => {
            whole += chunk.toString()
            fs.writeFile("message.txt", whole, (err) => {
                if (err) {
                  console.log(err)
                }
                console.log(parse(whole));
              })
        })

        req.on('end', () => {
            console.log(whole)
            res.writeHead(200, 'OK', {'Content-Type': 'text/html'})
            res.end('Data received.')
        })
    }
}).listen(8080)