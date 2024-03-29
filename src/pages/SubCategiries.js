import React from "react";
import "../assets/css/global.css";
import "../assets/css/custom.css";
import { Col, Container, Image, Row } from "react-bootstrap";
// import data from "../api/SubCategiries.js";
import { Link } from "react-router-dom";
// import { useParams } from "react-router-dom";
// import axios from "axios";

const SubCategiries = ({data}) => {

// console.log(data, "dataaaaaaaaaaaaaaaaaa")
  return (
    <div>
      <Container>
      {/* {console.log(data, "comppp dataaaaaaaaaaaaaaaaaa")} */}
     
        <Col>
        {data &&
          <div className="text-center">
            <h1 className="fw700 fz36 mart20">{data?.categoryTitle}</h1>
            <p className="fz18 fw400">{data?.categoryTagName}</p>

            {(data?.subcategory?.length) ? (
            <Row  style={{display:"flex",justifyContent:"left", alignItems:"center"}}>
           
              {data?.subcategory.map((course) => (                
                <Col xxl={3} lg={4} md={6} sm={12} xs={12}  className="mart50 sub-cat" key={course?.id}  style={{display:"flex",justifyContent:"center", alignItems:"center"}}> 
                  <Link to={`/SubCategoriesCourse/${course?.id}`} className="w100" >
                    <div className="center_img posr ">
                      <p className="posa white pad15 ">{course?.subcategory_name}</p>
                     
                      <Image src={course?.banner_image_url} className="objfit" style={{width:"100%"}}  />
                     
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
