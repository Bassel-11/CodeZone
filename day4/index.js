
const http = require('http')
const fs = require('fs')

const homePage = fs.readFileSync('./views.index.html', 'utf-8')
const cssFile = fs.readFileSync('./views.style.css', 'utf-8')

const server = http.createServer((req, res) => {
    console.log('==== req.url ====')
    console.log(req.url)
    if(req.url == '/'){
        res.write(homePage)
    } else if (req.url == '/about'){
        res.write('<h1> About Page </h1>')
    } else if(req.url == '/style.css'){
        res.write(cssFile)
    } else {
        res.statusCode = 404
        res.write('<h1> not Found Page </h1>')
    }
    res.end()
})