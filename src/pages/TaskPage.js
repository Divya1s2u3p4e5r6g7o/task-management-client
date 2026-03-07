import React, { useState, useEffect } from "react";
import { Layout, message } from "antd";
import Navbar from "../components/Navbar";
import TaskForm from "../components/TaskForm";
import TaskList from "../pages/TaskList";
import TaskToolbar from "../components/TaskToolbar";
import {
  addTask,
  getTasks,
  updateTask,
  deleteTask
} from "../services/taskService";

const { Content } = Layout;

const TaskPage = () => {

  const [tasks, setTasks] = useState([]);

  const [open, setOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  const fetchTasks = async () => {
    const res = await getTasks();
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddClick = () => {
    setEditingTask(null);
    setOpen(true);
  };

  const handleSubmit = async (task) => {

    try {

      if (editingTask) {
        await updateTask(editingTask._id, task);
        message.success("Task updated");
      } else {
        await addTask(task);
        message.success("Task added");
      }

      setOpen(false);
       fetchTasks();

    } catch {
      message.error("Something went wrong");
    }

  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setOpen(true);
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    message.success("Task deleted");
    fetchTasks();
  };

  let filteredTasks = [...tasks];

  if (filterStatus !== "all") {
    filteredTasks = filteredTasks.filter(
      (t) => t.status === filterStatus
    );
  }

  if (search.trim()) {
    filteredTasks = filteredTasks.filter((t) =>
      t.title.toLowerCase().includes(search.toLowerCase())
    );
  }

  filteredTasks.sort((a, b) => {

    if (sortBy === "newest")
      return new Date(b.createdAt) - new Date(a.createdAt);

    if (sortBy === "oldest")
      return new Date(a.createdAt) - new Date(b.createdAt);

    if (sortBy === "dueDate")
      return new Date(a.dueDate) - new Date(b.dueDate);

    return 0;
  });

  return (
    <Layout style={{ minHeight: "100vh" }}>

      <Navbar />

      <Content style={{ padding: 30 }}>

        <h2>Task Manager</h2>

        <TaskToolbar
          search={search}
          setSearch={setSearch}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          sortBy={sortBy}
          setSortBy={setSortBy}
          openForm={handleAddClick}
        />

        <TaskList
          tasks={filteredTasks}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

    

        <TaskForm
          open={open}
          editingTask={editingTask}
          onSubmit={handleSubmit}
          onCancel={() => setOpen(false)}
        />

      </Content>

    </Layout>
  );
};

export default TaskPage;