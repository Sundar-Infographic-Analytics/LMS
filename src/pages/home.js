import React from 'react';
import Header from '../Components/header/header';
import OurCourse from '../Components/contentarea/OurCourse';
import { RecentCourse } from '../Components/contentarea/RecentCourse';
import LastView from '../Components/contentarea/LastView';
import Footer from '../Components/footer/footer';
import bgImage from '../assets/images/learn_image.png';

const Home = () => {
  return (
    <>
   <Header style={bgImage} text='Technology is bringing a massive wave of evolution for learning things in different ways.' title1='Learn From' title2='Anywhere'/>
   <OurCourse />
   <RecentCourse />
   <LastView />
   <Footer />
   </>
  )
}

export default Home