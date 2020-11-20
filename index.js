const http = require('http')
const url = require('url')
const fs = require('fs')
const errorPage = "./404.html"

http.createServer((req, res) => {
    const parsedURL = url.parse(req.url, true);
    let filename;
    if (parsedURL.pathname === "/" || parsedURL.pathname === "") {
        filename = "./index.html" 
    } 
    else {
        filename = "." + parsedURL.pathname + ".html"
    }

    fs.readFile(filename, (err, data) => {
        if (err){
            return fs.readFile(errorPage, (err2, errorData) => {
                if (err2) throw err2
                res.writeHead(404, {'Content-Type': 'text/html'});
                res.write(errorData)
                return res.end()
            })
            
        }
        res.writeHead(200, {'Content-Type': 'text/html'})
        res.write(data);
        return res.end();
    })
}).listen(8080);