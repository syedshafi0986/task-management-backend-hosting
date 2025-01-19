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

// const DBURI = mongodb+srv://shafi02367:<db_password>@taskcluster.piktc.mongodb.net/?retryWrites=true&w=majority&appName=taskCluster"
mongoose.connect(process.env.DBURI)
  .then(() => console.log('Connected to DB'))
  .catch(err => console.error('Failed to connect to DB', err));

  app.listen(3000, () => {
    console.log('Server runs on port 3000');
  });