
import React, { useState } from "react";
import { Container, Form, Button, ListGroup } from "react-bootstrap";
import Data from "../Data";

const TodaysPreference = () => {
  const [availableSlots, setAvailableSlots] = useState(Data.doctors[0].availableSlots);
  const [newSlot, setNewSlot] = useState("");

  const addSlot = () => {
    if (newSlot.trim()) {
      setAvailableSlots([...availableSlots, newSlot]);
      setNewSlot("");
    }
  };

  return (
    <Container className="my-3">
      <h2>Today's Preference</h2>
      <Form>
        <Form.Group>
          <Form.Label>Add Available Time Slot</Form.Label>
          <Form.Control
            type="text"
            placeholder="e.g. 4:00 PM"
            value={newSlot}
            onChange={(e) => setNewSlot(e.target.value)}
          />
        </Form.Group>
        <Button className="mt-2" onClick={addSlot}>Add Slot</Button>
      </Form>
      <ListGroup className="mt-3">
        {availableSlots.map((slot, index) => (
          <ListGroup.Item key={index}>{slot}</ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default TodaysPreference;
