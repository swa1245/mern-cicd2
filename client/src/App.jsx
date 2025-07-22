import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "https://35.154.133.207/api/tasks";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const fetchTasks = async () => {
    const res = await axios.get(API);
    setTasks(res.data);
  };

  const addTask = async () => {
    if (!title) return;
    await axios.post(API, { title });
    setTitle("");
    fetchTasks();
  };

  const toggleTask = async (id) => {
    await axios.patch(`${API}/${id}`);
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`${API}/${id}`);
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Task Manager</h1>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New task"
      />
      <button onClick={addTask}>Add</button>
      <ul>
        {tasks.map((t) => (
          <li key={t._id}>
            <span
              style={{
                textDecoration: t.completed ? "line-through" : "none",
                marginRight: 10,
              }}
              onClick={() => toggleTask(t._id)}
            >
              {t.title}
            </span>
            <button onClick={() => deleteTask(t._id)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
