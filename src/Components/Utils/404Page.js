import React from 'react'
import { Col, Row,Image, Button } from 'react-bootstrap';
import IMG from '../../assets/images/404page.png'
import { Link } from 'react-router-dom';

const errorpage = () => {
  return (
    <div style={{width:"100%", height:"100vh", background:"#E9FCFF"}} className='vmiddle'>
    <Row className='vmiddle h100vh w100 errorcontainer'  style={{background:"#E9FCFF"}}>
     <Col xs={12} sm={12} md={12} lg={5} xxl={4} style={{display:"flex", flexDirection:"column"}} className='vmiddle' >
        <p style={{textTransform:"uppercase", color:"#6F3FBA",} } className='fw400'>Oops!</p>
        <h1 style={{textTransform:"uppercase", color:"#6F3FBA"}} className='fw600'>Page not found</h1>
        <h5 className='fw400' style={{ color:"#6F3FBA"}}>The requested page does not exist</h5>
        <Link to="/"> <Button className='white fr dark_purple_bg fw600 fz20 ' style={{padding:"10px 70px", border:"none", borderRadius:"0", marginTop:"40px"}}>Go to Home </Button></Link>
       
     </Col>
        <Col xs={12} sm={12} md={12} lg={7} xxl={8} className='vmiddle'>
            <Image className='w80' src={IMG}></Image>
        </Col>
       
      
    </Row>
</div>
  )
}

export default errorpage;
