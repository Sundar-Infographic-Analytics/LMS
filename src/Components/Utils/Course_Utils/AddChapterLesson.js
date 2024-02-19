import React from "react";
import { useState, useEffect } from "react";
import "../../../assets/css/global.css";
import "../../../assets/css/custom.css";
import { Col, Row, Card, Form, Image, Button, Spinner } from "react-bootstrap";
// import { Player } from 'video-react';
import { Link, useNavigate } from "react-router-dom";
import data from "../../../api/AddCourse.js";
import Modal from "react-bootstrap/Modal";
import Edit_Ion1 from "../../../assets/images/Vector_new_edit_icon.svg";
import Delete_Ion1 from "../../../assets/images/New_Delete.svg";
import Edit_Ion2 from "../../../assets/images/edit_ion2.png";
import Delete_chapter from "../../../assets/images/delete_iconRed-course.png";
import Add_Ion from "../../../assets/images/add_ion.png";
// import Thum_Img from '../../../assets/images/thumb_img.png';
// import Thumb from '../../../assets/images/user_upload.png';
import Pdf_Ion from "../../../assets/images/pdf_ion.svg";
import Video_Ion from "../../../assets/images/video_ion.svg";
import LinkIcon from "../../../assets/images/link.png";
import axios from "axios";
import { toast } from 'react-toastify';
import BookSubmission from '../../../assets/images/graduate.gif';
import { useLoader } from "../Loading/LoaderContext.js";

