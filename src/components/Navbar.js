import React from "react";
import { Layout, Menu, Modal } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { logoutUser } from "../services/authService";

const { Header } = Layout;

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    Modal.confirm({
      title: "Confirm Logout",
      content: "Are you sure you want to logout?",
      okText: "Yes",
      cancelText: "Cancel",
      onOk: () => {
        logoutUser();
        navigate("/login");
      }
    });
  };

  const items = [
    {
      key: "/",
      label: "Home"
    },
    {
      key: "/tasks",
      label: "Tasks"
    },
    {
      key: "logout",
      label: "Logout"
    }
  ];

  const handleMenuClick = ({ key }) => {
    if (key === "logout") {
      handleLogout();
    } else {
      navigate(key);
    }
  };

  return (
    <Header style={{ display: "flex", alignItems: "center" }}>
      
      {/* App Title */}
      <div
        style={{
          color: "white",
          fontSize: "18px",
          fontWeight: "bold",
          marginRight: "40px"
        }}
      >
        Task Manager
      </div>

      {/* Menu */}
      <Menu
        theme="dark"
        mode="horizontal"
        selectedKeys={[location.pathname]}
        items={items}
        onClick={handleMenuClick}
        style={{ flex: 1 }}
      />

    </Header>
  );
};

export default Navbar;