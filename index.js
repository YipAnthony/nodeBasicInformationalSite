const http = require('http')
const url = require('url')
const fs = require('fs')
const errorPage = "./404.html"

const express = require('express')
const app = express();
const port = 8080;


app.use('/', (req, res) => {
    let filename = "./index.html" 
    
    const urlpath = req.url
    if ( urlpath !== "/") {
        filename = `.${urlpath}.html`
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
})

app.listen(port, () => {
    console.log(`Hey there! Our app is currently listening on port ${port}`)
})


// // Basic Node code w/o express
// http.createServer((req, res) => {
//     const parsedURL = url.parse(req.url, true);
//     let filename;
//     if (parsedURL.pathname === "/" || parsedURL.pathname === "") {
//         filename = "./index.html" 
//     } 
//     else {
//         filename = "." + parsedURL.pathname + ".html"
//     }

//     fs.readFile(filename, (err, data) => {
//         if (err){
//             return fs.readFile(errorPage, (err2, errorData) => {
//                 if (err2) throw err2
//                 res.writeHead(404, {'Content-Type': 'text/html'});
//                 res.write(errorData)
//                 return res.end()
//             })
            
//         }
//         res.writeHead(200, {'Content-Type': 'text/html'})
//         res.write(data);
//         return res.end();
//     })
// }).listen(8080);