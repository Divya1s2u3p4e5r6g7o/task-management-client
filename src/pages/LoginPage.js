import React, { useState } from "react";
import { Form, Input, Button, Card, Checkbox, message } from "antd";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/authService";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (values) => {
    try {
      setLoading(true);

      // Call API
      const res = await loginUser({
        email: values.email,
        password: values.password
      });

      // Store token based on Remember Me
      if (values.remember) {
        localStorage.setItem("token", res.token);
      } else {
        sessionStorage.setItem("token", res.token);
      }

      message.success("Login successful");

      // Redirect to dashboard
      navigate("/tasks");

    } catch (error) {
      message.error(
        error.response?.data?.message || "Invalid email or password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f5f5f5"
      }}
    >
      <Card title="Task Manager Login" style={{ width: 350 }}>
        <Form layout="vertical" onFinish={handleLogin}>

          {/* Email */}
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Enter a valid email" }
            ]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>

          {/* Password */}
          <Form.Item
            name="password"
            label="Password"
            rules={[
              { required: true, message: "Please enter your password" }
            ]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>

          {/* Remember Me */}
          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Remember Me</Checkbox>
          </Form.Item>

          {/* Login Button */}
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            block
          >
            Login
          </Button>

          {/* Register Link */}
          <div style={{ marginTop: 15, textAlign: "center" }}>
            Don't have an account? <Link to="/register">Register</Link>
          </div>

        </Form>
      </Card>
    </div>
  );
};

export default LoginPage;