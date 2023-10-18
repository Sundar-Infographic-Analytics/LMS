import React from 'react';
import '../assets/css/global.css';
import Navbar from '../Components/header/navbar';
import { Col, Container, Row, Accordion, Image, ProgressBar, Dropdown } from 'react-bootstrap';
import data from '../api/PreviewCourse.js';
import "../../node_modules/video-react/dist/video-react.css";
import { Link } from 'react-router-dom';
import YouTube from 'react-youtube';


const PreviewCourse = () => {
  const btnCss={
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: 'transparent',
    color: '#000',
    border: '1px solid #9B9B9B',
    borderRadius: '0',
    margin: '15px 0 0 0',
    height: '45px',
  }
 const opts = {
    height: 'auto',
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };
  return (
    <div>
      <Navbar className='dark_purple_bg'/>
        <Container fluid>
          <Row>
            <Col lg={3} className='nowrap padl15 padr15 padt15'>
                  <div className='gray_bg padl15 padr15 padt15'>
                    <div className='dif'>
                      <Image src={data.profile_img} className='w10 marb10 marr10' />
                      <p className='mart10 fz14'>{data.updated}</p>
                    </div>
                    <div>
                      <h2 className='fw600 fz20'>Fashion Photograph Colour Grading</h2>
                    </div>
                    <ProgressBar striped variant="info" now={20} style={{margin:'15px 0'}} />
                    <div>
                    <Dropdown className='text-center'>
                    <Dropdown.Toggle variant="success" id="dropdown-basic" className='w100' style={btnCss}>
                    Search by lesson title
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                      <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                      <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                    </div>
                  </div>                  
                    <Accordion defaultActiveKey="1" style={{height:'72vh',padding:'10px 20px',overflowY:'scroll',maxHeight: '695px',}}>
                      {data.content.map((course,index)=>
                      <ul className='custom_ul'>
                        <Accordion.Item eventKey={course.id} key={course.id}>
                          <Accordion.Header style={{paddingLeft:'10px',paddingRight:'10px'}}>
                            <div className='checkCss enablebg' style={{background: 'transparent',}}>
                              <Image src={course.checkmark} className='w10 marr10 imgactive enable_tick' style={{display:'none'}}></Image>
                            </div>
                           <div className='fw600 marl10' style={{color:'#696c70'}}> {course.lesson}</div>
                          </Accordion.Header>
                          {course.lessons.map((lesson, index)=>   
                            <Accordion.Body style={{paddingLeft:'10px',paddingRight:'10px'}} key={index}>
                              <li className={`lesson-item ${index === course.lessons.length - 1 ? 'last-item' : ''}`}>
                                <div className='checkCss1 enablebg1'>
                                  <Image src={lesson.checkmark} style={{display:'none'}}  className='w10 marr10 innerimg imgactive1 enable_tick'></Image>
                                </div>
                              <div style={{padding:'0 10px 8px 10px'}}>
                              <div className='fz14'>{lesson.file}</div>
                                <p className='fz14'>{lesson.timeframe}</p>
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
                <YouTube videoId="bfHuZDlgtmo" opts={opts}  />     
                </div>
                <div className='fr dif'>
                  <Link className='border pad5 padr30 padl30 tdn black fz18 marr10 fw400 dark_purple_bg white btn_color'>View</Link>
                  <Link className='border pad5 padr30 padl30 tdn black fz18 fw400 dark_purple_bg white btn_color' src='/'>Complete</Link>
                </div>
            </Col>
          </Row>
        </Container>
    </div>
  )
}

export default PreviewCourse