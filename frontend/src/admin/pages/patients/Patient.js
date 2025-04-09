import React, { useEffect, useState } from "react";
import { Container, Table, Button, Modal } from "react-bootstrap";
import { PencilSquare, Trash } from "react-bootstrap-icons";
import PatientsForm from "./PatientForm";
import { getpatients,updatepatient,deletepatient } from "./api_patients";
import axios from "axios";

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editPatient, setEditPatient] = useState(null);

  useEffect(() => {
    getAllPatients();
  }, []);

  // Fetch patients from the backend and filter by role "patient"
  const getAllPatients = async () => {
    try {
      const response = await getpatients();
      const data = response.data;
      setPatients(data);
    } catch (error) {
      console.error("Error fetching patients:", error);
      setPatients({});
    }
  };

  // yarbi tkhdem had l fonction ra khdmat m3a l users walakin haad l3jb f chi chkl
  const handleCreatePatient = async (patientData) => {
    try {
      const formattedPatientData = {
        ...patientData,
        date_of_birth: patientData.date_of_birth?.split("T")[0] || null,
        role: "patient",
      };

      await axios.post("http://127.0.0.1:8000/patients/list/", formattedPatientData, {
        headers: { "Content-Type": "application/json" },
      });

      setShowForm(false);
      getAllPatients();
    } catch (error) {
      console.error("Error creating patient:", error.response?.data || error.message);
    }
  };
    // Handle updating an existing patient (PUT)
    const handleUpdatePatient = async (patientData) => {
      try {
        await updatepatient(editPatient.patient_id, patientData);
        setShowForm(false);
        setEditPatient(null);
        getAllPatients();
      } catch (error) {
        console.error("Error updating patient:", error.response?.data || error.message);
      }
    };
    const handleSavePatient = (patientData) => {
      if (editPatient) {
        handleUpdatePatient(patientData);
      } else {
        handleCreatePatient(patientData);
      }
    };  
  // Handle deleting a patient
  const handleDeletePatient = async (patient_id) => {
    try {
      await deletepatient(patient_id);
      window.location.reload();
      alert("Patient deleted successfully");
    } catch (error) {
      console.error("Error deleting patient:", error);
    }
  };
  
  return (
    <Container>
      <h2 className="my-3">Patients</h2>
      <Button className="mb-3" onClick={() => { setEditPatient(null); setShowForm(true); }}>
        Add Patient
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Date of Birth</th>
            <th>Insurance Number</th>
            <th>Medical History</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {Object.values(patients).map((patient, index) => (
            <tr key={patient.patient_id}>
              <td>{index + 1}</td>
              <td>{patient.full_name}</td>
              <td>{patient.email}</td>
              <td>{patient.date_of_birth}</td>
              <td>{patient.insurance_number}</td>
              <td>{patient.medical_history || "No history available"}</td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  className="me-2"
                  onClick={() => {
                    setEditPatient(patient);
                    setShowForm(true);
                  }}
                >
                  <PencilSquare />
                </Button>
                <Button variant="danger" size="sm" onClick={() => handleDeletePatient(patient.patient_id)}>
                  <Trash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showForm} onHide={() => setShowForm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editPatient ? "Edit Patient" : "Add Patient"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <PatientsForm
            patient={editPatient}
            onSave={handleSavePatient}
            onCancel={() => {
              setShowForm(false);
              setEditPatient(null);
            }}
          />
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Patients;
