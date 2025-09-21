
const express = require('express')

const {body} = require('express-validator');

const router = express.Router();

const coursesController = require('../controllers/courses.controllers')
//CRUD (Create Read Update Delete)
//Route --> Resources
// get all courses
router.route('/')
    .get(coursesController.getAllCourse);
    .post([
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
    ], coursesController.addCourse); 

// get course by id
router.get('/:courseId', coursesController.getCourseById);

// create a new course

// update a course
router.patch('/:courseId', coursesController.updateCourse);

// delete a course
router.delete('/:courseId', coursesController.deleteCourse);

module.exports = router