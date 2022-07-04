import express from 'express';
import bodyParser from 'body-parser';
import { config } from './config';

// Route Import
import { UserRoute } from './src/User/route'

const app = express();

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
// app.use('/',(req,res) =>{
//     res.send("Welcome to the project Backend Part")
// })

// Route Configuration
app.use('/user', UserRoute)

app.listen(config.PORT,()=>{
    console.log(`server started at PORT: ${config.PORT}`)
})
