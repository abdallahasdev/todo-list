const express = require("express");
const app = express();

// Get tasks function(get)
exports.getTasks = (req, res) => {
    res.status(200).json(tasks);
};

// Add task function(post)
exports.addTask = (req, res) => {
    const task = {
        id: tasks.length + 1,
        title: req.body.title,
        completed: false,
    };
    if (!task.title) {
        return res.status(400).json({ message: "Task title is required" });
    }
    tasks.push(task);
    res.status(201).json({ message: "Task added successfully", task });
};

// Delete function(delete)
exports.deleteTask = (req, res) => {
    const taskId = parseInt(req.params.id);
    const taskIndex = tasks.findIndex((t) => t.id === taskId);
    if (taskIndex !== -1) {
        tasks.splice(taskIndex, 1);
        return res.status(200).json({
            message: "Task deleted successfully",
        });
    } else {
        return res.status(404).json({
            message: "Task not found",
        });
    }
}

// Edit compelet state(patch)
exports.editComplete = (req, res) => {
    const { id } = req.params;
    const taskIndex = tasks.findIndex((t) => t.id === parseInt(id));
    if (taskIndex !== -1) {
        tasks[taskIndex] = { ...tasks[taskIndex], ...req.body };
        res.json(tasks[taskIndex]);
    } else {
        res.status(404).send("Task not found");
    }
}