const { validationResult } = require('express-validator');
const Course = require('../models/course.model');

// Get all courses
const getAllCourse = async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get course by ID
const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);
    if (!course) return res.status(404).send('Course not found');
    res.json(course);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add new course
const addCourse = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const newCourse = new Course({
      title: req.body.title,
      price: req.body.price,
    });
    await newCourse.save();
    res.status(201).json(newCourse);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update course
const updateCourse = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const updateData = {};
    if (req.body.title !== undefined) updateData.title = req.body.title;
    if (req.body.price !== undefined) updateData.price = req.body.price;

    const course = await Course.findByIdAndUpdate(
      req.params.courseId,
      updateData,
      { new: true }
    );

    if (!course) return res.status(404).send('Course not found');
    res.json(course);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete course
const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.courseId);
    if (!course) return res.status(404).send('Course not found');
    res.status(200).json({ message: 'Course deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllCourse,
  getCourseById,
  addCourse,
  updateCourse,
  deleteCourse,
};
