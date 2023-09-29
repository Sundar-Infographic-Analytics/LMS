import React from 'react'
import { Link } from 'react-router-dom';
import '../../assets/css/global.css';
import '../../assets/css/custom.css';
import { Container, Image } from 'react-bootstrap';
import loginion from '../../assets/images/login_ion.png';
const Navbar = ({style}) => {
  return (
    <>
      <div className='navbar_color fl w100 padt15 padb15'style={style} >
        <Container>
            <Link to="/" className='white fr' style={{textDecoration:'none'}}><Image src={loginion} className='w30 marr5 fw300'/>Login</Link>
        </Container>
      </div>
    </>
  )
}

export default Navbar