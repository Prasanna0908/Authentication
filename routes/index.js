const express = require('express')
const { getAllTodos, getTodo, createTodo, updateTodo, deleteTodo } = require('../controller/Todo.controller')
const router = express.Router()

router.route('/').get(getAllTodos).post(createTodo)
router.route('/:id').get(getTodo).patch(updateTodo).delete(deleteTodo)

module.exports = router