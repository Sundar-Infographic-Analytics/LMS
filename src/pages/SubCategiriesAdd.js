import React, { useRef } from "react";
import { useState } from "react";
import "../assets/css/global.css";
import "../assets/css/custom.css";
import {
  Button,
  Col,
  Container,
  Row,
  Table,
  Pagination,
  Dropdown,
  Modal,
  Form,
} from "react-bootstrap";
import Navbar from "../Components/header/navbar";
import data from "../api/SubCategiriesAdd.js";
import { Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import next_ion from "../assets/images/next_ion.png";
import prev_ion from "../assets/images/prev_ion.png";
import first_ion from "../assets/images/first_ion.png";
import last_ion from "../assets/images/last_ion.png";
import eye from "../assets/images/eye.png";
import { useCategoryTitle } from "../Components/Utils/CategoryTitleContext";
import axios from "axios";
const closebtn = {
  width: "20px",
  height: "20px",
  borderRadius: "50px",
  justifyContent: "center",
  cursor: "pointer",
};
const SubCategiriesAdd = () => {
  const courseTitle = useCategoryTitle();

  const handleShow = () => {
    setSubCategory({
      categorySelect: "",  
      subCategoryInput: "",
      bannerImg: null,
    });
    setError("")
    setShow(true);
  }

  const fileInputRef = useRef(null);
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const [subCategory, setSubCategory] = useState({
    categorySelect: "",
    subCategoryInput: "",
    bannerImg: null,
  });

  const [error, setError] = useState("");

  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(subCategory, 'subCategory');

    if (
      !subCategory.categorySelect ||
      !subCategory.subCategoryInput ||
      !subCategory.bannerImg
    ) {
      setError("All fields are required.");
      return;
    }

    try {
      // Send a POST request to your API endpoint
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/lmsAddsubcategory`,
        subCategory,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Subcategory created:", response.data);

      handleClose();

      setSubCategory({
        categorySelect: "",
        bannerImg: null,
        subCategoryInput: "",
      });
      setError("");
    } catch (err) {
      // Handle errors (e.g., show an error message)
      setError("Error creating subcategory.");
      console.error(err);
    }
  };
  
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setSubCategory({
      ...subCategory,
      [name]: name === "bannerImg" ? files[0] : value,
    });
  };

  return (
    <div>
      <div>
        <Modal show={show} onHide={handleClose}>
        <Form onSubmit={handleSubmit}>
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
                {/* <Form onSubmit={handleSubmit}> */}
                  <Form.Group as={Col} controlId="categorySelect">
                    <Form.Label className="fw600 fz16">
                      Category{" "}
                      <span style={{ color: "red", fontSize: "18px" }}>*</span>
                    </Form.Label>
                    <Form.Select
                      name="categorySelect"
                      defaultValue="Select Category"
                      className="h50 light_black bor2"
                      value={subCategory.categorySelect}
                      onChange={handleChange}
                    >
                      <option disabled>Select Category</option>
                      {courseTitle.map((category) => (
                       
                        <option value={category.id} className="black" key={category.id}>
                          {category.category_name}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                {/* </Form> */}
              </Col>
              <Col lg={6}>
                {/* <Form> */}
                  <Form.Group className="mb-3" controlId="bannerImg">
                    <Form.Label className="fw600">
                      Add Banner{" "}
                      <span style={{ color: "red", fontSize: "18px" }}> *</span>
                    </Form.Label>
                    <div className="d-flex align-items-center">
                      <button
                      type="button"
                        className="btn bg-white h50 light_black bor2 "
                        onClick={handleButtonClick}
                      >
                        Browse Image
                        <img
                          src={eye}
                          alt="Upload Icon"
                          width="24"
                          height="24"
                          className="marl10"
                        />{" "}
                      </button>
                      <Form.Control
                        name="bannerImg"
                        type="file"
                        className="d-none"
                        ref={fileInputRef}
                        onChange={handleChange}
                        // value={subCategory.bannerImg ? subCategory.bannerImg.name : ''}
                        // Add any additional file input attributes or event handlers here
                      />
                    </div>
                    {/* <Image src={eye} className='posr fr top50 r5'></Image>
                <Form.Control type="file" className='h50 bor2 ' /> */}
                  </Form.Group>
                {/* </Form> */}
              </Col>
            </Row>
            <Row>
              <Col lg={12}>
                {/* <Form> */}
                  <Form.Group className="mb-3" controlId="subCategoryInput">
                    <Form.Label className="fw600">
                      Sub Category{" "}
                      <span style={{ color: "red", fontSize: "18px" }}>*</span>
                    </Form.Label>
                    <Form.Control
                      name="subCategoryInput"
                      placeholder="Enter Sub Category"
                      className="h50 white_bg bor2"
                      value={subCategory.subCategoryInput}
                      onChange={handleChange}
                    />
                  </Form.Group>
                {/* </Form> */}
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer style={{ justifyContent: "center" }} className="born">
          {error && <p className="text-danger">{error}</p>}
            <Button
              type="submit"
              variant="primary"
              onClick={handleClose}
              className="padl50 padr50 dark_purple_bg h50 br5 fw600 fz18 btn_color born"
              style={{ flex: "1" }}
            >
              Add
            </Button>
            <Button
              variant="secondary"
              onClick={handleClose}
              className="padl50 padr50 white_bg black h50 br5 fw600 fz18"
              style={{ flex: "1" }}
            >
              Cancel
            </Button>
          </Modal.Footer>
          </Form>
        </Modal>
      </div>
      <Navbar className="dark_purple_bg" />
      <Container fluid>
        <Row>
          <Col lg={12}>
            <Button
              className="dark_purple_bg padl50 padr50 fz18 br0 mart30 marb30 fr marr30 bor_dark_purple btn_color born"
              style={{ borderRadius: "5px" }}
              onClick={handleShow}
            >
              + Add
            </Button>
          </Col>
        </Row>
        <Row>
          <Col lg={12}>
            <Table striped responsive="sm" className="lmstbl">
              <thead>
                <tr>
                  <th style={{ borderTopLeftRadius: "10px" }}>
                    {data.idNumber}
                  </th>
                  <th>{data.subTitle}</th>
                  <th>{data.maincategory}</th>
                  <th>{data.bannertitle}</th>
                  <th width="100px" style={{ borderTopRightRadius: "10px" }}>
                    {data.action}
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.content.map((course) => (
                  <tr className="lh30">
                    <td key={course.id}>{course.id}</td>
                    <td className="fw400 fz16 light_black">
                      <Image
                        src={course.image}
                        className="marr10"
                        style={{ width: "35px" }}
                      />
                      {course.sub}
                    </td>
                    <td>{course.main}</td>
                    <td>
                      <Link className="border dif padt5 padr20 padb5 padl20 black tdn white_bg btn_color br5">
                        {course.bannerbtn}
                      </Link>
                    </td>
                    <td>
                      <div className="dif">
                        <Link className="padl20 padr20">
                          <Image src={course.edit_img} className="img_action" />
                        </Link>
                        <Link className="padl20 padr20">
                          <Image
                            src={course.delete_img}
                            className="img_action"
                          />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
        <div className="light_purple_bg">
          <Row>
            <Col lg={6}>
              <div className="pad20 dif">
                <p className="lh30">Items per page</p>
                <Dropdown>
                  <Dropdown.Toggle
                    variant="default"
                    id="dropdown-basic"
                    style={{
                      borderRadius: "0",
                      background: "#fff",
                      border: "1px solid #000",
                    }}
                    className="marr10 marl10"
                  >
                    25
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">50</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">100</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">200</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <p className="lh35">1-25 of 100 items</p>
              </div>
            </Col>
            <Col lg={6}>
              <div className="fr dif pad20">
                <Pagination style={{ marginBottom: "0" }}>
                  <Pagination.Item>
                    <Image
                      src={first_ion}
                      className="marr5 posr"
                      style={{ bottom: "1px" }}
                    ></Image>
                  </Pagination.Item>
                  <Pagination.Item>
                    <Image
                      src={prev_ion}
                      className="marr10 posr"
                      style={{ bottom: "1px" }}
                    ></Image>
                    {"Back"}
                  </Pagination.Item>
                  <Pagination.Item className="padination_active">
                    {3}
                  </Pagination.Item>
                  <Pagination.Item className="black">{"of"}</Pagination.Item>
                  <Pagination.Item>{4}</Pagination.Item>
                  <Pagination.Item>
                    {"Next"}
                    <Image
                      src={next_ion}
                      className="marl10 posr"
                      style={{ bottom: "1px" }}
                    ></Image>
                  </Pagination.Item>
                  <Pagination.Item>
                    <Image
                      src={last_ion}
                      className="marl5 posr"
                      style={{ bottom: "1px" }}
                    ></Image>
                  </Pagination.Item>
                </Pagination>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default SubCategiriesAdd;
