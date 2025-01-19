import { requireAuth } from "../middleware/requireAuth.js";
import express from 'express'
import { createTask,getTask,DeleteTask,updateTask } from "../controllers/taskController.js";

const taskRouter = express.Router() 

taskRouter.use(requireAuth)
taskRouter.get("/get",getTask)
taskRouter.post("/create",createTask)
taskRouter.delete("/delete/:id",DeleteTask)
taskRouter.put("/update/:id",updateTask)

export {taskRouter}
