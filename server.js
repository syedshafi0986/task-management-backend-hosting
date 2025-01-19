import express from 'express';
import mongoose from 'mongoose';
import { router as UserRouter } from './routes/userRoutes.js';

import dotenv from 'dotenv';
import { taskRouter } from './routes/taskroute.js';

dotenv.config();

const app = express();
app.use(express.json())
app.use('/user',UserRouter)
app.use('/user/task',taskRouter)


app.get("/",(req,res)=>{
  res.send("hello there")
})
mongoose.connect('mongodb://localhost:27017/userauth')
  .then(() => console.log('Connected to DB'))
  .catch(err => console.error('Failed to connect to DB', err));

  app.listen(3000, () => {
    console.log('Server runs on port 3000');
  });