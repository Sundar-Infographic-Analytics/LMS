import React from 'react';
import '../assets/css/global.css';
import '../assets/css/custom.css';
import Header from '../Components/header/header';
import Navbar from '../Components/header/navbar';
import SubCategiries from './SubCategiries';
import bgImage from '../assets/images/cate.png';
import LastView from '../Components/contentarea/LastView';
import Footer from '../Components/footer/footer';

const Categiries = () => {  
  return (
    <div>
      <Navbar />
        <Header style={bgImage} text='Technology is bringing a massive wave of evolution for learning things in different ways.' title1='Learn From' title2='Anywhere'/>
        <SubCategiries />
        <LastView />
        <Footer />
    </div>
  )
}

export default Categiries