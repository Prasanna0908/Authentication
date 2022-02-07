const Todo = require('../model/Todo')

const getAllTodos = async(req, res) => {
    try{
        const tasks = await Todo.find()
        if(!tasks){
            return res.status(404).json({msg:`No tasks: ${taskID}`})
        }
        res.status(201).json({tasks})
    }catch(err){
        res.status(500).json({msg:err })
    }
}

const getTodo = (req, res) => {
    res.send("Single Todo")
}

const createTodo = async (req, res) => {
    try{
        const task = await Todo.create(req.body)
        res.status(201).json({task})
    }catch(err){
        res.status(404).json({msg:err })
    }
}

const updateTodo = (req, res) => {
    res.send("Single Todo")
}

const deleteTodo = (req, res) => {
    res.send("Delete Todo")
}

module.exports = {getAllTodos, getTodo, createTodo, updateTodo, deleteTodo}