import React from 'react';
import '../assets/css/global.css';
import Navbar from '../Components/header/navbar';
import { Col, Container, Row, Accordion, Image } from 'react-bootstrap';
import data from '../api/PreviewCourse.js';


const PreviewCourse = () => {
  
  return (
    <div>
      <Navbar className='dark_purple_bg'/>
        <Container fluid>
          <Row>
            <Col lg={3} className='nowrap'>
                  <div className='gray_bg pad15'>
                    <div className='dif'>
                      <Image src={data.profile_img} className='w10 marb10 marr10' />
                      <p className='mart10'>{data.updated}</p>
                    </div>
                  </div>                  
                    <Accordion defaultActiveKey="1" style={{overflowY:'scroll',height:'85vh',}}>
                    {
                    data.content.map(course=>
                      <Accordion.Item eventKey={course.id} key={course.id}>
                        <Accordion.Header><Image src={data.profile_img} className='w10 marr10'></Image>{course.lesson}</Accordion.Header>
                        <Accordion.Body>
                      {course.file}
                        </Accordion.Body>
                      </Accordion.Item>                      
                      )
                    }
                    </Accordion>
                      
            </Col>
          </Row>
        </Container>
    </div>
  )
}

export default PreviewCourse