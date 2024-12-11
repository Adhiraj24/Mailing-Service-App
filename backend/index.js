import express from "express";
import dotenv from 'dotenv'
import connectDB from "./db/connectDB.js"
import authRoute from './routes/authRoutes.js'
import User from "./models/userModel.js";
dotenv.config({});

const app = express();
const PORT = process.env.PORT || 8001

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/api/auth', authRoute)



// app.get('/', async (req,res) => {
//     const user = await User.find({});

//     const Users = user.map((name) => {
//         return {
//             "Name" : name.name,
//             "Email": name.email
//         }
//     })

//     res.send(Users)
// })

console.log(PORT);

app.listen(PORT, () => {
    connectDB();
    console.log(`Server Started at PORT: ${PORT}`);
})