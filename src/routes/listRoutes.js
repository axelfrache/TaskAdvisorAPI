const express = require('express');
const router = express.Router();
const List = require('../model/List');
const Task = require('../model/Task');
const auth = require('../middleware/auth');

router.post('/', auth, async (req, res) => {
    try {
        const { name, description } = req.body;
        const user = req.user.id;

        const list = new List({
            name,
            description,
            user
        });

        const savedList = await list.save();
        res.status(201).json(savedList);
    } catch (error) {
        console.error('Error creating list:', error);
        res.status(500).json({ error: 'Error creating list' });
    }
});

router.get('/', auth, async (req, res) => {
    try {
        const lists = await List.find({ user: req.user.id }).populate('tasks');
        res.status(200).json(lists);
    } catch (error) {
        console.error('Error fetching lists:', error);
        res.status(500).json({ error: 'Error fetching lists' });
    }
});

router.post('/:listId/tasks', auth, async (req, res) => {
    try {
        const { listId } = req.params;
        const { taskId } = req.body;

        const list = await List.findById(listId);
        if (!list || list.user.toString() !== req.user.id) {
            return res.status(401).json({ error: 'Not authorized' });
        }

        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        task.list = listId;
        await task.save();

        list.tasks.push(taskId);
        await list.save();

        res.status(200).json(list);
    } catch (error) {
        console.error('Error adding task to list:', error);
        res.status(500).json({ error: 'Error adding task to list' });
    }
});

router.delete('/:listId/tasks/:taskId', auth, async (req, res) => {
    try {
        const { listId, taskId } = req.params;

        const list = await List.findById(listId);
        if (!list || list.user.toString() !== req.user.id) {
            return res.status(401).json({ error: 'Not authorized' });
        }

        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        task.list = null;
        await task.save();

        list.tasks.pull(taskId);
        await list.save();

        res.status(200).json({ message: 'Task removed from list' });
    } catch (error) {
        console.error('Error removing task from list:', error);
        res.status(500).json({ error: 'Error removing task from list' });
    }
});

module.exports = router;