const AddChapterLesson = ({ catgorySubcat }) => {
  const {setLoading} = useLoader();
  const navigate = useNavigate();
  const apiKey = process.env?.REACT_APP_YOUTUBE_API_KEY;
  // console.log("lesson apikeymain", process.env.REACT_APP_YOUTUBE_API_KEY);

  // const Chaptercss = {
  //   display: "flex",
  //   alignItems: "center",
  //   justifyContent: "space-between",
  //   // border:"1px solid red"
  // };
  const EditBtnCss = {
    border: "1px solid #6F3FBA",
  };
  const EditCss = {
    justifyContent: "space-between",
    display: "flex",
    alignItems: "center",
  };

  const [show, setShow] = useState(false);
  const [showdelete, setShowDelete] = useState(false);

  const [filetypeOption, setFiletypeOption] = useState("");
  const [showChapter, setShowChpter] = useState(false);

  const GetLastCourseLocalID = localStorage.getItem("getcourseID");
  const jwtToken = localStorage.getItem("jwtToken");

  const [buttonLoading, setButtonLoading] = useState(false);
  const [draftbuttonLoading, setDraftButtonLoading] = useState(false);
  const [submitbuttonLoading, setSubmitButtonLoading] = useState(false);
  const [spinnerLoadingTiming, setSpinnerLoadingTiming] = useState(false);

  const [chapterename, setChapterename] = useState("");
  const [errors, setErrors] = useState({});
  // const [editlessonerror, seteditlessonerror] = useState({});
  const [ChapterMapData, setChapterMapData] = useState([]);
  const [selectedChapterID, setSelectedChapterID] = useState("");
  const [deleteChapterlesson, setDeleteChapterLesson] = useState("");

  const MAX_FILE_SIZE = 5 * 1024 * 1024;

  // const [cardloading, setCardLoading] = useState(false);

  const [editchapterState, setEditState] = useState({
    chapter_id: null,
    chapter_name: "",
    course_id: null,
  });

  const [editLessonState, setEditLessonState] = useState({
    lesson_id: null,
    lesson_name: "",
    file_type: "",
    file_path: "",
    chapter_id: null,
  });
  const [previousFile, setPreviousFile] = useState("");

  const file_type = [
    { label: "Video", value: "V" },
    { label: "PDF", value: "P" },
  ];

  const handleChapterClose = () => {
    setErrors({});
    setEditState({});
    setChapterename("");
    setButtonLoading(false);
    setShowChpter(false);
  };
  const handleChapterShow = () => {
    setShowChpter(true);
    // setEditState({});
  };
  const handleClose = () => {
    setShow(false);
    setFiletypeOption(null);
    setLessonData({});
    setErrors({});
    setEditLessonState({
      lesson_id: null,
      lesson_name: "",
      file_type: "",
      file_path: "",
      chapter_id: null,
    });
    setButtonLoading(false);
    setShowDelete(false);
  };
  const handleShow = () => {
    setShow(true);
    setFiletypeOption(null);
    setLessonData({});
    setFiletypeOption(null);
  };

  //for delte modal
  const handledeleteClose = () => {
    setShowDelete(false);
    setDeleteChapterLesson("");
  };

  const handleFileOptionChange = (event) => {
    setFiletypeOption(event.target.value);
  };

  const [lesssonData, setLessonData] = useState({
    //for lesson
    lesson_name: "",
    file_type: "",
    file_path: "",
    chapter_id: selectedChapterID,
  });

  // for chapter
  const handleChapterchange = (e) => {
    setChapterename(e.target.value);
    setErrors({});
  };

  const handleChapterSubmit = async () => {
    // Validate that chapterName is not empty and has a minimum length of 20 characters
    if (!chapterename.trim() || chapterename.trim().length < 10) {
      // Set errors in the state
      setErrors({
        ...editchapterState,
        chapter_name: "Chapter name must have a minimum of 10 characters",
      });
      return;
    }

    try {
      setButtonLoading(true);
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/addchapter`,
        {
          course_id: GetLastCourseLocalID,
          chapter_name: chapterename,
          // Add other necessary data in the request body
        },
        {
          headers: {
            Authorization: jwtToken,
          },
        }
      );

      // console.log("Chapter added successfully:", res.data);

      if (res.data?.code === 200) {
        // console.log("Chapter res.data?.code", res.data?.code);
        handleChapterClose();
        // window.location.reload();
        navigate(0);
      }
      // Handle the response as needed
    } catch (err) {
      localStorage.clear();
      // navigate(0);
      console.error("Error adding chapter:", err);
      setButtonLoading(false);
    }
  };

  useEffect(() => {
    const fetchChapterList = async () => {
      // setCardLoading(true);
      try {
        setLoading(true);
        const reschapter = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/lmschaptersAndLesson`,
          {
            id: GetLastCourseLocalID,
          },
          {
            headers: {
              Authorization: jwtToken,
            },
          }
        );
        setChapterMapData(reschapter?.data);
      
        // console.log("chapter mapin console", reschapter?.data);
      } catch (err) {
        localStorage.clear();
        console.error(err, "error");
      } finally{
        setLoading(false);
      }
    };
    fetchChapterList();
    // setCardLoading(false);
  }, [jwtToken, GetLastCourseLocalID,setLoading]);
  // console.log("chapter getlist", ChapterMapData);

  //for store slected chapterID
  const handleSelectedChapter = (chapterId) => {
    setSelectedChapterID(chapterId);
    handleShow();
    // console.log("chapter", chapterId);
  };
  // console.log("chapter state", selectedChapterID);

  //for lesson
  const handlechange = (e) => {
   
    const { name, value } = e.target;
    setLessonData({
      ...lesssonData,
      [name]: value,
    });
    // lessonValidation();
  };
  const handleFileChange = (e) => {
    const files = e.target.files;

    if (files && files.length > 0) {
      const file = files[0];

      setLessonData((prevData) => ({
        ...prevData,
        file_path: file,
      }));
    }
    // lessonValidation();
  };

  const checkValidYoutubeLink = (url) => {
    try {
      const youtubeUrl = new URL(url);
      const isYoutubeLink =
        (youtubeUrl.hostname === "www.youtube.com" ||
          youtubeUrl.hostname === "youtu.be") &&
        (youtubeUrl.searchParams.get("v") ||
          youtubeUrl.pathname.split("/").pop());

      if (isYoutubeLink) {
        // console.log("status valid yotube link");
        const videoId =
          youtubeUrl.searchParams.get("v") ||
          youtubeUrl.pathname.split("/").pop();
        return videoId;
      } else {
        throw new Error("Invalid Youtube Link");
      }
    } catch (error) {
      throw new Error("Invalid Youtube Link");
    }
  };

  const checkYoutubeVideoExistence = async (videoId, apiKey) => {
    try {
      // console.log("lesson APIF HIT");
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${apiKey}&part=snippet`,
        {
          method: "GET",
        }
      );
      if (response.ok) {
        console.log(" status yotube video is exist");
      }
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      return data.items.length > 0;
    } catch (error) {
      // console.error("Error checking YouTube video existence:", error);
      return false;
    }
  };

  const lessonValidation = async () => {
    const lessonerror = {};
    
    // console.log("lesson type", typeof(lesssonData.file_path))
    if (
      !lesssonData?.lesson_name?.trim() ||
      lesssonData?.lesson_name?.trim().length < 10
    ) {
      lessonerror.lesson_name =
        "Lesson name must have a minimum of 10 characters";
    }
    if (!lesssonData.file_type) {
      lessonerror.file_type = "Must have select file type";
    }
    // console.log("lesson 01",!lesssonData.file_path?.trim(), "lesson 02", !lesssonData.file_path?.name?.trim())
    if (!lesssonData?.file_path && !lesssonData?.file_path?.name) {
      if (lesssonData?.file_type === "V") {
        lessonerror.file_path = "Enter youtube link";
      }
      if (lesssonData?.file_type === "P") {
        lessonerror.file_path = "Upload PDF file";
      }
    }

    if (lesssonData.file_path) {
      if (lesssonData?.file_type === "V") {
        try {
          const videoId = checkValidYoutubeLink(lesssonData?.file_path?.trim());
          const videoExists = await checkYoutubeVideoExistence(videoId, apiKey);

          if (!videoExists) {
            lessonerror.file_path = "There is no such Youtube Link doesn’t exist";
            // console.log("Video does not existtttttttttttttttttttttttttttttttt");
          } else {
            // console.log("Video existsssssssssssssssssssssssssssssssssss");
          }
        } catch (error) {
          lessonerror.file_path = error.message;
        }
      }
      if (lesssonData?.file_type === "P") {
        if (lesssonData?.file_path?.type !== "application/pdf" ){
          // console.log(lesssonData?.file_path?.type, "extentionnnn")
          lessonerror.file_path = "The file only accepts the PDF format";
        }
       if (lesssonData?.file_path.size > MAX_FILE_SIZE) {
        lessonerror.file_path = "PDF file must have a maximum file size of 5 MB";
       } 
      }
    }
    setErrors(lessonerror);
    return Object.keys(lessonerror).length === 0;
  };
  const lessonEditValidation = async () => {
    const lessonEditerror = {};
    // console.log("lesson type", typeof(lesssonData.file_path))
    // console.log(editchapterState)
    if (
      !editchapterState?.chapter_name?.trim() ||
      editchapterState?.chapter_name?.trim().length < 10
    ) {
      lessonEditerror.chapter_name =
        "Chapter name must have a minimum of 10 characters";
    }
    setErrors(lessonEditerror);
    return Object.keys(lessonEditerror).length === 0;
  };




  const chapterEditValidation = async () => {
    const lessonEditerror = {};
    // console.log("lesson type", typeof(lesssonData.file_path))
    // console.log(editchapterState)
    // if (
    //   !(editchapterState.chapter_name?.trim()) ||
    //   editchapterState.chapter_name?.trim().length < 10
    // ) {
    //   lessonEditerror.chapter_name =
    //     "chapter name must be at least 10 characters long";
    // }
    
    

    if (
      !editLessonState?.lesson_name?.trim() ||
      editLessonState?.lesson_name?.trim().length < 10
    ) {
      lessonEditerror.lesson_name =
        "Lesson name must have a minimum of 10 characters";
    }
    if (!editLessonState.file_type) {
      lessonEditerror.file_type = "Must have select file type";
    }
    // console.log("lesson 01",!lesssonData.file_path?.trim(), "lesson 02", !lesssonData.file_path?.name?.trim())
    if (!editLessonState?.file_path && !editLessonState?.file_path?.name) {
      if (editLessonState?.file_type === "V") {
        lessonEditerror.file_path = "Enter youtube link";
      }
      if (editLessonState?.file_type === "P") {
        lessonEditerror.file_path = "Upload PDF file";
      }
    }

    if (editLessonState.file_path) {
      if (editLessonState?.file_type === "V") {
        try {
          const videoId = checkValidYoutubeLink(
            editLessonState?.file_path?.trim()
          );
          const videoExists = await checkYoutubeVideoExistence(videoId, apiKey);

          if (!videoExists) {
            lessonEditerror.file_path = "YouTube video does not exist";
            console.log("Video does not exist");
          } else {
            console.log("Video exists");
          }
        } catch (error) {
          lessonEditerror.file_path = error.message;
        }
      }
      if (editLessonState?.file_type === "P") {
        if (editLessonState?.file_path?.type !== "application/pdf" ){
          // console.log(lesssonData?.file_path?.type, "extentionnnn")
          lessonEditerror.file_path = "The file only accepts the PDF format";
        }
        if (editLessonState?.file_path.size > MAX_FILE_SIZE) {
          lessonEditerror.file_path = "PDF file must have a maximum file size of 5 MB";
        }
       }
    }
    setErrors(lessonEditerror);
    return Object.keys(lessonEditerror).length === 0;
  };

  const handleLessonSubmit = async () => {
    setButtonLoading(true);
    const lessonDataWithID = {
      lesson_name: lesssonData?.lesson_name,
      file_type: lesssonData?.file_type,
      file_path: lesssonData?.file_path,
      chapter_id: selectedChapterID,
    };

    const isvalid = await lessonValidation();
    // console.log("lessonDataWithID", lessonDataWithID);

    if (isvalid) {
      // console.log("lesson check valid", isvalid);
      try {
        const lessonRes = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/addlesson`,
          lessonDataWithID,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: jwtToken,
            },
          }
        );
        // console.log("lesson created>>>>>>>>>>>>>>>>>>>:", lessonRes?.data);
        if (lessonRes?.data?.code === 200) {
          // console.log("code", lessonRes?.data?.code)
          handleClose();
          await setLessonData({});
          // window.location.reload();
          navigate(0);
        }
      } catch (err) {
        localStorage.clear();

        console.error(err);
      }
    }
    setButtonLoading(false);
  };

  //course submit

  const fullCourseSubmitValidation = async () => {
    const submitError = {};

    ChapterMapData.forEach((chapterMap, index) => {
      if (!chapterMap.lessons || chapterMap.lessons.length === 0) {
        submitError[
          `empty_lesson_chapter_${index + 1}`
        ] = `This ${chapterMap.chapter_name} chapter must contain at least one lesson`;
      }
    });

    if (ChapterMapData[0]?.chapter_id === null || ChapterMapData.length === 0) {
      submitError.empty_course =
        "To submit, there must be at least one chapter with lessons";
    }

    setErrors(submitError);
    return Object.keys(submitError).length === 0;
  };

  const handleCourseSubmit = async () => {
    const isValid = await fullCourseSubmitValidation();

    if (isValid) {
      // console.log(" dhivagar no error to sumbit ");
      try {
        setSubmitButtonLoading(true);
        const response = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/coursesubmit`,
          { 
            id: localStorage.getItem("getcourseID"),
            statusCode : 0
          },
          {
            headers: {
              Authorization: jwtToken,
            },
          }
        );
        // console.log("course submit msg:", response?.data);
        
        
        if (response?.data?.code === 200) {
          setSpinnerLoadingTiming(true);
          setTimeout(() => {
            setSpinnerLoadingTiming(false);
            navigate("/mycourse");
            const CustomToast = () => (    
          
              <div className="vmiddle " style={{padding:"0 10px", gap:"10px"}}>
              <div className="user-profile">
                <img  src={BookSubmission} alt="submit"/>
              </div>
                <p>      
                Your course has been <strong>Submitted </strong>!
              </p>
          
              </div>
              
              
            );
            toast( <CustomToast />, {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              });
          });
          
          
        }
      } catch (error) {
        localStorage.clear();
        console.log(error);
        console.error("Error fetching categories:", error);
        setSubmitButtonLoading(false);
      }
      setSubmitButtonLoading(false);
    }
  };

  //edit chapter
  // const courseID = parseInt(GetLastCourseLocalID)

  const handleEditclick = async (chapterMap) => {
    setEditState({
      chapter_id: chapterMap?.chapter_id,
      chapter_name: chapterMap?.chapter_name,
      course_id: chapterMap?.course_id,
    });
    setShowChpter(true);
  };

  const handleEditSubmit = async () => {
    const isValid = await lessonEditValidation();
    
// console.log(isValid,"lllllllllll")
    if(isValid) {
      try {
        setButtonLoading(true);
        const response = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/updatechapter`,
          editchapterState,
          {
            headers: {
              Authorization: jwtToken,
            },
          }
        );
        // console.log(response.data);
        if (response?.data?.code === 200) {
          setSpinnerLoadingTiming(true);
          setTimeout(() => {
            // window.location.reload();
            setSpinnerLoadingTiming(false);
          }, 1000);
        }
      } catch (error) {
        localStorage.clear();
        // console.log(error);
        // console.error("Error fetching categories:", error);
        setButtonLoading(false);
      }
  
      setButtonLoading(false);
      // window.location.reload();
      navigate(0);
    } else{
      console.log("Form validation failed");
    }
   
  };

  //edit lesson

  const handleLessonEditClick = async (lessons, chapter_id, oldFiletype) => {
    // console.log(lessons, "chapter checking", chapter_id, "idd");
    setEditLessonState({
      lesson_id: lessons?.lesson_id,
      lesson_name: lessons?.lesson_name,
      file_type: lessons?.file_type,
      file_path: lessons?.file_path,
      chapter_id: chapter_id,
    });
    setPreviousFile({
      file_type: lessons?.file_type,
      file_path: lessons?.file_path,
    });
    handleShow(true);
  };

  const handleLessonEditSubmit = async () => {
    const  isvalid =  await chapterEditValidation();
    // console.log(isvalid, "kkkkkkkkkkkkkkkkkkkkkkkk")

    if (isvalid) {
      setButtonLoading(true);
      await axios
        .post(
          `${process.env.REACT_APP_BASE_URL}/updatelesson`,
          editLessonState,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: jwtToken,
            },
          }
        )
        .then(({ data }) => {
          if (data.code === 200) {
            setSpinnerLoadingTiming(true);
            setTimeout(() => {
              // window.location.reload();
              setSpinnerLoadingTiming(false);
            }, 1000);
          }
        })
        .catch((error) => {
          // localStorage.clear();
          console.log(error);
        })
        .finally(() => {
          setButtonLoading(false);
          navigate(0);
        });
    }
    else {
      // Handle validation errors, e.g., display error messages
      console.log("Form validation failed");
    }
  };

  //Delete lesson
  const handlelessonDeleteSubmit = async () => {
    setButtonLoading(true);
    // { console.log(deletelesson?.lesson_id, "ggggggggggggggggg")}
    await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/deletelesson`,
        {
          lesson_id: deleteChapterlesson?.lesson_id,
        },
        {
          headers: {
            Authorization: jwtToken,
          },
        }
      )
      .then((response) => {
        // console.log(response.data);
        navigate(0);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setButtonLoading(false);
      });
  };

  //delete chapter
  const handlechapterDeleteSubmit = async () => {
    setButtonLoading(true);
    // { console.log(deletelesson?.lesson_id, "ggggggggggggggggg")}
    await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/deletechapter`,
        {
          id: deleteChapterlesson?.chapter_id,
        },
        {
          headers: {
            Authorization: jwtToken,
          },
        }
      )
      .then((response) => {
        // console.log(response.data);
        setButtonLoading(false);
        navigate(0);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {});
  };

