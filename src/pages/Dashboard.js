import React, { useEffect, useState } from "react";
import { message } from "antd";

import TaskList from "../components/TaskList";
import TaskToolbar from "../components/TaskToolbar";
import TaskForm from "../components/TaskForm";

import {
  getTasks,
  createTask,
  updateTask,
  deleteTask as removeTask
} from "../services/taskService";

const Dashboard = () => {

  const [tasks, setTasks] = useState([]);

  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  const [formVisible, setFormVisible] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const fetchTasks = async () => {

    try {
      const res = await getTasks();
      setTasks(res.data);
    } catch {
      message.error("Failed to fetch tasks");
    }

  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const openForm = () => {
    setEditingTask(null);
    setFormVisible(true);
  };

  const handleSubmit = async (values) => {

    try {

      if (editingTask) {

        await updateTask(editingTask._id, values);
        message.success("Task updated");

      } else {

        await createTask(values);
        message.success("Task created");

      }

      setFormVisible(false);
      fetchTasks();

    } catch {

      message.error("Something went wrong");

    }

  };

  const updateStatus = async (id, status) => {

    try {

      await updateTask(id, { status });
      fetchTasks();

    } catch {

      message.error("Status update failed");

    }

  };

  const deleteTask = async (id) => {

    try {

      await removeTask(id);
      message.success("Task deleted");
      fetchTasks();

    } catch {

      message.error("Delete failed");

    }

  };

  const editTask = (task) => {
    setEditingTask(task);
    setFormVisible(true);
  };

  let filtered = [...tasks];

  if (filterStatus !== "all") {
    filtered = filtered.filter((t) => t.status === filterStatus);
  }

  if (search.trim()) {
    filtered = filtered.filter((t) =>
      t.title.toLowerCase().includes(search.toLowerCase())
    );
  }

  filtered.sort((a, b) => {

    if (sortBy === "newest")
      return new Date(b.createdAt) - new Date(a.createdAt);

    if (sortBy === "oldest")
      return new Date(a.createdAt) - new Date(b.createdAt);

    if (sortBy === "dueDate")
      return new Date(a.dueDate) - new Date(b.dueDate);

    return 0;

  });

  return (
    <div style={{ padding: 30 }}>

      <TaskToolbar
        search={search}
        setSearch={setSearch}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        sortBy={sortBy}
        setSortBy={setSortBy}
        openForm={openForm}
      />

      <TaskList
        tasks={filtered}
        updateStatus={updateStatus}
        deleteTask={deleteTask}
        editTask={editTask}
      />

      <TaskForm
        visible={formVisible}
        editingTask={editingTask}
        onCancel={() => setFormVisible(false)}
        onSubmit={handleSubmit}
      />

    </div>
  );
};

export default Dashboard;