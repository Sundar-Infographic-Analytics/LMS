import React from 'react';
import '../../assets/css/global.css';
import '../../assets/css/custom.css';
import { Col, Container, Row } from 'react-bootstrap';

const Footer = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  return (
   <div className='white_bg' style={{background:"#2D2D2D"}}>
   <Container>
    <Row >
        <Col lg={12}>
        <p className='fz15 fw400 text-center padt20 padb20 white'>© {year} <a className="fw600" href="https://www.infographicanalytics.com/" target="_blank" rel="noreferrer" style={{color:"white"}}>Sundar Infographic Analytics.</a>  All Rights Reserved.</p>
        </Col>
    </Row>
   </Container>
   </div>
  )
}

export default Footer