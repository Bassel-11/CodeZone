const express = require('express')
// const fs = require('fs')
// const homePage = fs.readFileSync('./views/index.html', 'utf-8')

const app = express()

// app.use(express.static('./views'))

// const logger = (req) => {
//   console.log('METHOD:', req.method, 'URL:', req.url);
// };

app.use((req, res, next)=>{
    console.log('METHOD:', req.method, 'URL:', req.url);
    next()
})

app.get('/', (req, res) => {
    logger() 
    res.send('hello world')
})

app.get('/about', (req, res) => {
    logger()
    res.send("<h1> hi this is about </h1>" )
})

app.get('/products', (req, res) => {
    logger()
    res.send([
        {id: 1, title: 'product 1'},
        {id: 2, title: 'product 2'},
    ])
})

app.listen('5000', () => {
    console.log('listening on port 5000')
})
