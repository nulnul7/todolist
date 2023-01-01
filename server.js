import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import userRoute from './routes/userRoute.js'
import todoRoute from './routes/todoRoute.js'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const app = express();
dotenv.config();
const connectDB = async () => {
    try {
        mongoose.connect(process.env.MONGO_URI)
        console.log("CONNECT TO mongoDB");
    } catch (error) {
        throw (error)
    }
}

connectDB();

// middleware
app.use(cors());
app.use(express.json());

app.use("/5R2I/users", userRoute)
app.use("/5R2I/todo", todoRoute)


app.use("*", (req, res) => {
    res.json("PAGE NOT FOUND")
})

if (process.env.NODE_ENV === 'production') {
    //set static folder
    app.use(express.static(path.join(__dirname, "./client/build")));


    app.get("*", function (req, res) {
        res.sendFile(path.join(__dirname, "./client/build/index.html"));
    });
}

const PORT = process.env.PORT || 3001;

app.listen(PORT || 3001, () => {
    console.log("server RUNNING on Port", PORT);
});
