import express from "express"
import dotenv from "dotenv"

import bodyParser from "body-parser";
import cors from "cors"
import { router } from "./Routes/AuthRouter.js";
dotenv.config()

app.use(express.json())
app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res)=>{
    res.send("This is the Home Page")
})





