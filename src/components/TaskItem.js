import React from "react";
import { Card, Tag, Button, Space } from "antd";
import { EditOutlined, DeleteOutlined, CheckOutlined } from "@ant-design/icons";

const TaskItem = ({ task, onEdit, onDelete, onComplete }) => {

  const getStatusColor = () => {
    if (task.status === "Completed") return "green";
    if (task.status === "In Progress") return "blue";
    return "orange";
  };

  return (
    <Card
      title={task.title}
      extra={<Tag color={getStatusColor()}>{task.status}</Tag>}
      style={{ marginBottom: 16 }}
    >
      <p>{task.description}</p>

      <Space>
        <Button icon={<EditOutlined />} onClick={() => onEdit(task)}>
          Edit
        </Button>

        <Button danger icon={<DeleteOutlined />} onClick={() => onDelete(task._id)}>
          Delete
        </Button>

        {task.status !== "Completed" && (
          <Button type="primary" icon={<CheckOutlined />} onClick={() => onComplete(task)}>
            Complete
          </Button>
        )}
      </Space>
    </Card>
  );
};

export default TaskItem;