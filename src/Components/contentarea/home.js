import React from 'react';
import Header from '../header/header';
import OurCourse from './OurCourse';
import { RecentCourse } from './RecentCourse';
import LastView from './LastView';
import Footer from '../footer/footer';
import bgImage from '../../assets/images/learn_image.png';

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