import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";

const DoctorsForm = ({ doctor, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    id: "",   
    full_name: "",
    email: "", 
    specialization: "", 
    hospital_name: "",
    experience: "", 
    license_number: ""
  });

  useEffect(() => {
    if (doctor) {
      setFormData({
        id: doctor.id,
        full_name: doctor.full_name,
        email: doctor.email,
        specialization: doctor.specialization,
        hospital: doctor.hospital_name,
        experience: doctor.experience,
        license_number: doctor.license_number
    });
    }
  }, [doctor]);

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
              <Form.Label>ID</Form.Label>
                <Form.Control
                  type="text"
                  name="id"       
                  value={formData.id}
                  onChange={handleChange}
                  
                />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Full Name</Form.Label>
        <Form.Control
          type="text"
          name="full_name"
          value={formData.full_name}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="text"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Specialty</Form.Label>
        <Form.Control
          type="text"
          name="specialization"
          value={formData.specialization}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>License Number</Form.Label>
        <Form.Control
          type="text"
          name="license_number"
          value={formData.license_number}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Hospital</Form.Label>
        <Form.Control
          type="text"
          name="hospital_name"
          value={formData.hospital_name}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3">
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

export default DoctorsForm;