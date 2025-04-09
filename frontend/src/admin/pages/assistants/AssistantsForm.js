import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";

const AssistantsForm = ({ assistant, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: "",
    specialty: "",
    dateRegistered: new Date().toISOString().split("T")[0],
    status: "Pending",
  });

  useEffect(() => {
    if (assistant) {
      setFormData(assistant);
    }
  }, [assistant]);

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
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Specialty</Form.Label>
        <Form.Control
          type="text"
          name="specialty"
          value={formData.specialty}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Date Registered</Form.Label>
        <Form.Control
          type="date"
          name="dateRegistered"
          value={formData.dateRegistered}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Status</Form.Label>
        <Form.Control
          as="select"
          name="status"
          value={formData.status}
          onChange={handleChange}
          required
        >
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </Form.Control>
      </Form.Group>
      <Button variant="primary" type="submit" className="me-2">
        Save
      </Button>
      <Button variant="secondary" onClick={onCancel}>
        Cancel
      </Button>
    </Form>
  );
};

export default AssistantsForm;