const express = require('express')
const { getAllStudents, getTodo, createStudent, updateTodo, deleteTodo } = require('../controller/Student.controller')
const router = express.Router()

router.route('/').get(getAllStudents).post(createStudent)
// router.route('/:id').get(getTodo).patch(updateTodo).delete(deleteTodo)

module.exports = router