import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import './About.css'; // Importing the CSS file for styling
import aboutImage from '../assets/images/about_image.png'; // Replace with your actual image path

function About() {
    return (
        <section id="about-section" className="py-5">
            <Container>
                <div className="about-title text-center mb-5">
                    <h1>About Us</h1>
                </div>
                <Row className="align-items-center">
                    {/* Image Section */}
                    <Col xs={12} md={5} lg={4} className="about-image mb-4 mb-md-0">
                        <Image src={aboutImage} alt="About Us" fluid />
                    </Col>

                    {/* Text Section */}
                    <Col xs={12} md={6} lg={6}>
                        <p>
                            Welcome to Hospital, your trusted partner in managing your healthcare needs conveniently and efficiently. At Hospital, we understand the challenges individuals face when it comes to scheduling doctor appointments and managing their health records.
                        </p>
                        <p>
                            Hospital is committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service. Whether you're booking your first appointment or managing ongoing care, Hospital is here to support you every step of the way.
                        </p>
                        <h4 className="about-vision-title mt-4">Our Vision</h4>
                        <p>
                            Our vision at Hospital is to create a seamless healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers, making it easier for you to access the care you need, when you need it.
                        </p>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}

export default About;
