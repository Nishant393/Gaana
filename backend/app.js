import express  from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRouter from "./routes/user-routes";
import cors from "cors"

dotenv.config();
const app = express();
const url = `${process.env.MONGODB}`;
const port = 5000


// middlewares
app.use(cors())
app.use(express.json());
app.use("/user", userRouter)


// mongoose coonection to Server
mongoose.connect(url)
.then(()=>app.listen(process.env.PORT,()=>console.log(`connected to DB and open port:${port}`)))
.catch(err=>console.log((err)));
