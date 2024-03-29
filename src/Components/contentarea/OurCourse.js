import React, { useEffect, useState } from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';
import '../../assets/css/global.css';
import '../../assets/css/custom.css';
import { Link } from 'react-router-dom';
import data from '../../api/OurCourse.js';
import axios from 'axios';
import { useLoader } from '../Utils/Loading/LoaderContext.js';


const OurCourse = () => {
  const { setLoading } = useLoader();
  const [courseTitle, setCourseTitle]=useState([]);

  

  useEffect(() => {

    const fetchCategories = async () => {
      setLoading(true);
      const jwtToken=localStorage.getItem("jwtToken");
      try {
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/lmsCategoryList`,
        null,{
          headers:{
            Authorization:jwtToken,
          },
        });
        setCourseTitle(response.data.category);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, [setLoading]);

  return (
      <div>
        <Container>
            <h2 className='text-center mart50 fw700 fz36'>{data.main_title}</h2>
            <p className='text-center fz20 fw400 marb30'>{data.desc}</p>
            <Row>
             {
              data.content.map((course, index)=>
                <Col lg={3} key={index} >
                <Link to={`${course.link}/${courseTitle[index]?.id}`} style={{textDecoration:'none',}} className="course-container">
                <div className={`${course.color} card card__three`} style={{maxHeight:'263px'}} >
                  <div className='text-center padt50 padb50 '>
                    <Image src={course.image}  style={{width:"95px", height:"95px"}} />
                    <p className='white fw600 mart20 fz22'>{courseTitle[index]?.category_name}</p>
                    <p className='white fw400 fz16'>{course.text}</p>
                  </div>
                  <div className="circle-animation"></div>
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

export default OurCourse;