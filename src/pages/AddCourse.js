import React from 'react';
import { useState } from 'react';
import '../assets/css/global.css';
import '../assets/css/custom.css';
import Navbar from '../Components/header/navbar';
import { Col, Container, Row, Card, Form,Image, Button} from 'react-bootstrap';
import "../../node_modules/video-react/dist/video-react.css";
// import { Player } from 'video-react';
import { Link } from 'react-router-dom';
import data from '../api/AddCourse.js';
import Modal from 'react-bootstrap/Modal';

const AddCourse = () => {
  const Chaptercss={
    display:'flex',
    alignItems:'center',
    justifyContent:'space-between'
  };
  const EditBtnCss={
    border:'1px solid #6F3FBA',
  }
  const EditCss={
    justifyContent:'space-between',
    display:'flex',
    alignItems:'center',
  }
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div>
      <Modal show={show} onHide={handleClose} animation={false} className='custome'>
      <Form.Label htmlFor="inputPassword5" className='fw700'>Lesson Name <span className='red'>*</span></Form.Label>
      <Form.Control
        type="text"
        id="inputPassword5"
        aria-describedby="passwordHelpBlock"
        placeholder='Lesson 01'
      />
      <Form.Label htmlFor="inputPassword5" className='mart30 fw700'>File Type <span className='red'>*</span></Form.Label>
      <fieldset>
                    <Form.Group as={Row} className="mb-3">
                      <Col sm={10}>
                        <Form.Check
                          type="radio"
                          label="Video"
                          name="formHorizontalRadios"
                          id="formHorizontalRadios11"
                        />
                        <Form.Check
                          type="radio"
                          label="PDF / Documents"
                          name="formHorizontalRadios"
                          id="formHorizontalRadios12"
                        />
                      </Col>
                    </Form.Group>
                    </fieldset>
        <Form.Label htmlFor="inputPassword5" className='fw700'>Select File<span className='red'>*</span></Form.Label>
        <Link><Image src={data.Thumb} className='posr fr top5 r5' style={{zIndex:'1'}}></Image></Link>
                        <Form.Control type="file" className='bor_dark_purple br5' style={{position:'relative',bottom:'25px'}}></Form.Control>
        <Modal.Footer>
          <Button className='dark_purple_bg born w30' onClick={handleClose}>
            Save
          </Button>
          <Button className='born w30 cus_btn_new' style={{background:'transparent',color:'#000'}} onClick={handleClose}>
            Clear
          </Button>
        </Modal.Footer>
      </Modal>

      <Navbar className='dark_purple_bg'/>
        <Container >
          <Row>
            <Col lg={12}>
            <p className='fw600 fz18 mart20 padb10'>Add Course</p>
            <Card style={{boxShadow:'0 0 10px 5px #eee'}} className='born'>
              <Card.Body>
              <div style={{display:'flex'}} className='padt20 cusflexrow'>
              <div style={{flex:'1'}} className='padl20'>
                    <p className='fw600 marb10'>Category<span style={{color:'red'}}>*</span></p>
                    <fieldset>
                    <Form.Group as={Row} className="mb-3 block">
                      <Col sm={10}>
                        <Form.Check
                          type="radio"
                          label="Legal"
                          name="formHorizontalRadios"
                          id="formHorizontalRadios1"
                        />
                        <Form.Check
                          type="radio"
                          label="Finance"
                          name="formHorizontalRadios"
                          id="formHorizontalRadios2"
                        />
                        <Form.Check
                          type="radio"
                          label="Risk Management"
                          name="formHorizontalRadios"
                          id="formHorizontalRadios3"
                        />
                        <Form.Check
                          type="radio"
                          label="Technology"
                          name="formHorizontalRadios"
                          id="formHorizontalRadios4"
                        />
                      </Col>
                    </Form.Group>
                  </fieldset>
                  </div>
                  <div style={{flex:'3'}} className='padl20'>
                      <div>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label className='fw600 fz15'>Add Course Title <span style={{color:'red'}}>*</span></Form.Label>
                      <Form.Control type="email" className='bor_dark_purple br5' />
                      </Form.Group>
                        <div className='custompos'>
                        <Form.Group className="mb-3 w40 mw100" controlId="formBasicEmail">
                        <Form.Label className='fw600 fz15'>Sub Category <span style={{color:'red'}}>*</span></Form.Label>
                        <Form.Select aria-label="Default select example" className='br5 bor_dark_purple'>
                          <option>Power Bank </option>
                          <option value="1">One</option>
                          <option value="2">Two</option>
                          <option value="3">Three</option>
                        </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3 w40 marl10 mw100" controlId="formBasicEmail">
                        <div>
                        <Form.Label className='fw600 fz14'>Add  Thumbnail<span className='light_black fz13'> (optional)</span><span style={{color:'red'}}>*</span></Form.Label>
                        </div>
                        <div className='posr'>
                        <Link><Image src={data.Thumb} className='posa' style={{zIndex:'1',right:'10px',top:'10px'}}></Image></Link>
                        <Form.Control type="file" className='bor_dark_purple br5 padl10' style={{position:'relative'}} />
                        </div>
                        </Form.Group>
                        <div style={{alignItems:'center',justifyContent:'center',display:'flex'}} className='marl10 marl10 marb10'>
                          <Image src={data.Thum_Img} rounded className='w80 posr mw100' style={{justifyContent:'center', alignItems:'center'}}></Image>
                        </div>
                        </div>
                      </div>
                  </div> 
                  
                </div> 
                </Card.Body>
              </Card> 
              <Row className='mart30'>
                <Col lg={6}>
                  <div style={{display:'flex',alignItems:'center'}}>
                    <div>
                    <span className='fw600 fz18 mart40 padb10'>Add Chapter</span>  
                  </div>
                </div>
                </Col>
                <Col lg={6}>
                  <div style={{display:'flex',justifyContent:'end'}}>
                  <Button className='w40 mart0 marb10 dark_purple_bg born fw400 fz16 pad10 br5 btn_color'>+ Add New Chapter</Button>       
                  </div>
                </Col>
              </Row>
              <Row xs={1} sm={1} lg={2} style={{padding:"20px",paddingLeft:'0',paddingRight:'0'}} >
              {
                data.content.map(course=>
                <Col lg={12}>
              <Card className='born marb15' style={{boxShadow:'0 0 10px 5px #eee'}} >
                <Card.Body >
                  <div style={Chaptercss}>
                    <p className='black fw600 fz18'>{course.id}. {course.chapter}<Image src={data.Edit_Ion1} className='marl5' style={{width:'15px'}}></Image></p>
                    <Button className='dark_green_bg br5 born fz16' onClick={handleShow}><Image src={data.Add_Ion}></Image> Add Lesson</Button>
                  </div>
                  <div className='border pad20 mart10 br5 dif w100' style={{justifyContent:'space-around', alignItems:"center"}}>
                    <div style={{flex:'1'}}>
                      <Image src={course.Video_Ion} key={course.id}></Image>
                    </div>
                    <div style={{flex:'3'}}>
                      <p className='fw600 fz16'>{course.title}</p>
                      <p className='fw400 fz16'>{course.format}</p>
                    </div>
                    <div style={{flex:'1'}}>
                      <p>{course.time}</p>
                    </div>
                    <div style={EditCss}>
                      <Link style={{textDecoration:'none'}}><p className='pad10 padl20 padr20 br5 dark_purple' style={EditBtnCss}>Edit<Image src={data.Edit_Ion2} className='marl10'></Image></p></Link>
                      <Link><Image src={data.delete_ion} className='padl10'></Image></Link>
                    </div>
                  </div>
                </Card.Body>  
              </Card> 
              </Col>
                )     
              }   
          </Row>
          <div className='mart30 text-center'>
            <Button className='w20 mart0 marb10 born fw400 fz16 pad10 br5 btn_color marr20 cus_btn_new dark_purple'>Save Draft</Button>
            <Button className='w20 mart0 marb10 dark_purple_bg born fw400 fz16 pad10 br5 btn_color'>Submit</Button>
          </div>
            </Col>
            {/* <Col lg={7} className='mobhide'>
                <div className='mart20'>
                  <Player
                  playsInline
                  poster="/assets/poster.png"
                  src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
                />              
                </div>
            </Col> */}
          </Row>
        </Container>
    </div>
  )
}

export default AddCourse