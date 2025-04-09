import React, { useState } from "react";
import { Form, Button, Container, Card } from "react-bootstrap";
import axios from "axios";  // Import axios for API requests
import { useNavigate,Navigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accountType, setAccountType] = useState("User");
  const [message, setMessage] = useState("");  // Store success/error messages
  const { authData } = useAuth(); // Access authentication data from context

  const navigate = useNavigate(); // Initialize useNavigate hook

  if(!authData){
      return null;
    }
    if (authData.accessToken) {
      return <Navigate to="/dashboard" />;
    }

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post("http://127.0.0.1:8000/auth/register", {
        name,
        email,
        password,
        role: accountType,  // Send the selected account type as the 'role'
      });
   console.log(response.data.message);
      setMessage(response.data.message);
      navigate("/login"); // Redirect to login page after successful registration

    } catch (error) {
      console.log(error.response?.data?.error || "An error occurred");
      setMessage(error.response?.data?.error || "An error occurred");
    }
  };
  
 

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card className="shadow-lg p-4 border-0" style={{ width: "400px" }}>
        <Card.Body>
          <h2 className="text-center mb-4">Register</h2>
          <h6 className="mb-2">
            If You Are Not A Patient, Please Register as a User until Approved!
          </h6>

          {message && <p className="text-center text-danger">{message}</p>}

          <Form onSubmit={handleSubmit}>
          {message && <p className="text-danger text-center">{message}</p>}
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            {/*
            <GoogleOAuthProvider clientId="241668708417-3dc28teo3kjfimk837i3v45q8gsmuvkh.apps.googleusercontent.com">
      <GoogleLogin
        onSuccess={handleGoogleSuccess}
        onError={() => console.log("Login Failed")}
      />
    </GoogleOAuthProvider>
 */}
            
            <Form.Group className="mb-3">
              <Form.Label>Account Type</Form.Label>
              <Form.Select
                value={accountType}
                onChange={(e) => setAccountType(e.target.value)}
              >
                <option value="User">User</option>
                <option value="Patient">Patient</option>
              </Form.Select>
            </Form.Group>

            <Button variant="success" type="submit"  className="w-100">
              Register
            </Button>
            <h6 className="mt-2">
            Already Registered ! sign in here <a href="/login" > Login</a>
          </h6>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Register;
