const mongoose = require('mongoose');
const { Schema } = mongoose;

const taskSchema = new Schema({
    text: {
        type: String,
        required: true
    }, 
    status: {
        type: String,
        enum: ['to_do', 'done', 'removed'],
        default: 'to_do'
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date
    }
});

mongoose.model('tasks', taskSchema);