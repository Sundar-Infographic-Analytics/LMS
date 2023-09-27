import React from 'react'
import '../../assets/css/global.css';
import '../../assets/css/custom.css';
import { Card, Col, Container, Row, Form, Button, Image } from 'react-bootstrap';
import logo from '../../assets/images/logo.png';
import loginimg from '../../assets/images/login_img.png';
import mailion from '../../assets/images/mail.png';
import passion from '../../assets/images/password.png';

const Login = () => {
  return (
    <>
    <div className='orange_bg'>
    <Container fluid>
      <Row>
          <Col lg={7} md={7} xs={12}>
            <div className='text-center'>
              <div className='vmiddle unset' style={{height:'100vh'}}>
                <Image src={loginimg} className='w80'></Image>
              </div>
            </div>
          </Col>
          <Col lg={5} md={5} xs={12}>
            <div className='vmiddle unset posr dr100' style={{height:'100vh'}}>
              <div className='w70 mw100 p-2'>
                <Card className='br15'>
                  <Card.Body className='p-4'>
                  <Card.Img variant="top" src={logo} className='w20 mt-4 mb-4'/>
                    <Card.Title className='fw600 fz36  black' style={{marginBottom:'70px'}}>Login to your Account</Card.Title>
                    <Form action='/home'>
                      <Form.Group className="mb-3 posr" controlId="formBasicEmail">
                        <Form.Label className='fw600 fz18 black'>Email address</Form.Label>
                        <Image src={mailion} className='posa r0 top45' style={{width:"23px"}} />
                        <Form.Control type="email" placeholder="Enter email" className='borltrn br0 bor1' style={{borderColor:"orange"}} required/>
                      </Form.Group>
                      <Form.Group controlId="formBasicPassword" className='posr mart20'>
                        <Form.Label className='fw600 fz18 black'>Password</Form.Label>
                        <Image src={passion} className='posa r0 top35' style={{width:"23px"}}/>
                        <Form.Control type="password" placeholder="Password" className='borltrn br0' style={{borderColor:"orange"}} required/>
                      </Form.Group>
                      <Form.Text className='fr mb-3 light_black'>Forgot Password?</Form.Text>
                      <Button variant="primary" type="submit" className='w100 orange_bg bor_gra fz18 h50'>
                        Login
                      </Button>
                    </Form>
                    <Card.Text className='black mt-4 light_black fz13 fw400'>© 2023 Sundar&Co All Rights Reserved.</Card.Text>
                  </Card.Body>
                </Card> 
              </div>  
          </div> 
          </Col>
      </Row>
    </Container>
    </div>
    </>
  )
}

export default Login