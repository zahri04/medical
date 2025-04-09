import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import axios from 'axios';
// Import your static fallback image
import defaultDoctorImage from '../assets/images/Doctors/doc1.png';

const AllDoctors = () => {
  // State to hold the grouped doctors returned from the API.
  const [groupedDoctors, setGroupedDoctors] = useState({});
  // State for the list of specialities, derived from the grouped doctors.
  const [specialities, setSpecialities] = useState([]);
  // State for the currently selected speciality.
  const [selectedSpeciality, setSelectedSpeciality] = useState(null);
  // State for the filtered doctors to display.
  const [filterDoc, setFilterDoc] = useState([]);

  // Fetch grouped doctors from the backend and derive specialities list.
  useEffect(() => {
    axios.get('http://localhost:8000/doctors/grouped/')
      .then(response => {
        setGroupedDoctors(response.data);
        setSpecialities(Object.keys(response.data));
      })
      .catch(error => {
        console.error('Error fetching grouped doctors:', error);
      });
  }, []);

  // Update the list of doctors to display based on the selected speciality.
  useEffect(() => {
    if (selectedSpeciality) {
      setFilterDoc(groupedDoctors[selectedSpeciality] || []);
    } else {
      // If no speciality is selected, combine all doctors from all groups.
      const allDoctors = Object.values(groupedDoctors).flat();
      setFilterDoc(allDoctors);
    }
  }, [groupedDoctors, selectedSpeciality]);

  return (
    <section id="alldoctor-section" className="py-5">
      <Container>
        <p className="text-center mb-4">Browse through our trusted doctors' specialities.</p>
        <Row>
          {/* Specialities List */}
          <Col md={3} lg={2} className="mb-4">
            <h5 className="fw-bold mb-3">Specialities</h5>
            <ul className="list-unstyled">
              <li key="all">
                <Button
                  variant="link"
                  className={!selectedSpeciality ? 'text-primary' : 'text-dark'}
                  onClick={() => setSelectedSpeciality(null)}
                >
                  All Specialities
                </Button>
              </li>
              {specialities.map((spec) => (
                <li key={spec}>
                  <Button
                    variant="link"
                    className={selectedSpeciality === spec ? 'text-primary' : 'text-dark'}
                    onClick={() => setSelectedSpeciality(spec)}
                  >
                    {spec}
                  </Button>
                </li>
              ))}
            </ul>
          </Col>

          {/* Doctors List */}
          <Col md={9} lg={10}>
            <Row>
              {filterDoc.map((item, index) => (
                <Col key={index} xs={12} md={6} lg={4} className="mb-4">
                  <Card className="doctor-card">
                    <Card.Img
                      variant="top"
                      // Use the fetched image if available, otherwise use the static fallback.
                      src={item.image ? item.image : defaultDoctorImage}
                      alt="Doctor"
                      className="img-fluid"
                    />
                    <Card.Body>
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="badge bg-success text-white">Available</span>
                      </div>
                      <Card.Title>{item.name}</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">{item.hospital_name}</Card.Subtitle>
                      <Card.Text>
                        <strong>Speciality:</strong> {item.speciality} <br />
                        <strong>Email:</strong> {item.email} <br />
                        <strong>Experience:</strong> {item.experience} years
                      </Card.Text>
                      <Button variant="outline-primary" className="w-100">
                        Book Appointment
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AllDoctors;
