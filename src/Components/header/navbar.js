import React,{useState} from 'react'
import { Link, useLocation } from 'react-router-dom';
import '../../assets/css/global.css';
import '../../assets/css/custom.css';
import { Container, Image,Dropdown } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import LogoutModal from '../Utils/LogoutModal';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../../assets/images/logo.png';
import logout_ion from '../../assets/images/logout.png';
import mycourse_ion from '../../assets/images/mycourse.png';
import library_ion from '../../assets/images/library.png';
import my_learn_ion from '../../assets/images/learning.png';
import loginion from '../../assets/images/login_ion.png';

const NavBar = ({style, className}) => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
 

  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("jwtToken");
  const username = localStorage.getItem("userName:");
  const location = useLocation();

const handleLogoutModal = ()=>{
  setShowLogoutModal(true);

}

const handlelogout = () =>{
  setShowLogoutModal(false);

  localStorage.removeItem("jwtToken");
  localStorage.removeItem("jwtTokenExpiration");
  localStorage.removeItem('previousLocation');
  localStorage.removeItem('userName:');
  navigate('/');
  window.location.reload();
 
};

const handleLogin = () =>{
  localStorage.setItem('previousLocation',location.pathname );
 navigate( '/login') ;
};

  return (    
    <div className={`navbar_color fl w100 ${className}`} style={style} >
   <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#"><img src={logo} alt='' className='w60' /></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home" className='nav_active'>Home</Nav.Link>
            <Nav.Link href="#link">Technology</Nav.Link>
            <Nav.Link href="#link">Risk Management</Nav.Link>
            <Nav.Link href="#link">Finance</Nav.Link>
            <Nav.Link href="#link">Legal</Nav.Link>
         
    
      <Container>
      {isLoggedIn ? (
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic" className="br0 dark_purple_bg born">
                <Image src={loginion} className='w10 marr5 fw300'/>{username}
              </Dropdown.Toggle>

              <Dropdown.Menu className="ff lh27">
                <Dropdown.Item href="#" className='ff fz18 fw400 dropdown-item active'><img src={my_learn_ion} alt='' /><span className='padl10'>My Learnings</span></Dropdown.Item>
                <Dropdown.Item href="#" className='ff fz18 fw400'><img src={library_ion} alt='' /><span className='padl10'>My Library</span></Dropdown.Item>
                <Dropdown.Item href="#" className='ff fz18 fw400'><img src={mycourse_ion} alt='' /><span className='padl10'>My Courses</span></Dropdown.Item>
                <Dropdown.Item href="#" onClick={handleLogoutModal} className='white fr'><img src={logout_ion} alt='' /><span className='padl10'> Logout</span></Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
       ):(<Link onClick={handleLogin} to="/login" className={`white fr`} style={{textDecoration:'none'}}><Image src={loginion} className='w30 marr5 fw300'/>Login</Link>
       )}
        </Container>
        <LogoutModal show={showLogoutModal} handleClose={() => setShowLogoutModal(false)} handleLogout={handlelogout} />
        </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>    
  )
}

export default NavBar;