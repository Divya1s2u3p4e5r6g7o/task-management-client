import React from "react";
import { Input, Select, Button, Row, Col } from "antd";

const { Option } = Select;

const TaskToolbar = ({
  search,
  setSearch,
  filterStatus,
  setFilterStatus,
  sortBy,
  setSortBy,
  openForm
}) => {

  return (

    <Row gutter={16} style={{ marginBottom: 20 }}>

      <Col span={6}>
        <Input
          placeholder="Search task..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Col>

      <Col span={6}>
        <Select
          value={filterStatus}
          onChange={setFilterStatus}
          style={{ width: "100%" }}
        >
          <Option value="all">All Status</Option>
          <Option value="Pending">Pending</Option>
          <Option value="InProgress">In Progress</Option>
          <Option value="Completed">Completed</Option>
        </Select>
      </Col>

      <Col span={6}>
        <Select
          value={sortBy}
          onChange={setSortBy}
          style={{ width: "100%" }}
        >
          <Option value="newest">Newest</Option>
          <Option value="oldest">Oldest</Option>
          <Option value="dueDate">Due Date</Option>
        </Select>
      </Col>

      <Col span={6}>
        <Button type="primary" onClick={openForm}>
          Add Task
        </Button>
      </Col>

    </Row>
  );
};

export default TaskToolbar;