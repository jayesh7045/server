import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import { router } from "./Routes/AuthRouter.js";
import { connectDB } from "./DB/db.js";
dotenv.config();

const URL = process.env.URL
const PORT = process.env.PORT || 5000
const app = express(); // ✅ Initialize the Express app

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use("/api/auth/", router)
app.get("/", (req, res) => {
  res.send("This is the Home Page");
});
app.get("/json", (req, res) => {
    res.send("This is the JSON Page");
  });

  let connection = null
  export async function get_connection(){
      if(connection === null)
          connection = await connectDB(URL)
      return connection 
  }
//   get_connection();
export default app;
