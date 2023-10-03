import React, { useEffect, useState } from "react";
import '../assets/css/global.css';
import '../assets/css/custom.css';
import { Card, Col, Container, Row, Form, Button, Image } from 'react-bootstrap';
import logo from '../assets/images/logo.png';
import mailion from '../assets/images/mail.png';
import passion from '../assets/images/password.png';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

const Login = () => {
  const navigate = useNavigate(); // to naviagte

  const [credentials, setCredentials] = useState({
    mobile: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "mobile") { 
      const numericValue = value.replace(/\D/g, ""); // Remove any non-numeric characters
      if (numericValue.length <= 10) { //does not exceed 10 digits
        setCredentials({
          ...credentials,
          [name]: numericValue,
        });
      }
      if (numericValue.length > 10) { // If the input exceeds 10 digits, trim it to 10 digits
        setCredentials({
          ...credentials,
          [name]: numericValue.slice(0, 10),
        });
      }
      return;// do nothing
    }
  
    setCredentials({
      ...credentials,
      [name]: value,
      
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/lmsLogin`,
        credentials
      );
      if (response.status === 200) {
        const token = response.data.jwtToken;
        localStorage.setItem("jwtToken", token);
        const decodedToken = jwt_decode(token);
        const expirationTime = decodedToken.exp * 1000;
        const currentTime = new Date().getTime();
        const timeUntilExpiration = expirationTime - currentTime;

        localStorage.setItem("jwtTokenExpiration", expirationTime);

        setTimeout(() => {
          localStorage.removeItem("jwtToken");
          localStorage.removeItem("jwtTokenExpiration");
          navigate("/login"); // Navigate to the login if expire
          window.location.reload();
        }, timeUntilExpiration);
        navigate("/");
      } else {
        if (response.data && response.data.error) {
          setError("Invalid Credentials");
        } else {
          setError("Internal error. Please try again later.");
        }
      }
    } catch (error) {
      if (error.response) {
        
        setError("Invalid Credential");// Handle network errors (server responded with an error status
      } else {
       
        setError("Network error. Please check your network connection."); //  no network connection
      }
    }
  };

  

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    const tokenExpiration = localStorage.getItem("jwtTokenExpiration");

    if (token && tokenExpiration) {
      const currentTime = new Date().getTime();
      const expirationTime = parseInt(tokenExpiration);

      if (currentTime > expirationTime) {
        localStorage.removeItem("jwtToken");
        localStorage.removeItem("jwtTokenExpiration");
        window.location.reload(); // Refresh the page when token expires
      }
    }
  }, []);

  return (
    <>
    <div>
    <Container fluid>
      <Row>
          <Col lg={4} md={4} xs={12}>
            <div className='vmiddle dr100 h100vh marl20'>
              <div className='w80 mw100 p-2'>
                <Card className='br15 born'>
                  <Card.Body>
                  <Card.Img variant="top" src={logo} className='w20 mt-4 mb-3'/>
                    <Card.Title className='fw600 fz30  black' style={{marginBottom:'70px'}}>Login to your Account</Card.Title>
                    <Form onSubmit={handleFormSubmit}>
                      <Form.Group className="mb-3 posr" controlId="formBasicEmail">
                        <Form.Label className='fw400 fz20 black'>Mobile Number</Form.Label>
                        <Image src={mailion} className='posa r0 top45 marr10' />
                        <Form.Control type="tel" name="mobile" placeholder="Enter mobile" className='borltrn br0 bor1' style={{borderColor:"#6F3FBA"}} value={credentials.mobile} onChange={handleChange} required/>
                      </Form.Group>
                      <Form.Group controlId="formBasicPassword" className='posr mart20'>
                        <Form.Label className='fw400 fz20 black'>Password</Form.Label>
                        <Image src={passion} className='posa r0 top45 marr10' />
                        <Form.Control type="password" name="password" placeholder="Password" className='borltrn br0' style={{borderColor:"#6F3FBA"}} value={credentials.password} onChange={handleChange} required/>
                      </Form.Group>
                      <Form.Text className='fr mb-3 light_black'>Forgot Password?</Form.Text>
                      { error && <p className="w100 text-danger mart25 marb10">{error}</p>}
                      <Button variant="primary" type="submit" className='w100 dark_purple_bg fz18 h50' style={{borderColor:"#6F3FBA"}}>
                        Login
                      </Button>
                    </Form>
                    <Card.Text className='black mt-4 light_black fz13 fw400'>© 2023 Sundar&Co All Rights Reserved.</Card.Text>
                  </Card.Body>
                </Card> 
              </div>  
          </div> 
          </Col>
          <Col lg={8} md={8} xs={12}>
            <div className='text-center dark_purple_bg h100vh'>
              
            </div>
          </Col>
      </Row>
    </Container>
    </div>
    </>
  )
}

export default Login