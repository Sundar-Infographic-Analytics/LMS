import React from 'react';
import Slider from "react-slick";
import Rating from "./rating/Rating";
import '../../assets/css/global.css';
import '../../assets/css/custom.css';
import { Container, Row, Image, Button, Col } from 'react-bootstrap';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import data from '../../api/RecentCourse.js';
import { Link } from 'react-router-dom';

export const RecentCourse = () => {
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
            <h1 className='mart50 fw700 fz36'>{data.title}</h1>
            <p className='fz18 fw400'>{data.desc}</p>
        </Row>
        <Slider {...settings} className='mart50'>           
            {
                data.content.map(course=> 
                    <div className="padr10">
                        <Image src={course.image} className='w100'/>
                        <div className='padl10 border padb20' style={{borderBottomLeftRadius:"20px",borderBottomRightRadius:"20px"}}>
                            <p className='light_black mart10'>Updated {course.updated}</p>
                            <h3 className='fz18 fw600 marb20'>{course.desc}</h3>
                            <Row>
                                <Col lg={6}>
                                    <div>     
                                        <Rating/>
                                    </div>
                                </Col>
                                <Col lg={6}>
                                <Link to={course.link} className='tdn black'>
                                    <Button className='fz16 padl20 padr20 dark_purple_bg bor_dark_purple br0 fr r20 posr padl30 padr30' src="link">{course.buttontxt}</Button>
                                </Link>
                                </Col>
                            </Row>
                        </div>
                    </div>
                )
            }
     </Slider>
  </Container>
  </>
  )
}
