import express from "express"
import dotenv from "dotenv"
dotenv.config();

const app = express();
const port = process.env.PORT
app.listen(port, ()=>{
    console.log("App is listening on ", port)
})
app.get("/", (req, res)=>{
    res.send("Hello")
})
