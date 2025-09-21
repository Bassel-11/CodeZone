
const express = require('express');
const app = express();
const port = 3000;

const {body, validationResult} = require('express-validator');
app.use(validationResult());

app.use(express.json());

const courses = [
    {
        id: 1,
        title: 'js course',
        price: 1000,
    },
    {
        id: 2,
        title: 'react course',
        price: 800,
    },
    {
        id: 3,
        title: 'node course',
        price: 1200,
    }
]

//CRUD (Create Read Update Delete)

app.get('/api/courses', (req, res) => {
    res.json(courses);
});

// get all courses
app.get('/api/courses', (req, res) => {
    res.json(courses);
});

// get course by id
app.get('/api/courses/:courseId', (req, res) => {
    const courseId = parseInt(req.params.courseId);
    const course = courses.find(c => c.id === courseId);
    if (!course) return res.status(404).send('Course not found');
    res.json(course);
});

// create a new course
app.post('/api/courses',
    [
        body('title')
            .notEmpty()
            .withMessage('Title is required')
            .isLength({ min: 2 })
            .withMessage('Title must be at least 2 characters long'),
        body('price')
            .notEmpty()
            .withMessage('Price is required')
            .isNumeric()
            .withMessage('Price must be a number'),
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const newCourse = {
            id: courses.length + 1,
            title: req.body.title,
            price: req.body.price
    };
    courses.push(newCourse);
    res.status(201).json(newCourse);
}); 


// update a course
app.patch('/api/courses/:courseId',
    [
        body('title')
            .optional()
            .notEmpty()
            .withMessage('Title is required')
            .isLength({ min: 2 })
            .withMessage('Title must be at least 2 characters long'),
        body('price')
            .optional()
            .notEmpty()
            .withMessage('Price is required')
            .isNumeric()
            .withMessage('Price must be a number'),
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const courseId = parseInt(req.params.courseId);
        const course = courses.find(c => c.id === courseId);
        if (!course) return res.status(404).send('Course not found');
        course.title = req.body.title;
        course.price = req.body.price;
        res.json(course);
    });


// delete a course
app.delete('/api/courses/:courseId', (req, res) => {
    const courseId = parseInt(req.params.courseId);
    const courseIndex = courses.findIndex(c => c.id === courseId);
    if (courseIndex === -1) return res.status(404).send('Course not found');
    courses.splice(courseIndex, 1);
    res.status(204).send();
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
