import React from 'react';
import '../../assets/css/global.css';
import '../../assets/css/custom.css';
import { Col, Container, Row } from 'react-bootstrap';

const Footer = () => {
  return (
   <div className='white_bg' style={{background:"#5E5E5E"}}>
   <Container>
    <Row>
        <Col lg={12}>
        <p className='fz15 fw400 text-center padt20 padb20 white'>© 2023 Sundar Infographic Analytics. All Rights Reserved.</p>
        </Col>
    </Row>
   </Container>
   </div>
  )
}

export default Footer