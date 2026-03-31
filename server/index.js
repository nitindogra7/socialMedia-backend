import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/auth.routes.js";
import { connectDb } from "./config/db.js";

dotenv.config();
const app = express();
app.use(express.json({ extended: true }));

connectDb()

app.get("/", (req, res) => {
  res.send("working, lets fuck this wolrd");
});

app.use("/auth", authRouter);

app.listen(process.env.PORT, () => {
  return console.log(`port is on ${process.env.PORT}`);
});
