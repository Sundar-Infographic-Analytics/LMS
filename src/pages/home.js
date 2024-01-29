import React from 'react';
import Header from '../Components/header/header';
import Navbar from '../Components/header/navbar';
import OurCourse from '../Components/contentarea/OurCourse';
import { RecentCourse } from '../Components/contentarea/RecentCourse';
import LastView from '../Components/contentarea/LastView';
import Footer from '../Components/footer/footer';
import bgImage from '../assets/images/learn_image.png';

const Home = () => {
  
  return (
    <>
    <Navbar />
    <Header style={bgImage} text="Fuel your ambitions with today's lessons for future leadership." title1='LEARNING TODAY, ' title2='LEADING TOMORROW'/>
    <OurCourse />
    <RecentCourse />
    <LastView />
    <Footer />
   </>
  )
}

export default Home;