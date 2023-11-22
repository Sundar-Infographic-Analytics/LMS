import React, { useState } from 'react';
import NavBar from '../Components/header/navbar';
import Table from '../Components/Utils/LMSDataTable';
import { Col, Container, Row, Card, Form,Image, Button} from 'react-bootstrap';
import Img from '../assets/images/sub_cate_banner.png';
const MyCourse = () => {
    const headingsPage1 = ['Si. No','Course Name', 'Thumbnail', 'Status','Actions']; // Customize headings for Page 1
  const [data, setData] = useState([
    {
    'Course Name': "Web development refers to the creating, building, and maintaining of websites.refers to the creating, building, and maintaining of websites.",
    Status: "pending...",
    Thumbnail: Img,
  },
  {
    "Course Name": "Web development refers to the creating, building, and maintaining of websites.refers to the creating, building, and maintaining of websites.",
    Status: "pending...",
    Thumbnail: Img,
  }
])
    const dataPage1 = [
      { Course: 'John', Thumbnail: Img, Status: 'New York', },
      { Course: 'dhivagar', Thumbnail: Img, Status: 'New York', }
      // ... additional rows
    ];
  return (
    
    <div>
        <NavBar className='dark_purple_bg' />
        <div className='clearfix'></div>
        <Container fluid>
        <Row className='mart50 marb10'>
                <Col lg={6}>
                  <div style={{display:'flex',alignItems:'center',height:'100%'}}>
                    <div>
                    {/* <span className='fw600 fz18 mart40 padb10'>Add Chapter</span>   */}
                  </div>
                </div>
                </Col>
                <Col lg={6}>
                  <div style={{display:'flex',justifyContent:'end'}}>
                  <Button href="/addnewcourse" className='w40 mart0 marb10 dark_purple_bg born fw400 fz16 pad10 br5 btn_color ' >+ Add New Chapter</Button>       
                  </div>
                </Col>
              </Row>
        </Container>
       
       <Table  headings={headingsPage1} data={data}/>
    </div>
  )
}

export default MyCourse;