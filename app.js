//Load configs
const dotenv = require('dotenv');
const connectDB = require('./config/db');
dotenv.config({path : './config/config.env'})

//Modules
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const morgan = require('morgan')
const path = require('path');
const cors = require('cors')

const errorHandler = require('./middleware/error.middleware')

//Middlewares
app.use(cors())
app.use(express.json());
app.use(morgan('dev'))                                   //If you want logging
app.use(express.static(path.join(__dirname, 'public')))  //If you want to serve static files

// Routes endpoints
app.get('/' , (req, res) => {
    res.send("Boilerplate Code is succesfully installed !!")
})


app.use('/' , require('./routes/Auth'))
app.use('/dashboard' , require('./routes/private'))
app.use('/todo' , require('./routes/index'))


//Error Handlers
app.use(errorHandler)


const PORT = process.env.PORT || 5000 ;

const start = async () => {
    try{
        await connectDB(process.env.MONGO_URI)
        app.listen(PORT,console.log(`Listening on port ${PORT}`))
    }catch(err){
        console.log(err)
    }
}
start()
