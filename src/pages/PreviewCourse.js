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
  Modal,
  Button,
} from "react-bootstrap";
// import {  Dropdown} from "react-bootstrap";
import "../../node_modules/video-react/dist/video-react.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import YouTube from "react-youtube";
import profile_img from "../assets/images/profile_img.png";
import checkmark from "../assets/images/tick_mark.png";
import { useLoader } from "../Components/Utils/Loading/LoaderContext";


// Import styles


const PreviewCourse = () => {
  const { setLoading } = useLoader();
  const [chapter, setChapter] = useState([]);
  // const [lessonList, setLessonList] = useState([]);
  const [allData, setAllData] = useState([]);
  const [selectedLesson, setSelectedLesson] = useState({
    videoId: null,
    lesson_type: "",
    pdf_path: null,
  });
  // const [videoLink, setVideoLink] = useState("");
  const [showConditionModal, setShowConditionModal] = useState(false);
  const [condtionError, setConditionError] = useState("");
  const [completeButton, setcompletebutton] = useState("");
  const [isLessonCompleted, setIsLessonCompleted] = useState("");
  // const [isLoading,setIsLoading] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [boldText, setBoldText] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const jwtToken = localStorage.getItem("jwtToken");

  const handleClick = async () => {
    if (completeButton) {
      try {
        await axios.post(
          `${process.env.REACT_APP_BASE_URL}/lmsAddHistory`,
          {
            lesson_id: completeButton,
          },
          {
            headers: {
              Authorization: jwtToken,
            },
          }
        );

        setcompletebutton(null);
        navigate(0);

        // Fetch updated data from the server
        //  const response = await axios.post(
        //   `${process.env.REACT_APP_BASE_URL}/lmsLessonList`,
        //   {
        //     id: id,
        //   },
        //   {
        //     headers: {
        //       Authorization: jwtToken,
        //     },
        //   }
        // );
        //      const data = response.data;

        //      if (data && data.courseResults && data.courseResults.length > 0) {
        //        // Update the state with the new data
        //        setChapter(data.courseResults[0].chapter);
        //        setAllData(data);
        //        setLessonList(data.AllLessons);
        //        setVideoLink(data.courseResults[0].chapter[0].lesson);
        //      } else {
        //        // Handle data is not in the expected format
        //        console.log("Data is not in the expected format");
        //      }
      } catch (error) {
        console.log(error, "error from complete button");
      }
    }
    setConfirmModal(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
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

        // console.log(data, "videooooolink");
        // console.log("dataaa", data.firstMatchingLesson.file_type);

        if (data && data?.courseResults && data.courseResults?.length > 0) {
          setChapter(data?.courseResults[0]?.chapter);
          setAllData(data);
          // setLessonList(data?.AllLessons);
          // setVideoLink(data.courseResults[0]?.chapter[0]?.lesson);

          // Find the first lesson that is not marked as read START
          let initialLesson = null;
          // Use .map and the index to iterate over chapters and lessons
          data.courseResults[0].chapter.some((chapter, chapterIndex) => {
            return chapter.lesson.some((lesson, lessonIndex) => {
              if (lesson.lesson_read_status !== 1) {
                initialLesson = lesson;
                return true; // Exit the loop once the initial lesson is found
              } else if (lesson.lesson_read_status !== 0) {
                //did do whille
                data.courseResults[0].chapter.some((chapter, chapterIndex) => {
                  return chapter.lesson.some((lesson, lessonIndex) => {
                    if (lesson.lesson_read_status !== 0) {
                      initialLesson = lesson;
                      return true; // Exit the loop once the initial lesson is found
                    }
                    return false;
                  });
                });
                // initialLesson = lesson;
              }
              return false;
            });
          });
          if (
            data.courseResults[0]?.chapter[0] &&
            data.courseResults[0]?.chapter[0]?.lesson
          )
            console.log("");
            // console.log(initialLesson, "initialLesson");
          // console.log(data, "dataaaaaaaaaaaaaaa");
          // if (initialLesson == null) {
          const videoId =
            initialLesson?.file_type === "V"
              ? extractVideoIdFromUrl(initialLesson?.file_path)
              : initialLesson?.file_path;
          // console.log("videoId", videoId);
          if (videoId) {
            // setVideoLink(initialLesson?.file_path);
            setSelectedLesson({
              videoId: videoId,
              lesson_type: data.firstMatchingLesson.file_type,
            });
            setcompletebutton(initialLesson?.lesson_id);
            setIsLessonCompleted(initialLesson?.lesson_read_status);
            // setIsLoading(true);
            setBoldText(initialLesson);
          } else {
            console.error("Invalid YouTube URL:", initialLesson?.file_path);
          }
        }
        // } else {
        //   // Handle the case where data is not in the expected format
        //   console.log("Data is not in the expected format");
        // }
      } catch (error) {
        console.log(error, "ssss");
      } finally {
        setLoading(false);
      }
    };
    // setIsLoading(false);
    fetchData();
  }, [id, navigate, jwtToken, setLoading]);

  //slid yotubeID from url
  const extractVideoIdFromUrl = (url) => {
    const regex =
      /(?:youtube\.com\/(?:[^/]+\/[^/]+\/|(?:v|e(?:mbed)?|watch|.*[?&]v=|.*[?&]list=))|youtu\.be\/)([^"&?/ ]{11})/;
    const match = url.match(regex);

    if (match && match[1]) {
      return match[1];
    }
    return null;
  };

  const handleLessonSelection = (
    chapterIndex,
    lessonIndex,
    lesson,
    lesson_type
  ) => {
    let lIndx = lessonIndex;
    let cIndx = chapterIndex;

    if (chapterIndex !== 0 || lessonIndex !== 0) {
      if (lessonIndex === 0) {
        chapterIndex -= 1;
        setConditionError(
          "Complete the prior lesson in this chapter to proceed with the current one"
        );
        if (chapterIndex <= 0) chapterIndex = 0;
        lessonIndex = chapter[chapterIndex].lesson.length - 1; // to check chapter's last lesson status
        setConditionError("Complete previous chapter to continue this lesson");
      } else {
        lessonIndex -= 1;
        setConditionError(
          "Complete the prior lesson in this chapter to proceed with the current one"
        );
      }
    }
    if (
      !chapter[chapterIndex].lesson[lessonIndex].lesson_read_status &&
      (cIndx !== 0 || lIndx !== 0)
    )
      setShowConditionModal(true);
    else {
      const videoId =
        lesson.file_type === "V"
          ? extractVideoIdFromUrl(lesson.file_path)
          : lesson.file_path;
      if (videoId) {
        // setVideoLink(lesson.file_path);
        setSelectedLesson({ videoId: videoId, lesson_type: lesson_type });
        setcompletebutton(lesson.lesson_id);
        setIsLessonCompleted(lesson.lesson_read_status);
        // setIsLoading(true);
        setBoldText(lesson);
      } else {
        console.error("Invalid YouTube URL:", lesson.file_path);
      }
    }
    // setIsLoading(false);
  };

  //when clcicck lesson for corresponding link

  //  const handleLessonSelection = (chapterIndex, lessonIndex, lesson) =>{  //dhivaaaaaaaaaaaaaagggggggggggggggggaaaaaaaaaaaaaaaarrrrrrrrrrrrr
  // console.log(chapterIndex, "condiotion-CI")
  // console.log(lessonIndex, "condiotion-LI")
  // const isLessonReaded=chapter[chapterIndex].lesson[lessonIndex].lesson_read_status ===1;
  // const isChapterReaded=chapter[chapterIndex].TotalLesson===chapter[chapterIndex].TotalLessonRead;
  // // const PrevoiusLesson = lessonIndex-=1;
  // console.log(isLessonReaded,'condiotion-les_read')
  // console.log(isChapterReaded,'condiotion-chap_read')
  // // if (chapter[chapterIndex].TotalLesson === chapter[chapterIndex].TotalLessonRead){
  // //   const
  // // }
  // const PrevoiusChapter = chapterIndex - 1;
  // if (!isLessonReaded){    //&& chapter[PrevoiusChapter].TotalLesson===chapter[chapterIndex].TotalLessonRead
  //   if(lesson[lessonIndex]===0){

  //     const PrevoiusChapter = chapter[chapterIndex] - 1;
  //     if (chapter[PrevoiusChapter]===0 || chapter[PrevoiusChapter]===-1)
  //     chapter[chapterIndex]=0
  //  const lastlessonIndex= chapter[chapterIndex].lesson[lessonIndex].length-1
  //  console.log(lastlessonIndex,'condiotion')
  // if(!chapter[chapterIndex].lesson[lastlessonIndex].lesson_read_status){
  //   alert("read prevoius chapter")
  // }

  //   }
  //   const PrevoiusLessonIND = lessonIndex-1;
  //   console.log(chapter[chapterIndex].lesson[PrevoiusLessonIND].lesson_read_status,'condiotion-les_prevoiusless')
  //  if(chapter[chapterIndex].lesson[PrevoiusLessonIND].lesson_read_status===0){
  // // console(PrevoiusLesson===!isLessonReaded,"condiotion")
  //    alert("please read prevoius lesson")
  //  }

  //    else{

  //     alert("you can read")

  //   }

  // }

  //   alert("prevoius lesson is unread")

  //   const videoId = extractVideoIdFromUrl(lesson.file_path);
  //   if (videoId) {
  //     setVideoLink(lesson.file_path);
  //     setSelectedLesson(videoId);
  //     console.log('checkkkkkkkkkkkkkkkkk',videoId)
  //   } else {
  //     console.error("Invalid YouTube URL:", lesson.file_path);
  //   }

  // };

  // console.log("0001chapter", chapter);
  // console.log("0002Alldata", allData);
  // console.log("000seleced", selectedLesson);

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
      autoplay: 0,
    },
  };

  const handleClose = () => {
    setShowConditionModal(false);
    setConfirmModal(false);
  };
  // const url = 'https://d3idlkk51igt07.cloudfront.net/LMS-lesson/eb3864b7-6d94-4edc-9c75-6554b3575e28.pdf'

  return (
    <div>
      <Navbar className="dark_purple_bg" />
      <Container fluid>
        {/* {console.log("linkkkkkkkkkkkkk", videoLink?.file_path)} */}
        <Modal show={showConditionModal} centered onHide={handleClose}>
          <Modal.Header closeButton className="logout-modal">
            <Modal.Title className="fw500">Alert!</Modal.Title>
          </Modal.Header>
          <Modal.Body>{condtionError}</Modal.Body>
          <Modal.Footer>
            <Button
              variant="primary padl50 padr50 dark_purple_bg h50 br5 fw600 fz18 btn_color born"
              onClick={handleClose}
            >
              OK
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={confirmModal} onHide={handleClose}>
          <Modal.Header closeButton className="logout-modal">
            <Modal.Title className="fw500">Confirmation</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure to proceed with the present lesson?
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary padl50 padr50 white_bg black h50 br5 fw600 fz18"
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              variant="primary padl50 padr50 dark_purple_bg h50 br5 fw600 fz18 btn_color born"
              onClick={handleClick}
            >
              Yes
            </Button>
          </Modal.Footer>
        </Modal>

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
              <div>
                <ProgressBar
                  striped
                  variant="info"
                  now={allData.Employee_Read_percentage}
                  style={{ margin: "15px 0 0px 0" }}
                />
                <p
                  className="fz10"
                  style={{ color: "#696c70", margin: "5px 0 15px 0" }}
                >
                  {allData.Employee_Read_percentage}% Completed
                </p>
              </div>
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
            {allData.firstMatchingLesson?.chapter_id && (
              <Accordion
                defaultActiveKey={allData?.firstMatchingLesson?.chapter_id} //now initially 2 but pls chage 2 to 1 for live
                style={{
                  height: "63vh",
                  padding: "10px 20px",
                  overflowY: "scroll",
                  maxHeight: "695px",
                }}
              >
                {chapter.map((course, index1) => (
                  <ul className="custom_ul" key={index1}>
                    <Accordion.Item eventKey={course.chapter_id}>
                      <Accordion.Header
                        style={{ paddingLeft: "10px", paddingRight: "10px" }}
                      >
                        <div
                          // {}
                          className={`custom_ul ${
                            course.TotalLesson === course.TotalLessonRead
                              ? " checkCss enablebg"
                              : "checkCss"
                          }`} //"checkCss enablebg"
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
                      {course.lesson.map((lesson, index2) => (
                        <Accordion.Body
                          style={{ paddingLeft: "10px", paddingRight: "10px" }}
                          key={lesson.lesson_id}
                        >
                          {/* {console.log("00000 course", lesson.file_type)} */}
                          <li
                            className={`lesson-item ${
                              // for hide last LINE
                              index2 === course.lesson.length - 1
                                ? "last-item"
                                : ""
                            }`}
                          >
                            <div
                              className={`custom_ul ${
                                lesson.lesson_read_status === 1
                                  ? " checkCss1 enablebg1"
                                  : "checkCss1"
                              }`}
                            >
                              <Image
                                src={checkmark}
                                style={{ display: "none" }}
                                className="w10 marr10 innerimg imgactive1 enable_tick"
                              ></Image>
                            </div>
                            <div style={{ padding: "0 10px 8px 10px" }}>
                              <Link
                                className={`fz14 " ${
                                  lesson.lesson_name === boldText.lesson_name
                                    ? "lesson-active"
                                    : "lesson-link"
                                }`}
                                onClick={() => {
                                  handleLessonSelection(
                                    index1,
                                    index2,
                                    lesson,
                                    lesson.file_type
                                  );
                                  // setBoldText(lesson);
                                }}
                              >
                                {lesson.lesson_name}
                              </Link>
                              <p className="fz14">
                                File type |{" "}
                                {lesson.file_type === "V" ? "Video" : "PDF"}
                              </p>
                            </div>
                          </li>
                        </Accordion.Body>
                      ))}
                    </Accordion.Item>
                  </ul>
                ))}
              </Accordion>
            )}
          </Col>

          <Col lg={9}>
            {/* {console.log("003", selectedLesson)} */}
            <div className="mart20">
              {/* {console.log("selectedlessson", selectedLesson)} */}
              {selectedLesson?.lesson_type === "P" ? (
                //pdf viewer

                <div id="myPdf">
                  {console.log("selectedddddd")}
                  {/* <object id="myPdf" title="pdf" type="application/pdf" data={selectedLesson?.videoId} ></object> */}
                  {/* <object  id="myPdf"   title="pdf"data={`https://docs.google.com/gview?embedded=true&url=${selectedLesson?.videoId}`} type="application/pdf"> </object> */}
                  <iframe  id="myPdf" src={`https://d3idlkk51igt07.cloudfront.net/LMS-lesson/pdf_viewer/web/viewer.html?reference=${selectedLesson?.videoId}`} title='PDF' />
                </div>
              ) : (
                <YouTube videoId={selectedLesson?.videoId} opts={opts} />
              )}
              <div className="fr dif">
                {/* <button className="border pad5 padr30 padl30 tdn black fz18 marr10 fw400 dark_purple_bg white btn btn_color">
                {selectedLesson.lesson_type === "V" ? 'View' : 'Download'}
              </button> */}
                <Button
                
                  className="border mart10 pad5 padr30 padl30 tdn black fz18 marb30 fw400 dark_purple_bg white btn_color"
                  style={{borderRadius:"0"}}
                  onClick={() => {
                    setConfirmModal(true);
                  }}
                  disabled={!isLessonCompleted ? false : true}
                >
                  Complete
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PreviewCourse;
