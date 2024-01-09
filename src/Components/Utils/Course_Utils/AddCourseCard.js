import React, { useEffect, useState, useCallback } from "react";
import "../../../assets/css/global.css";
import "../../../assets/css/custom.css";
import {
  Col,
  Row,
  Card,
  Form,
  Image,
  Button,
  Spinner,
  Modal,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import data from "../../../api/AddCourse.js";
import submitClickIcon from "../../../assets/images/submitClick.svg";
import { useCategoryTitle } from "../../Utils/CategoryTitleContext.js";
import Edit_Ion1 from "../../../assets/images/edit_ion1.png";
import Delete_Ion1 from "../../../assets/images/delete_ion1.png";
import AddChapaterlesson from "../Course_Utils/AddChapterLesson.js";
import axios from "axios";
import { useLoader } from "../Loading/LoaderContext.js";

const AddCourse = () => {
  const {setLoading} = useLoader();
  const courseTitle = useCategoryTitle();
  console.log(courseTitle, "kkkkkkkkkkkkkkkk");

  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const [showdelete, setShowDelete] = useState(false);
  const [cardloading, setCardLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);

  const GetLastCourseLocalID = localStorage.getItem("getcourseID");

  const [subcatList, setSubcatList] = useState([]);
  const [selectedCat, setSelectedCat] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [getsubmitCourseID, setGetsubmitCourseID] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  console.log("form errorrrr", formErrors);

  const [getSubmitedcourse, setGetSubmitedCourse] = useState("");
  const jwtToken = localStorage.getItem("jwtToken");

  const [isEditMode, setIsEditMode] = useState(false);
  const [editCourseData, setEditCourseData] = useState({
    course_id: parseInt(localStorage.getItem("getcourseID")),
    course_name: "",
    course_desc: "",
    category_id: 0,
    subcategory_id: 0,
    course_image: null,
  });


  const handledeleteClose = () => {
    setShowDelete(false);
   
  };

  const handleClose = () => {
    setShow(false);
    setEditCourseData({
      course_id:'',
      course_name: "",
      course_desc: "",
      category_id: 0,
      subcategory_id: 0,
      course_image: null,
    });
  };

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

  const validateEditForm = () => {
    const errors = {};
    if (!editCourseData.course_name.trim()) {
      errors.course_name = "Please enter the course title.";
    } else if (
      editCourseData.course_name.trim() &&
      editCourseData.course_name.trim().length < 10
    ) {
      errors.course_name = "should be 10 character";
    }

    if (!editCourseData.course_desc.trim()) {
      errors.course_desc = "Please enter the course Description.";
    } else if (
      editCourseData.course_desc.trim() &&
      editCourseData.course_desc.trim().length < 20
    ) {
      errors.course_desc = "should be 20 character";
    }

    if (!editCourseData.category_id) {
      errors.category_id = "Please select a category";
    }

    if (editCourseData.category_id && !editCourseData.subcategory_id) {
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
            category_id: editCourseData.category_id
              ? editCourseData?.category_id
              : catogoryId,
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
    [jwtToken, editCourseData?.category_id]
  );

  useEffect(() => {
    const fetchData = async () => {
      await handleRadioClick();
    };

    fetchData();
  }, [jwtToken, handleRadioClick]);

  const handleSubmit = async () => {
    const isValid = validateForm();

    if (isValid) {
      setButtonLoading(true);
     
      try {
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
        setLoading(true);
        // navigate(0);
        // setButtonLoading(false);
        // setTimeout(() => {
        //   setButtonLoading(false);
        // }, 5000);
      } catch (err) {
        localStorage.clear();
        // setButtonLoading(false);
        console.error(err);
      } finally{

        // setLoading(false);
        setButtonLoading(false);
        
      }
      navigate(0);
      // setButtonLoading(false);
    } else {
      // Handle validation errors, e.g., display error messages
      console.log("Form validation failed");
    }

    console.log(getsubmitCourseID, "setID Okay");
    // await getsubmittedCourse();
  };

  useEffect(() => {
    // setLoading(true);
    setCardLoading(true);
    if (localStorage.getItem("getcourseID")) {
      const fetchData = async () => { 
        //  setLoading(true);
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
        // setLoading(false);
        setCardLoading(false);
        console.log("resdata", getres?.data[0]);
        // console.log(" resdata getstate",getSubmitedcourse);
      };
      fetchData();
      // setCardLoading(false);
      // setLoading(false);handleRadioClick
    }
  }, [jwtToken,setLoading]);


  const openEditModal = (courseData) => {
    setIsEditMode(true);
    setEditCourseData({
      ...editCourseData,
      course_id: parseInt(localStorage.getItem("getcourseID")),
      course_name: courseData.course_name,
      course_desc: courseData.course_desc,
      category_id: courseData.id,
      subcategory_id: courseData.subcategory_id,
      course_image: courseData.course_image,
    });
    setShow(true);
  };

  const handleInputEditChange = (e) => {
    const { name, value } = e.target;
    setEditCourseData({
      ...editCourseData,
      [name]: value,
    });

    // validateForm();
  };

  const handleImageEditChange = (e) => {
    const file = e.target.files[0];
    setEditCourseData({
      ...editCourseData,
      course_image: file,
    });

    if (file) {
      setImagePreview(URL.createObjectURL(file));
    } else {
      // Clear the preview if no image is selected
      setImagePreview(null);
    }
  };

  const handleEditSubmit = async () => {
    const isvalid = validateEditForm();

    if (isvalid) {
      setButtonLoading(true);
      console.log("courseUpdateStatus data", editCourseData)
      await axios
        .post(
          `${process.env.REACT_APP_BASE_URL}/updatecourse`,
            editCourseData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: jwtToken,
            },
          }
        )
        .then((response) => {
          console.log("courseUpdateStatus status",response?.data);
          if(response?.data?.code === 200){
            navigate(0);
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setButtonLoading(false);
        });
    }
  };


  ///delete course

  const handleCourseDeleteSubmit = async () => {
    setButtonLoading(true);
    // { console.log(deletelesson?.lesson_id, "ggggggggggggggggg")}
    await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/deletecourse`,
        {
          id: editCourseData?.course_id,
        },
        {
          headers: {
            Authorization: jwtToken,
          },
        }
      )
      .then((response) => {
        console.log(response.data,"courseDelete");
        localStorage.removeItem("getcourseID")
        navigate("/mycourse");
      })
      .catch((error) => {
        console.log(error, "courseDelete errors");
      })
      .finally(() => {
        // setButtonLoading(false);
      });
  };

  console.log(subcatList, " courseeee subcatSateData");
  console.log(getSubmitedcourse, "courseeee  submitedcpurse");
  console.log(editCourseData, "courseeee editsateCOURSE");
  console.log(getsubmitCourseID, "IDDDDDDDDDDDDDDDDDD");
  console.log("errorrrrr", formErrors);
  console.log(editCourseData, "courseeee editsateCOURSE");
  return (
    <>
      <div className="editModal">
        <Modal
          show={show}
          onHide={handleClose}
          animation={true}
          className="custome"
        >
          <Modal.Body>
            <div>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className="fw600 fz15">
                  Add Course Title <span style={{ color: "red" }}>*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="course_name"
                  className="bor_dark_purple br5 "
                  value={isEditMode ? editCourseData.course_name : ""}
                  onChange={handleInputEditChange}
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
                  className="bor_dark_purple br5"
                  style={{ minHeight: "50px" }}
                  value={editCourseData?.course_desc}
                  onChange={handleInputEditChange}
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
                      <Row>
                        <Col sm={12} style={{ display: "wrap" }}>
                          {courseTitle?.category?.map((category, index) => (
                            <Form.Check
                              id={category.id}
                              key={index}
                              type="radio"
                              label={category.category_name}
                              name="category_id"
                              checked={
                                editCourseData?.category_id === category.id
                              }
                              onClick={() => {
                                handleRadioClick(category.id);
                              }}
                              onChange={(e) => {
                                setEditCourseData((prevData) => ({
                                  ...prevData,
                                  category_id: category.id,
                                  subcategory_id: 0,
                                }));
                              }}
                            />
                          ))}
                        </Col>
                        {formErrors.course_id && (
                          <Form.Text className="text-danger">
                            {formErrors.course_id}
                          </Form.Text>
                        )}
                      </Row>
                    </Form.Group>
                  </fieldset>
                </div>
              </Form.Group>

              <div className="">
                <Col sm={12}>
                  <Form.Group
                    className="mb-3 w50 mw100"
                    controlId="formBasicEmail"
                  >
                    <Form.Label className="fw600 fz15">
                      Sub Category <span style={{ color: "red" }}>*</span>
                    </Form.Label>
                    <Form.Select
                      sm={12}
                      aria-label="Default select example"
                      className="br5 bor_dark_purple"
                      // defaultValue={getSubmitedcourse?.subcategory_id === subcatList.id}
                      name="subcategory_name"
                      value={editCourseData.subcategory_id}
                      // Select={editCourseData?.subcategory_id === subcatList.id || '0'}
                      onChange={(e) => {
                        setEditCourseData((prevData) => ({
                          ...prevData,
                          subcategory_id: parseInt(e.target.value),
                        }));
                      }}
                    >
                      <option
                        style={{ color: "#4c4c4c !important" }}
                        disabled
                        value={0}
                      >
                        &nbsp; Select Subcategory
                      </option>
                      {subcatList?.map((subCategory) => (
                        <option key={subCategory.id} value={subCategory.id}>
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
                </Col>

                <Col sm={12} className="custompos">
                  <Form.Group
                    className="mb-3 w40 marl10 mw100"
                    controlId="formBasicEmail"
                  >
                    <div>
                      <Form.Label className="fw600 fz14">
                        Add Thumbnail
                        <span className="light_black fz13"> (optional)</span>
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
                        onChange={handleImageEditChange}
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
                        imagePreview
                          ? imagePreview
                          : getSubmitedcourse?.course_image
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
                </Col>
              </div>
            </div>
          </Modal.Body>

          <Modal.Footer>
            <Button
              className=" w30 mart0 marb10 dark_purple_bg born fw400 fz16 pad10 br5 btn_color"
              onClick={handleEditSubmit}
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
              Submit
            </Button>
            <Button
              className="w30 mart0 marb10 born fw400 fz16 pad10 br5 btn_color marr20 cus_btn_new dark_purple"
              style={{ background: "transparent", color: "#6f3fba" }}
              onClick={handleClose}
            >
              Clear
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
            Are you sure to delete{" "}
            <span className="fw600">
             { getSubmitedcourse?.course_name} 
            </span>
            <span> with Chapters and lessons</span>
            
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary padl50 padr50 white_bg black h50 br5 fw600 fz18"
              onClick={handledeleteClose}
            >
              Cancel
            </Button>
            <Button
              variant="primary padl50 padr50 dark_purple_bg h50 br5 fw600 fz18 btn_color born"
            onClick={handleCourseDeleteSubmit}
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
                            className="bor_dark_purple br5"
                            // className={`bor_dark_purple br5 ${
                            //   formErrors.course_name ? "is-invalid" : ""
                            // }`}
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
                            className="bor_dark_purple br5"
                            // className={`bor_dark_purple br5 ${
                            //   formErrors.course_desc ? "is-invalid" : ""
                            // }`}
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
                                          setCourseFormData((prevData) => ({
                                            ...prevData,
                                            category_id: category?.id,
                                            subcategory_id: 0,
                                          }));
                                          handleRadioClick(category?.id);
                                        }}
                                        onChange={(e) => {
                                          setCourseFormData((prevData) => ({
                                            ...prevData,
                                            category_id: category?.id,
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
                                      
                                  value={0}
                                >
                                  &nbsp; Select Subcategory
                                </option>
                                {subcatList?.map((subCategory) => (
                                  <option
                                    key={subCategory?.id}
                                    value={subCategory?.id}
                                  >
                                    {subCategory?.subcategory_name}
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
              <p className="fw600 fz18 mart20 padb10">Added Course</p>
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
                    <div style={{ display: "flex" , justifyContent:"space-between"}}> 
                    <div className="bodyyy" style={{display:"flex", flexDirection:"row"}}>
                      <div
                        className=""
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent:"center",
                          width: "300px",
                          height: "150px",
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
                      </div>
                      <div style={{ display: "inline-flex" }}>
                        <Link className="icon-zoom">
                          <Image
                            src={Edit_Ion1}
                            className="marl5"
                            style={{ width: "20px" }}
                            // onClick={() => setShow(true)}
                            onClick={() => openEditModal(getSubmitedcourse)}
                          ></Image>
                        </Link>
                        <Link className="icon-zoom">
                          <Image
                            src={Delete_Ion1}
                            className="padl10"
                            style={{ width: "28px" }}
                            onClick={() => setShowDelete(true)}
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
        <AddChapaterlesson catgorySubcat={getSubmitedcourse} />
      </div>
    </>
  );
};

export default AddCourse;
