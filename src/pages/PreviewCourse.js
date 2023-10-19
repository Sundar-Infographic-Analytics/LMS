import React, { useState, useEffect } from "react";
import "../assets/css/global.css";
import Navbar from "../Components/header/navbar";
import {
  Col,
  Container,
  Row,
  Accordion,
  Image,
  ProgressBar,
} from "react-bootstrap";
// import {  Dropdown} from "react-bootstrap";
// import data from "../api/PreviewCourse.js";
import "../../node_modules/video-react/dist/video-react.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import YouTube from "react-youtube";
import profile_img from "../assets/images/profile_img.png";
import checkmark from '../assets/images/tick_mark.png';

const PreviewCourse = () => {
  const [chapter, setChapter] = useState([]);
  const [lessonList, setLessonList] = useState([]);
  const [allData, setAllData] = useState([]);
  const [selectedLesson, setSelectedLesson]=useState(null)
  const [videoLink, setVideoLink] = useState('');
  // const [completedChapter, setCompletedChapter]=useState(false)

  const navigate = useNavigate();
  const { id } = useParams();
  const jwtToken = localStorage.getItem("jwtToken");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/lmsLessonList`,
          {
            id: id,
          },
          {
            headers: {
              Authorization: jwtToken,
            },
          }
        );

        const data = response.data;

        if (data && data.courseResults && data.courseResults.length > 0) { // for avoid to 0th array problem
          setChapter(data.courseResults[0].chapter);
          setAllData(data)
          setLessonList(data.AllLessons);
          setVideoLink(data.courseResults[0].chapter[0].lesson);
        } else {
          // Handle the case where data is not in the expected format
          console.log("Data is not in the expected format");
        }
      } catch (error) {
        console.log(error, "ssss");
      }
    };

    fetchData();
  }, [id, navigate, jwtToken]);

    
  //slid yotubeID from url
  const extractVideoIdFromUrl = (url) => {
    const regex = /(?:youtube\.com\/(?:[^/]+\/[^/]+\/|(?:v|e(?:mbed)?|watch|.*[?&]v=|.*[?&]list=))|youtu\.be\/)([^"&?/ ]{11})/;
    const match = url.match(regex);
  
    if (match && match[1]) {
      return match[1];
    }
    return null;
  };



 //when clcicck lesson for corresponding link
 const handleLessonSelection = (lesson) =>{
  const videoId = extractVideoIdFromUrl(lesson.file_path);
  if (videoId) {
    setVideoLink(lesson.file_path);
    setSelectedLesson(videoId);
    console.log('checkkkkkkkkkkkkkkkkk',videoId)
  } else {
    console.error("Invalid YouTube URL:", lesson.file_path);
  }
};

  console.log(chapter, "sssssssssssssssssssssssss");
  console.log(id, "dddddddddddddddddddddddddddddd");
  console.log(lessonList, "QQQQQQQQQQQQQQQQQQQQQQQQQQ");

  // const btnCss = {
  //   display: "flex",
  //   alignItems: "center",
  //   justifyContent: "space-between",
  //   background: "transparent",
  //   color: "#000",
  //   border: "1px solid #9B9B9B",
  //   borderRadius: "0",
  //   margin: "15px 0 0 0",
  //   height: "45px",
  // };
  const opts = {
    height: "auto",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };
  return (
    <div>
      <Navbar className="dark_purple_bg" />
      <Container fluid>
      {console.log(allData, "sssssssssssssssssssssssss")}
      {console.log('totalchapter',chapter)}
      {console.log('linkkkkkkkkkkkkk',videoLink.file_path)}
        <Row>
          <Col lg={3} className="nowrap padl15 padr15 padt15">
            <div className="gray_bg padl15 padr15 padt15 padb15">
              <div className="dif">
                <Image src={profile_img} className="w10 marb10 marr10" />
                <p className="mart10 fz14" style={{ color: "#696c70" }}>
                  Uploaded on{" "}
                  <span
                    className="fw600"
                    style={{ color: "rgb(105, 108, 112)" }}
                  >
                    {allData.course_created_date}
                  </span>{" "}
                </p>
              </div>
              <div>
                <h2 className="fw600 fz20">{allData.Course_name}</h2>
              </div>
              <ProgressBar
                striped
                variant="info"
                now={allData.Employee_Read_percentage}
                style={{ margin: "15px 0" }}
              />
              <div>
                {/* <Dropdown className="text-center">
                  <Dropdown.Toggle
                    variant="success"
                    id="dropdown-basic"
                    className="w100"
                    style={btnCss}
                  >
                    Search by lesson title
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {lessonList.map((lessons) => (
                      <Dropdown.Item href="#/action-1" key={lessons.chapter_id}>
                        {lessons.lesson_name}
                      </Dropdown.Item>
                    ))}
                   
                  </Dropdown.Menu>
                </Dropdown> */}
              </div>
            </div>
            <Accordion
              defaultActiveKey="1"
              style={{
                height: "72vh",
                padding: "10px 20px",
                overflowY: "scroll",
                maxHeight: "695px",
              }}
            >
            {console.log("wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww", chapter)}
              {chapter.map((course,index) => (
                <ul className="custom_ul" key={index}>
                  <Accordion.Item eventKey={course.chapter_id} key={course.chapter_id}>
                    <Accordion.Header
                      style={{ paddingLeft: "10px", paddingRight: "10px" }}
                    >
                      <div
                      // {}
                      className=  {`custom_ul ${course.TotalLesson === course.TotalLessonRead ? ' checkCss enablebg' : 'checkCss'}`}    //"checkCss enablebg"
                        style={{ background: "transparent" }}
                      >
                        <Image
                          src={checkmark}
                          className="w10 marr10 imgactive enable_tick"
                          style={{ display: "none" }}
                        ></Image>
                      </div>
                      <div
                        className="fw600 marl10"
                        style={{ color: "#696c70" }}
                      >
                        {" "}
                        {course.chapter_name}
                      </div>
                    </Accordion.Header>
                    {course.lesson.map((lesson, index) => (
                      <Accordion.Body
                        style={{ paddingLeft: "10px", paddingRight: "10px" }}
                        key={lesson.lesson_id}
                      >
                        <li
                          className={`lesson-item ${
                            index === course.lesson.length - 1
                              ? "last-item"
                              : ""
                          }`}
                        >
                          <div className= {`custom_ul ${lesson.lesson_read_status === 1 ? ' checkCss1 enablebg1' : 'checkCss1'}`}  > 
                            <Image
                              src={checkmark}
                              style={{ display: "none" }}
                              className="w10 marr10 innerimg imgactive1 enable_tick"
                            ></Image>
                          </div>
                          <div style={{ padding: "0 10px 8px 10px" }}>
                            <Link className="fz14 lesson-link" onClick={() => handleLessonSelection(lesson)}>{lesson.lesson_name}</Link>
                            <p className="fz14">2 Mins | Video</p>
                          </div>
                        </li>
                      </Accordion.Body>
                    ))}
                  </Accordion.Item>
                </ul>
              ))}
            </Accordion>
          </Col>
          <Col lg={9}>
            <div className="mart20">
            {selectedLesson && (
              <YouTube videoId={selectedLesson} opts={opts} />
            )}
              
          {/* {console.log("idddddddddddddddddddddddddddddddddddddddddddd:",lesson.file_path)} */}
            </div>
            <div className="fr dif">
              <Link className="border pad5 padr30 padl30 tdn black fz18 marr10 fw400 dark_purple_bg white btn_color">
                View
              </Link>
              <Link
                className="border pad5 padr30 padl30 tdn black fz18 fw400 dark_purple_bg white btn_color"
                src="/"
              >
                Complete
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PreviewCourse;
