import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FaArrowRightLong } from "react-icons/fa6";
import heroimg from '../assets/images/home/header_img.png';
import grpimg from '../assets/images/home/group_profiles.png';
import './Herosection.css';

function Herosection() {
    return (
        <Container fluid className="hero-section py-5">
            <Container>
                <Row className="align-items-center">
                    <Col md={6} className="text-center text-md-start">
                        <h1 className="hero-title">
                            Find & Book Appointments with Top Doctors
                        </h1>
                        <div className="d-flex align-items-center mt-3">
                            <img src={grpimg} alt="Group Profiles" className="group-img me-3" />
                            <p>Browse top doctors, check their availability, and book hassle-free.</p>
                        </div>
                        <Button href="/Register" className="rounded-pill mt-3">
                            Book Appointment <FaArrowRightLong />
                        </Button>
                    </Col>
                    <Col md={6} className="text-center">
                        <img src={heroimg} alt="Doctor Consultation" className="img-fluid" />
                    </Col>
                </Row>
            </Container>
        </Container>
    );
}

export default Herosection;
