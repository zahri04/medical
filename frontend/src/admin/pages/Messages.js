import React, { useState } from "react";
import { Container, Card, Row, Col } from "react-bootstrap";

const Messages = () => {
  const [messages, setMessages] = useState([
    {
      subject: "Appointment Request",
      email: "patient1@example.com",
      message: "I would like to schedule an appointment for next week.",
      date: "2025-03-01 10:30 AM",
    },
    {
      subject: "Prescription Refill",
      email: "patient2@example.com",
      message: "Can I get a refill for my prescription?",
      date: "2025-03-02 11:00 AM",
    },
    // Add more sample messages as needed
  ]);

  return (
    <Container>
      <h2 className="my-3">Messages</h2>
      <Row>
        {messages.map((message, index) => (
          <Col key={index} md={6} lg={4} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{message.subject}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{message.email}</Card.Subtitle>
                <Card.Text>{message.message}</Card.Text>
                <Card.Footer className="text-muted">{message.date}</Card.Footer>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Messages;