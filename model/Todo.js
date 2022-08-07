// User Schema 
// Change the schema and file name if you want to

const mongoose = require('mongoose')

const TodoSchema = new mongoose.Schema({
    roll_no : 
    {
        type:String,
        name:{
            type: String,
            
        },
        isDone:{
            type: Boolean,
            default: false
        }
    }
})

module.exports = mongoose.model('Todo', TodoSchema)