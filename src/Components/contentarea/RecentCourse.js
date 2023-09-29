import React from 'react';
import Slider from "react-slick";
import Rating from "./rating/Rating";
import '../../assets/css/global.css';
import '../../assets/css/custom.css';
import { Container, Row, Image } from 'react-bootstrap';
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
                        <Link to={course.link} className='tdn black'>
                        <Image src={course.image} className='w100'/>
                        <div className='padl10 border padb50' style={{borderBottomLeftRadius:"20px",borderBottomRightRadius:"20px"}}>
                            <p className='light_black mart10'>Updated {course.updated}</p>
                            <h3 className='fz18 fw600'>{course.desc}</h3>
                        </div>
                        </Link>
                        <div className='posr padl10' style={{top:'-50px'}}> 
                            <Rating/>
                        </div>
                    </div>
                )
            }
     </Slider>
  </Container>
  </>
  )
}
