import React from "react";
import { Col, Row, Card, Image, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import data from "../../../api/AddCourse";
import img1 from "../../../assets/images/sub_cate_banner.png";

const CourseSubmitCard = ({CourseSubmitCardData}) => {
  return (
    <>
      {/* <Container> */}
        <Row className="mart30">
          <Col lg="12">
            <p className="fw600 fz18 mart20 padb10">Add Course</p>
            <Card style={{ boxShadow: "0 0 10px 5px #eee" }} className="born">
              <Card.Body>
                <div style={{ display: "flex" }}>
                  <div className="w90" style={{ display: "flex", alignItems: "center" }}>
                    <Image
                      src={CourseSubmitCardData?.course_image}
                      
                      className="w100 posr mw100 objfit"
                      style={{ justifyContent: "center", alignItems: "center" }}
                    ></Image>
                  </div>
                  <div className="pad20">
                    <p
                      className="fw300 fz18 "
                      style={{ color: "#a0a0a0", fontSize: "15px" }}
                    >
                      {CourseSubmitCardData?.category_name} / {CourseSubmitCardData?.subcategory_name}
                    </p>
                    <p className="fw600 fz18 marb10">
                      {
                        CourseSubmitCardData?.course_name
                      }
                    </p>
                    <p className="fw300 fz15" style={{ color: "#515151" }}>
                      {CourseSubmitCardData?.course_desc}
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
            </Card>
          </Col>
        </Row>
      {/* </Container> */}
    </>
  );
};

export default CourseSubmitCard;
