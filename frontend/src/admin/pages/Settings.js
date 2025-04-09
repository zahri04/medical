import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";

const Settings = () => {
  const [settings, setSettings] = useState({
    theme: "light",
    notifications: true,
    language: "en",
    timeZone: "GMT",
    privacy: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings({
      ...settings,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSave = () => {
    // Save settings logic here
    console.log("Settings saved:", settings);
  };

  return (
    <Container>
      <h2 className="my-3">Settings</h2>
      <Form>
        <Form.Group>
          <Form.Label>Theme</Form.Label>
          <Form.Control as="select" name="theme" value={settings.theme} onChange={handleChange}>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </Form.Control>
        </Form.Group>
        <Form.Group className="mt-3">
          <Form.Check
            type="checkbox"
            label="Enable Notifications"
            name="notifications"
            checked={settings.notifications}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mt-3">
          <Form.Label>Language</Form.Label>
          <Form.Control as="select" name="language" value={settings.language} onChange={handleChange}>
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
            <option value="zh">Chinese</option>
          </Form.Control>
        </Form.Group>
        <Form.Group className="mt-3">
          <Form.Label>Time Zone</Form.Label>
          <Form.Control as="select" name="timeZone" value={settings.timeZone} onChange={handleChange}>
            <option value="GMT">GMT</option>
            <option value="EST">EST</option>
            <option value="CST">CST</option>
            <option value="PST">PST</option>
          </Form.Control>
        </Form.Group>
        <Form.Group className="mt-3">
          <Form.Check
            type="checkbox"
            label="Enable Privacy Settings"
            name="privacy"
            checked={settings.privacy}
            onChange={handleChange}
          />
        </Form.Group>
        <Button className="mt-3" onClick={handleSave}>Save Settings</Button>
      </Form>
    </Container>
  );
};

export default Settings;