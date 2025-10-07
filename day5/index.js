
const express = require('express');
const {body, validationResult} = require('express-validator')
const app = express();

app.use(express.json())
const coursesController = require('./controllers/courses.contoller.js');


app.get('/api/courses', coursesController.getAllCourses); 

app.get('/api/courses/:id', coursesController.getCourseById);

app.post('/api/courses', 
    [
        body('name')
            .notEmpty()
            .withMessage('Name is required')
            .isLength({min: 2})
            .withMessage('Name must be at least 2 characters long'),
        body('price')
            .notEmpty()
            .withMessage('Price is required'),
    ],
    coursesController.addCourse
)

app.patch('/api/courses/:id', coursesController.updateCourse);

app.delete('/api/courses/:id', coursesController.deleteCourse);

app.listen(3000, () => {
    console.log('listening on port 3000')
})