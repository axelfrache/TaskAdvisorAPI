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
        required: true
    },
    description: {
        type: String
    },
    dueDate: {
        type: Date,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    repetition: {
        type: String,
        enum: Object.values(TaskRepetition),
        default: TaskRepetition.ONCE
    },
    customRepetitionDays: [{
        type: String,
        enum: Object.values(DaysOfWeek)
    }],
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