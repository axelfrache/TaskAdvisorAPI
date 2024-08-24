const express = require('express');
const router = express.Router();
const Task = require('../model/Task');
const User = require('../model/User');
const auth = require('../middleware/auth');

router.post('/', auth, async (req, res) => {
    try {
        const { name, description, dueDate, repetition, customRepetitionDays } = req.body;
        const user = req.user.id;

        const task = new Task({
            name,
            description,
            dueDate,
            repetition,
            customRepetitionDays,
            user
        });

        const savedTask = await task.save();

        const userDoc = await User.findById(user);
        if (!userDoc) {
            return res.status(404).json({ error: 'User not found' });
        }

        userDoc.tasks.push(savedTask._id);
        await userDoc.save();

        res.status(201).json(savedTask);
    } catch (error) {
        console.error('Error creating task:', error);
        res.status(500).json({ error: 'Error creating task' });
    }
});

router.get('/', auth, async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user.id });
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching tasks' });
    }
});

router.put('/:id', auth, async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (task.user.toString() !== req.user.id) {
            return res.status(401).json({ error: 'Not authorized' });
        }

        const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500).json({ error: 'Error updating task' });
    }
});

router.delete('/', auth, async (req, res) => {
    try {
        const { taskIds } = req.body;

        if (!Array.isArray(taskIds) || taskIds.length === 0) {
            return res.status(400).json({ error: 'No task IDs provided or invalid format' });
        }

        const tasks = await Task.find({ _id: { $in: taskIds }, user: req.user.id });

        if (tasks.length !== taskIds.length) {
            return res.status(401).json({ error: 'Not authorized to delete some or all tasks' });
        }

        await Task.deleteMany({ _id: { $in: taskIds } });

        res.status(200).json({ message: 'Tasks deleted successfully' });
    } catch (error) {
        console.error('Error deleting tasks:', error);
        res.status(500).json({ error: 'Error deleting tasks' });
    }
});

module.exports = router;