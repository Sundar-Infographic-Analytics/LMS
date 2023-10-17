import React from 'react';
import '../assets/css/global.css';
import Navbar from '../Components/header/navbar';
import { Col, Container, Row, Accordion, Image, ProgressBar } from 'react-bootstrap';
import data from '../api/PreviewCourse.js';
import "../../node_modules/video-react/dist/video-react.css";
import { Player } from 'video-react';
import { Link } from 'react-router-dom';


const PreviewCourse = () => {
  const checkCss={
    background: '#4A4A4A',
    borderRadius: '50px',
    width: '30px',
    height: '30px',
    padding: '8px',

  }
  const checkinnerCss={
    background: '#838383',
    borderRadius: '50px',
    width: '25px',
    height: '25px',
    padding: '8px',
    zIndex: '2',

  }
  return (
    <div>
      <Navbar className='dark_purple_bg'/>
        <Container fluid>
          <Row>
            <Col lg={3} className='nowrap p-3'>
                  <div className='gray_bg pad15'>
                    <div className='dif'>
                      <Image src={data.profile_img} className='w10 marb10 marr10' />
                      <p className='mart10'>{data.updated}</p>
                    </div>
                    <div>
                      <h2 className='fw600 fz22 text-center'>Fashion Photograph Colour Grading</h2>
                    </div>
                    <ProgressBar striped variant="info" now={20} />
                  </div>                  
                    <Accordion defaultActiveKey="1" style={{height:'80vh',padding:'10px 20px'}}>
                      {data.content.map(course=>
                      <ul className='custom_ul'>
                        <Accordion.Item eventKey={course.id} key={course.id}>
                          <Accordion.Header>
                            <Image src={course.checkmark} style={checkCss} className='w10 marr10'></Image>
                            {course.lesson}
                          </Accordion.Header>
                          {course.lessons.map(lesson=>   
                            <Accordion.Body>
                              <li>
                              <Image src={lesson.checkmark} style={checkinnerCss}  className='w10 marr10 innerimg'></Image>
                              <div>
                              <div>{lesson.file}</div>
                                <p>{lesson.timeframe}</p>
                              </div>
                              </li>
                            </Accordion.Body>  
                          )}               
                        </Accordion.Item>  
                        </ul>                       
                      )}
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