const mongoose = require('mongoose')

const connectDB = async (url) => {
    try{
        const conn = await mongoose.connect(url,
            {useNewUrlParser : true, useUnifiedTopology:true})
        console.log(`MongoDB connected ${conn.connection.host}`)
    } catch(error) {
        console.log(error)    
    }
}

module.exports = connectDB