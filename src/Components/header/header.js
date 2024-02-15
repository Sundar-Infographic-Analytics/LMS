import React from 'react'
import '../../assets/css/global.css';
import '../../assets/css/custom.css';
import { Col, Container, Row, Card } from 'react-bootstrap';
// import { useParams } from 'react-router';
const Header = ({style, text, title1, title2}) => {    
  // const param = useParams();  
  // console.log(param, 'param');
  
  const styles = {
      backgroundImage:`url(${style})`,
      backgroundRepeat:'no-repeat',
      backgroundSize:'cover',
      backgroundPosition: 'center',
      height:'450px'
  }
  // const divcss={
  //   display:'flex',
  //   height:'230px',
  //   // alignItems:'center',
  //   marginTop:"210px"
  // }
  
  return (
    <>
    <div style={styles} className='header-container w100'>
      <Container>
        <Row>
         <Col lg={12}>
          <div className='d-flex flex-column customHead'>
            <h1 className='fz40 white fw600' style={{filter: "drop-shadow(0.35rem 0.35rem 0.4rem rgba(0, 0, 0, 1))"}}>{title1}<span className='orange'>{title2}</span></h1>
            <Card.Text className='white mart10 fz20 fw400'>
                {text}
            </Card.Text>
          </div>
         </Col>
        </Row>
      </Container>
    </div>
    </>
  )
}

export default Header