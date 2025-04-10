import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import Stack from "react-bootstrap/Stack";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import {
  House,
  Person,
  Calendar,
  List,
  People,
  Gear,
  Envelope,
  BoxArrowRight,
  ChatDots,
  Robot,
} from "react-bootstrap-icons";
import axios from "axios";
import { useAuth } from "../../Context/AuthContext.js";

const Sidebar = ({ collapsed, setCollapsed }) => {
  const { authData } = useAuth();

  const handleLogOut = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    Navigate("/login");
  };

  const Sections = [
    { name: "Home", icon: <House size={20} />, link: "/dashboard" },
    { name: "Profile", icon: <Person size={20} />, link: "/dashboard/profile" },
  ];

  const ExtraSections = [
    { name: "Settings", icon: <Gear size={20} />, link: "/dashboard/settings" },
    { name: "Messages", icon: <Envelope size={20} />, link: "/dashboard/messages" },
  ];

  if (!authData) {
    return null;
  }

  // Manage Sections based on Role
  const Role =
    authData.userProfile === null ? "user" : authData.userProfile.role.toLowerCase();
  console.log(authData);
  let ManageSections = [];

  switch (Role) {
    case "admin":
      ManageSections = [
        { name: "Users", icon: <People size={20} />, link: "/dashboard/users/list" },
        { name: "Doctors", icon: <People size={20} />, link: "/dashboard/doctors/list" },
        { name: "Assistants", icon: <People size={20} />, link: "/dashboard/assistants/list" },
      ];
      break;

    case "doctor":
      ManageSections = [
        { name: "Patients", icon: <People size={20} />, link: "/dashboard/patients/list" },
        { name: "Appointments", icon: <Calendar size={20} />, link: "/dashboard/appointments/list" },
        {
          name: "Today's Preference",
          icon: <Calendar size={20} />,
          link: "/dashboard/todayspreference",
        },
        { name: "AI Analysis", icon: <Robot size={20} />, link: "/dashboard/aianalysis" },
      ];
      break;

    case "assistant":
      ManageSections = [
        { name: "Appointments", icon: <Calendar size={20} />, link: "/dashboard/appointments/list" },
        { name: "Today's Preference", icon: <Calendar size={20} />, link: "/dashboard/todayspreference" },
      ];
      break;

    case "patient":
      ManageSections = [
        { name: "My Doctor", icon: <ChatDots size={20} />, link: "/dashboard/my-doctor" },
        { name: "Appointments", icon: <Calendar size={20} />, link: "/dashboard/appointments/list" },
        { name: "AI Analysis", icon: <Robot size={20} />, link: "/dashboard/aianalysis" },
      ];
      break;

    default:
      Navigate("/login");
      console.log("you have undefined Role: " + Role);
      break;
  }

  return (
    <Container fluid className="d-flex w-25 flex-direction-column">
      {/* Sidebar */}
      <div
        className={`sidebar vh-100 start-0 ${collapsed ? "w-10" : "w-25"} d-flex flex-column align-items-${
          collapsed ? "center" : "start"
        } p-3`}
        style={{ transition: "width 0.3s" }}
      >
        {/* Sidebar Header */}
        <div className="sidebar-header d-flex justify-content-between align-items-center w-100">
          <div className="h2">{!collapsed && "Dashboard"}</div>
          <Button variant="light" size="sm" onClick={() => setCollapsed(!collapsed)}>
            <List size={20} />
          </Button>
        </div>
        <hr />

        {/* Sidebar Items */}
        <Stack gap={3} className="sidebar-items w-100">
          {/* Non-Dropdown Items */}
          {Sections.map((item) => (
            <OverlayTrigger
              key={item.name}
              placement="right"
              overlay={<Tooltip id={`tooltip-${item.name}`}>{item.name}</Tooltip>}
            >
              <Link to={item.link} className="text-decoration-none text-dark">
                <div className="sidebar-item p-2 d-flex align-items-center">
                  <div className="me-3">{item.icon}</div>
                  {!collapsed && (
                    <div className="d-flex align-items-center justify-content-between w-100">
                      <span>{item.name}</span>
                    </div>
                  )}
                </div>
              </Link>
            </OverlayTrigger>
          ))}

          {/* Manage Section */}
          <h6 className="mt-3 text-muted">Manage</h6>
          {ManageSections.map((section, index) => (
            <OverlayTrigger
              key={section.name}
              placement="right"
              overlay={<Tooltip id={`tooltip-${section.name}`}>{section.name}</Tooltip>}
            >
              <Link to={section.link} className="text-decoration-none text-dark">
                <div className="sidebar-item p-2 d-flex align-items-center">
                  <div className="me-3">{section.icon}</div>
                  {!collapsed && (
                    <div className="d-flex align-items-center justify-content-between w-100">
                      <span>{section.name}</span>
                    </div>
                  )}
                </div>
              </Link>
            </OverlayTrigger>
          ))}

          {/* Extra Sections */}
          {!collapsed && <h6 className="mt-3 text-muted">Others</h6>}
          {ExtraSections.map((item) => (
            <OverlayTrigger
              key={item.name}
              placement="right"
              overlay={<Tooltip id={`tooltip-${item.name}`}>{item.name}</Tooltip>}
            >
              <Link to={item.link} className="text-decoration-none text-dark">
                <div className="sidebar-item p-2 d-flex align-items-center">
                  <div className="me-3">{item.icon}</div>
                  {!collapsed && (
                    <div className="d-flex align-items-center justify-content-between w-100">
                      <span>{item.name}</span>
                    </div>
                  )}
                </div>
              </Link>
            </OverlayTrigger>
          ))}
          <OverlayTrigger
            key={"Logout"}
            placement="right"
            overlay={<Tooltip id={`tooltip-Logout`}>LogOut</Tooltip>}
          >
            <Link onClick={handleLogOut} className="text-decoration-none text-dark">
              <div className="sidebar-item p-2 d-flex align-items-center">
                <div className="me-3">
                  <BoxArrowRight size={20} />
                </div>
                {!collapsed && (
                  <div className="d-flex align-items-center justify-content-between w-100">
                    <span>LogOut</span>
                  </div>
                )}
              </div>
            </Link>
          </OverlayTrigger>
        </Stack>
      </div>
    </Container>
  );
};

export default Sidebar;
