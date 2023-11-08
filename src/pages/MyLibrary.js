import React, { useEffect, useState } from "react";
import Header from "../Components/header/header";
import Navbar from "../Components/header/navbar";
// import { RecentCourse } from "../Components/contentarea/RecentCourse";
import Footer from "../Components/footer/footer";
import libraryBg from "../assets/images/library.jpg";
import { Col, Container, Row, Image, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import Whistlist from "../Components/Utils/Whistlist";
import { useCategoryTitle } from '../Components/Utils/CategoryTitleContext';


const MyLibrary = () => {
    const[libraryData, setLibraryData] = useState([]);
    const jwtToken = localStorage.getItem("jwtToken");


    const courseTitle = useCategoryTitle(); // from useContext
    // console.log("cccccc",libraryData)
    
    const fetchDataUpdate = async() =>{
      try{
const response = await axios.post (
`${process.env.REACT_APP_BASE_URL}/mylibrary`,
null,
{
  headers:{
      Authorization:jwtToken,
  },
}
);
  setLibraryData(response.data.data);
  console.log("fetchDataUpdateeeee",response.data.data )
      } catch (error) {
          localStorage.clear();
          console.error("Error fetching categories:", error);
      }
  }

    useEffect(() =>{
        const fetchData = async() =>{
            try{
const response = await axios.post (
    `${process.env.REACT_APP_BASE_URL}/mylibrary`,
    null,
    {
        headers:{
            Authorization:jwtToken,
        },
    }
);
        setLibraryData(response.data.data);
            } catch (error) {
                localStorage.clear();
                console.error("Error fetching categories:", error);
            }
        }
        fetchData();
    },[jwtToken]) //libraryData +

    
  return (
    <>
        <Navbar courseTitleProp={courseTitle}/>
        {console.log("libraryData",libraryData)}
     
        <Header
            style={libraryBg}
        text="Technology is bringing a massive wave of evolution for learning things in different ways."
        title1="My Library"
        title2="from @SNC"
        />
        <Container>
        <Row className="mart30">
          {libraryData?.map((course, index) => (
            <Col lg={3} className="marb20" key={index}>
              <Link
                to={`/PreviewCourse/${course.id}`}
                style={{ textDecoration: "none" }}
                className="black fz16 fw400"
              >
                <Image src={course.course_image} className="w100 border" />
                <div className="border padt10 padr10 padl10 padb20">
                  <p
                    className="light_black"
                    style={{ padding: "0 0px 0 0px", fontSize: "12px" }}
                  >
                    Created by <b>{course.course_created_by}</b> on{" "}
                    {course.formatted_created_date}
                  </p>
                  <p className="fw600 fz18 light_black marb5">
                    {course.course_name}
                  </p>
                  <p className="fw400 fz15 light_black">{course.course_desc}</p>
                  {/* for bottom button and whistlist */}
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
                    course_id={course.id}
                    active={course.wishlist}
                    onClick2={fetchDataUpdate}    // note:if dont't need instanly remove course from whistlist  pls remove onclick2 event
                   
                  />
                </div>
              </Col>
                </div>
              </Link>

              
            </Col>
          ))}
        </Row>
      </Container>
         {/* <RecentCourse /> */}
      <Footer />
    </>
  )
}

export default MyLibrary;