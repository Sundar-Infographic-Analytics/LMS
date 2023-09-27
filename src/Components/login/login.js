import React from 'react'
import '../../assets/css/global.css';
import '../../assets/css/custom.css';
import { Card, Col, Container, Row, Form, Button, Image } from 'react-bootstrap';
import logo from '../../assets/images/logo.png';
import mailion from '../../assets/images/mail.png';
import passion from '../../assets/images/password.png';

const Login = () => {
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
                  <Card.Img variant="top" src={logo} className='w20 mt-4 mb-5'/>
                    <Card.Title className='fw600 fz36  black' style={{marginBottom:'70px'}}>Login to your Account</Card.Title>
                    <Form action='/home'>
                      <Form.Group className="mb-3 posr" controlId="formBasicEmail">
                        <Form.Label className='fw600 fz18 black'>Email address</Form.Label>
                        <Image src={mailion} className='posa r0 top45' style={{width:"23px"}} />
                        <Form.Control type="email" placeholder="Enter email" className='borltrn br0 bor1' style={{borderColor:"#6F3FBA"}} required/>
                      </Form.Group>
                      <Form.Group controlId="formBasicPassword" className='posr mart20'>
                        <Form.Label className='fw600 fz18 black'>Password</Form.Label>
                        <Image src={passion} className='posa r0 top35' style={{width:"23px"}}/>
                        <Form.Control type="password" placeholder="Password" className='borltrn br0' style={{borderColor:"#6F3FBA"}} required/>
                      </Form.Group>
                      <Form.Text className='fr mb-3 light_black'>Forgot Password?</Form.Text>
                      <Button variant="primary" type="submit" className='w100 dark_purple_bg fz18 h50'>
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