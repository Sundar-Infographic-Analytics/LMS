import React, { useEffect, useState } from 'react';
import '../assets/css/global.css';
import '../assets/css/custom.css';
import Header from '../Components/header/header';
import Navbar from '../Components/header/navbar';
import SubCategiries from './SubCategiries';
// import bgImage from '../assets/images/cate.png';
import LastView from '../Components/contentarea/LastView';
import Footer from '../Components/footer/footer';
import { RecentCourse } from '../Components/contentarea/RecentCourse';
import axios from 'axios';
import { useParams } from 'react-router';

const Categiries = () => {  
  const [bgImg,setBgImg] = useState([]);
  const {id} = useParams();

  useEffect(() =>{
    const fetchData = async (e) => {
     
       await axios
       .post(`${process.env.REACT_APP_BASE_URL}/lmsSubCategoryList`, {
        categoryid: id,
      })
       .then((response) =>{
        setBgImg(response.data)
       })
.catch((error) =>{
  localStorage.clear();
  console.log(error,'bgfetch');
})
    };
    fetchData();
  },[id])
console.log(id,'oooo')
  return (
    <div>
      <Navbar />
        <Header style={bgImg.categoryHeadImage} text='Technology is bringing a massive wave of evolution for learning things in different ways.' title1='Learn From' title2='Anywhere'/>
        <SubCategiries />
        <RecentCourse/>
        <LastView />
        <Footer />
    </div>
  )
}

export default Categiries