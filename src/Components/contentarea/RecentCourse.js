import React, { useEffect, useState } from "react";
import Slider from "react-slick";
// import Rating from "./rating/Rating";
import "../../assets/css/global.css";
import "../../assets/css/custom.css";
import { Container, Row, Image, Button, Col } from "react-bootstrap";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import data from '../../api/RecentCourse.js';
import { Link } from "react-router-dom";
import axios from "axios";
import Whistlist from "../Utils/Whistlist";
import NoImg from "../../assets/images/9f3ae86c-80f5-42f0-9940-740d8ff96f35.svg";
export const RecentCourse = () => {
  const [recentCourse, setRecentCourse] = useState([]);
  const jwtToken = localStorage.getItem("jwtToken");

  //  const fetchDataUpdate = async () =>{
  //     const jwtToken=localStorage.getItem("jwtToken");
  //     await axios.post(`${process.env.REACT_APP_BASE_URL}/lmsCourseList`,
  //     null,
  //     {
  //         headers:{
  //           Authorization:jwtToken,
  //         },
  //       }
  //     )
  //     .then((response) =>{
  //         setRecentCourse(response.data.courselist);
  //         console.log(recentCourse, "fetchDataUpdateeeee recentfromslide ");

  //     })
  //     .catch((error) =>{
  //         localStorage.clear();
  //         console.log(error, "er1ror")
  //     })
  // };

  useEffect(() => {
    const fetchData = async () => {
      const jwtToken = localStorage.getItem("jwtToken");
      await axios
        .post(`${process.env.REACT_APP_BASE_URL}/lmsCourseList`, null, {
          headers: {
            Authorization: jwtToken,
          },
        })
        .then((response) => {
          setRecentCourse(response.data.courselist);
          // console.log(recentCourse, "recentCourse");
        })
        .catch((error) => {
          localStorage.clear();
          console.log(error, "er1ror");
        });
    };
    fetchData();
  }, [jwtToken]);
  // console.log(recentCourse, "recentCoursevvkkvkvvk");
  //  console.log(recentCourse[0].id,"kkkk");

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    initialSlide: 0,
    slidesToShow: recentCourse.length >= 3 ? 3 : recentCourse.length,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
          arrows: true,
        }
      },
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: false,
            arrows: true,
          }
        },
        {
            breakpoint: 898,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              infinite: true,
              dots: false,
              arrows: false,
            
            }
          },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2,
            arrows: false,
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
           style:{ width: '100%'},
           arrows: false,
          }
        }
      ]
    // responsive: [
    //   {
    //     breakpoint: 480,
    //     settings: {
    //       slidesToShow: 1,
    //       slidesToScroll: 1,
    //       arrows: false,
    //     },
    //   },
    // ],
  };
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  return (
    <>
      <Container className="padb20 marb30">
        {recentCourse.length === 0 ? (
          <></>
        ) : (
          <>
            <Row>
              <h1 className="mart40 fw700 fz36">Recent Additions</h1>
              <p className="fz18 fw400">
                Stay updated to explore our latest courses and learning
                materials
              </p>
            </Row>
            <Slider {...settings} className="mart20 ">
              {recentCourse?.map((course) => (
                <div
                  title={course.course_name}
                  className="pad10  outline_remove slide-item "
                  key={course?.subcategory_id}
                  style={{ borderRadius: "20px" }}
                >
                  <Image
                    src={course?.course_image || NoImg}
                    className=" border slider-Img"
                    // style={{
                    //   width: "412px",
                    //   height: "225px",
                    //   borderTopLeftRadius: "20px",
                    //   borderTopRightRadius: "20px",
                    // }}
                  />
                  <div
                    className=" border content-container"
                    // style={{
                    //   width: "412px",
                    //   height: "auto",
                    //   borderBottomLeftRadius: "20px",
                    //   borderBottomRightRadius: "20px",
                    // }}
                  >
                    
                    
                    <p
                      className="light_black"
                      style={{ padding: "0px 0px 0 0px", fontSize: "14px" }}
                    >
                      Created by <b>{course?.first_name || course?.employee_name}</b> on{" "}
                      {course.formatted_created_date}
                    </p>
                    <p
                      className="light_black"
                      style={{ padding: "0px 0px 0 0px", fontSize: "14px" }}
                    >
                      <span className="fw500" >{course?.category_name} / {course?.subcategory_name}</span> 
                     
                    </p>
                    <h3 className="fz18 fw600 marb5 padt5 lh27 course-name">
                      {truncateText(course.course_name, 80)}
                    </h3>
                    
                    <Row>
                      {/* <Col lg={6}>
                                    <div>     
                                        <Rating/>
                                    </div>
                                </Col> */}
                      <Col lg={12}>
                        <div className="course-footer">
                          <Link
                            to={`/PreviewCourse/${course?.id}`}
                            className="tdn black"
                          >
                            <Button style={{borderRadius:"0"}} className="fz16 padl20 padr20 dark_purple_bg bor_dark_purple fr r20  padl30 padr30 btn_color born">
                              View
                            </Button>
                          </Link>
                          {jwtToken ? (
                            <Whistlist
                              course_id={course.id}
                              active={course.wishlist}
                            />
                          ) : (
                            <> </>
                          )}
                        </div>
                      </Col>
                    </Row>
                  </div>
                </div>
              ))}
            </Slider>
          </>
        )}
      </Container>
    </>
  );
};
