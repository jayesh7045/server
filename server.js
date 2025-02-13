import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import { router } from "./Routes/AuthRouter.js";
dotenv.config();

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


export default app;
