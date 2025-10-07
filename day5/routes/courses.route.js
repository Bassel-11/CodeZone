
const express = require('express');
const {body} = require('express-validator')


const router = express.Router();


const coursesController = require('../controllers/courses.contoller.js');
const { validationSchema } = require('../middleware/validationSchema.js');



router.route('/')
    .get(coursesController.getAllCourses)
    .post(validationSchema(), coursesController.addCourse)



router.route('/:id')
    .get(coursesController.getCourseById)
    .patch(coursesController.updateCourse)
    .delete(coursesController.deleteCourse);


module.exports = router;
