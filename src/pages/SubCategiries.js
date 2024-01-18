import React from "react";
import "../assets/css/global.css";
import "../assets/css/custom.css";
import { Col, Container, Image, Row } from "react-bootstrap";
// import data from "../api/SubCategiries.js";
import { Link } from "react-router-dom";
// import { useParams } from "react-router-dom";
// import axios from "axios";

const SubCategiries = ({data}) => {

console.log(data, "dataaaaaaaaaaaaaaaaaa")
  return (
    <div>
      <Container>
      {console.log(data, "comppp dataaaaaaaaaaaaaaaaaa")}
     
        <Col>
        {data &&
          <div className="text-center">
            <h1 className="fw700 fz36 mart20">{data?.categoryTitle}</h1>
            <p className="fz18 fw400">{data?.categoryTagName}</p>

            {(data?.subcategory?.length) ? (
            <Row>
           
              {data?.subcategory.map((course) => (                
                <Col lg={3} md={4} className="mart50" key={course?.id}> 
                  <Link to={`/SubCategiriesCourse/${course?.id}`} style={{width:"310px", height:"165px"}}>
                    <div className="center_img posr ">
                      <p className="posa white pad15 ">{course?.subcategory_name}</p>
                     
                      <Image src={course?.banner_image_url} className="objfit "  />
                     
                    </div>
                  </Link>
                </Col>                
              ))}
            </Row>
            ) : (
              <Container
            style={{ display:"flex",alignItems:"center", justifyContent:"center", textAlign: "center", height: 230,padding:50  }}
          >
            <div
              style={{
                fontSize: 25,
                fontWeight: 600,
                color: "rgb(94, 94, 94)",
              }}
            >
              No course found{" "}
            </div>
          </Container>
            )}
          </div>
        }
        </Col>
        

        
      </Container>
    </div>
  );
};

export default SubCategiries;
