import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
// import Rating from "./rating/Rating";
import '../../assets/css/global.css';
import '../../assets/css/custom.css';
import { Container, Row, Image, Button, Col } from 'react-bootstrap';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import data from '../../api/RecentCourse.js';
import { Link } from 'react-router-dom';
import axios from 'axios';

export const RecentCourse = () => {
 
 const [recentCourse, setRecentCourse] = useState([]);

 useEffect(() =>{
    const fetchData = async () =>{
        await axios.post(`${process.env.REACT_APP_BASE_URL}/lmsCourseList`)
        .then((response) =>{
            setRecentCourse(response.data.courselist);
            // console.log(recentCourse, "recentCourse");
        })
        .catch((error) =>{
            console.log(error, "error")
        })
    };
    fetchData();
 },[]);
//  console.log(recentCourse, "recentCourse");
//  console.log(recentCourse[0].id,"kkkk");

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true,
        responsive: [{

        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        }
      }
    ]
    
}
  return (
    <>
    <Container>
   
        <Row>
      
            <h1 className='mart50 fw700 fz36'>Recently Added Course</h1>
            <p className='fz18 fw400'>displays the courses which an enrolled user has most recently accessed</p>
        </Row>
        <Slider {...settings} className='mart50'>           
            {recentCourse?.map((course) => (
                    <div className="padr20" key={course?.subcategory_id}>
                        <Image src={course?.course_image_url}  className='w100'/>
                        <div className='padl10 border padb20' style={{borderBottomLeftRadius:"20px",borderBottomRightRadius:"20px"}}>
                            <p className='light_black mart10'>Updated {course.formatted_created_date}</p>
                            <h3 className='fz18 fw600 marb20'>{course.course_name}</h3>
                            <Row>
                                {/* <Col lg={6}>
                                    <div>     
                                        <Rating/>
                                    </div>
                                </Col> */}
                                <Col lg={6}>
                                <Link to={`/PreviewCourse/${course?.id}`} className='tdn black'>
                                    <Button className='fz16 padl20 padr20 dark_purple_bg bor_dark_purple br0 fr r20 posr padl30 padr30 btn_color born' src="link">View</Button>
                                </Link>
                                </Col>
                            </Row>
                        </div>
                        
                    </div>
                ))}
     </Slider>
  </Container>
  </>
  )
}
