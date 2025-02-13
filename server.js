import express from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.get("/", (req, res) => {
    res.send("Hello from Vercel!");
});

// Instead of app.listen(), export the app for Vercel
export default app;
