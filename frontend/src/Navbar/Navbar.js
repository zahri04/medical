import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link,Navigate } from 'react-router-dom';
import logoimg from '../assets/logo.png';
import './Navbar.css'; 
import { useAuth } from '../Context/AuthContext.js';

function CustomNavbar() {
    const [expanded, setExpanded] = useState(false);
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
        <Navbar expand="lg" bg="light" variant="light" expanded={expanded} className="shadow-sm">
            <Container>
                {/* Logo */}
                <Navbar.Brand className="d-flex align-items-center justify-space-between" as={Link} to="/" onClick={() => setExpanded(false)}>
                    <img src={logoimg} alt="E-health Logo" width="50" />
                    <h1>E-Health</h1>
                </Navbar.Brand>

                {/* Mobile Toggle Button */}
                <Navbar.Toggle 
                    aria-controls="basic-navbar-nav" 
                    onClick={() => setExpanded(expanded ? false : true)} 
                />

                {/* Nav Links */}
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link as={Link} to="/" onClick={() => setExpanded(false)}>Home</Nav.Link>
                        <Nav.Link as={Link} to="/About" onClick={() => setExpanded(false)}>About Us</Nav.Link>
                        <Nav.Link as={Link} to="/AllDoctors" onClick={() => setExpanded(false)}>All Doctors</Nav.Link>
                        <Nav.Link as={Link} to="/Contact" onClick={() => setExpanded(false)}>Contact</Nav.Link>
                    </Nav>
                    {/* Create Account Button */}
                    <Button 
                        as={Link} 
                        to={showButton.to} 
                        variant="primary" 
                        className="rounded-pill ms-3"
                        onClick={() => setExpanded(false)}
                    >
                        {showButton.text}
                    </Button>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default CustomNavbar;
