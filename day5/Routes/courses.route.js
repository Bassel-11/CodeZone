const express = require('express');
const { body } = require('express-validator');
const coursesController = require('../controllers/courses.controllers');

const router = express.Router();

// ================== CRUD Routes ================== //

// Get all courses
router.get('/', coursesController.getAllCourse);

// Create a new course
router.post(
  '/',
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
  coursesController.addCourse
);

// Get course by ID
router.get('/:courseId', coursesController.getCourseById);

// Update a course
router.patch(
  '/:courseId',
  [
    body('title')
      .optional()
      .isLength({ min: 2 })
      .withMessage('Title must be at least 2 characters long'),
    body('price')
      .optional()
      .isNumeric()
      .withMessage('Price must be a number'),
  ],
  coursesController.updateCourse
);

// Delete a course
router.delete('/:courseId', coursesController.deleteCourse);

module.exports = router;
