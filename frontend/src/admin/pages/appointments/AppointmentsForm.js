import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";

const AppointmentsForm = ({ appointment , onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    app_doctor: "",
    app_patient: "",
    app_date:"",
    app_time: "",
    app_aprv:false,
    app_done:false,
  });

  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    fetchDoctors();
    fetchPatients();
    if (appointment) {
      setFormData({
        app_date: appointment.app_date,
        app_time: appointment.app_time,
        app_aprv: appointment.app_aprv,
        app_done: appointment.app_done,
      });
    }
  }, [appointment]);

  const fetchDoctors = async () => {
    try {
      const res = await fetch("http://localhost:8000/doctors/list/");
      const data = await res.json();
      setDoctors(data);
    } catch (err) {
      console.error("Error fetching doctors:", err);
    }
  };

  const fetchPatients = async () => {
    try {
      const res = await fetch("http://localhost:8000/patients/list/");
      const data = await res.json();
      setPatients(data);
    } catch (err) {
      console.error("Error fetching patients:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Doctor</Form.Label>
        <Form.Select
          name="app_doctor"
          value={formData.app_doctor}
          onChange={handleChange}
          required
        >
          <option value="">Select a Doctor</option>
          {doctors.map((doctor) => (
            <option key={doctor.id} value={doctor.id}>
              {doctor.full_name || `${doctor.first_name} ${doctor.last_name}`}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Patient</Form.Label>
        <Form.Select
          name="app_patient"
          value={formData.app_patient}
          onChange={handleChange}
          required
        >
          <option value="">Select a Patient</option>
          {patients.map((patient) => (
            <option key={patient.patient_id} value={patient.patient_id}>
              {patient.full_name || `${patient.first_name} ${patient.last_name}`}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Date</Form.Label>
        <Form.Control
          type="date"
          name="app_date"
          value={formData.app_date}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Time</Form.Label>
        <Form.Control
          type="time"
          name="app_time"
          value={formData.app_time}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Check
          type="checkbox"
          label="Approved"
          name="app_aprv"
          checked={formData.app_aprv}
          onChange={handleChange}
        />
        <Form.Check
          type="checkbox"
          label="Completed"
          name="app_done"
          checked={formData.app_done}
          onChange={handleChange}
        />
      </Form.Group>

      <Button type="submit" className="me-2">
        Save
      </Button>
      <Button variant="secondary" onClick={onCancel}>
        Cancel
      </Button>
    </Form>
  );
};

export default AppointmentsForm;
