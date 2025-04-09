// AiAnalysis.js

import React, { useState } from "react";
import axios from "axios";
import { Container, Form, Button, Image, Alert, Spinner } from "react-bootstrap";

const AiAnalysis = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      setResult("");
    }
  };

  const handleAnalyze = async () => {
    if (!selectedImage) return;
    const formData = new FormData();
    formData.append("image", selectedImage);

    try {
      setLoading(true);
      // Adjust the URL if your backend is hosted elsewhere.
      const response = await axios.post("http://localhost:8000/api/ai/predict/", formData);
      setResult(response.data.result);
    } catch (error) {
      console.error(error);
      setResult("Error analyzing image");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="my-3">
      <h2>AI Medical Image Analysis</h2>
      <Form>
        <Form.Group>
          <Form.Label>Upload an image</Form.Label>
          <Form.Control type="file" accept="image/*" onChange={handleImageUpload} />
        </Form.Group>
        {selectedImage && (
          <div className="mt-3">
            <Image src={URL.createObjectURL(selectedImage)} alt="Uploaded" thumbnail />
          </div>
        )}
        <Button className="mt-2" onClick={handleAnalyze} disabled={loading}>
          {loading ? <Spinner animation="border" size="sm" /> : "Analyze"}
        </Button>
      </Form>
      {result && <Alert className="mt-3">{result}</Alert>}
    </Container>
  );
};

export default AiAnalysis;
