
let {courses} = require('../data/courses')
const {validationResult} = require('express-validator')

const getAllCourses = (req, res) => {
    res.json(courses);
}

const getCourseById = (req, res) => {
    const id = parseInt(req.params.id)
    const course = courses.find(c => c.id === id);
    if (!course) return res.status(404).send('The course with the given ID was not found.');
    res.json(course)
}

const addCourse = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const newCourse = {id: courses.length+1, ...req.body}
    courses.push(newCourse)
    res.status(201).json(newCourse)
}

const updateCourse = (req, res) => {
        
        const id = parseInt(req.params.id);
        let course = courses.find(c => c.id === id);
        if (!course) return res.status(404).json({msg: 'The course with the given ID was not found.'});
        course = {...course, ...req.body};
        res.json(course);
}

const deleteCourse = (req, res) => {
    const id = parseInt(req.params.id);
    courses = courses.filter((c) => c.id !== id);
    res.status(204).json({success: true});
}

module.exports = {
    getAllCourses,
    getCourseById,
    addCourse,
    updateCourse,
    deleteCourse
}