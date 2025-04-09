import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { doctors } from '../Data';
import './TopDoctors.css';

function TopDoctors() {
    return (
        <Container className="py-5">
            <h2 className="text-center mb-4">Top Rated Doctors</h2>
            <Row>
                {doctors.map((doctor, index) => (
                    <Col key={index} md={4} lg={3} className="mb-4">
                        <Card className="shadow-sm text-center p-3">
                            <Card.Img variant="top" src={doctor.image} className="rounded-circle mx-auto" style={{ width: "100px", height: "100px" }} />
                            <Card.Body>
                                <Card.Title>{doctor.name}</Card.Title>
                                <Card.Text>{doctor.speciality}</Card.Text>
                                <Button variant="primary" href={`/doctor/${doctor.id}`}>View Profile</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default TopDoctors;
