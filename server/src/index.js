// imports
const express = require("express");
const cors = require("cors");
const router = require("./routes/mainRoutes");
const app = express();
// middleware uses
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/api", router);

// examble dataBase

const tasks = [];

// routes
// get all tasks
app.get("/api/tasks", (req, res) => {
  res.status(200).json(tasks);
});

// // add a new task
// app.post("/api/addtask", (req, res) => {
//   const task = {
//     id: tasks.length + 1,
//     title: req.body.title,
//     completed: false,
//   };
//   if (!task.title) {
//     return res.status(400).json({ message: "Task title is required" });
//   }
//   tasks.push(task);
//   res.status(201).json({ message: "Task added successfully", task });
// });

// // delete task
// app.delete("/api/delete/:id", (req, res) => {
//   const taskId = parseInt(req.params.id);
//   const taskIndex = tasks.findIndex((t) => t.id === taskId);
//   if (taskIndex !== -1) {
//     tasks.splice(taskIndex, 1);
//     return res.status(200).json({
//       message: "Task deleted successfully",
//     });
//   } else {
//     return res.status(404).json({
//       message: "Task not found",
//     });
//   }
// });

// //  edit complete state
// app.patch("/api/tasks/:id", (req, res) => {
//   const { id } = req.params;
//   const taskIndex = tasks.findIndex((t) => t.id === parseInt(id));
//   if (taskIndex !== -1) {
//     tasks[taskIndex] = { ...tasks[taskIndex], ...req.body };
//     res.json(tasks[taskIndex]);
//   } else {
//     res.status(404).send("Task not found");
//   }
// });
// 
// server listen function

const port = process.env.PORT || 2020;

app.listen(port, () => {
  console.log(`app listen on port ${port}`);
});
