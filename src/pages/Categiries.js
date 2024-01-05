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
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import { useLoader } from "../Components/Utils/Loading/LoaderContext";

const Categiries = () => {
  const {setLoading} = useLoader();
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
    setLoading(true);
      const jwtToken=localStorage.getItem("jwtToken");
      await axios
        .post(`${process.env.REACT_APP_BASE_URL}/lmsSubCategoryList`, {
          categoryid: id, 
        },
        {
          headers:{
            Authorization:jwtToken,
          },
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
        })
        .finally(() =>{
          setLoading(false);
        })
    };
    fetchData();
  }, [id, navigate,setLoading]);

 

  console.log(id, "oooo");
  console.log(subCat, "cattttttttttttttttttt");
  console.log(bgImg, "bg Imggggggggggggggggggggggggg");

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
        <SubCategiries data={bgImg} />
      <RecentCourse />
      <LastView />
      <Footer />
    </div>
  );
};

export default Categiries;
