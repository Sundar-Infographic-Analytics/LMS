import React, { useState, useEffect } from "react";
import "../assets/css/global.css";
import "../assets/css/custom.css";
import { Col, Container, Image, Row } from "react-bootstrap";
// import data from "../api/SubCategiries.js";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";

const SubCategiries = () => {
  const { id } = useParams();
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      // e.preventDefault();
      await axios
        .post(`${process.env.REACT_APP_BASE_URL}/lmsSubCategoryList`, {
          categoryid: id,
        })
        .then((response) => {
          console.log(response.data, "sd");
          setData(response.data);
        })
        .catch((error) => {
          localStorage.clear();
          console.log(error);
        })
        
    };
    fetchData();
  }, [id]);
  return (
    <div>
      <Container>
        <Col>
        {data &&
          <div className="text-center">
            <h1 className="fw700 fz36 mart20">{data?.categoryTitle}</h1>
            <p className="fz18 fw400">{data?.categoryTagName}</p>
            <Row>
           
              {data?.subcategory.map((course) => (                
                <Col lg={3} className="mart50 " key={course?.id}> 
                  <Link to={`/SubCategiriesCourse/${course?.id}`}>
                    <div className="center_img posr ">
                      <p className="posa white pad15">{course?.subcategory_name}</p>
                     
                      <Image src={course?.banner_image_url} className="objfit "  />
                     
                    </div>
                  </Link>
                </Col>                
              ))}
            </Row>
          </div>
        }
        </Col>
      </Container>
    </div>
  );
};

export default SubCategiries;
