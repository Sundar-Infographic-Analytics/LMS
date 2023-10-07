import React from "react";
import "../../assets/css/global.css";
import "../../assets/css/custom.css";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import data from "../../api/LastView.js";

const LastView = () => {
  return (
    <>
      <Container>
        <Row>
          <Col lg={12}>
            <h4 className="mart50 fw700 fz36">{data.title}</h4>
            <p className="fz18 fw400">{data.desc}</p>
          </Col>
        </Row>
        <Row className="mart40 padb40">
          {data.content.map((course) => (
            <Col lg="3" className="marb10">
              <div>
                
                  <Image
                    src={course.image}
                    className="w100"
                    style={{objectFit:"contain"}}
                  />
                
                <p className="fz16 fw400 padt10">{course.para}</p>
                <Button
                  className="fz16 padl30 padr30 dark_purple_bg bor_dark_purple br0 mart5 btn_color born"
                  src="link"
                >
                  {course.buttontxt}
                </Button>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default LastView;
