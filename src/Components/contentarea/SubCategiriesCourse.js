import React, { useEffect, useState } from "react";
import Header from "../header/header";
// import SubCate from '../../assets/images/sub_cate_banner.png'
import { Col, Container, Row, Image, Button } from "react-bootstrap";
// import data from '../../api/SubCategiriesCourse.js';
// import Rating from './rating/Rating';
import Footer from "../footer/footer";
import LastView from "./LastView";
import { Link, useParams } from "react-router-dom";
import Navbar from "../header/navbar";
import axios from "axios";
import { RecentCourse } from "./RecentCourse";
import Whistlist from "../Utils/Whistlist";

const SubCategiriesCourse = () => {
  const [Course, setCourse] = useState([]);
  const { id } = useParams();
  const [subCategory, setSubCategory] = useState("");

  const [courseEmpty, setCourseEmpty] = useState(false);

  const jwtToken = localStorage.getItem("jwtToken");

  useEffect(() => {
    if (Course.length === 0) {
      setCourseEmpty(true);
    } else {
      setCourseEmpty(false);
    }
  }, [Course]);

  useEffect(() => {
    const fetchData = async (e) => {
      const jwtToken = localStorage.getItem("jwtToken");
      await axios
        .post(
          `${process.env.REACT_APP_BASE_URL}/lmsCourseList`,
          {
            subcategoryid: id,
          },
          {
            headers: {
              Authorization: jwtToken,
            },
          }
        )
        .then((response) => {
          console.log(response.data, "idcheck");
          setCourse(response.data.courselist);
          setSubCategory(response.data.subategory[0]);
        })
        .catch((error) => {
          localStorage.clear();
          console.log(error, "er1ror");
        });
    };
    fetchData();
  }, [id]);

  return (
    <div>
      <Navbar />
      {console.log(Course, "dhvagrrrrrrrr")}
      {console.log(subCategory, "subCategory")}
      <Header
        style={subCategory?.banner_path}
        text="Technology is bringing a massive wave of evolution for learning things in different ways."
        title1={subCategory?.subcategory_name}
      />
      {courseEmpty ? (
        <Container style={{ padding: "33px 0px 100px 0", textAlign: "center" }}>
          <div
            style={{ fontSize: 25, fontWeight: 600, color: "rgb(94, 94, 94)" }}
          >
            Course List is Empty{" "}
          </div>
        </Container>
      ) : (
        <>
          <Container>
            <Row className="mart30">
              {Course?.map((course, index) => (
                <Col lg={3} className="marb20" key={index}>
                  <Link
                    to={`/PreviewCourse/${course.id}`}
                    style={{ textDecoration: "none" }}
                    className="black fz16 fw400"
                  >
                    <Image src={course.course_image} className="w100 border" />
                    <div className="border padt10 padr10 padl10 padb20">
                    <p className="light_black" style={{ padding: "0px 0px 0 0px", fontSize: "12px" }}>Created by <b>{course.first_name}</b> on{" "}
                    {course.formatted_created_date}
                  </p>
                      <p className="fw600 fz18 light_black marb5">
                        {course.course_name}
                      </p>
                      <p className="fw400 fz15 light_black">
                        {course.course_desc}
                      </p>
                    <div >
                    <Col lg={12} >
                    <div
                  className="course-footer"
                >
                      {/* <Link
                        to={`/PreviewCourse/${course.id}`}
                        className="tdn black"
                      > */}
                        <Button className="fz16 padl20 padr20 dark_purple_bg bor_dark_purple fr r20  padl30 padr30 btn_color born ">
                          View
                        </Button>
                      {/* </Link> */}
                  
                    {jwtToken ? (
                      <Whistlist course_id={course.id} active={course.wishlist} />
                    ) : (
                      <></>
                    )}
                    </div>
                    </Col>
                  </div>
                    </div>
                  </Link>

                  
                </Col>
              ))}
            </Row>
          </Container>
        </>
      )}
      <RecentCourse />
      <LastView />
      <Footer />
    </div>
  );
};

export default SubCategiriesCourse;
