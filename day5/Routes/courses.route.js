
const express = require('express')

const {body} = require('express-validator');

const router = express.Router();

const coursesController = require('../controllers/courses.controllers')
//CRUD (Create Read Update Delete)
//Route --> Resources
// get all courses
router.get('/', coursesController.getAllCourse);

// get course by id
router.get('/:courseId', coursesController.getCourseById);

// create a new course
router.post('/', coursesController.addCourse); 

// update a course
router.patch('/:courseId', coursesController.updateCourse);

// delete a course
router.delete('/:courseId', coursesController.deleteCourse);

module.exports = router