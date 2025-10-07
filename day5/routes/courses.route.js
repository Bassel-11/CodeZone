
const express = require('express');
const {body} = require('express-validator')


const router = express.Router();


const coursesController = require('../controllers/courses.contoller.js');


router.get('/', coursesController.getAllCourses);

router.get('/:id', coursesController.getCourseById);

router.post('/api/courses', 
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

router.patch('/:id', coursesController.updateCourse);

router.delete('/:id', coursesController.deleteCourse);

module.exports = router;
