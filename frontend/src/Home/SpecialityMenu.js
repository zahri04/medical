import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { specialityData } from '../Data';
import { Link } from 'react-router-dom';
import './SpecialMenu.css';

function SpecialityMenu() {
    return (
        <Container className="py-5">
            <h2 className="text-center mb-4">Find by Speciality</h2>
            <p className="text-center mb-4">Browse our list of medical specialists and choose the right one for your needs.</p>
            <Row className="menu-img"> 
                {specialityData.map((item, index) => (
                    <Col key={index} xs={6} md={4} lg={2} className="mb-3 menu-item">
                        <Link to="/" className="text-decoration-none">
                            <Card className="text-center border-0 shadow-sm p-3">
                                <Card.Img variant="top" src={item.image} alt={item.speciality} className="img-fluid" />
                                <Card.Body>
                                    <Card.Title as="h5">{item.speciality}</Card.Title>
                                </Card.Body>
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default SpecialityMenu;
