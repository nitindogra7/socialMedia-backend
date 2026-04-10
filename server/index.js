import express from 'express';
import dotenv from 'dotenv';
import authRouter from './routes/auth.routes.js';
import { connectDb } from './config/db.js';
import followRouter from './routes/followMethods.routes.js';
import cookieParser from 'cookie-parser';

dotenv.config();
const app = express();
app.use(express.json({ extended: true }));
app.use(cookieParser());

connectDb();

app.get('/', (req, res) => {
  res.send('working, lets fuck this wolrd');
});

app.use('/auth', authRouter);
app.use('/api', followRouter);

app.listen(process.env.PORT, () => {
  return console.log(`port is on ${process.env.PORT}`);
});
