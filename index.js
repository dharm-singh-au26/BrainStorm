import express from 'express';
import bodyParser from 'body-parser';
import { config } from './config';

// Route Import
import { UserRoute } from './src/User/route'
import { ProfileRoute } from './src/profile/route';

const app = express();

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
// app.use('/',(req,res) =>{
//     res.send("Welcome to the project Backend Part")
// })

// Route Configuration
app.use('/user', UserRoute)
app.use('/profile',ProfileRoute)

app.listen(config.PORT,()=>{
    console.log(`server started at PORT: ${config.PORT}`)
})
