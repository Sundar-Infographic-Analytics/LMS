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
import LastView from "../Components/contentarea/LastView";
import NoImg from '../assets/images/NoImg.svg'

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
        setLearnedCourse(response?.data);
        
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
  // console.log(learnedCourse,"my Mstery dataaaaaa")
  return (
    <>
      <Navbar />
      {/* {console.log("learned", learnedCourse?.readCourseList?.length)} */}
      <Header
        style={learningBg}
        text="Your Journey to Skillful Mastery Begins Here"
        title1="Ignite Your Abilities, "
        title2="Master Your Craft"
      />
      {learnedCourse?.readCourseList?.length !== 0 ? (
        <Container>
        <Row className="mart30">
          {learnedCourse?.readCourseList?.map((course, index) => (
            <Col xxl={3} lg={4} md={6} sm={12} className="marb20 scale-animation" key={index} >
            <div className="myanimation">
              <Link
              title = {course.course_name}
                to={`/PreviewCourse/${course.course_id}`}
                style={{ textDecoration: "none" }}
                className="black fz16 fw400"
              >
                <Image src={course.course_image || NoImg} style={{  height:"168px" , objectFit:"cover" }} className="w100 border" />
                <div className="border pad10" style={{  height:"255px" , display:"flex",flexDirection:"column", justifyContent:"space-between"}}>
                <div>
                  <p
                    className="light_black"
                    style={{ padding: "0 0px 0 0px", fontSize: "12px" }}
                  >
                    Created by <b>{course.employee_name}</b> on{" "}
                    {course.formatted_created_date}
                  </p>
                  <p
                    className="light_black"
                    style={{ padding: "0 0px 0 0px", fontSize: "12px" }}
                  >
                    Completed on  <b>{course?.finished_date}</b> 
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
            style={{  textAlign: "center", padding: "133px 0px 159px 0" }}
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
      <LastView/>
      <Footer />
    </>
  );
};

export default MyLearnings;
