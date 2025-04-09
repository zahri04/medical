import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { Routes, Route, Outlet } from "react-router-dom";
import Dashboard from "./dashboard/Dashboard";
import NavBar from "./common/NavBar";
import SideBar from "./common/SideBar";

import Users from "./pages/users/Users";
import Doctors from "./pages/doctor/Doctors";
import Appointments from "./pages/appointments/Appointments";
import Messages from "./pages/Messages";
import Settings from "./pages/Settings";
import TodaysPreference from "./pages/TodaysPreference";
import MyDoctor from "./pages/DoctorChat";

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Container fluid className="d-flex p-0">
      {/* Sidebar */}
      <SideBar collapsed={collapsed} setCollapsed={setCollapsed} />

      {/* Main Content */}
      <div className='flex-grow-1 contentContainer'   >
        {/* Navbar */}
        <NavBar collapsed={collapsed} />

        {/* Page Content */}
        <div className="p-5 flex-grow-1">
          
          <Outlet />
        </div>
      </div>
    </Container>
  );
};

export default AdminLayout;