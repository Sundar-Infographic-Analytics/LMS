import React, { useEffect, useState, useCallback } from "react";
import "../../../assets/css/global.css";
import "../../../assets/css/custom.css";
import { Col, Row, Card, Form, Image, Button, Spinner } from "react-bootstrap";
// import "../../../node_modules/video-react/dist/video-react.css";
// import { Player } from 'video-react';
import { Link } from "react-router-dom";
import data from "../../../api/AddCourse.js";
import submitClickIcon from "../../../assets/images/submitClick.svg";
import { useCategoryTitle } from "../../Utils/CategoryTitleContext.js";
// // import CourseSubmitcard from "../Course_Utils/CourseSubmitCard.js";
// // import AddChapterLesson from "./AddChapterLesson.js";
// import Edit_Ion1 from '../../../assets/images/edit_ion1.png';
// import Delete_Ion1 from '../../../assets/images/delete_ion1.png';
// import Edit_Ion2 from '../../../assets/images/edit_ion2.png';
// import Add_Ion from '../../../assets/images/add_ion.png';
// // import Thum_Img from '../../../assets/images/thumb_img.png';
// // import Thumb from '../../../assets/images/user_upload.png';
// // import Pdf_Ion from '../../../assets/images/pdf_ion.png';
// import Video_Ion from '../../../assets/images/video_ion.png';
import AddChapaterlesson from "../Course_Utils/AddChapterLesson.js";
import axios from "axios";

