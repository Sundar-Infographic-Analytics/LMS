import React from 'react';
import Navbar from '../Components/header/navbar';
import { Col, Container, Row, Accordion, Image } from 'react-bootstrap';
import data from '../api/PreviewCourse.js';

const PreviewCourse = () => {
  const styles={
      background:'red',
  }
  return (
    <div>
      <Navbar style={styles}/>
        <Container fluid>
          <Row>
            <Col lg={3} className='nowrap'>
              {
                data.content.map(course =>
                  <div className='gray_bg pad15'>
                    <div className='dif'>
                      <Image src={course.profile_img} className='w10 marb10 marr10' />
                      <p className='mart10'>{course.updated}</p>
                    </div>
                    <Accordion defaultActiveKey="0">
                      <Accordion.Item eventKey="0">
                        <Accordion.Header>Lesson 1</Accordion.Header>
                        <Accordion.Body>
                        Introduction
                        </Accordion.Body>
                      </Accordion.Item>
                      <Accordion.Item eventKey="1">
                        <Accordion.Header>Lesson 2</Accordion.Header>
                        <Accordion.Body>
                          React Intro
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                </div>
                )
              }
            </Col>
          </Row>
        </Container>
    </div>
  )
}

export default PreviewCourse