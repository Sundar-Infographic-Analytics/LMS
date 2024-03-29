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
import { useLoader } from "../Utils/Loading/LoaderContext";
import NoImg from '../../assets/images/NoImg.svg'

const SubCategiriesCourse = () => {
  const {setLoading} = useLoader();
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
      setLoading(true);
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
          // console.log(response.data, "idcheck");
          setCourse(response.data.courselist);
          setSubCategory(response.data.subategory[0]);
        })
        .catch((error) => {
          localStorage.clear();
          console.log(error, "er1ror");
        }).finally(() =>{
          setLoading(false);
        })
    };
    fetchData();
  }, [id,setLoading]);


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
    <div>
      <Navbar navlocation={subCategory?.category_id}/>
      {/* {console.log(Course, "dhvagrrrrrrrr")}
      {console.log(subCategory, "subCategory")} */}
      <Header
        style={subCategory?.banner_path}
        text="Technology is bringing a massive wave of evolution for learning things in different ways."
        title1={subCategory?.subcategory_name}
      />
      {courseEmpty ? (
        <Container style={{ padding: "133px 0px 189px 0", textAlign: "center" }}>
          <div
            style={{ fontSize: 25, fontWeight: 600, color: "rgb(94, 94, 94)" }}
          >
            Course List is Empty
          </div>
        </Container>
      ) : (
        <>
          <Container>
          <div className="">
            <Row className="mart30" style={{display:"flex"}}>
              {Course?.map((course, index) => (
                <Col xxl={3} lg={4} md={6} sm={12} className="marb20 scale-animation" key={index} >
                <div className="myanimation">
                  <Link
                  title={course.course_name}
                    to={`/PreviewCourse/${course.id}`}
                    style={{ textDecoration: "none" }}
                    className="black fz16 fw400"
                  >
               
                    <Image src={course.course_image || NoImg} style={{  height:"168px" , objectFit:"cover" }} className="w100 border" />
                    <div className="border pad10 " style={{  height:"255px" , display:"flex",flexDirection:"column", justifyContent:"space-between"}}>
                         <div>
                            <p className="light_black" style={{ padding: "0px 0px 0 0px", fontSize: "12px" }}>Created by <b>{course.first_name}</b> on{" "}
                               {course.formatted_created_date}
                            </p>
                            <p className="fw600 fz18 light_black marb5">
                                   {truncateText(course.course_name,55)}
                                </p>
                            <p title={course.course_desc} className="fw400 fz15 light_black">
                                {truncateDesc(course.course_desc, 145)}
                            </p>
                          </div>
                        <div >
                          <Col lg={12} >
                             <div className="course-footer padt20">
                      {/* <Link
                        to={`/PreviewCourse/${course.id}`}
                        className="tdn black"
                      > */}
                        <Button style={{borderRadius:"0"}} className="fz16 padl20  padr20 dark_purple_bg bor_dark_purple br0 fr r20  padl30 padr30 btn_color born  ">
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
                </div>    
                  
                </Col>
              ))}
            </Row>
            </div>
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
