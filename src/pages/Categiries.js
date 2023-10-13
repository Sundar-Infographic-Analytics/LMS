import React, { useEffect, useState } from "react";
import "../assets/css/global.css";
import "../assets/css/custom.css";
import Header from "../Components/header/header";
import Navbar from "../Components/header/navbar";
import SubCategiries from "./SubCategiries";
// import bgImage from '../assets/images/cate.png';
import LastView from "../Components/contentarea/LastView";
import Footer from "../Components/footer/footer";
import { RecentCourse } from "../Components/contentarea/RecentCourse";
import { Container } from "react-bootstrap";
import axios from "axios";
import { useNavigate, useParams } from "react-router";

const Categiries = () => {
  const navigate = useNavigate();
  const [bgImg, setBgImg] = useState({
    categoryTitle: "",
    categoryTagName: "",
    categoryHeadImage: "",
    subcategory: [],
  });
  const [subCat, setSubCat] = useState([]);  
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async (e) => {
      await axios
        .post(`${process.env.REACT_APP_BASE_URL}/lmsSubCategoryList`, {
          categoryid: id,
        })
        .then(({data}) => {
          setBgImg(data);
          setSubCat(data.subcategory);
          console.log(data.subcategory, "xxxxxxxxxxxxxxxxxxx");
          console.log(data, "lllll");
        })
        .catch(({response}) => {          
          if (response.status === 400) {
            navigate('/')
          } else if (response.status === 401) {
            localStorage.clear();
          }
        });
    };
    fetchData();
  }, [id, navigate]);

 

  console.log(id, "oooo");
  console.log(subCat, "cattttttttttttttttttt");

  return (
    <div>
      <Navbar />      
      {console.log(bgImg.categoryHeadImage, "mmmmmmmmmmmmmmmmmmmm")}
      <Header
        style={bgImg.categoryHeadImage}
        text="Technology is bringing a massive wave of evolution for learning things in different ways."
        title1="Learn From"
        title2="Anywhere"
      />
      {subCat.length !== 0 ? (
        <SubCategiries />
      ) : (
        <>
          <Container
            style={{  textAlign: "center", height: 230,padding:50  }}
          >
            <div
              style={{
                fontSize: 25,
                fontWeight: 600,
                color: "rgb(94, 94, 94)",
              }}
            >
              Subcategory List is Empty{" "}
            </div>
          </Container>
        </>
      )}

      <RecentCourse />
      <LastView />
      <Footer />
    </div>
  );
};

export default Categiries;
