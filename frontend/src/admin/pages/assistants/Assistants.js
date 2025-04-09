import React, { useEffect, useState } from "react";
import { Container, Table, Button, Modal } from "react-bootstrap";
import { PencilSquare, Trash } from "react-bootstrap-icons";
import AssistantsForm from "./AssistantsForm";
import { getAssistants, createAssistant, updateAssistant, deleteAssistant } from "./api_assistant";

const Assistants = () => {

  const defaultAssistants = {
    1: { id: 1, full_name: "Amine Zahi", email: "amine.zahi@example.com", experience: "5 years", hosp_name: "City Hospital" },
    2: { id: 2, full_name: "Sohaile Ziane", email: "sohaile.ziane@example.com", experience: "3 years", hosp_name: "General Clinic" },
    3: { id: 3, full_name: "Mohamed Ridouani", email: "mohamed.ridouani@example.com", experience: "7 years", hosp_name: "Health Center" },
    4: { id: 4, full_name: "Hossam Louazna", email: "hossam.louazna@example.com", experience: "6 years", hosp_name: "Medical Hub" },
  };
  const [assistants, setAssistants] = useState(defaultAssistants) // Store assistants as an object
  const [showForm, setShowForm] = useState(false);
  const [editAssistant, setEditAssistant] = useState(null);

  // Fetch all assistants on component mount
  useEffect(() => {
    getAllAssistants();
  }, []);

  // Fetch assistants from the backend
  const getAllAssistants = async () => {
    try {
      const response = await getAssistants();
      const data = response.data;

      // Transform array into an object
      const assistantsObject = data.reduce((acc, assistant) => {
        acc[assistant.id] = assistant; // Use assistant.id as the key
        return acc;
      }, {});

      setAssistants(assistantsObject);
    } catch (error) {
      console.error("Error fetching assistants:", error);
      setAssistants({});
    }
  };

  // Handle saving an assistant (create or update)
  const handleSaveAssistant = async (assistantData) => {
    try {
      if (editAssistant) {
        // Update existing assistant
        await updateAssistant(editAssistant.id, assistantData);
        setAssistants((prevAssistants) => ({
          ...prevAssistants,
          [editAssistant.id]: { ...prevAssistants[editAssistant.id], ...assistantData },
        }));
      } else {
        // Create new assistant
        const response = await createAssistant(assistantData);
        const newAssistant = response.data;
        setAssistants((prevAssistants) => ({
          ...prevAssistants,
          [newAssistant.id]: newAssistant,
        }));
      }
      setShowForm(false);
      setEditAssistant(null);
    } catch (error) {
      console.error("Error saving assistant:", error);
    }
  };

  // Handle deleting an assistant
  const handleDeleteAssistant = async (id) => {
    try {
      await deleteAssistant(id);
      window.location.reload();
      alert("Assistant deleted successfully");
    } catch (error) {
      console.error("Error deleting assistant:", error);
    }
  };

  return (
    <Container>
      <h2 className="my-3">Assistants</h2>
      <Button className="mb-3" onClick={() => { setEditAssistant(null); setShowForm(true); }}>
        Add Assistant
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Experience</th>
            <th>Hospital Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {Object.values(assistants).map((assistant, index) => (
            <tr key={assistant.id}>
              <td>{index + 1}</td>
              <td>{assistant.full_name}</td>
              <td>{assistant.email}</td>
              <td>{assistant.experience}</td>
              <td>{assistant.hosp_name}</td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  className="me-2"
                  onClick={() => {
                    setEditAssistant(assistant);
                    setShowForm(true);
                  }}
                >
                  <PencilSquare />
                </Button>
                <Button variant="danger" size="sm" onClick={() => handleDeleteAssistant(assistant.id)}>
                  <Trash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showForm} onHide={() => setShowForm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editAssistant ? "Edit Assistant" : "Add Assistant"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AssistantsForm
            assistant={editAssistant}
            onSave={handleSaveAssistant}
            onCancel={() => setShowForm(false)}
          />
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Assistants;