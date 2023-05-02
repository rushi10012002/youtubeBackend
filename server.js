const express = require('express')
const userRoute=require('./route/user')
const postRoute=require('./route/post')
const cors=require("cors")
const dataBaseConnection = require('./config/dataBase');
const path=require('path');
const dotenv=require('dotenv')

const app = express()
app.use(cors())
dotenv.config({
    path:"./config/.env"
})
const port = process.env.PORT
dataBaseConnection();
app.use('/Upload',express.static(path.join(__dirname,"Upload")))
app.use(express.json())

// user routes
app.use("/user",userRoute);
app.use("/post",postRoute);

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))