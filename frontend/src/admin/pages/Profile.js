import React, { useState, useEffect } from "react";
import { Container, Form, Button, Image, Alert } from "react-bootstrap";
import { useAuth } from "../../Context/AuthContext";
import axios from "axios";

const Profile = () => {
  const { authData } = useAuth();
  const [profile, setProfile] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Initialize profile state from auth context
  useEffect(() => {
    if (authData?.userProfile) {
      setProfile(authData.userProfile);
    }
  }, [authData]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    
    if (type === "file") {
      if (files[0]) {
        setImageFile(files[0]);
        setProfile(prev => ({ 
          ...prev, 
          image: URL.createObjectURL(files[0]) 
        }));
      }
    } else {
      setProfile(prev => ({ 
        ...prev, 
        [name]: value 
      }));
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const formData = new FormData();
      
      // Common fields
      formData.append("first_name", profile.first_name || "");
      formData.append("last_name", profile.last_name || "");

      // Image handling
      if (imageFile) {
        formData.append("image", imageFile);
      }

      // Role-specific fields
      switch (profile.role.toLowerCase()) {
        case 'doctor':
          formData.append("specialization", profile.specialization || "");
          formData.append("license_number", profile.license_number || "");
          formData.append("hospital_name", profile.hospital_name || "");
          formData.append("experience", profile.experience || 0);
          break;
        case 'patient':
          formData.append("medical_history", profile.medical_history || "");
          formData.append("date_of_birth", profile.date_of_birth || "");
          formData.append("insurance_number", profile.insurance_number || "");
          break;
        case 'assistant':
          formData.append("hospital_name", profile.hospital_name || "");
          formData.append("experience", profile.experience || 0);
          break;
      }

      const response = await axios.patch(
        "http://localhost:8000/api/profile/",
        formData,
        {
          headers: {
            "Authorization": `Bearer ${authData.accessToken}`,
            "Content-Type": "multipart/form-data",
          }
        }
      );

      // Update context and local state with new data
      setProfile(response.data);
      setSuccessMessage("Profile updated successfully!");
      setTimeout(() => setSuccessMessage(""), 5000);
      
    } catch (error) {
      const errorMsg = error.response?.data?.error || "Failed to update profile";
      setErrorMessage(errorMsg);
      setTimeout(() => setErrorMessage(""), 5000);
      console.error("Update error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!profile) {
    return <Container className="mt-4">Loading profile...</Container>;
  }

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Profile Information</h2>
      
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

      <Form>
        {/* Profile Image */}
        <Form.Group className="text-center mb-4">
          <Image
            src={profile.image || "/default-avatar.png"}
            roundedCircle
            width={150}
            height={150}
            className="mb-3 border"
          />
          <Form.Label className="d-block">Update Profile Picture</Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            onChange={handleChange}
            disabled={isLoading}
          />
        </Form.Group>

        {/* Common Fields */}
        <Form.Group className="mb-3">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            name="first_name"
            value={profile.first_name || ""}
            onChange={handleChange}
            disabled={isLoading}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            name="last_name"
            value={profile.last_name || ""}
            onChange={handleChange}
            disabled={isLoading}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={profile.email || ""}
            plaintext
            readOnly
            className="text-muted"
          />
        </Form.Group>

        {/* Role-Specific Fields */}
        {profile.role.toLowerCase() === 'doctor' && (
          <>
            <Form.Group className="mb-3">
              <Form.Label>Specialization</Form.Label>
              <Form.Control
                name="specialization"
                value={profile.specialization || ""}
                onChange={handleChange}
                disabled={isLoading}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>License Number</Form.Label>
              <Form.Control
                name="license_number"
                value={profile.license_number || ""}
                onChange={handleChange}
                disabled={isLoading}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Hospital Name</Form.Label>
              <Form.Control
                name="hospital_name"
                value={profile.hospital_name || ""}
                onChange={handleChange}
                disabled={isLoading}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Experience (years)</Form.Label>
              <Form.Control
                type="number"
                name="experience"
                value={profile.experience || 0}
                onChange={handleChange}
                disabled={isLoading}
              />
            </Form.Group>
          </>
        )}

        {profile.role.toLowerCase() === 'patient' && (
          <>
            <Form.Group className="mb-3">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type="date"
                name="date_of_birth"
                value={profile.date_of_birth || ""}
                onChange={handleChange}
                disabled={isLoading}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Insurance Number</Form.Label>
              <Form.Control
                name="insurance_number"
                value={profile.insurance_number || ""}
                onChange={handleChange}
                disabled={isLoading}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Medical History</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="medical_history"
                value={profile.medical_history || ""}
                onChange={handleChange}
                disabled={isLoading}
              />
            </Form.Group>
          </>
        )}

        {profile.role.toLowerCase() === 'assistant' && (
          <>
            <Form.Group className="mb-3">
              <Form.Label>Hospital Name</Form.Label>
              <Form.Control
                name="hospital_name"
                value={profile.hospital_name || ""}
                onChange={handleChange}
                disabled={isLoading}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Experience (years)</Form.Label>
              <Form.Control
                type="number"
                name="experience"
                value={profile.experience || 0}
                onChange={handleChange}
                disabled={isLoading}
              />
            </Form.Group>
          </>
        )}

        <Button 
          variant="primary" 
          onClick={handleSave} 
          disabled={isLoading}
          className="mt-4"
        >
          {isLoading ? 'Saving...' : 'Save Profile'}
        </Button>
      </Form>
    </Container>
  );
};

export default Profile;