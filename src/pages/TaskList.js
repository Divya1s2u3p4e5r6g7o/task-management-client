import React from "react";
import { Card, Button, Tag, Space } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const TaskList = ({ tasks, onEdit, onDelete }) => {

  if (!tasks.length) {
    return <p>No Results Found</p>;
  }

  const getStatusColor = (status) => {
    if (status === "Completed") return "green";
    if (status === "In Progress") return "orange";
    return "red";
  };

  const isOverdue = (dueDate) => {
    if (!dueDate) return false;
    return dayjs(dueDate).isBefore(dayjs(), "day");
  };

  return (
    <Space orientation="vertical" style={{ width: "100%" }}>

      {tasks.map((task) => {

        const overdue = isOverdue(task.dueDate);

        return (
          <Card
            key={task._id}
            hoverable
            style={{
              borderLeft: `6px solid ${
                task.status === "Completed"
                  ? "#52c41a"
                  : task.status === "In Progress"
                  ? "#fa8c16"
                  : "#ff4d4f"
              }`
            }}
          >

            {/* Task Content */}

            <div style={{ display: "flex", justifyContent: "space-between" }}>

              <div>

                <h3 style={{ marginBottom: 5 }}>
                  {task.title}
                </h3>

                <p style={{ marginBottom: 8 }}>
                  {task.description}
                </p>

                {task.dueDate && (
                  <p
                    style={{
                      color: overdue ? "red" : "#666",
                      fontWeight: overdue ? "bold" : "normal"
                    }}
                  >
                    Due: {dayjs(task.dueDate).format("DD MMM YYYY")}
                    {overdue && " (Overdue)"}
                  </p>
                )}

              </div>

              {/* Status Badge */}

              <Tag
                color={getStatusColor(task.status)}
                style={{ height: 28, lineHeight: "26px" }}
              >
                {task.status}
              </Tag>

            </div>

            {/* Action Buttons */}

            <div
              style={{
                marginTop: 18,
                display: "flex",
                gap: "12px"
              }}
            >

              <Button
                type="primary"
                ghost
                icon={<EditOutlined />}
                onClick={() => onEdit(task)}
              >
                Edit
              </Button>

              <Button
                danger
                icon={<DeleteOutlined />}
                onClick={() => onDelete(task._id)}
              >
                Delete
              </Button>

            </div>

          </Card>
        );
      })}

    </Space>
  );
};

export default TaskList;