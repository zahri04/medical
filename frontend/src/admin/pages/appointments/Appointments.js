import React, { useEffect, useState } from "react";
import { Container, Table, Button, Modal } from "react-bootstrap";
import { PencilSquare, Trash } from "react-bootstrap-icons";
import AppointmentsForm from "./AppointmentsForm";
import axios from "axios";
import { getAppointments, updateAppointments, deleteAppointments } from "./api_appointments";

const Appointments = () => {

  

  const defaultAppointments = {
    1: { id: 1, doctor_name: "Dr. Amine Zahi", patient_name: "John Doe", app_date: "2025-04-10", app_time: "10:00 AM", app_aprv: true, app_done: false },
    2: { id: 2, doctor_name: "Dr. Sohaile Ziane", patient_name: "Jane Smith", app_date: "2025-04-12", app_time: "02:30 PM", app_aprv: true, app_done: true },
    3: { id: 3, doctor_name: "Dr. Mohamed Ridouani", patient_name: "Alice Brown", app_date: "2025-04-15", app_time: "09:15 AM", app_aprv: false, app_done: false },
    4: { id: 4, doctor_name: "Dr. Hossam Louazna", patient_name: "Robert Wilson", app_date: "2025-04-18", app_time: "03:45 PM", app_aprv: true, app_done: false },
  };
  const [appointments, setAppointments] = useState(defaultAppointments);

  const [showForm, setShowForm] = useState(false);
  const [editAppointment, setEditAppointment] = useState(null);

  // Fetch appointments on component mount
  useEffect(() => {
    getAllAppointments();
  }, []);

  const getAllAppointments = async () => {
    try {
      const response = await getAppointments();
      const data = response.data;
      setAppointments(data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      setAppointments({});
    }
  };
  const handleCreateappointment = async (appointmentData) => {
    try {
      const formattedappointmentData = {
        ...appointmentData,
        date_of_birth: appointmentData.date_of_birth?.split("T")[0] || null,
      };

      await axios.post("http://127.0.0.1:8000/appointments/list/", formattedappointmentData, {
        headers: { "Content-Type": "application/json" },
      });

      setShowForm(false);
      getAllAppointments();
    } catch (error) {
      console.error("Error creating appointment:", error.response?.data || error.message);
    }
  };
    // Handle updating an existing appointment (PUT)
    const handleUpdateappointment = async (appointmentData) => {
      try {
        await updateAppointments(editAppointment.id, appointmentData);
        setShowForm(false);
        setEditAppointment(null);
        getAllAppointments();
      } catch (error) {
        console.error("Error updating appointment:", error.response?.data || error.message);
      }
    };
    const handleSaveappointment = (appointmentData) => {
      if (editAppointment) {
        handleUpdateappointment(appointmentData);
      } else {
        handleCreateappointment(appointmentData);
      }
    };  
  const handleDeleteAppointment = async (id) => {
    try {
      await deleteAppointments(id);
      alert("Appointment deleted successfully");
      window.location.reload();
    } catch (error) {
      console.error("Error deleting appointment:", error);
    }
  };

  return (
    <Container>
      <h2 className="my-3">Appointments</h2>
      <Button className="mb-3" onClick={() => { setEditAppointment(null); setShowForm(true); }}>
        Add Appointment
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Doctor</th>
            <th>Patient</th>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {Object.values(appointments).map((appointment, index) => (
            <tr key={appointment.id}>
              <td>{index + 1}</td>
              <td>{appointment.doctor_name}</td>
              <td>{appointment.patient_name}</td>
              <td>{appointment.app_date}</td>
              <td>{appointment.app_time}</td>
              <td>{appointment.app_done ? "Completed" : appointment.app_aprv ? "Approved" : "Pending"}</td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  className="me-2"
                  onClick={() => {
                    setEditAppointment(appointment);
                    setShowForm(true);
                  }}
                >
                  <PencilSquare />
                </Button>
                <Button variant="danger" size="sm" onClick={() => handleDeleteAppointment(appointment.id)}>
                  <Trash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showForm} onHide={() => setShowForm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editAppointment ? "Edit Appointment" : "Add Appointment"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AppointmentsForm
            appointment={editAppointment}
            onSave={handleSaveappointment}
            onCancel={() => setShowForm(false)}
          />
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Appointments;