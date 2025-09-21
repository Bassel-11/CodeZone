
let {courses} = require('./data/courses')
const {body, validationResult} = require('express-validator');

const getAllCourse = (req, res) => {
    res.json(courses);
}

const getCourseById = (req, res) => {
    const courseId = parseInt(req.params.courseId);
    const course = courses.find(c => c.id === courseId);
    if (!course) return res.status(404).send('Course not found');
    res.json(course);
}

const addCourse = ([
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
})

const updateCourse = ([
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
    })

const deleteCourse = (req, res) => {
    const courseId = parseInt(req.params.courseId);
    const courseIndex = courses.findIndex(c => c.id === courseId);
    if (courseIndex === -1) return res.status(404).send('Course not found');
    courses.splice(courseIndex, 1);
    res.status(204).send();
}

module.exports = {
    getAllCourse,
    getCourseById,
    addCourse,
    updateCourse,
    deleteCourse
}