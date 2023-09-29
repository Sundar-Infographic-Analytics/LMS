import React from 'react'
import '../../assets/css/global.css';
import '../../assets/css/custom.css';
import { Col, Container, Row, Card } from 'react-bootstrap';
const Header = ({style, text, title1, title2}) => {    
  const styles = {
      backgroundImage:`url(${style})`,
      backgroundRepeat:'no-repeat',
      backgroundSize:'cover',
  }
  const divcss={
    display:'flex',
    height:'450px',
    alignItems:'center',
  }
  return (
    <>
    <div style={styles}>
      <Container>
        <Row>
         <Col lg={12}>
          <div className='' style={divcss}>
            <h1 className='fz40 white fw600'>{title1}<span className='orange'> {title2}</span></h1>
            <Card.Text className='white posa mart100 fz20 fw400 padt20'>
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