import React, { useEffect, useState } from "react";
import Header from "../Components/header/header";
import Navbar from "../Components/header/navbar";
import { RecentCourse } from '../Components/contentarea/RecentCourse';
import Footer from '../Components/footer/footer';
import learningBg from "../assets/images/my-learning.jpg";
import { Col, Container, Row, Image, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import Whistlist from "../Components/Utils/Whistlist";

const MyLearnings = () => {
const [learnedCourse, setLearnedCourse] = useState([]);
const jwtToken = localStorage.getItem("jwtToken");

useEffect(() =>{
  const fetchData = async() =>{
    try{
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/lmsCourseRead`,
       null,{
        headers:{
        Authorization:jwtToken,  
        },
       }
       );
       setLearnedCourse(response.data);
    } catch(error){
      localStorage.clear();
      console.error('Error fetching categories:', error)
    }

  };
  fetchData();
},[jwtToken])


  return (
    <>
    
      <Navbar />
       {console.log("learned",learnedCourse )}
      <Header
        style={learningBg}
        text="Technology is bringing a massive wave of evolution for learning things in different ways."
        title1="My Learnings"
        title2="from @SNC"
      />
      <Container>
          <Row className='mart30'>
            {
              learnedCourse?.readCourseList?.map((course, index)=>
           
                <Col lg={3} className='marb20' key={index}>
                  <Link to={`/PreviewCourse/${course.course_id}`} style={{textDecoration:'none',}} className='black fz16 fw400'>
                  <Image src={course.course_image} className='w100 border' />
                    <div className='border padt10 padr10 padl10 padb50'>
                    <p className='light_black' style={{padding:"0 0px 0 0px", fontSize:"12px"}}>Created by <b>{course.employee_name}</b> on {course.formatted_created_date}</p>
                      <p className='fw600 fz18 light_black marb5'>{course.course_name}</p>
                      <p className='fw400 fz15 light_black'>{course.course_desc}</p>
                    </div>
                  </Link>
                  
                  <div className='posr b45 l10'>
                  <Col lg={3} className='marl15'>
                                <Link to={`/PreviewCourse/${course.course_id}`} className='tdn black'>
                                    <Button className='fz16 padl20 padr20 dark_purple_bg bor_dark_purple br0 fr r20  padl30 padr30 btn_color born '>View</Button>
                                </Link>
                               
                                </Col>
                               
                   <Whistlist course_id={course.course_id} active={course.wishList} /> 
                  </div>
                </Col>
              )
            }
          </Row>
        </Container>    
        <RecentCourse/>  
        <Footer/>
    </>
  );
};

export default MyLearnings;
