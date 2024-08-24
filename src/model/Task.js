const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskRepetition = require('./TaskRepetition');
const DaysOfWeek = require('./DaysOfWeek');

const TaskSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true,
        default: () => new mongoose.Types.ObjectId().toString()
    },
    name: {
        type: String,
        required: [true, 'Task name is required'],
        minlength: [3, 'Task name must be at least 3 characters long'],
        maxlength: [100, 'Task name cannot exceed 100 characters'],
        trim: true,
        set: (value) => value.trim()
    },
    description: {
        type: String,
        maxlength: [500, 'Description cannot exceed 500 characters'],
        trim: true,
        set: (value) => value.trim()
    },
    dueDate: {
        type: Date,
        required: [true, 'Due date is required'],
        validate: {
            validator: function(value) {
                return value > new Date();
            },
            message: 'Due date must be in the future'
        }
    },
    completed: {
        type: Boolean,
        default: false
    },
    repetition: {
        type: String,
        enum: {
            values: Object.values(TaskRepetition),
            message: 'Invalid repetition value'
        },
        default: TaskRepetition.ONCE
    },
    customRepetitionDays: [{
        type: String,
        enum: {
            values: Object.values(DaysOfWeek),
            message: 'Invalid day of the week'
        }
    }],
    list: {
        type: Schema.Types.ObjectId,
        ref: 'List'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model('Task', TaskSchema);