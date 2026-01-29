import axios from "axios";
import { useState, useRef, useEffect } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [cWord, setCWord] = useState("");
  const [tWord, setTWord] = useState("");
  const [loading, setLoading] = useState(true);
  const completedLen = tasks.filter((t) => t.completed);
  const inputRef = useRef();
  const prevLen = useRef(completedLen.length);
  const prevTaskslen = useRef(tasks.length);
  async function getTasks() {
    try {
      const res = (await axios.get("http://localhost:2020/api/tasks")).data;
      setTasks(res);
    } catch (error) {
      console.error(error);
    }
  }
  async function completeState(id, currentStatus) {
    try {
      await axios.patch(`http://localhost:2020/api/tasks/${id}`, {
        completed: !currentStatus,
      });
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? { ...task, completed: !currentStatus } : task,
        ),
      );
    } catch (error) {
      console.error(error);
    }
  }
  async function deleteTask(id) {
    try {
      await axios.delete(`http://localhost:2020/api/delete/${id}`);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error(error);
    }
    getTasks();
  }
  async function addTask() {
    const title = inputRef.current.value;
    if (!title) return;
    try {
      const res = await axios.post("http://localhost:2020/api/addtask", {
        title: title,
      });
      setTasks((prev) => [...prev, res.data]);
      inputRef.current.value = "";
    } catch (error) {
      console.error(error);
    }
    getTasks();
  }

  getTasks().finally(() => setLoading(false));

  const cWords = [
    "Let's Go",
    "Nice",
    "You Are Hero",
    "superman",
    "like nerds !?",
    "hard day how did you do that",
    "I think you are tired now ?",
  ];

  const tWords = [
    "that's greet Task",
    "are you can do it?",
    "i think this task is easy !?",
    "oh this is hard day",
    "are you sure you can done this task",
  ];

  useEffect(() => {
    if (completedLen.length > prevLen.current) {
      setCWord(cWords[Math.floor(Math.random() * cWords.length)]);
    }
    prevLen.current = completedLen.length;
  }, [completedLen.length]);

  useEffect(() => {
    if (tasks.length > prevTaskslen.current) {
      setTWord(tWords[Math.floor(Math.random() * tWords.length)]);
    }
    prevTaskslen.current = tasks.length
  }, [tasks.length]);

  if (loading) return <p className="text-center mt-10">Loading Tasks...</p>;
  return (
    <div className="font-[cairo] overflow-hidden w-fit mx-auto my-20 shadow-2xl">
      <div className="m-10 p-5 border rounded-lg shadow-2xl">
        <h1 className="font-bold text-2xl">You'r Tasks</h1>
        {!tasks.length ? (
          <strong>Are ready to make a organized day ?!</strong>
        ) : (
          <strong>
            You have {tasks.length} Task{tasks.length > 1 ? "s" : ""} !
          </strong>
        )}
        <h3>{tasks.length ? tWord : " "}</h3>
        <ul>
          {tasks.map((task) => (
            <li
              key={task.id}
              className="border-b py-2 flex justify-between p-2 *:cursor-pointer"
            >
              <h2
                className={task.completed === true ? "italic line-through" : ""}
                onClick={() => completeState(task.id, task.completed)}
              >
                {task.title}
              </h2>
              <span
                className="text-red-600 font-extrabold"
                onClick={() => deleteTask(task.id)}
              >
                X
              </span>
            </li>
          ))}
        </ul>
          <h2>{cWord}</h2>

        <br />
        <input
          className="border m-1 rounded px-1.5"
          placeholder="Enter You'r task"
          ref={inputRef}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
        />
        <button onClick={() => addTask()}>Add Task</button>
      </div>
    </div>
  );
}

export default App;
