import React, { useState } from "react";
import { Navbar, Container, Form, FormControl, Button, Modal, Dropdown } from "react-bootstrap";
import { Bell, Envelope, PersonCircle } from "react-bootstrap-icons";

const NavBar = ({ collapsed }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  return (
    <>
      {/* Navbar */}
      <Navbar expand="lg"   className="d-flex justify-content-between px-3 w-100 flex-grow-1 " style={{ transition: "width 0.3s" }}>
        <Container fluid className="d-flex justify-content-between align-items-center">
          {/* Search Bar */}
          <Form className="d-flex" style={{ width: "250px" }}>
            <FormControl type="search" placeholder="Search..." className="me-2" />
            <Button variant="outline-primary">Search</Button>
          </Form>

          {/* Icons: Notifications, Messages, Profile */}
          <div className="d-flex align-items-center">
            {/* Notifications */}
            <Button variant="light" className="me-3 position-relative" onClick={() => setShowNotifications(true)}>
              <Bell size={24} />
              <span className="badge bg-danger position-absolute top-0 start-100 translate-middle">3</span>
            </Button>

            {/* Messages */}
            <Button variant="light" className="me-3 position-relative" onClick={() => setShowMessages(true)}>
              <Envelope size={24} />
              <span className="badge bg-danger position-absolute top-0 start-100 translate-middle">5</span>
            </Button>

            {/* Profile Dropdown */}
            <Dropdown>
              <Dropdown.Toggle variant="light" id="dropdown-profile">
                <PersonCircle size={30} />
              </Dropdown.Toggle>

              <Dropdown.Menu align="end">
                <Dropdown.Item onClick={() => setShowProfile(true)}>Profile</Dropdown.Item>
                <Dropdown.Item href="/admin/contact">Contact</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item href="/admin/logout">Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Container>
      </Navbar>

      {/* Notifications Modal */}
      <Modal show={showNotifications} onHide={() => setShowNotifications(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Notifications</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>You have 3 new notifications.</p>
        </Modal.Body>
      </Modal>

      {/* Messages Modal */}
      <Modal show={showMessages} onHide={() => setShowMessages(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Messages</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>You have 5 new messages.</p>
        </Modal.Body>
      </Modal>

      {/* Profile Modal */}
      <Modal show={showProfile} onHide={() => setShowProfile(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Name: John Doe</p>
          <p>Email: johndoe@example.com</p>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default NavBar;
