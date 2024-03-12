import React, { useEffect, useRef, useMemo } from "react";
import { useState } from "react";
import "../assets/css/global.css";
import "../assets/css/custom.css";
import "../assets/css/variable.css";
import {
  Button,
  Col,
  Container,
  Row,
  Modal,
  Form,
  Spinner,
} from "react-bootstrap";
import Navbar from "../Components/header/navbar";

import { Image } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

import EditIcon from "../assets/images/edit_ion.png";
import DeleteIcon from "../assets/images/delete_ion.png";
import DataTable from "react-data-table-component";
import FilterComponent from "../Components/Utils/CourseFilter.js";
import eye from "../assets/images/eye.png";
import { useCategoryTitle } from "../Components/Utils/CategoryTitleContext";
import axios from "axios";
import { useLoader } from "../Components/Utils/Loading/LoaderContext.js";

const closebtn = {
  width: "20px",
  height: "20px",
  borderRadius: "50px",
  justifyContent: "center",
  cursor: "pointer",
};
const SubCategiriesAdd = () => {
  const { setLoading } = useLoader();
  const courseTitle = useCategoryTitle();
  const navigate = useNavigate();

  const handleShow = () => {
    setSubCategory({
      categorySelect: "0",
      subCategoryInput: "",
      bannerImg: null,
    });
    setError("");
    setShow(true);
  };

  const fileInputRef = useRef(null);
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const [subCategory, setSubCategory] = useState({
    categorySelect: "",
    subCategoryInput: "",
    bannerImg: null,
  });

  const [editedSubCategory, setEditedSubCategory] = useState({
    categorySelect: "0",
    subCategoryInput: "",
    bannerImg: null,
  });

  const handledeleteClose = () => {
    setShowDeleteModal(false);
  };
  const allowedTypes = ["image/jpeg","image/jpg", "image/png","image/svg"];
  const [previewSubCatIMG, setPreviewSubCatIMG] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [showdeleteModal, setShowDeleteModal] = useState(false);
  const [deleteSubcat, setDeleteSubcat] = useState("");

  const [error, setError] = useState({});
  const [filterText, setFilterText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const [allSubcategory, setAllSubcategory] = useState([]);

  const [show, setShow] = useState(false);
  const MAX_FILE_SIZE = 500 * 1024;
  const [isLoading, setIsLoading] = useState(false);

  // const [getSubCatID, setGetSubCatID]= useState('');

  const handleClose = () => {
    setShow(false);

    setSubCategory({
      categorySelect: "",
      subCategoryInput: "",
      bannerImg: null,
    });

    setError("");
    setEditedSubCategory({
      categorySelect: "0",
      subCategoryInput: "",
      bannerImg: null,
    });
    setEditMode(false);
  };

  const validation = async () => {
    const error = {};
    console.log("HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH");

    if (subCategory?.categorySelect === "0") {
      error.categorySelect = "Please select category";
    }
    if (
      subCategory?.bannerImg === null ||
      !(subCategory?.bannerImg instanceof File)
    ) {
      error.bannerImg = "Upload banner for subcategory";
    }

    if (subCategory?.bannerImg) {
      if (subCategory?.bannerImg?.size > MAX_FILE_SIZE) {
        error.bannerImg = " Filesize exceeds 500KB";
      }
      if(!allowedTypes.includes(subCategory?.bannerImg?.type)){
        error.bannerImg = "Only JPEG, JPG, PNG, SVG";
      }
    }
    // console.log("conditionsnew", (subCategory?.subCategoryInput.trim())&&subCategory?.subCategoryInput?.trim().length )
    if (!subCategory?.subCategoryInput.trim()) {
      error.subCategoryInput = "Enter Subcategory";
      // console.log("conditions111")
    } else if (subCategory?.subCategoryInput.trim() && subCategory?.subCategoryInput?.trim().length <=6) {
      // console.log("conditions",subCategory?.subCategoryInput.trim() && subCategory?.subCategoryInput?.trim().length >=10 )
      error.subCategoryInput = "Must have at least 6 characters";
      // console.log("conditions222")
    }
    setError(error);
    // console.log(
    //   Object.keys(error).length === 0,
    //   "Object.keys(error).length === 0"
    // );
    return Object.keys(error).length === 0;
  };

  const Editvalidation = async () => {
    const error = {};

    // console.log("");

    if (editedSubCategory?.categorySelect === "0") {
      error.categorySelect = "Please select category";
    }

    if (editedSubCategory?.bannerImg) {
      if (editedSubCategory?.bannerImg?.size > MAX_FILE_SIZE) {
        error.bannerImg = "Filesize exceeds 500KB";
      }
      if(editedSubCategory?.bannerImg?.name){
        if(!allowedTypes.includes(editedSubCategory?.bannerImg?.type)){
          error.bannerImg = "Only JPEG, JPG, PNG, SVG";
        }
      }
      
    }

    if (!editedSubCategory?.subCategoryInput.trim()) {
      error.subCategoryInput = "Enter Subcategory";
    } else if (editedSubCategory?.subCategoryInput.trim() && editedSubCategory?.subCategoryInput?.trim().length <=6) {
      // console.log("conditions",subCategory?.subCategoryInput.trim() && subCategory?.subCategoryInput?.trim().length >=10 )
      error.subCategoryInput = "Must have at least 6 characters";
      // console.log("conditions222")
    }

    setError(error);
    return Object.keys(error).length === 0;
  };

  // console.log(subCategory, "subCategory onchange");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = await validation();

    console.log("subcatttttttttttttttttt isvalid", isValid);

    if (isValid) {
      setIsLoading(true);
      const jwtToken = localStorage.getItem("jwtToken");

      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/addsubcategory`,
        subCategory,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: jwtToken,
          },
        }
      );
      console.log("Subcategory created:", response?.data);

      setSubCategory({
        categorySelect: "",
        bannerImg: null,
        subCategoryInput: "",
      });
      setError("");
      setIsLoading(false);
      handleClose();
      navigate(0);
    } else {
      setIsLoading(false);
      console.log("Form validation failed");
      return false;
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "bannerImg") {
    }
    setSubCategory({
      ...subCategory,
      [name]: name === "bannerImg" ? files[0] : value,
    });
  };

  //table

  useEffect(() => {
    const fetchSubcategoryList = async () => {
      setLoading(true);
      try{
        const response = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/subcategory`,
          null,
          {
            headers: {
              Authorization: localStorage.getItem("jwtToken"),
            },
          }
        );
        setAllSubcategory(response?.data?.results);
      }catch(error){
        localStorage.clear();
        navigate(0)
        console.error("Error fetching courses:", error);
      }finally{
        setLoading(false);
      }
<<<<<<< HEAD
=======
      
      
      
>>>>>>> 32674ed (STAGING)
    };
    fetchSubcategoryList();
  }, [setLoading,navigate]);

  const columns = [
    {
      name: "SI. No",
      selector: (row, index) => index + 1,
      width: "6%",
      sortable: false,
    },
    {
      name: "Subcategory",
      selector: (row) => row.subcategory_name,
      sortable: true,
      style: {
        whiteSpace: "normal !important", // Set whiteSpace to 'normal' for wrapping
      },
      width: "30%",
      // cell: row => <div className="wrap-content">{row.course_title}</div>,
    },
    {
      name: "Category",
      selector: (row) => row.category_name,
      sortable: true,
      width: "10%",
    },
    {
      name: "Total course",
      selector: (row) => row.course_count,
      sortable: true,
      width: "10%",
    },
    {
      name: "Banner",
      cell: (row) => (
        <img
          src={row.banner_path}
          alt="Thumbnail"
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
            width: "100px",
            height: "50px",
            margin: "5px 5px 5px 0",
          }}
        />
      ),
      selector: (row) => row.banner_path,
      sortable: true,
      width: "10%",
    },
    {
      name: "View subcategory",
      width: "17%",
      // selector
      cell: (row) => (
        <>
          {/* <div>{console.log(row, 'check superadmin linkClick')}</div> */}
          <Link
            to={`/SubCategoriesCourse/${row?.subcategory_id}`}
            style={{ textDecoration: "none" }}
            className="view-btn"
          >
            View
          </Link>
        </>
      ),
    },

    {
      name: "Action",
      sortable: true,
      width: "12%",
      cell: (row) => (
        <>
       {/* { console.log("row subcat", row)} */}
          <div className="dif">
            <Image
            title="Edit"
              src={EditIcon}
              className="img_action"
              style={{ cursor: "pointer" }}
              alt="Edit"
              onClick={() => {handleEditClick(row) ; setPreviewSubCatIMG(row?.banner_path)}}
            />

            <Image
           title={row?.course_count !== 0 ? "Subcategory having courses" :"Delete"}
              src={DeleteIcon}
              className="img_action"
              style={{ cursor:row?.course_count !== 0 ? "not-allowed" :"pointer", opacity:row?.course_count !== 0 ? "0.5" :"1" , marginLeft: "10px" }}
              alt="Delete"
              onClick={() => { if(row.course_count === 0) {
                setShowDeleteModal(true);
                handleSubCatDeleteClick(row);
              }
               
              }}
            />
          </div>
        </>
      ),
    },
  ];

  const conditionalRowStyles = [
    {
      when: (row) => row.indexes % 2 !== 0, // Check if the row is odd fromapi response
      style: {
        backgroundColor: "#FCFAFF",
      },
    },
  ];

  // filter Data Start
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    // setFilterText("");
  };

  const filteredItems = allSubcategory.filter(
    (item) =>
      (!selectedCategory || item.category_name === selectedCategory) &&
      ((item.subcategory_name &&
        item.subcategory_name
          .toLowerCase()
          .includes(filterText.toLowerCase())) ||
        (item.category_name &&
          item.category_name.toLowerCase().includes(filterText.toLowerCase())))
  );

  const subHeaderComponentMemo = useMemo(() => {
    const handleClear = () => {
      if (filterText || selectedCategory) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
        setSelectedCategory("");
      }
    };

    return (
      <FilterComponent
        onFilter={(e) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
        categoryOptions={courseTitle?.category || []}
        onCategoryChange={handleCategoryChange}
        selectedCategory={selectedCategory}
      />
    );
  }, [
    filterText,
    resetPaginationToggle,
    courseTitle?.category,
    selectedCategory,
  ]);

  const paginationComponentOptions = {
    // rowsPerPageText: 'Filas por página',
    // rangeSeparatorText: 'de',
    selectAllRowsItem: true, 
    selectAllRowsItemText: "All",
  };

  //editttttttttttttttt

  const handleEditClick = (row) => {
    // console.log("edit clicked row", row);

    setEditMode(true);
    setEditedSubCategory({
      ...editedSubCategory,
      categorySelect: row?.category_id,
      subCategoryInput: row?.subcategory_name,
      bannerImg: row?.banner_path,
      subcategory_id: row?.subcategory_id,
    });
    handleShow(); // Open the modal for editing
  };

  const handleEditsubcatSubmit = async (e) => {
    e.preventDefault();
    const isvalid = await Editvalidation();
    if (isvalid) {
      setIsLoading(true);
      await axios
        .post(
          `${process.env.REACT_APP_BASE_URL}/updatesubcategory`,
          editedSubCategory,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: localStorage.getItem("jwtToken"),
            },
          }
        )
        .then((response) => {
          console.log(response.data, "courseUpdate");
          navigate(0);
        })
        .catch((error) => {
          console.log(error, "courseUpdate errors");
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      console.log("courseUpdate errors");
    }
  };
  // const openEditModal = (courseData) => {
  //   setIsEditMode(true);
  //   setEditCourseData({
  //     ...editCourseData,
  //     course_id: parseInt(localStorage.getItem("getcourseID")),
  //     course_name: courseData.course_name,
  //     course_desc: courseData.course_desc,
  //     category_id: courseData.id,
  //     subcategory_id: courseData.subcategory_id,
  //     course_image: courseData.course_image,
  //   });
  //   setShow(true);
  // };

  //delete
  const handleSubCatDeleteClick = (subcatData) => {
    // setDeleteSubcat({
    //   ...deleteSubcat,
    //   id:subcatData?.subcategory_id
    // });
    setDeleteSubcat(subcatData);
    console.log(subcatData, "deleteData");
  };

  const handleDeleteSubmit = async () => {
    setIsLoading(true);
    // { console.log(deletelesson?.lesson_id, "ggggggggggggggggg")}
    await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/deletesubcategory`,
        {
          id: deleteSubcat?.subcategory_id,
        },
        {
          headers: {
            Authorization: localStorage?.getItem("jwtToken"),
          },
        }
      )
      .then((response) => {
        console.log(response.data, "subcatDelete");
        navigate(0);
        // setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error, "subcatDelete errors");
      })
      .finally(() => {
        // setIsLoading(false);
      });
  };

  // console.log(subCategory, "subcatttttttttttttttttt");
  // console.log(allSubcategory, "all sub");
  // console.log(courseTitle, "all sub courseTitle");
  // console.log(selectedCategory, ".....all sub selectedCategory");
  // console.log(editMode, ".....edit editmode");
  // console.log(editedSubCategory, ".....edit subcatedit");
  // console.log(deleteSubcat, "deleteData setData");
  // console.log(previewSubCatIMG, "previewSubCatIMG setData");
  return (
    <div>
      <div className="delete modal">
        <Modal
          show={showdeleteModal}
          onHide={handledeleteClose}
          style={{ margin: "0px" }}
        >
          <Modal.Header closeButton className="logout-modal">
            <Modal.Title className="fw500">Confirmation!!!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure to delete{" "}
            <span className="fw600">{deleteSubcat?.subcategory_name}</span>
            {/* <span> subcategory</span> */}
          </Modal.Body>
          <Modal.Footer className=" sucat-footer">
            <Button
              variant="secondary padl50 padr50 white_bg black h50 br5 fw600 fz18"
              onClick={handledeleteClose}
            >
              Cancel  
            </Button>
            <Button
              variant="primary padl50 padr50 dark_purple_bg h50 br5 fw600 fz18 btn_color born"
              onClick={handleDeleteSubmit}
              disabled={isLoading}
            >
              {isLoading && (
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
      <div>
        <Modal show={show} onHide={handleClose}>
          <Form
            onSubmit={(e) =>
              editMode ? handleEditsubcatSubmit(e) : handleSubmit(e)
            }
          >
            <Modal.Header
              onClick={handleClose}
              className="fr born white_bg fw600 fz16 pad15 posa r10 top15"
              style={closebtn}
            >
              x
            </Modal.Header>
            <Modal.Body>
              <Row>
                <Col lg={6}>
                  <Form.Group as={Col} controlId="categorySelect">
                    <Form.Label className="fw600 fz16">
                      Category{" "}
                      <span style={{ color: "red", fontSize: "18px" }}>*</span>
                    </Form.Label>
                    <Form.Select
                      name="categorySelect"
                      // defaultValue="0"
                      className="h50 light_black bor2"
                      value={
                        editMode
                          ? editedSubCategory?.categorySelect
                          : subCategory?.categorySelect || "0"
                      }
                      onChange={(e) => {
                        editMode
                          ? setEditedSubCategory({
                              ...editedSubCategory,
                              categorySelect: parseInt(e.target.value),
                            })
                          : handleChange(e);
                      }}
                    >
                      <option disabled value={0}>
                        Select Category
                      </option>
                      {courseTitle?.category?.map((category) => (
                        <option
                          value={category.id}
                          className="black"
                          key={category.id}
                        >
                          {category.category_name}
                        </option>
                      ))}
                    </Form.Select>
                    {error.categorySelect && (
                      <Form.Text className="text-danger">
                        {error.categorySelect}
                      </Form.Text>
                    )}
                  </Form.Group>
                </Col>
                <Col lg={6}>
                  <Form.Group className="mb-3" controlId="bannerImg">
                    <Form.Label className="fw600">
                      Add Banner{" "}
                      <span style={{ fontSize: "10px" }}>{"( < 500KB )"}</span>
                      <span style={{ color: "red", fontSize: "18px" }}> *</span>
                    </Form.Label>
                    <div className="posr">
                      <Link>
                        <Image
                          src={eye}
                          className="posa"
                          style={{
                            zIndex: "1",
                            right: "10px",
                            top: "10px",
                          }}
                        ></Image>
                      </Link>
                      <Form.Control
                        name="bannerImg"
                        type="file"
                        accept=".png, .jpeg, .jpg, .webp, .svg"
                        className="bor_dark_purple br5 padl10  "
                        style={{ position: "relative",paddingRight:40}}
                        ref={fileInputRef}
                        onChange={ async (e) => {
                          const file = e.target.files[0];
                          editMode
                            ?

                            setEditedSubCategory({
                                ...editedSubCategory,
                                bannerImg: file,
                              })
                            :

                          handleChange(e);
                          handleButtonClick(e);
                        }}
                      />
                    </div>
                    {editMode && (
                      <a
                        target="_blank"
                        rel="noreferrer"
                        href={previewSubCatIMG}
                        className="mt-2"
                      >
                        View previous Thumbnail
                      </a>
                    )}
                      <div>
                    {error.bannerImg && (
                      <Form.Text className="text-danger">
                        {error.bannerImg}
                      </Form.Text>
                    )}
                   </div>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col lg={12}>
                  {/* <Form> */}
                  <Form.Group className="mb-3" controlId="subCategoryInput">
                    <Form.Label className="fw600">
                      Subcategory{" "}
                      <span style={{ color: "red", fontSize: "18px" }}>*</span>
                    </Form.Label>
                    <Form.Control
                      name="subCategoryInput"
                      placeholder="Enter Subcategory"
                      className="h50 white_bg bor2"
                      value={
                        editMode
                          ? editedSubCategory?.subCategoryInput
                          : subCategory.subCategoryInput
                      }
                      onChange={(e) =>
                        editMode
                          ? setEditedSubCategory({
                              ...editedSubCategory,
                              subCategoryInput: e.target.value,
                            })
                          : handleChange(e)
                      }
                    />
                    {error.subCategoryInput && (
                      <Form.Text className="text-danger">
                        {error.subCategoryInput}
                      </Form.Text>
                    )}
                  </Form.Group>
                  {/* </Form> */}
                </Col>
              </Row>
            </Modal.Body>

            <Modal.Footer style={{ justifyContent: "center" }} className="born sucat-footer">
              
              <Button
                variant="secondary"
                onClick={handleClose}
                className="padl50 padr50 white_bg black h50 br5 fw600 fz18"
                style={{
                  flex: "1",
                  border: "1px solid #6f3fba",
                  color: "#6f3fba",
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                className="padl50 padr50 dark_purple_bg h50 br5 fw600 fz18 btn_color born"
                style={{ flex: "1" }}
                disabled={isLoading}
              >
                {isLoading && (
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    style={{ marginRight: "5px" }}
                  />
                )}
                {editMode ? "Edit " : "Add"}
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </div>
      <Navbar className="dark_purple_bg" />
      <Container fluid>
        <Row className="mart50 marb20">
          <Col lg={6} className="filter-containern">
            <div style={{ display: "flex", alignItems: "end", height: "100%" }}>
              <div className="filter-container">
                <FilterComponent
                  onFilter={(e) => setFilterText(e.target.value)}
                  onClear={() => setFilterText("")}
                  filterText={filterText}
                  categoryOptions={courseTitle?.category || []}
                  onCategoryChange={handleCategoryChange}
                  selectedCategory={selectedCategory}
                  className  ="mbl-text"
                  placeholderTxt={
                    "Filter by Subcategory name (or) Category name"
                  }
                />
              </div>
            </div>
          </Col>
          <Col
            lg={6}
            style={{
              display: "flex",
              justifyContent: "end",
              alignItems: "flex-end",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "end",
                alignItems: "flex-end",
              }}
            >
              <Button
                className="dark_purple_bg padl50 padr50 fz18 br0 mart30  fr marr30 bor_dark_purple btn_color born"
                style={{ borderRadius: "5px" }}
                onClick={handleShow}
              >
                + Add
              </Button>
            </div>
          </Col>
        </Row>
        <div className="rdt_Table">
          <DataTable
            pagination
            columns={columns}
            data={filteredItems}
            subHeaderComponent={subHeaderComponentMemo}
            conditionalRowStyles={conditionalRowStyles}
            paginationComponentOptions={paginationComponentOptions}
          />
        </div>
      </Container>
    </div>
  );
};

export default SubCategiriesAdd;
