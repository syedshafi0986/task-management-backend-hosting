import mongoose from 'mongoose';

// Define the Task schema
const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: { 
        type: String, 
        required: true 
    },
    dueDate: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['to Do', 'in progress', 'completed'],
        default: 'to Do' // Fixed the enum mismatch
    },
    priority: {
        type: String,
        enum: ['Low', 'Medium', 'High'],
        default: 'Medium'
    },
    assignedTo: { // Changed to assignedTo for clarity
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true // Make sure the task is always assigned to a user
    },
}, { timestamps: true });

// Create the Task model
const Task = mongoose.model('Task', taskSchema);

export default Task;
