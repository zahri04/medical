import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Bannerimg from "../assets/images/appointment_img.png";
import { useAuth } from '../Context/AuthContext.js';
import { useEffect, useState } from 'react';
import './Banner.css';

function Banner() {

     const[showButton, setShowButton] = useState(
            {
                to:"/Register",
                text:"Create Account",
            }
        );
        const { authData } = useAuth();// Access the authData from context
        
       
        
    
    
        useEffect(() => { 
            
            if (authData && authData.accessToken) {
                setShowButton({
                    to: "/dashboard",
                    text: "Dashboard",
                });
            } else {
                setShowButton({
                    to: "/Register",
                    text: "Create Account",
                });
            }
    
    
    
    
    
         },[authData])
    
    
    
    
        
    
    if(!authData){
            return null;
        }
    

    return (
        <Container fluid className="banner-section py-5 text-white">
            <Container>
                <Row className="align-items-center">
                    <Col md={7} className="text-center text-md-start">
                        <h2 className="banner-title">Get Medical Assistance from 100+ Trusted Doctors</h2>
                        <Button href={showButton.to} className="rounded-pill mt-3">
                            {showButton.text}
                        </Button>
                    </Col>
                    <Col md={5} className="text-center">
                        <img src={Bannerimg} alt="Appointment Booking" className="img-fluid" />
                    </Col>
                </Row>
            </Container>
        </Container>
    );
}

export default Banner;
