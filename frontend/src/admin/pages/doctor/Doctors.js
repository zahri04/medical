import React, { useEffect, useState } from "react";
import { Container, Table, Button, Modal } from "react-bootstrap";
import { PencilSquare, Trash } from "react-bootstrap-icons";
import DoctorsForm from "./DoctorsForm";
import { getdoctors, updateDoctor, deleteDoctor } from "./api_doctors";
import axios from "axios";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editDoctor, setEditDoctor] = useState(null);

  useEffect(() => {
    getAllDoctors();
  }, []);
  const getAllDoctors = async () => {
    try {
      const response = await getdoctors();
      const data = response.data;
      setDoctors(data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
      setDoctors({});
    }
  };

  // Handle saving a doctor
  const handleCreateDoctor = async (doctorData) => {
    try {
      const formattedDoctorData = {
        ...doctorData,
        date_of_birth: doctorData.date_of_birth ? doctorData.date_of_birth.split("T")[0] : null,
      };

      await axios.post("http://127.0.0.1:8000/doctors/list/", formattedDoctorData, {
        headers: { "Content-Type": "application/json" },
      });

      setShowForm(false);
      getAllDoctors(); // Refresh doctor list
    } catch (error) {
      console.error("Error saving doctor:", error.response ? error.response.data : error.message);
    }
  };
  const handleUpdateDoctor = async (doctorData) => {
    try {
      await updateDoctor(editDoctor.id, doctorData);
      setShowForm(false);
      setEditDoctor(null);
      getAllDoctors();
    } catch (error) {
      console.error("Error updating doctor:", error.response?.data || error.message);
    }
  };
  const handleSaveDoctor = (doctorData) => {
    if (editDoctor) {
      handleUpdateDoctor(doctorData);
    } else {
      handleCreateDoctor(doctorData);
    }
  };
  // Handle deleting a doctor
  const handleDeleteDoctor = async (id) => {
    try {
      await deleteDoctor(id);
      window.location.reload();
      alert("Doctor deleted successfully");
    } catch (error) {
      console.error("Error deleting doctor:", error);
    }
  };

  return (
    <Container>
      <h2 className="my-3">Doctors</h2>
      <Button className="mb-3" onClick={() => { setEditDoctor(null); setShowForm(true); }}>
        Add Doctor
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Specialization</th>
            <th>License Number</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {Object.values(doctors).map((doctor, index) => (
            <tr key={doctor.id}>
              <td>{doctor.id}</td>
              <td>{doctor.full_name}</td> 
              <td>{doctor.email}</td>
              <td>{doctor.specialization}</td>
              <td>{doctor.license_number}</td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  className="me-2"
                  onClick={() => { setEditDoctor(doctor); setShowForm(true); }}
                >
                  <PencilSquare />
                </Button>
                <Button variant="danger" size="sm" onClick={() => handleDeleteDoctor(doctor.id)}>
                  <Trash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showForm} onHide={() => setShowForm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editDoctor ? "Edit Doctor" : "Add Doctor"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DoctorsForm
            doctor={editDoctor}
            onSave={handleSaveDoctor}
            onCancel={() => setShowForm(false)}
          />
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Doctors;
