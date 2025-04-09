import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import contactimg from '../assets/images/contact_image.png';
import './Contact.css'; // Importing the CSS file for styling

function Contact() {
    return (
        <section className="py-5 bg-light" id="contact-section">
            <Container>
                <div className="text-center mb-4">
                    <h1>Contact Us</h1>
                </div>
                <Row className="align-items-center">
                    {/* Contact Image */}
                    <Col md={6} lg={4} className="mb-4 mb-md-0">
                        <img src={contactimg} alt="Contact Us" className="img-fluid rounded" />
                    </Col>

                    {/* Contact Information */}
                    <Col md={6} lg={3}>
                        <h5 className="fw-bold">OUR OFFICE</h5>
                        <p>00000 Willms Station <br /> Pune 000, Pune, India</p>
                        <p><strong>Tel:</strong> (000) 000-0000 <br /> <strong>Email:</strong> rautonkar228@gmail.com</p>
                        
                        <h5 className="fw-bold mt-4">CAREERS AT HOSPITAL</h5>
                        <p>Learn more about our teams and job openings.</p>
                        <Button variant="primary" className="rounded-pill" href="/careers">Explore Jobs</Button>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}

export default Contact;
