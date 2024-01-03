import React,{  useEffect, useState} from 'react'
import { Link, useLocation } from 'react-router-dom';
import '../../assets/css/global.css';
import '../../assets/css/custom.css';
import { Container, Image,Dropdown } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import LogoutModal from '../Utils/LogoutModal';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../../assets/images/logo.png';
import logout_ion from '../../assets/images/logout.svg';
import mycourse_ion from '../../assets/images/course.svg';
import library_ion from '../../assets/images/library.svg';
import my_learn_ion from '../../assets/images/learning.svg';
import ApprovalHub_icon from '../../assets/images/approval hub.svg'
import loginion from '../../assets/images/login_ion.png';
import { useCategoryTitle } from '../Utils/CategoryTitleContext';
import { CourseTitleProvider } from '../../Components/Utils/CategoryTitleContext';
import axios from 'axios';


const NavBar = ({style, className}) => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const courseTitle = useCategoryTitle(); // from useContext
   const [data, setData] = useState([]);

   const userPhoto=localStorage.getItem("userImg:")

   const jwtToken = localStorage.getItem("jwtToken");

  useEffect(() => {   
    const fetchCategories = async () => {
      
      const jwtToken=localStorage.getItem("jwtToken");
      
      try {
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/lmsCategoryList`, null,
        {
          headers:{
            Authorization:jwtToken,
          },
        }
        );
          setData(response.data.count);        
                // setLibraryAndLearningCount(response.data.count)
      } catch (error) {
        localStorage.clear();
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []); //courseTitle


const onClick =  async () =>{
  try {
    const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/lmsCategoryList`, null, {
      headers: {
        Authorization: jwtToken,
      },
    });

    // Assuming that the response data contains the course title
    setData(response.data.count);
    console.log(response.data.count,"mmmmmmmmmmmmmmmmmmmm")
  } catch (error) {
    // Handle any errors that might occur during the Axios POST request
    console.error("Error while making the Axios request:", error);
  }
}

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
   
    <CourseTitleProvider  >
     { console.log("addcheckkkNavvvvvvDATA",data )}
    <div className={`navbar_color fl w100 ${className} `} style={style} >
   <Navbar  expand="lg" className="bg-body-tertiary"  >
      <Container  >
        <Navbar.Brand href="/"><img src={logo} alt='' className='w50' /></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/" className={`${location.pathname ==='/'? 'nav_active fw600' : ""} `} >Home</Nav.Link>
            <Nav.Link href="/Categiries/1" className={`${location.pathname ==='/Categiries/1'? 'nav_active fw600' : ""}`} >Technology</Nav.Link>
            <Nav.Link href="/Categiries/2" className={`${location.pathname ==='/Categiries/2'? 'nav_active fw600' : ""}`} >Risk Management</Nav.Link>
            <Nav.Link href="/Categiries/3" className={`${location.pathname ==='/Categiries/3'? 'nav_active fw600' : ""}`} >Finance</Nav.Link>
            <Nav.Link href="/Categiries/4" className={`${location.pathname ==='/Categiries/4'? 'nav_active fw600' : ""}`} >Legal</Nav.Link>
      <Container>
      {isLoggedIn ? (
            <Dropdown onClick={onClick}>
              <Dropdown.Toggle variant="success" id="dropdown-basic" className="br0 dark_purple_bg born user-profile-nav">
                <Image src={userPhoto} className='w100 marr5 fw300'/>
              </Dropdown.Toggle>

              <Dropdown.Menu className="ff lh27">
                <div style={{padding:'10px  20px'}}> hi! <b>{username}</b></div>
                <Dropdown.Item href="/mylearnings" className={`${location.pathname ==='/mylearnings'? 'ff fz18 fw600 dropdown-item active' : "ff fz18 fw400 dropdown-item"}`} ><img src={my_learn_ion} alt='' style={{width:'24px',}} /><div className='div-flex'><span className='padl10'>My Mastery</span><p align="right" className='course-count dark_purple_bg'>{data?.courseread}</p></div></Dropdown.Item>
                <Dropdown.Item key={courseTitle} href="/mylibrary" className={`${location.pathname ==='/mylibrary'? 'ff fz18 fw600 dropdown-item active' : "ff fz18 fw400 dropdown-item"}`} ><img src={library_ion} alt='' style={{width:'24px',}} /><div className='div-flex'><span className='padl10'>My Library</span><p className='course-count dark_purple_bg'>{data?.mylibrary}</p></div></Dropdown.Item>
                <Dropdown.Item href="/mycourse" className={`${location.pathname ==='/mycourse'? 'ff fz18 fw600 dropdown-item active' : "ff fz18 fw400 dropdown-item"}`}><img src={mycourse_ion} alt='' style={{width:'24px',}} /><span className='padl10'>My Courses</span></Dropdown.Item>
                {localStorage.getItem("role")=== "superadmin" ? (
                  <Dropdown.Item href="/approvalhub" className={`${location.pathname ==='/approvalhub'? 'ff fz18 fw600 dropdown-item active' : "ff fz18 fw400 dropdown-item"}`}><img src={ApprovalHub_icon} alt='' style={{width:'24px',}} /><span className='padl10'>Approval Hub</span></Dropdown.Item>
                ) : (
                  <></>
                )}
                
                <Dropdown.Item onClick={handleLogoutModal} className='white fr'><img src={logout_ion} alt='' style={{width:'24px',}} /><span className='padl10'> Logout</span></Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            
       ):(<Link onClick={handleLogin} to="/login" className={`white fr dark_purple_bg fw600`} style={{textDecoration:'none'}}><Image src={loginion} className='w30 marr5 fw300'/>Login</Link>
       )}
        </Container>
        <LogoutModal show={showLogoutModal} handleClose={() => setShowLogoutModal(false)} handleLogout={handlelogout} />
        </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>  
    </CourseTitleProvider>  
  )
}

export default NavBar;