const AddCourse = () => {
  // const Chaptercss = {
  //   display: "flex",
  //   alignItems: "center",
  //   justifyContent: "space-between",
  // };
  // const EditBtnCss = {
  //   border: "1px solid #6F3FBA",
  // };
  // const EditCss = {
  //   justifyContent: "space-between",
  //   display: "flex",
  //   alignItems: "center",
  // };

  const courseTitle = useCategoryTitle();
  console.log(courseTitle, "kkkkkkkkkkkkkkkk");

  const [cardloading, setCardLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);

  const GetLastCourseLocalID = localStorage.getItem("getcourseID");

  const [subcatList, setSubcatList] = useState([]);
  const [selectedCat, setSelectedCat] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [getsubmitCourseID, setGetsubmitCourseID] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  console.log("form errorrrr", formErrors);

  // const [show, setShow] = useState(false);
  // const [showChapter, setShowChpter] = useState(false);
  // const handleChapterClose = () => {setShowChpter(false);setChapterErrors({});}
  // const handleChapterShow = () => {setShowChpter(true); setChapterErrors({});}
  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  const [getSubmitedcourse, setGetSubmitedCourse] = useState("");
  const jwtToken = localStorage.getItem("jwtToken");

  // const [chapterename, setChapterename] = useState('');
  // const [chapterErors, setChapterErrors] = useState({});

  // const [ChapterMapData, setChapterMapData] = useState([]);
  // const [selectedChapterID, setSelectedChapterID] = useState('');

  // console.log("cartIDDDDDDDDDDDDD",catId);

  const [courseFormData, setCourseFormData] = useState({
    course_name: "",
    course_desc: "",
    category_id: "",
    subcategory_id: 0,
    course_image: null,
  });
  console.log("CourseFormData", courseFormData);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourseFormData({
      ...courseFormData,
      [name]: value,
    });

    // validateForm();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setCourseFormData((prevData) => ({
      ...prevData,
      course_image: file,
    }));

    if (file) {
      setImagePreview(URL.createObjectURL(file));
    } else {
      // Clear the preview if no image is selected
      setImagePreview(null);
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!courseFormData.course_name.trim()) {
      errors.course_name = "Please enter the course title.";
    }
    if (!courseFormData.course_desc.trim()) {
      errors.course_desc = "Please enter the course description.";
    }
    if (!courseFormData.category_id) {
      errors.category_id = "Please select a category";
    }
    if (courseFormData.category_id && !courseFormData.subcategory_id) {
      errors.subcategory_id = "Please select a subcategory.";
    }
    // Add more validations as needed

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleRadioClick = useCallback(
    async (catogoryId) => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/listsubcategory`,
          {
            category_id: catogoryId,
          },
          {
            headers: {
              Authorization: jwtToken,
            },
          }
        );

        console.log(response.data, "fetchsubCat based on catId");
        setSubcatList(response.data?.subcategory_List);
        setSelectedCat(catogoryId);
      } catch (err) {
        localStorage.clear();
        console.log(err);
      }
    },
    [jwtToken]
  );

  useEffect(() => {
    const fetchData = async () => {
      await handleRadioClick();
    };

    fetchData();
  }, [jwtToken, handleRadioClick]);

  // const getsubmittedCourse =  async () =>{
  //   // if(getsubmitCourseID){
  //     try{
  //       const res = await axios.post(
  //         `${process.env.REACT_APP_BASE_URL}/courseid`,
  //         {
  //           id: getsubmitCourseID,
  //         },
  //         {
  //           headers: {
  //             Authorization: jwtToken,
  //           },
  //         }
  //       );
  //       setGetSubmitedCourse(res.data);
  //       console.log("resdata",res.data);
  //       console.log("getstate",getSubmitedcourse);
  //     }
  //     catch(err) {
  //     console.error("error from get course based on id", err)
  //     }
  //     setLoading(false);
  //   // }
  // }

  const handleSubmit = async () => {
    const isValid = validateForm();

    if (isValid) {
      setButtonLoading(true);
      try {
        // setLoading(true);
        const res = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/addcourse`,
          courseFormData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: jwtToken,
            },
          }
        );
        console.log("created:", res.data);
        setGetsubmitCourseID(res.data?.courseId);
        console.log("getsubmitedCorseIDDDDDD", getsubmitCourseID);
        localStorage.setItem("getcourseID", res.data?.courseId);
        console.log("getsubmitedCorseTEST", res.data?.courseId);
        
        setTimeout(() => {
          setButtonLoading(false);
        }, 5000);
      } catch (err) {
        localStorage.clear();
       
        console.error(err);
      }
      window.location.reload();
      // setButtonLoading(false);
    } else {
      // Handle validation errors, e.g., display error messages
      console.log("Form validation failed");
    }

    console.log(getsubmitCourseID, "setID Okay");
    // await getsubmittedCourse();
  };

  useEffect(() => {
    setCardLoading(true);
    if (localStorage.getItem("getcourseID")) {
      const fetchData = async () => {
        const getres = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/courseid`,
          {
            id: localStorage?.getItem("getcourseID"),
          },
          {
            headers: {
              Authorization: jwtToken,
            },
          }
        );
        setGetSubmitedCourse(getres?.data[0]);
        console.log("resdata", getres?.data[0]);
        // console.log(" resdata getstate",getSubmitedcourse);
      };
      fetchData();
      setCardLoading(false);
    }

  }, [jwtToken]);

  console.log(subcatList, "subcatSateData");

  // // for chapter
  // const handleChapterchange = (e) =>{
  //   setChapterename(e.target.value);
  //   setChapterErrors({});
  // }

  // const handleChapterSubmit = async () => {
  //   // Validate that chapterName is not empty and has a minimum length of 20 characters
  //   if (!chapterename.trim() || chapterename.trim().length < 20) {
  //     // Set errors in the state
  //     setChapterErrors({
  //       chapter_name: "Chapter name must be at least 20 characters long",
  //     });
  //     return;
  //   }

  //   try {
  //     setButtonLoading(true);
  //     const res = await axios.post(
  //       `${process.env.REACT_APP_BASE_URL}/addchapter`,
  //       {
  //         course_id : GetLastCourseLocalID,
  //         chapter_name: chapterename,
  //         // Add other necessary data in the request body
  //       },
  //       {
  //         headers: {
  //           Authorization: jwtToken,
  //         },
  //       }
  //     );

  //     console.log("Chapter added successfully:", res.data);

  //     if(res.data?.code === 200){
  //       console.log("Chapter res.data?.code", res.data?.code);
  //     handleChapterClose();
  //     window.location.reload();
  //     }
  //     // Handle the response as needed
  //   } catch (err) {
  //     console.error("Error adding chapter:", err);
  //     setButtonLoading(false);
  //   }
  // };

  // useEffect(() =>{
  //   const fetchChapterList = async() =>{

  //     try{
  //    const reschapter = await axios.post(
  //     `${process.env.REACT_APP_BASE_URL}/chapter`,
  //     {
  //       id:GetLastCourseLocalID,
  //     },
  //     {
  //       headers:{
  //         Authorization:jwtToken,
  //       },
  //     },
  //     )
  //     setChapterMapData(reschapter?.data);
  //     // console.log("chapter getlist", chapterename)
  //     } catch (err){
  //   console.error(err, "error");
  //     }

  //     }
  // fetchChapterList ();
  // },[jwtToken,GetLastCourseLocalID])
  // console.log("chapter getlist", ChapterMapData)

  //for store slected chapterID
  // const handleSelectedChapter = (chapterId) => {
  //   setSelectedChapterID(chapterId);
  //   handleShow();
  //   console.log("chapter",chapterId)
  // };
  // console.log("chapter state", selectedChapterID)

  return (
    <>
      {!GetLastCourseLocalID && (
        <div className="input-card">
          <Row>
            <Col lg={12}>
              <p className="fw600 fz18 mart20 padb10">Add Course</p>
              <Card style={{ boxShadow: "0 0 10px 5px #eee" }} className="born">
                <Card.Body>
                  <div style={{ display: "" }} className="cusflexrow">
                    <div style={{ flex: "3" }} className="padl20">
                      <div>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label className="fw600 fz15">
                            Add Course Title{" "}
                            <span style={{ color: "red" }}>*</span>
                          </Form.Label>
                          <Form.Control
                            type="text"
                            name="course_name"
                            className={`bor_dark_purple br5 ${
                              formErrors.course_name ? "is-invalid" : ""
                            }`}
                            onChange={handleInputChange}
                            // onBlur={validateForm}
                          />
                          {formErrors.course_name && (
                            <Form.Text className="text-danger">
                              {formErrors.course_name}
                            </Form.Text>
                          )}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label className="fw600 fz15">
                            Description<span style={{ color: "red" }}>*</span>
                          </Form.Label>
                          <Form.Control
                            name="course_desc"
                            as="textarea"
                            className={`bor_dark_purple br5 ${
                              formErrors.course_desc ? "is-invalid" : ""
                            }`}
                            style={{ minHeight: "50px" }}
                            onChange={handleInputChange}
                          />
                          {formErrors.course_desc && (
                            <Form.Text className="text-danger">
                              {formErrors.course_desc}
                            </Form.Text>
                          )}
                          <div style={{ flex: "1" }} className="mart20">
                            <p className="fw600 marb10">
                              Category<span style={{ color: "red" }}>*</span>
                            </p>
                            <fieldset>
                              <Form.Group as={Row} className="block">
                                <Col sm={10}>
                                  {courseTitle?.category?.map(
                                    (category, index) => (
                                      <Form.Check
                                        id={category.id}
                                        key={index}
                                        type="radio"
                                        label={category.category_name}
                                        name="category_id"
                                        onClick={() => {
                                          handleRadioClick(category.id);
                                        }}
                                        onChange={(e) => {
                                          setCourseFormData((prevData) => ({
                                            ...prevData,
                                            category_id: category.id,
                                          }));
                                        }}
                                        // isInvalid={formErrors.category_id}
                                      />
                                    )
                                  )}
                                </Col>
                              </Form.Group>
                              {formErrors.category_id && (
                                <Form.Text className="text-danger">
                                  {formErrors.category_id}
                                </Form.Text>
                              )}
                            </fieldset>
                          </div>
                        </Form.Group>
                        {selectedCat && (
                          <div className="custompos">
                            <Form.Group
                              className="mb-3 w50 mw100"
                              controlId="formBasicEmail"
                            >
                              <Form.Label className="fw600 fz15">
                                Sub Category{" "}
                                <span style={{ color: "red" }}>*</span>
                              </Form.Label>
                              <Form.Select
                                aria-label="Default select example"
                                className="br5 bor_dark_purple"
                                defaultValue="0"
                                name="subcategory_name"
                                onChange={(e) => {
                                  setCourseFormData((prevData) => ({
                                    ...prevData,
                                    subcategory_id: e.target.value,
                                  }));
                                }}
                              >
                                <option
                                  style={{ color: "#4c4c4c !important" }}
                                  disabled
                                  value={0}
                                >
                                  <p style={{color:"red !important"}}>Select Subcategory</p>
                                </option>
                                {subcatList?.map((subCategory) => (
                                  <option
                                    key={subCategory.id}
                                    value={subCategory.id}
                                  >
                                    {subCategory.subcategory_name}
                                  </option>
                                ))}
                              </Form.Select>
                              {formErrors.subcategory_id && (
                                <Form.Text className="text-danger">
                                  {formErrors.subcategory_id}
                                </Form.Text>
                              )}
                            </Form.Group>
                            <Form.Group
                              className="mb-3 w40 marl10 mw100"
                              controlId="formBasicEmail"
                            >
                              <div>
                                <Form.Label className="fw600 fz14">
                                  Add Thumbnail
                                  <span className="light_black fz13">
                                    {" "}
                                    (optional)
                                  </span>
                                </Form.Label>
                              </div>
                              <div className="posr">
                                <Link>
                                  <Image
                                    src={data.Thumb}
                                    className="posa"
                                    style={{
                                      zIndex: "1",
                                      right: "10px",
                                      top: "10px",
                                    }}
                                  ></Image>
                                </Link>
                                <Form.Control
                                  type="file"
                                  className="bor_dark_purple br5 padl10 "
                                  style={{ position: "relative" }}
                                  onChange={handleImageChange}
                                />
                              </div>
                            </Form.Group>
                            <div
                              style={{
                                alignItems: "center",
                                justifyContent: "flex-end",
                                display: "flex",
                                flexDirection: "column",
                                marginBottom: "14px",
                              }}
                              className="marl10 marl10"
                            >
                              {/* {imagePreview && ( */}
                              <Image
                                src={
                                  imagePreview ? imagePreview : data.Thum_Img
                                }
                                rounded
                                className="w80 posr mw100"
                                style={{
                                  justifyContent: "center",
                                  alignItems: "center",
                                  height: "55px",
                                  width: "80px",
                                }}
                              ></Image>
                              {/* )} */}
                            </div>
                          </div>
                        )}

                        <div
                          className="w100"
                          style={{
                            alignItems: "center",
                            justifyContent: "flex-end",
                            display: "flex",
                            flexDirection: "row",
                            marginBottom: "14px",
                            
                          }}
                        >
                          <Button
                            type="submit"
                            id="submit"
                            className="btn dark_purple_bg born btn_color w20 pad10 marb5 mart10 fw600"
                            onClick={handleSubmit}
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
                            Submit Course{" "}
                            <Image
                              className="marl10"
                              src={submitClickIcon}
                            ></Image>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      )}

      {GetLastCourseLocalID && (
        <div className="submit-card">
          <Row className="mart30">
            <Col lg="12">
              <p className="fw600 fz18 mart20 padb10">Add Course</p>
              <Card
                style={{ boxShadow: "0 0 10px 5px #eee" }}
                className="born "
              >
                {cardloading && (
                  <div className="my-loading-overlay">
                    <Spinner
                      as="span"
                      animation="border"
                      role="status"
                      aria-hidden="true"
                      className="my-cardLoading"
                    />
                  </div>
                )}
                <>
                  <Card.Body>
                    <div style={{ display: "flex" }}>
                      <div
                        className=""
                        style={{
                          display: "flex",
                          alignItems: "center",
                          width: "400px",
                          minHeight:"150px"
                        }}
                      >
                        <Image
                          src={getSubmitedcourse?.course_image}
                          className="w100 posr mw100 objfit"
                          style={{
                            justifyContent: "center",
                            alignItems: "center",
                            height: "100%",
                          }}
                        ></Image>
                      </div>
                      <div className="pad20">
                        <p
                          className="fw300 fz18 "
                          style={{ color: "#a0a0a0", fontSize: "15px" }}
                        >
                          {getSubmitedcourse?.category_name} /{" "}
                          {getSubmitedcourse?.subcategory_name}
                        </p>
                        <p className="fw600 fz18 marb10">
                          {getSubmitedcourse?.course_name}
                        </p>
                        <p className="fw300 fz15" style={{ color: "#515151" }}>
                          {getSubmitedcourse?.course_desc}
                        </p>
                      </div>
                      <div style={{ display: "inline-flex" }}>
                        <Link>
                          <Image
                            src={data.Edit_Ion1}
                            className="marl5"
                            style={{ width: "20px" }}
                          ></Image>
                        </Link>
                        <Link>
                          <Image
                            src={data.delete_ion}
                            className="padl10"
                            style={{ width: "28px" }}
                          ></Image>
                        </Link>
                      </div>
                    </div>
                  </Card.Body>
                </>
              </Card>
            </Col>
          </Row>
        </div>
      )}
      <div className="addchapterlesson">
        {/* <div>
        {console.log("chapter name",chapterename)}
        <Modal
          show={showChapter}
          onHide={handleChapterClose}
          animation={false}
          className="custome"
        >
          <Form.Label  htmlFor="inputPassword5" className="fw700" >
            Chapter Name <span className="red">*</span>
          </Form.Label>
          <Form.Control
            type="text"
            id="inputPassword5"
            aria-describedby="passwordHelpBlock"
            placeholder="new chapter name"
            className="mart10"
            name="chapter_name"
            onChange={handleChapterchange}
          />
          {chapterErors.chapter_name && (
          <Form.Text className="text-danger">{chapterErors.chapter_name}</Form.Text>
        )}
          <Modal.Footer
            style={{ marginTop: "20px", borderTop: "0px solid red !important" }}
          >
            <Button
              className="dark_purple_bg born w30"
              onClick={handleChapterSubmit}
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
              )}Add
            </Button>
            <Button
              className="born w30 cus_btn_new"
              style={{ background: "transparent", color: "#6f3fba" }}
              onClick={handleChapterClose}
            >
              Clear
            </Button>
          </Modal.Footer>
        </Modal>
      </div> */}
        <AddChapaterlesson catgorySubcat={getSubmitedcourse} />
        {/* <Col lg={12}>
        <Row className="mart30">
          <Col lg={6}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div>
                <span className="fw600 fz18 mart40 padb10">Add Chapter</span>
              </div>
            </div>
          </Col>
          <Col lg={6}>
            <div style={{ display: "flex", justifyContent: "end" }}>
              <Button 
                className="w40 mart0 marb10 dark_purple_bg born fw600 fz16 pad10 br5 btn_color"
                onClick={handleChapterShow}
              >
                + Add New Chapter
              </Button>
            </div>
          </Col>
        </Row>
        <Row
          xs={1}
          sm={1}
          lg={2}
          style={{ padding: "20px", paddingLeft: "0", paddingRight: "0" }}
        >
          {ChapterMapData.map((chapterMap, index) => (
            <Col lg={12}>
              <Card
                className="born marb15"
                style={{ boxShadow: "0 0 10px 5px #eee" }}
              >
                <Card.Body>
                  <div style={Chaptercss}>
                    <p className="black fw600 fz18">
                      {index + 1}. {chapterMap.chapter_name}
                      <Image
                        src={Edit_Ion1}
                        className="marl5"
                        style={{ width: "15px" }}
                      ></Image>
                    </p>
                    <Button
                      className="dark_green_bg br5 born fz16"
                      onClick={() => handleSelectedChapter(chapterMap.chapter_id)
                      }
                    >
                      <Image src={Add_Ion} ></Image> Add Lesson
                    </Button>
                  </div>
                  <div
                    className="border pad20 mart10 br5 dif w100"
                    style={{
                      justifyContent: "space-around",
                      alignItems: "center",
                    }}
                  >
                    <div style={{ flex: "1" }}>
                      <Image src={Video_Ion}></Image>
                    </div>
                    <div style={{ flex: "3" }}>
                      <p className="fw600 fz16">Introduction to tally kkkk</p>
                      <p className="fw400 fz16">Video</p>
                    </div>
                    <div style={{ flex: "1" }}>
                      <p>15:00 Mins</p>
                    </div>
                    <div style={EditCss}>
                      <Link style={{ textDecoration: "none" }}>
                        <p
                          className="pad10 padl20 padr20 br5 dark_purple"
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
                        <Image src={Delete_Ion1} className="padl10"></Image>
                      </Link>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Col> */}
      </div>
    </>
  );
};

export default AddCourse;
