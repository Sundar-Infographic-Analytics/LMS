import React from 'react';
import '../assets/css/global.css';
import Navbar from '../Components/header/navbar';
import { Col, Container, Row, Accordion, Image } from 'react-bootstrap';
import data from '../api/PreviewCourse.js';
import "../../node_modules/video-react/dist/video-react.css";
import { Player } from 'video-react';
import { Link } from 'react-router-dom';


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
            <Col lg={9}>
                <div className='mart20'>
                  <Player
                  playsInline
                  poster="/assets/poster.png"
                  src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
                />              
                </div>
                <div className='fr mart20 dif'>
                  <Link className='border pad5 padr30 padl30 tdn black fz20 marr10 fw400 dark_purple_bg white btn_color'>View</Link>
                  <Link className='border pad5 padr30 padl30 tdn black fz20 fw400 dark_purple_bg white btn_color' src='/'>Complete</Link>
                </div>
            </Col>
          </Row>
        </Container>
    </div>
  )
}

export default PreviewCourse