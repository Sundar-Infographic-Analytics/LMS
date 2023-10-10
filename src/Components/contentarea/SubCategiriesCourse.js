import React from 'react'
import Header from '../header/header'
import SubCate from '../../assets/images/sub_cate_banner.png'
import { Col, Container, Row, Image } from 'react-bootstrap'
import data from '../../api/SubCategiriesCourse.js';
// import Rating from './rating/Rating';
import Footer from '../footer/footer';
import LastView from './LastView';
import { Link } from 'react-router-dom';
import Navbar from '../header/navbar';

const SubCategiriesCourse = () => {
  return (
    <div>
      <Navbar />
        <Header style={SubCate} text='Technology is bringing a massive wave of evolution for learning things in different ways.'title1='Web Development' />
        <Container>
          <Row className='mart30'>
            {
              data.map((course, index)=>
                <Col lg={3} className='marb20' key={index}>
                  <Link to={course.link} style={{textDecoration:'none',}} className='black fz16 fw400'>
                  <Image src={course.image} className='w100' />
                    <div className='border padt10 padr10 padl10 padb50'>
                      <p className='fw600 fz18 light_black marb5'>{course.title}</p>
                      <p className='fw400 fz15 light_black'>{course.desc}</p>
                    </div>
                  </Link>
                  {/* <div className='posr b45 l10'>
                    <Rating />
                  </div> */}
                </Col>
              )
            }
          </Row>
        </Container>
        <LastView />
        <Footer />
    </div>
  )
}

export default SubCategiriesCourse