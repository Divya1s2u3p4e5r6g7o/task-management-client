// import React, { useEffect } from "react";
// import { Modal, Form, Input, DatePicker, Select } from "antd";
// import dayjs from "dayjs";

// const TaskForm = ({ open, onCancel, onSubmit, editingTask }) => {
//   const [form] = Form.useForm();

//   useEffect(() => {
//     if (open) {
//       if (editingTask) {
//         form.setFieldsValue({
//           ...editingTask,
//           dueDate: editingTask.dueDate
//             ? dayjs(editingTask.dueDate)
//             : null,
//         });
//       } else {
//         form.resetFields();
//       }
//     }
//   }, [editingTask, open, form]);

//   const handleSave = async () => {
//     const values = await form.validateFields();

//     const payload = {
//       ...values,
//       dueDate: values.dueDate
//         ? values.dueDate.toISOString()
//         : null,
//     };

//     onSubmit(payload);
//     form.resetFields();
//   };

//   return (
//     <Modal
//       title={editingTask ? "Edit Task" : "Add Task"}
//       open={open}
//       onOk={handleSave}
//       onCancel={onCancel}
//       okText="Save"
//     >
//       <Form form={form} layout="vertical">

//         <Form.Item
//           label="Task Title"
//           name="title"
//           rules={[{ required: true, message: "Task title is required" }]}
//         >
//           <Input placeholder="Enter task title" />
//         </Form.Item>

//         <Form.Item label="Description" name="description">
//           <Input.TextArea rows={3} />
//         </Form.Item>

//         <Form.Item label="Due Date" name="dueDate">
//           <DatePicker style={{ width: "100%" }} />
//         </Form.Item>

//         <Form.Item label="Status" name="status">
//           <Select>
//             <Select.Option value="pending">Pending</Select.Option>
//             <Select.Option value="in-progress">In Progress</Select.Option>
//             <Select.Option value="completed">Completed</Select.Option>
//           </Select>
//         </Form.Item>

//       </Form>
//     </Modal>
//   );
// };

// export default TaskForm;
// import React, { useEffect } from "react";
// import { Modal, Form, Input, DatePicker, Select } from "antd";
// import dayjs from "dayjs";

// const { Option } = Select;

// const TaskForm = ({ open, onCancel, onSubmit, editingTask }) => {
//   const [form] = Form.useForm();

//   useEffect(() => {
//     if (!open) return;

//     if (editingTask) {
//       form.setFieldsValue({
//         ...editingTask,
//         dueDate: editingTask.dueDate
//           ? dayjs(editingTask.dueDate)
//           : null
//       });
//     } else {
//       form.resetFields();
//     }
//   }, [editingTask, open, form]);

//   const handleOk = async () => {
//     const values = await form.validateFields();

//     const payload = {
//       ...values,
//       dueDate: values.dueDate
//         ? values.dueDate.toISOString()
//         : null
//     };

//     onSubmit(payload);
//   };

//   return (
//     <Modal
//       title={editingTask ? "Edit Task" : "Add Task"}
//       open={open}
//       onCancel={onCancel}
//       onOk={handleOk}
//       destroyOnHidden
//     >
//       <Form form={form} layout="vertical">

//         <Form.Item
//           name="title"
//           label="Task Title"
//           rules={[{ required: true, message: "Title required" }]}
//         >
//           <Input placeholder="Enter task title" />
//         </Form.Item>

//         <Form.Item name="description" label="Description">
//           <Input.TextArea rows={3} />
//         </Form.Item>

//         <Form.Item name="dueDate" label="Due Date">
//           <DatePicker style={{ width: "100%" }} />
//         </Form.Item>

//         <Form.Item name="status" label="Status" initialValue="Pending">
//           <Select>
//             <Option value="Pending">Pending</Option>
//             <Option value="In Progress">In Progress</Option>
//             <Option value="Completed">Completed</Option>
//           </Select>
//         </Form.Item>

//       </Form>
//     </Modal>
//   );
// };

// export default TaskForm;
import React, { useEffect } from "react";
import { Modal, Form, Input, DatePicker, Select } from "antd";
import dayjs from "dayjs";

const { Option } = Select;

const TaskForm = ({ open, editingTask, onSubmit, onCancel }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (editingTask) {
      form.setFieldsValue({
        title: editingTask.title || "",
        description: editingTask.description || "",
        status: editingTask.status || "Pending",
        dueDate: editingTask.dueDate ? dayjs(editingTask.dueDate) : null
      });
    } else {
      form.resetFields();
    }
  }, [editingTask, form, open]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();

      const formattedValues = {
        ...values,
        dueDate: values.dueDate ? values.dueDate.toISOString() : null
      };

      onSubmit(formattedValues);

      form.resetFields();
    } catch (error) {
      console.log("Validation Failed:", error);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  return (
    <Modal
     title={editingTask ? "Edit Task" : "Add Task"}
  open={open}
  onOk={handleOk}
  onCancel={handleCancel}
      destroyOnHidden
      okText={editingTask ? "Update" : "Create"}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Please enter task title" }]}
        >
          <Input placeholder="Enter task title" />
        </Form.Item>

        <Form.Item label="Description" name="description">
          <Input.TextArea rows={3} placeholder="Enter description" />
        </Form.Item>

        <Form.Item label="Due Date" name="dueDate">
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          label="Status"
          name="status"
          initialValue="Pending"
        >
          <Select>
            <Option value="Pending">Pending</Option>
            <Option value="InProgress">In Progress</Option>
            <Option value="Completed">Completed</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TaskForm;