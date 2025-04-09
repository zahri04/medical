import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";

const PatientsForm = ({ patient, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    patient_id:"",
    full_name: "",      
    pat_email: "",
    date_of_birth: "",   
    insurance_number: "", 
    medical_history: "",  
  });
  useEffect(() => {
    if (patient) {
      setFormData({
        patient_id:patient.patient_id,
        full_name: patient.full_name || "",
        pat_email: patient.email || "",
        date_of_birth: patient.date_of_birth?.split("T")[0] || "",
        insurance_number: patient.insurance_number || "",
        medical_history: patient.medical_history || "",
      });
    }
  }, [patient]);

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
          name="patient_id"       
          value={formData.patient_id}
          onChange={handleChange}
          required
          disabled
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
          type="email"      
          name="pat_email"
          value={formData.pat_email}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Date of Birth</Form.Label>
        <Form.Control
          type="date"
          name="date_of_birth"   
          value={formData.date_of_birth}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Insurance Number</Form.Label>
        <Form.Control
          type="text"
          name="insurance_number" 
          value={formData.insurance_number}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Medical History</Form.Label>
        <Form.Control
          as="textarea"          
          name="medical_history" 
          value={formData.medical_history}
          onChange={handleChange}
          required
        />
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

export default PatientsForm;