const HandleDraftSubmit = async () =>{
  setDraftButtonLoading(true);
  try{
    setLoading(true)
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/coursesubmit`,
      { 
        id: localStorage.getItem("getcourseID"),
        statusCode : 3
      },
      {
        headers: {
          Authorization:localStorage.getItem("jwtToken"),
        },
      }
    ).then((res) =>{
      if (res?.data?.code === 200) {
        setTimeout(() => {
    setDraftButtonLoading(false);
    navigate("/mycourse")
    const CustomToast = () => (    
          
      <div className="vmiddle " style={{padding:"0 10px", gap:"10px"}}>
      <div className="user-profile">
        <img  src={BookSubmission} alt="submit"/>
      </div>
        <p>      
        Your course has been saved as a <strong>Draft</strong>!
      </p>
  
      </div>
    );
    toast( <CustomToast />, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  }, 1000);
      }
    }).catch((errors)=>{
      console.log("error to sumbit as draft",errors);
    })
    
    console.log("course submit msg:", response?.data);
  }catch(error){
    console.log("error to sumbit as draft",error);
  }
  // setDraftButtonLoading(true);
  // setTimeout(() => {
  //   setDraftButtonLoading(false);
  //   navigate("/mycourse")
  //   const CustomToast = () => (    
          
  //     <div className="vmiddle " style={{padding:"0 10px", gap:"10px"}}>
  //     <div className="user-profile">
  //       <img  src={BookSubmission} alt="submit"/>
  //     </div>
  //       <p>      
  //       Your course saved as , <strong>Draft</strong>!
  //     </p>
  
  //     </div>
  //   );
  //   toast( <CustomToast />, {
  //     position: "top-right",
  //     autoClose: 3000,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     progress: undefined,
  //     theme: "light",
  //     });
  // }, 1000);
}
  

  // console.log("lesson all error", errors);
  // console.log("lesson onchange data", lesssonData);
  // console.log("lesson chap_ID", selectedChapterID);
  // console.log("lesson chap_MAP", ChapterMapData);
  // console.log("edit chapter  editchapterState", editchapterState);
  // console.log("edit lesson  editLESSONState", editLessonState);
  // console.log("chapter  onchange data", chapterename);
  // console.log("edit lesson  editLESSONState  oldfile type", previousFile);
  // console.log("delete lesson data deletelesson", deleteChapterlesson);
  // console.log("file types", filetypeOption);
  // console.log("errorrrrrr", errors);

  return (
    <>
      <div>
        <Modal
          show={show}
          onHide={handleClose}
          animation={true}
          className="custome"
        >
          <Form.Label htmlFor="inputPassword5" className="fw700">
            Lesson Name <span className="red">*</span>
          </Form.Label>

          {/* <Form.Control
            name="lesson_name"
            type="text"
            id="inputPassword5"
            aria-describedby="passwordHelpBlock"
            placeholder="Enter lesson name*"
            value={
              editLessonState.lesson_id ? editLessonState.lesson_name : ""
            }
            onChange={(e) => {
              editLessonState.lesson_id
                ? setEditLessonState({
                    ...editLessonState,
                    lesson_name: e.target.value,
                  })
                : handlechange(e);
            }}
          /> */}
          {editLessonState?.lesson_id !== null ? (
            <Form.Control
              name="lesson_name"
              type="text"
              id="inputPassword5"
              aria-describedby="passwordHelpBlock"
              value={editLessonState?.lesson_name || ""}
              onChange={(e) => {
                setEditLessonState({
                  ...editLessonState,
                  lesson_name: e.target.value,
                });
              }}
            />
          ) : (
            <Form.Control
              name="lesson_name"
              type="text"
              id="inputPassword5"
              aria-describedby="passwordHelpBlock"
              value={lesssonData?.lesson_name || ""}
              placeholder="Enter lesson name"
              onChange={handlechange}
            />
          )}

          {errors.lesson_name && (
            <Form.Text className="text-danger">{errors.lesson_name}</Form.Text>
          )}
          <Form.Label htmlFor="inputPassword5" className="mart20 fw700">
            File type <span className="red">*</span>
          </Form.Label>
          <fieldset>
            <Form.Group as={Row} className="mb-3">
              <Col sm={10}>
                {file_type.map((filetype, index) => (
                  <Form.Check
                    key={index}
                    type="radio"
                    label={filetype.label}
                    name="file_type"
                    style={{ cursor: "pointer" }}
                    id={`formHorizontalRadios${index}`}
                    value={filetype?.value}
                    checked={
                      editLessonState.lesson_id
                        ? editLessonState.file_type === filetype.value
                        : filetypeOption === filetype.value
                    }
                    // onChange={(e) => {
                    //   handlechange(e);
                    //   handleFileOptionChange(e);
                    //   setLessonData({
                    //     ...lesssonData,
                    //     file_path: "",
                    //     file_type: e.target.value,
                    //   });
                    // }}
                    onChange={(e) => {
                      if (editLessonState.lesson_id) {
                        setEditLessonState({
                          ...editLessonState,
                          file_type: e.target.value,
                          file_path:
                            e.target.value === previousFile?.file_type
                              ? previousFile?.file_path
                              : null,
                        }); //
                        // {console.log("newtype:", e.target.value, "oldtype",previousFile?.file_type, "zzzzzzzzzzzzzz", e.target.value === previousFile?.file_type)}
                      } else {
                        handlechange(e);
                        handleFileOptionChange(e);
                        setLessonData({
                          ...lesssonData,
                          file_path: "",
                          file_type: e.target.value,
                        });
                      }
                    }}
                  />
                ))}
              </Col>
              {errors.file_type !== null && (
                <Form.Text className="text-danger">
                  {errors.file_type}
                </Form.Text>
              )}
            </Form.Group>
          </fieldset>
          {filetypeOption !== null || editLessonState.lesson_id !== null ? (
            <div>
              <Form.Label htmlFor="inputPassword5" className="fw700">
                {filetypeOption === "V" || editLessonState?.file_type === "V"
                  ? "Paste youtube link"
                  : filetypeOption === "P" || editLessonState?.file_type === "P"
                  ? "Select file"
                  : ""}
                <span className="red"> *</span>
              </Form.Label>
              <Link>
                <Image
                  src={
                    filetypeOption || editLessonState?.file_type === "V"
                      ? LinkIcon
                      : filetypeOption || editLessonState?.file_type === "P"
                      ? data.Thumb
                      : ""
                  }
                  className="posr fr r10"
                  style={{ zIndex: "1", top: "45px", width: "18px" }}
                ></Image>
              </Link>
              {filetypeOption === "V" ||
              editLessonState?.file_type === "V" ||
              editLessonState?.file_type === undefined ? (
                editLessonState?.file_type === "V" ? (
                  <Form.Control
                    name="file_path"
                    type="text"
                    placeholder="Enter YouTube URL"
                    className="bor_dark_purple br5"
                    style={{ position: "relative" }}
                    value={editLessonState?.file_path || ''}
                    // value={editLessonState?.file_path || ""}
                    onChange={(e) => {
                      setEditLessonState({
                        ...editLessonState,
                        file_path: e.target.value,
                      });
                    }}
                  />
                ) : (
                  <Form.Control
                    name="file_path"
                    type="text"
                    placeholder="Enter YouTube URL"
                    className="bor_dark_purple br5"
                    value={lesssonData.file_path}
                    style={{ position: "relative", paddingRight:"35px" }}
                    onChange={handlechange}
                  />
                )
              ) : (
                <Form.Control
                  name="file_path"
                  type="file"
                  accept="application/pdf"
                  className="bor_dark_purple br5 "
                  style={{ position: "relative", paddingRight:"35px" }}
                  // value={editLessonState?.file_path || ""}
                  // value={editLessonState? editLessonState?.file_path.name : lesssonData?.file_path.name}
                  onChange={(e) => {
                    if (editLessonState?.lesson_id) {
                      setEditLessonState({
                        ...editLessonState,
                        file_path: e.target.files[0],
                      });
                    } else {
                      handleFileChange(e);
                    }
                  }}
                ></Form.Control>
              )}
              {errors.file_path && (
                <Form.Text className="text-danger">
                  {errors.file_path}
                </Form.Text>
              )}
              {editLessonState?.file_type && (
                <p>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href={previousFile?.file_path}
                  >
                    exist file preview
                  </a>
                </p>
              )}
            </div>
          ) : (
            <></>
          )}

          <Modal.Footer>
            
            <Button
              className="padl30 padr30 white_bg black h50 br5 fw600 fz18 btn btn-secondary"
              style={{
                  
                  border: "1px solid #6f3fba",
                  color: "#6f3fba",
                
                }}
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              className="primary padl50 padr50 dark_purple_bg h50 br5 fw600 fz18 btn_color born"
              onClick={() =>
                editLessonState.lesson_id
                  ? handleLessonEditSubmit()
                  : handleLessonSubmit()
              }
              disabled={
               buttonLoading
              }
            >
              {buttonLoading && (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  style={{ marginRight: "5px" }}
                />
              )}
             {editLessonState.lesson_id ? "Edit" : "Add"}
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal
          show={showChapter}
          onHide={() => handleChapterClose()}
          animation={true}
          className="custome"
        >
          <Form.Label htmlFor="inputPassword5" className="fw700">
            Chapter Name <span className="red">*</span>
          </Form.Label>

          {/* <Form.Control
            type="text"
            id={"inputPassword5"}
            aria-describedby="passwordHelpBlock"
            placeholder="new chapter name"
            className="mart10"
            name="chapter_name"
            onChange={(e) =>
              editchapterState.course_id
                ? setEditState({
                    ...editchapterState,
                    chapter_name: e.target.value,
                  })
                : handleChapterchange(e)
            }
            value={
              editchapterState.course_id ? editchapterState?.chapter_name : null
            }
          /> */}
          {editchapterState?.chapter_id ? ( ///check !==null
            <Form.Control
              type="text"
              id={"inputPassword5"}
              aria-describedby="passwordHelpBlock"
              className="mart10"
              name="chapter_name"
              value={editchapterState?.chapter_name}
              onChange={(e) =>
                setEditState({
                  ...editchapterState,
                  chapter_name: e.target.value,
                })
              }
              placeholder={
                editchapterState?.chapter_id ? "New chapter name" : ""
              }
            />
          ) : (
            <Form.Control
              type="text"
              id={"inputPassword5"}
              aria-describedby="passwordHelpBlock"
              placeholder="New chapter name"
              className="mart10"
              value={chapterename || ""}
              name="chapter_name"
              onChange={handleChapterchange}
              style={{height:"45px"}}
            />
          )}

          {/* <Form.Control
            type="text"
            id={"inputPassword5"}
            aria-describedby="passwordHelpBlock"
            placeholder="new chapter name"
            className="mart10"
            name="chapter_name"
            onChange={(e) =>
              editchapterState.course_id
                ? setEditState({
                    ...editchapterState,
                    chapter_name: e.target.value,
                  })
                : handleChapterchange(e)
            }
            value={
              editchapterState.course_id ? editchapterState?.chapter_name : null
            }
          />       */}
          {errors.chapter_name && (
            <Form.Text className="text-danger">{errors.chapter_name}</Form.Text>
          )}
          <Modal.Footer
            style={{ marginTop: "20px", borderTop: "0px solid red !important" }}
          >
          
            <Button
              className="padl30 padr30 white_bg black h50 br5 fw600 fz18 btn btn-secondary"
              style={{border:"1px solid  #6F3FBA", color:"#6F3FBA"}}
              onClick={() => {
                handleChapterClose();
              }}
            >
              Cancel
            </Button>
            <Button
              className="primary padl50 padr50 dark_purple_bg h50 br5 fw600 fz18 btn_color born"
              // onClick={handleChapterSubmit}
              onClick={() =>
                editchapterState.course_id
                  ? handleEditSubmit()
                  : handleChapterSubmit()
              }
              disabled={
               buttonLoading
              }
            >
              {buttonLoading && (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  style={{ marginRight: "5px" }}
                />
              )}
              {editchapterState?.chapter_id ? "Edit" : "Add"}
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <div className="delete modal">
        <Modal
          show={showdelete}
          onHide={handledeleteClose}
          style={{ margin: "0px" }}
        >
          <Modal.Header closeButton className="logout-modal">
            <Modal.Title className="fw500">Confirmation!!!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          Are you sure about deleting {" "}
            <span className="fw600">
              {deleteChapterlesson?.lesson_name
                ? deleteChapterlesson?.lesson_name
                : deleteChapterlesson?.chapter_name}{" "}
            </span>
            {deleteChapterlesson?.lesson_name
              ? "lesson?"
              : "along with lessons ?"}
          </Modal.Body>
          <Modal.Footer>
            <Button
              className="padl30 padr30 white_bg black h50 br5 fw600 fz18 btn btn-secondary"
              style={{
                  
                  border: "1px solid #6f3fba",
                  color: "#6f3fba",
                  transition:"all .45s"
                }}
              onClick={handleClose}

            >
              Cancel
            </Button>
            <Button
              variant="primary padl50 padr50 dark_purple_bg h50 br5 fw600 fz18 btn_color born"
              onClick={
                deleteChapterlesson?.lesson_id
                  ? handlelessonDeleteSubmit
                  : handlechapterDeleteSubmit
              }
              disabled={buttonLoading}
            >
              {buttonLoading && (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  style={{ marginRight: "5px" }}
                />
              )}
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <Col lg={12}>
        <Row className="mart30">
          {localStorage.getItem("getcourseID") && (
            <>
              <Col lg={6}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div>
                    <span className="fw600 fz18 mart40 padb10">
                      Add Chapter
                    </span>
                  </div>
                </div>
              </Col>

              <Col md={12} sm={12} lg={6}  >
                <div style={{ display: "flex", justifyContent: "end" }} className="Add-btn">
                  <Button
                    className="w40 mart0 marb10 dark_purple_bg born fw600 fz16 pad10 br5 btn_color"
                    onClick={() => handleChapterShow()}
                  >
                    + Add New Chapter
                  </Button>
                </div>
              </Col>
            </>
          )}

          {/* {console.log("chapter check", ChapterMapData)} */}
        </Row>
        {ChapterMapData[0] && ChapterMapData[0].chapter_id ? (
          <Row
            xs={1}
            sm={1}
            lg={2}
            style={{ padding: "20px", paddingLeft: "0", paddingRight: "0" }}
          >
            {ChapterMapData?.map((chapterMap, index) => (
              <Col lg={12} className="marb15" key={index}>
                <Card
                  className="born "
                  style={{ boxShadow: "0 0 10px 5px #eee",  borderRadius:"6px"}}
                  key={chapterMap.course_id}
                >
                  {/* {cardloading && (
                    <div className="my-loading-overlay">
                      <Spinner
                        as="span"
                        animation="border"
                        role="status"
                        aria-hidden="true"
                        className="my-cardLoading"
                      />
                    </div>
                  )} */}
                  <Card.Body>
                    <div className="Chapter-items">
                      <p className="black fw600 fz18 icon-zoom ">
                        {index + 1}. {chapterMap.chapter_name}
                        
                        <Image
                          src={Edit_Ion1}
                          className="marl20 "
                          style={{ width: "15px" }}
                          onClick={() => handleEditclick(chapterMap)}
                        ></Image>
                        <Image
                          src={Delete_chapter}
                          className="marl10 "
                          style={{ width: "17px" }}
                          onClick={() => {
                            setDeleteChapterLesson(chapterMap);
                            setShowDelete(true);
                          }}
                        ></Image>
                      </p>
                      <Button
                        className="dark_green_bg br5 born fz16 btn-mar"
                        onClick={() =>
                          handleSelectedChapter(chapterMap.chapter_id)
                        }
                      >
                        <Image src={Add_Ion}></Image> Add Lesson
                      </Button>
                    </div>
                    {chapterMap?.lessons.length > 0 && (
                      <>
                        {chapterMap?.lessons?.map((lessonmap, index) => (
                          <div
                            key={index}
                            className=" pad20 mart10 br5 dif w100 lesson-items"
                           
                            style={{ boxShadow: "0 0 10px 5px #eee" }}
                          >
                          <div className="lesson-set1">
                            <div style={{ flex: "0.5" }} className="">
                              <Image
                                src={
                                  lessonmap?.file_type === "V"
                                    ? Video_Ion
                                    : lessonmap?.file_type === "P"
                                    ? Pdf_Ion
                                    : null
                                }
                              ></Image>
                            </div>
                            <div style={{ flex: "3" }}>
                              <p className="fw600 fz16">
                                {lessonmap?.lesson_name}
                              </p>
                              <p
                                className="fw400 fz16"
                                style={{ opacity: "0.4" }}
                              >
                                {" "}
                                {catgorySubcat?.category_name} /{" "}
                                {catgorySubcat?.subcategory_name}{" "}
                              </p>
                            </div>
                            <div style={{ flex: "1" }}>
                              <p className="fw400 fz16">
                                {lessonmap?.file_type === "V"
                                  ? "Video"
                                  : lessonmap?.file_type === "P"
                                  ? "PDF"
                                  : null}
                              </p>
                            </div>
                            </div>
                            <div className="lesson-set2">
                            <div style={EditCss}>
                              <Link
                                style={{ textDecoration: "none" }}
                                onClick={() =>
                                  handleLessonEditClick(
                                    lessonmap,
                                    chapterMap.chapter_id
                                  )
                                }
                              >
                                <p
                                  className="pad5 padl20 padr20 br5 dark_purple edit-btn"
                                  style={EditBtnCss}
                                >
                                  Edit
                                  <Image
                                    src={Edit_Ion2}
                                    className="marl10"
                                  ></Image>
                                </p>
                              </Link>
                              <Link>
                                <Image
                                  src={Delete_Ion1}
                                  className="padl10"
                                  onClick={() => {
                                    setDeleteChapterLesson(lessonmap);
                                    setShowDelete(true);
                                  }}
                                ></Image>
                              </Link>
                              </div>
                            </div>
                          </div>
                        ))}
                      </>
                    )}
                  </Card.Body>
                </Card>
                <div className="mart5 marl5">
                  {errors[`empty_lesson_chapter_${index + 1}`] && (
                    <Form.Text className="text-danger">
                      {errors[`empty_lesson_chapter_${index + 1}`]}
                    </Form.Text>
                  )}
                </div>
              </Col>
            ))}
          </Row>
        ) : (
          <></>
        )}
        {/* {errors.empty_chapter &&  (
                <Form.Text className="text-danger">
                  {errors.empty_chapter}
                </Form.Text>
              )} */}
        {errors.empty_course && (
          <Form.Text className="text-danger">{errors.empty_course}</Form.Text>
        )}
        {localStorage.getItem("getcourseID") && (
          <div className="button-Components-draft-submit">
            <Row>
              <Col lg={12}>
                <div className="mart10 text-center marb30">
                  <Button className="w20 mart0 marb10 born fw400 fz16 pad10 br5 btn_color marr20 cus_btn_new dark_purple" onClick={HandleDraftSubmit}
                  disabled = {draftbuttonLoading}
                  >

                  {draftbuttonLoading && (
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        style={{ marginRight: "5px" }}
                      />
                    )}
                    Save Draft
                  </Button>
                  <Button
                    className="w20 mart0 marb10 dark_purple_bg born fw400 fz16 pad10 br5 btn_color"
                    onClick={handleCourseSubmit}
                    disabled={
                      submitbuttonLoading
                        ? submitbuttonLoading
                        : spinnerLoadingTiming
                        ? spinnerLoadingTiming
                        : null
                    }
                  >
                    {submitbuttonLoading && (
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        style={{ marginRight: "5px" }}
                      />
                    )}
                    {spinnerLoadingTiming && (
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        style={{ marginRight: "5px" }}
                      />
                    )}
                   {ChapterMapData[0]?.approved_status === 2 ? "Resubmit" : "Submit"} 
                  </Button>
                </div>
              </Col>
            </Row>
          </div>
        )}
      </Col>
    </>
  );
};

export default AddChapterLesson;
