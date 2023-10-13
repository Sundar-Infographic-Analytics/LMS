import React, { useEffect, useState } from 'react';
import '../assets/css/global.css';
import Navbar from '../Components/header/navbar';
import { Col, Container, Row, Accordion, Image } from 'react-bootstrap';
import data from '../api/PreviewCourse.js';
import "../../node_modules/video-react/dist/video-react.css";
// import { Player } from 'video-react';
import YouTube from 'react-youtube';
import {  useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';


const PreviewCourse = () => {
const[lesson, setLesson]=useState([]);
const [chapter,setchapter]=useState([]);
const navigate = useNavigate();
const {id} = useParams();

useEffect(()=>{
  const fetchData = async() =>{
await axios
.post(`${process.env.REACT_APP_BASE_URL}/lmsLessonList`,{
  id:id,
})
.then(({data}) =>{
  setLesson(data.courseResults[0]);
// setchapter(data.courseResults[0]?.lesson)
  setchapter(data.courseResults[0].chapter[0])
})
.catch((error) =>{
  if(error.status===400){
    navigate('/')
  }else if(error.status ===401){
    localStorage.clear();
  }
});
  };
  fetchData();
},[id, navigate])

             
function extractVideoId(url) {
  try {
    const urlObject = new URL(url);
    const videoId = urlObject.searchParams.get('v');
    if (videoId) {
      return videoId;
    } else {
      throw new Error('Video ID not found in the URL.');
    }
  } catch (error) {
    console.error('Error extracting video ID:', error);
    return null;
  }
}

const videoUrl = chapter && chapter.lesson && chapter.lesson[0] ? chapter.lesson[0].file_path : null;
  const videoId = videoUrl ? extractVideoId(videoUrl) : null;

  return (
    
    <div>
    {
    console.log("chappppppttttterrrrrrrrrrrrrrrrrrr",chapter.file_path)
    }
    {
    console.log("lessonnnnnnnnnnnnnnnnnDDDDDDDDDDDD",lesson)
    }
    {
    console.log("pathhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh",videoId)
    }
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
            {/* {console.log("mmmmmmmmm",chapter)} */}
          <YouTube videoId={videoId}/>
                {/* {console.log("llinkkkkkk", chapter)} */}
            </Col>
           
   
 
            {/* <Col lg={9}>
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
            </Col> */}
          </Row>
        </Container>
    </div>
  )
}

export default PreviewCourse