import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
const UsersForm = ({ user, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    user_id: "",
    first_name: "",
    last_name: "",
    email: "",
    date_joined: new Date().toISOString().split("T")[0],
    role: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        user_id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        date_joined: user.date_joined?.split("T")[0],
        role: user.role,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>First Name</Form.Label>
        <Form.Control
          type="text"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          required
        />
        <Form.Group className="mb-3">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            required
          />
        </Form.Group>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Date Registered</Form.Label>
        <Form.Control
          type="date"
          name="date_joined"
          value={formData.date_joined}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Role</Form.Label>
        <Form.Control
          as="select"
          name="role"
          value={formData.role}
          onChange={handleChange}
          required
        >
          <option value="admin">Admin</option>
          <option value="doctor">Doctor</option>
          <option value="patient">Patient</option>
          <option value="assistant">Assistant</option>
        </Form.Control>
      </Form.Group>
      <Button variant="primary" type="submit" className="me-2">
        Save
      </Button>
      <Button variant="secondary" onClick={onCancel} >
        Cancel
      </Button>
    </Form>
  );
};

export default UsersForm; 