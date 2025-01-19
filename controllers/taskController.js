import Task from "../schema/taskSchema.js"
//  1.create a tsk (POST)
// 2.role(from db)
// 3.update the task (PUT/PATCH)
// 4.delete the task (DELETE)
// 5.user dash board (GET)

// create the task using post req

const createTask = async (req,res)=>{
    const {title, description,dueDate,status,priority} = req.body;
    try{
    const assignedTo = req.user._id;
    const createdTask = await Task.create({ 
        title, 
        description, 
        dueDate, 
        status, 
        priority, 
        assignedTo 
      });
    return res.status(200).json({createdTask,msg:"task sucessfully created"})

    }
    catch(e){
        console.error(e.message);
        return res.status(500).json('failed to create a task ')
        
    }
    
}
const getTask = async (req,res)=>{
    try{
        const assignedTo = req.user._id; // Assuming `req.user` is the authenticated user

        // Fetch all tasks for the authenticated user
        const userTasks = await Task.find({ assignedTo })
        return res.status(200).json({userTasks,msg:"user credentilas successfully fetched"})
    }
    catch(e){
        console.error(e.message);
        return res.status(400).json('failed to fetch the task ')
        
    }
}


// delete a task 
const DeleteTask = async(req,res)=>{
    try{
         const {id}= req.params;
        //  const {title} = req.body;
        const deleteTask = await Task.findByIdAndDelete(id) 
        return res.status(201).json({deleteTask,msg:"success "})
    }catch(e){
        return res.status(500).json({msg:"failed to delete"})
    }
     }
const updateTask = async(req,res)=>{
try{
    // const assignedTo = req.user._id;
    const {id}= req.params
    const { title, description, dueDate, status, priority } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(id, {
        title,
        description,
        dueDate,
        status,
        priority
      }, { new: true });    
      return res.status(200).json({updatedTask,msg:"sucessfully completely"})
}
catch(e){
    return res.status(500).json({msg:"failed to update the task "})
}
}

export {
    createTask,
    getTask,
    DeleteTask,
    updateTask
}