import API from "./api";

export const getTasks = async () => {
  const response = await API.get("/tasks");
  console.log(response.data);
  
  return response.data;
};

export const addTask = async (taskData) => {
  const response = await API.post("/tasks", taskData);
  return response.data;
};


export const updateTask = async (id, taskData) => {
  const response = await API.put(`/tasks/${id}`, taskData);
  return response.data;
};

export const deleteTask = async (id) => {
  const response = await API.delete(`/tasks/${id}`);
  return response.data;
};

