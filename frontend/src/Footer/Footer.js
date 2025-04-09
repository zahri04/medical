import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import logoimg from '../assets/logo.png';
import './Footer.css';

function Footer() {
    return (
        <footer className="bg-light text-dark py-4">
            <Container>
                <Row className="footer-info">
                    {/* Logo and About Section */}
                    <Col md={5} className="footer-logo mb-4 mb-md-0">
                        <img src={logoimg} alt="Hospital Logo" className="img-fluid mb-2" width="150" />
                        <p>
                            E-Health is committed to providing seamless medical assistance. 
                            Book appointments with trusted doctors easily.
                        </p>
                    </Col>

                    {/* Company Links */}
                    <Col md={3} className="company mb-4 mb-md-0">
                        <h5 className="fw-bold">Company</h5>
                        <ul className="list-unstyled">
                            <li><a href="/" className="text-dark">Home</a></li>
                            <li><a href="/About" className="text-dark">About Us</a></li>
                            <li><a href="/Delivery" className="text-dark">Delivery</a></li>
                            <li><a href="/Privacy" className="text-dark">Privacy Policy</a></li>
                        </ul>
                    </Col>

                    {/* Contact Info */}
                    <Col md={4} className="touch">
                        <h5 className="fw-bold">Get in Touch</h5>
                        <ul className="list-unstyled">
                            <li>+0-000-000-000</li>
                            <li>support@ehealth.com</li>
                        </ul>
                    </Col>
                </Row>

                {/* Copyright Section */}
                <hr />
                <p className="text-center mt-3">&copy; 2024 E-Health. All Rights Reserved.</p>
            </Container>
        </footer>
    );
}

export default Footer;
