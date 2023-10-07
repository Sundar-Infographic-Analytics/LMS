import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import '../../assets/css/global.css';
import '../../assets/css/custom.css';
import { Container, Image } from 'react-bootstrap';
import loginion from '../../assets/images/login_ion.png';
import { useNavigate } from "react-router-dom";

const Navbar = ({style, className}) => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("jwtToken");
  const location = useLocation();

const handlelogout = (specialLogout) =>{
  localStorage.removeItem("jwtToken");
  localStorage.removeItem("jwtTokenExpiration");
  window.location.reload();
  if (specialLogout) {
    navigate("/previousCourse");
  } else {
    navigate("/");
  }
};

const handleLogin = () =>{
  localStorage.setItem('prevoiusLocation',location.pathname );
  window.location.href = '/login';
};

  return (    
    <div className={`navbar_color fl w100 padt15 padb15 ${className}`} style={style} >
   
      <Container>
      {isLoggedIn ? (
          <Link onClick={() => handlelogout(true)} className={`white fr`} style={{textDecoration:'none'}}><Image src={loginion} className='w30 marr5 fw300'/>Logout</Link>
       ):(<Link onClick={handleLogin} to="/login" className={`white fr`} style={{textDecoration:'none'}}><Image src={loginion} className='w30 marr5 fw300'/>Login</Link>
       )}
        </Container>
    </div>    
  )
}

export default Navbar;