const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// Get all tasks
router.get('/', async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

// Add a task
router.post('/', async (req, res) => {
  const newTask = new Task({ title: req.body.title });
  const saved = await newTask.save();
  res.json(saved);
});

// Toggle task
router.patch('/:id', async (req, res) => {
  const task = await Task.findById(req.params.id);
  task.completed = !task.completed;
  const saved = await task.save();
  res.json(saved);
});

// Delete task
router.delete('/:id', async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

module.exports = router;
