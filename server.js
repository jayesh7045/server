import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";

dotenv.config();

const app = express(); // ✅ Initialize the Express app

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("This is the Home Page");
});

// ✅ Export the app for Vercel's serverless functions
export default app;
