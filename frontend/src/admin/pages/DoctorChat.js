import React, { useState } from "react";
import { Container, Form, Button, ListGroup, Row, Col } from "react-bootstrap";

const MyDoctor = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    if (message.trim()) {
      setMessages([...messages, { text: message, sender: "You", timestamp: new Date().toLocaleTimeString() }]);
      setMessage("");
    }
  };

  return (
    <Container className="my-3">
      <h2>Chat with Your Doctor</h2>
      <div className="chat-window border rounded p-3 mb-3" style={{ height: "400px", overflowY: "scroll" }}>
        <ListGroup>
          {messages.map((msg, index) => (
            <ListGroup.Item key={index} className={`d-flex ${msg.sender === "You" ? "justify-content-end" : "justify-content-start"}`}>
              <div className={`chat-bubble ${msg.sender === "You" ? "bg-primary text-white" : "bg-light text-dark"} p-2 rounded`}>
                <strong>{msg.sender}: </strong>{msg.text}
                <div className="text-muted small text-right">{msg.timestamp}</div>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
      <Form className="d-flex">
        <Form.Control
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="me-2"
        />
        <Button onClick={sendMessage}>Send</Button>
      </Form>
    </Container>
  );
};

export default MyDoctor;