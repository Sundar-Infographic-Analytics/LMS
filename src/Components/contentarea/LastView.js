import React, { useEffect, useState } from "react";
import "../../assets/css/global.css";
import "../../assets/css/custom.css";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
// import data from "../../api/LastView.js";
import axios from "axios";
import { Link } from "react-router-dom";

const LastView = () => {
   const[viewedCourse, setViewedCourse]=useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [lastViewedEmpty, setLastViewedEmpty]=useState(false);
  
  useEffect(()=>{
    if(viewedCourse.length === 0){
      setLastViewedEmpty(true);
    }else{
      setLastViewedEmpty(false);
    }
  }, [viewedCourse])

  console.log(viewedCourse, "crData");
  useEffect(() => {
    const userName = localStorage.getItem("userName:");

    if (userName) {
      setIsLoggedIn(true);
    }
  }, []);

   useEffect(()=>{
    const fetchData = async () => {
      const jwtToken=localStorage.getItem("jwtToken");
      await axios
      .post(`${process.env.REACT_APP_BASE_URL}/lmsLastViewContent`,
      null,
      {
        headers:{
          Authorization:jwtToken,
        },
      }
      )
      .then((response) =>{
        // console.log(response.data, 'dk');
        setViewedCourse(response?.data?.recentlyviewed);
      })
      .catch((error) =>{
        localStorage.clear();
        console.log(error, "error1")
      })
      };
      fetchData();
    },[]);
    // console.log(viewedCourse, "dkkk");
  return (
    <>
    
      {isLoggedIn ? (
        <Container>
        {
    console.log(lastViewedEmpty,'llllllllllllllllllllllllllllllllllllllllllllllllll')}
          {lastViewedEmpty ? (
            <></>
          ) : (
            <Row>
              <Col lg={12}>
                <h4 className="mart30 fw700 fz36">Recently viewed courses</h4>
                <p className="fz18 fw400">
                Discover New Horizons - Recently Explored Courses Await!
                </p>
              </Col>
            </Row>
          )}

          <Row className="mart20 padb40">
          {console.log("viewd leson",viewedCourse)}
            {viewedCourse?.map((course, index) => (
              <Col lg="3" className="marb10 " key={index}>
                <div style={{width:"310px"}}>
                  <Image
                    src={course.course_image}
                    className="w100 border"
                    style={{ objectFit: "cover" , height:"185px"}}
                  />

                  <p className="fz16 fw400 padt10">{course.lesson_name}</p>
                  <Link to={`/PreviewCourse/${course?.course_id}`}>
                    <Button className="fz16 padl30 padr30 dark_purple_bg bor_dark_purple br0 mart5 btn_color born">
                      View
                    </Button>
                  </Link>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      ) : (
        <></>
      )}
    </>
  );
};

export default LastView;
