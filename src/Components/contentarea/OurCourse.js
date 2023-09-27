import React from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';
import '../../assets/css/global.css';
import '../../assets/css/custom.css';
import { Link } from 'react-router-dom';
import data from '../../api/OurCourse.js';

const OurCourse = () => {
  return (
      <div>
        <Container>
            <h2 className='text-center mart50 fw700 fz36'>{data.main_title}</h2>
            <p className='text-center fz20 fw400 marb30'>{data.desc}</p>
            <Row>
             {
              data.content.map(course=>
                <Col lg={3}>
                <Link to={course.link} style={{textDecoration:'none',}}>
                <div className={course.color} style={{maxHeight:'263px'}}>
                  <div className='text-center padt50 padb50'>
                    <Image src={course.image} />
                    <p className='white fw600 mart20 fz22'>{course.title}</p>
                    <p className='white fw400 fz16'>{course.text}</p>
                  </div>
                </div>
                </Link>
              </Col>
                )
             }
            </Row>
        </Container>
      </div>
  )
}

export default OurCourse