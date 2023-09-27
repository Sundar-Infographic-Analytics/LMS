import React from 'react';
import '../../assets/css/global.css';
import '../../assets/css/custom.css';
import Header from '../header/header';
import SubCategiries from '../contentarea/SubCategiries';
import bgImage from '../../assets/images/cate.png';
import LastView from './LastView';
import Footer from '../footer/footer';
const Categiries = () => {
  return (
    <div>
        <Header style={bgImage} text='Technology is bringing a massive wave of evolution for learning things in different ways.' title1='Learn From' title2='Anywhere'/>
        <SubCategiries />
        <LastView />
        <Footer />
    </div>
  )
}

export default Categiries