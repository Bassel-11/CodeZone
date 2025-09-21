
const express = require('express');
const app = express();
const port = 3000;

const {body, validationResult} = require('express-validator');
// app.use(validationResult());

app.use(express.json());

const coursesController = require('./controllers/courses.controllers')

const courseRouter = require('./Routes/courses.route')

app.use('/api/courses', courseRouter)


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
