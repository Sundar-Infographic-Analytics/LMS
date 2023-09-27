import React from 'react';
import '../assets/css/global.css';
import '../assets/css/custom.css';
import { Col, Container, Image, Row } from 'react-bootstrap';
import data from '../api/SubCategiries.js';
import { Link } from 'react-router-dom';

const SubCategiries = () => {   
  return (
   <div>
    <Container>
      <Col>
        <div className='text-center'>
          <h1 className='fw700 fz36 mart20'>{data.title}</h1>
          <p  className='fz18 fw400'>{data.desc}</p>
          <Row>
            {
              data.content.map(course=>
                <Col lg={3} className='mart50'>
                  <Link to={course.link} >
                    <div className='center_img w100'>
                      <p className='posa white'>{course.title}</p>
                      <Image src={course.image} className='w100' />
                    </div>
                  </Link>
                </Col>
                )
            }
          </Row>
        </div>
      </Col>
    </Container>
   </div>
  )
}

export default SubCategiries