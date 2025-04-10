import React, { useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Container, Card, Form, Button } from "react-bootstrap";

const Login = () => {
  const { login, setAuthData } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // New error state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear any previous error
    const { success, profile, error: loginError } = await login(email, password);

    if (success && profile) {
      const role = profile.role?.toLowerCase();
      if (role === "user") {
        // Clear auth data and tokens for 'user' role
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        setAuthData({
          accessToken: "",
          refreshToken: "",
          userProfile: null,
        });
        setError("Access denied for users with the 'User' role."); // Set error message
      } else if (["doctor", "patient", "assistant", "admin"].includes(role.toLowerCase())) {
        navigate("/dashboard");
      } else {
        setError("Invalid role. Please contact support."); // Set error message
      }
    } else {
      setError(loginError); // Display the specific error from the server
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card className="shadow-lg p-4 border-0" style={{ width: "400px" }}>
        <Card.Body>
          <h2 className="text-center mb-4">Login</h2>
          {error && (
            <div className="text-danger text-center mb-3">{error}</div> // Render error above the form
          )}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Login
            </Button>
            <h6 className="mt-2">
              New User! Register here. <a href="/register">Register</a>
            </h6>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;