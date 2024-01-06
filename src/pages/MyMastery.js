import React, { useEffect, useState } from "react";
import Header from "../Components/header/header";
import Navbar from "../Components/header/navbar";
import { RecentCourse } from "../Components/contentarea/RecentCourse";
import Footer from "../Components/footer/footer";
import learningBg from "../assets/images/my-learning.jpg";
import { Col, Container, Row, Image, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import Whistlist from "../Components/Utils/Whistlist";
import { useLoader } from "../Components/Utils/Loading/LoaderContext";

const MyLearnings = () => {
  const {setLoading} = useLoader();
  const [learnedCourse, setLearnedCourse] = useState([]);
  const jwtToken = localStorage.getItem("jwtToken");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/lmsCourseRead`,
          null,
          {
            headers: {
              Authorization: jwtToken,
            },
          }
        );
        setLearnedCourse(response.data);
      } catch (error) {
        localStorage.clear();
        console.error("Error fetching categories:", error);
      }finally{
        setLoading(false);
      }
    };
    fetchData();
  }, [jwtToken,setLoading]);

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };
  const truncateDesc = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };

  return (
    <>
      <Navbar />
      {/* {console.log("learned", learnedCourse?.readCourseList?.length)} */}
      <Header
        style={learningBg}
        text="Technology is bringing a massive wave of evolution for learning things in different ways."
        title1="My Mastery"
        title2="from @SNC"
      />
      {learnedCourse?.readCourseList?.length !== 0 ? (
        <Container>
        <Row className="mart30">
          {learnedCourse?.readCourseList?.map((course, index) => (
            <Col lg={3} className="marb20 scale-animation" key={index}>
            <div className="myanimation">
              <Link
              title = {course.course_name}
                to={`/PreviewCourse/${course.course_id}`}
                style={{ textDecoration: "none" }}
                className="black fz16 fw400"
              >
                <Image src={course.course_image} className="w100 border" />
                <div className="border pad10" style={{ width:"306px", height:"240px" , display:"flex",flexDirection:"column", justifyContent:"space-between"}}>
                <div>
                  <p
                    className="light_black"
                    style={{ padding: "0 0px 0 0px", fontSize: "12px" }}
                  >
                    Created by <b>{course.employee_name}</b> on{" "}
                    {course.formatted_created_date}
                  </p>
                  <p className="fw600 fz18 light_black marb5">
                    {truncateText(course.course_name, 55 )}
                  </p>
                  <p title = {course.course_desc}className="fw400 fz15 light_black">{truncateDesc(course.course_desc, 145)}</p>
                  {/* for bottom button and whistlist */}
                  </div>
                  <Col lg={12} >
                <div
                 className="course-footer"
                >
                  {/* <Link
                    to={`/PreviewCourse/${course.course_id}`}
                    className="tdn black"
                  ></Link> */} 
                  {/* // button is there between link tag */}
                    <Button className="fz16 padl20 padr20 dark_purple_bg bor_dark_purple br0 fr r20  padl30 padr30 btn_color born ">
                      View
                    </Button>
                  

                  <Whistlist
                    course_id={course.course_id}
                    active={course.wishList}
                  />
                </div>
              </Col>
                </div>
              </Link>
            </div>              
            </Col>
          ))}
        </Row>
      </Container>
      ) : (
        <>
        <Container
            style={{  textAlign: "center", height: 230,padding:50  }}
          >
            <div
              style={{
                fontSize: 25,
                fontWeight: 600,
                color: "rgb(94, 94, 94)",
              }}
            >
              Your Mastery is Empty{" "}
            </div>
          </Container>
        </>
      )}
      
      <RecentCourse />
      <Footer />
    </>
  );
};

export default MyLearnings;
