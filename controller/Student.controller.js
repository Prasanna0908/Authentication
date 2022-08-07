const Student = require('../model/Student')

const getAllStudents = async(req, res) => {
    try{
        const tasks = await Student.find()
        if(!tasks){
            return res.status(404).json({msg:`No tasks: ${taskID}`})
        }
        res.status(201).json({tasks})
    }catch(err){
        res.status(500).json({msg:err })
    }
}

const createStudent = async (req, res) => {
    try{
        const task = await Student.create(req.body)
        id = task.id
        res.status(201).json({[`Roll No${task.id}`] : task})
    }catch(err){
        res.status(404).json({msg:err })
    }
}

module.exports = {getAllStudents, createStudent}