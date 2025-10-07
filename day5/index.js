
const express = require('express');
const {body, validationResult} = require('express-validator')
const app = express();

app.use(express.json())

const courseRouter = require('./routes/courses.route.js')

app.use('/api/courses', courseRouter)

app.listen(3000, () => {
    console.log('listening on port 3000')
})