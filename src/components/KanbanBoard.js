import React from "react";
import { Card, Tag } from "antd";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const columns = ["Pending", "InProgress", "Completed"];

const KanbanBoard = ({ tasks, updateStatus }) => {

  const groupedTasks = {
    Pending: [],
    InProgress: [],
    Completed: []
  };

  tasks.forEach((task) => {
    if (groupedTasks[task.status]) {
      groupedTasks[task.status].push(task);
    }
  });

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const taskId = result.draggableId;
    const newStatus = result.destination.droppableId;

    updateStatus(taskId, newStatus);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div style={{ display: "flex", gap: 20, marginTop: 30 }}>

        {columns.map((status) => (

          <Droppable key={status} droppableId={status}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                style={{
                  flex: 1,
                  background: "#f4f6f8",
                  padding: 15,
                  borderRadius: 8,
                  minHeight: 400
                }}
              >

                <h3 style={{ textAlign: "center", marginBottom: 20 }}>
                  {status}
                </h3>

                {groupedTasks[status].map((task, index) => (

                  <Draggable
                    key={task._id}
                    draggableId={task._id}
                    index={index}
                  >
                    {(provided) => (

                      <Card
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          marginBottom: 10,
                          cursor: "grab"
                        }}
                      >

                        <h4>{task.title}</h4>

                        <p>{task.description}</p>

                        <Tag
                          color={
                            status === "Completed"
                              ? "green"
                              : status === "InProgress"
                              ? "orange"
                              : "red"
                          }
                        >
                          {status}
                        </Tag>

                      </Card>

                    )}
                  </Draggable>

                ))}

                {provided.placeholder}

              </div>
            )}
          </Droppable>

        ))}

      </div>
    </DragDropContext>
  );
};

export default KanbanBoard;