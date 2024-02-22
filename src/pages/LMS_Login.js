import React, { useEffect, useState } from "react";
import "../assets/css/global.css";
import "../assets/css/custom.css";
import log1 from '../assets/images/Login-page.svg';
import SNClogo from '../assets/images/logo.png';
import {
  Card,
  Col,
  Container,
  Row,
  Form,
  Button,
  Image,
  Modal,
  Spinner
} from "react-bootstrap";
// import logo from "../assets/images/Logo/new_Learnnestlogo.svg";
import logo from "../assets/images/Logo/Group 3730.png";
import mobicon from "../assets/images/Phone.svg";
import eyeslash from "../assets/images/hide-pw.svg";
import eye from "../assets/images/show.svg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import SiaLogo from '../assets/images/SIA_Logo.png'

const LMS_Login = () => {
    
 
    const navigate = useNavigate(); // to naviagte
    //  const[userData, setUserData] = useState('');
  
    //  const currentDate = new Date();
    // const year = currentDate.getFullYear();
  
    //  console.log("urlNew,", userData);
  const [buttonLoading, setButtonLoading] = useState(false);
    // const courseTitle = useCategoryTitle(); //checkinggggg....
    // console.log("addcheckkkk03",courseTitle)
  
    // Initialize the specialLogout flag
    const [showPassword, setShowPassword] = useState(false);
  
    const handlePasswordClick  = async() =>{
      setShowPassword(!showPassword)
      // console.log("passwordShow", showPassword)
    }
    
  
    const [credentials, setCredentials] = useState({
      mobile: "",
      password: "",
    });
    const [error, setError] = useState("");
  
    const [showTimeoutModal, setShowTimeoutModal] = useState(false); // State for showing the session timeout modal
    const handleClose = () => {
      setShowTimeoutModal(false);
    };
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      if (name === "mobile") {
        const numericValue = value.replace(/\D/g, ""); // Remove any non-numeric characters
        if (numericValue.length <= 10) {
          //does not exceed 10 digits
          setCredentials({
            ...credentials,
            [name]: numericValue,
          });
        }
        if (numericValue.length > 10) {
          // If the input exceeds 10 digits, trim it to 10 digits
          setCredentials({
            ...credentials,
            [name]: numericValue.slice(0, 10),
          });
        }
        return; // do nothing
      }
  
      setCredentials({
        ...credentials,
        [name]: value,
      });
    };
  
  
    
  
    const handleFormSubmit = async (e) => {
      setButtonLoading(true);
      e.preventDefault();
  
      
      await axios
      .post(`${process.env.REACT_APP_BASE_URL}/lmsLogin`, credentials)
      .then((response) => {
        // console.log("nn", response);
        // setUserData(response.data);
        localStorage.setItem("userImg:", response.data.photo_url)
        if (response.status === 200) {
          const token = response.data.jwtToken;
          const username = response.data.employee_name;
          const Role = response.data.roles;
          localStorage.setItem("userName:", username);
          localStorage.setItem("jwtToken", token);
          localStorage.setItem("role", Role);
  
          
          // console.log("userDataaaaAAA",response.data);
          // const decodedToken = jwt_decode(token);
        
          // const expirationTime = decodedToken.exp * 1000;
        
          // const currentTime = new Date().getTime();
        
          // const timeUntilExpiration = expirationTime - currentTime;
          
          // toast.success( <div>
          //   Welcome, <strong>{username}</strong>!
          // </div>,
          // { position: 'top-right' });
          const CustomToast = () => (    
            
            <div className="vmiddle " style={{padding:"0 10px", gap:"10px"}}>
            <div className="user-profile">
              <img  src={response.data.photo_url} alt="userprofile"/>
            </div>
              <p>      
              Welcome, <strong>{response.data.employee_name}</strong>!
            </p>
        
            </div>
            
            
          );
          
          toast( <CustomToast />, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          
            });
  
          // window.location.reload();
          // localStorage.setItem("jwtTokenExpiration", expirationTime);
  
          // setTimeout(() => {
          //   localStorage.removeItem("jwtToken");
          //   localStorage.removeItem("jwtTokenExpiration");
          //   navigate("/"); // Navigate to the login if expired
          //   window.location.reload();
          // }, timeUntilExpiration);
          // navigate("/");
        } 
        else {
          if (response.data && response.data.error) {
            setError("Invalid Credentials");
          } else {
            
            setError("Internal error. Please try again later.");
          }
        }
  
        const previousLocation = localStorage.getItem("previousLocation");
        navigate(previousLocation || "/");
      })
      .catch((error) => {      
        if (error.response) {
          if (error.response.status === 401) {
            localStorage.clear();
            setShowTimeoutModal(true); // Show the session timeout modal
            window.location.reload();
            navigate("/");
          } else if (error.response.status === 500) { 
            localStorage.removeItem("jwtToken");
            localStorage.removeItem("jwtTokenExpiration");
            setError("Internal Server Error. Please try again later.");
            // navigate("/");
            setShowTimeoutModal(true); // Show the session timeout modal
            window.location.reload();
          } else {
            
            setError("Invalid credentials");
          }
        } else {
          setError("Network error. Please check your network connection.");
        }
      })
      .finally(()=>{
        setButtonLoading(false);
      })
  };
  
    useEffect(() => {
      const token = localStorage.getItem("jwtToken");
      const tokenExpiration = localStorage.getItem("jwtTokenExpiration");
  
      if (token && tokenExpiration) {
        const currentTime = new Date().getTime();
        const expirationTime = parseInt(tokenExpiration);
  
        if (currentTime > expirationTime) {
          localStorage.removeItem("jwtToken");
          localStorage.removeItem("jwtTokenExpiration");
          // navigate("/login");
          setShowTimeoutModal(true); // Show the session timeout modal
          // window.location.reload(); // Refresh the page when token expires
        }
      }
    }, [navigate]);

  return (
    <Container fluid className="h100vh my-container" style={{background:" linear-gradient(180deg, #AF7CFF 0%, #E2A4FF 100%)"}}>
      <Row className="vmiddle h90vh">
      <div >
        <Col lg={12} xl={12} className="pad30" >
        <img src={log1} alt="login"  style={{width:"auto", height:"90vh"}} className="login-img marl30"/>
        </Col>
       
        <div className="w30 mw100 p-2 card-absolute">
                
                <Card className="br15 born logincard-body" style={{borderRadius:"16px"}}>
                  <Card.Body >
                    <Card.Img
                      variant="top"
                      src={logo}
                      className="w20 mt-4 mb-3"
                    />
                    {/* <Card.Title
                      className="fw400 fz20  black"
                      style={{ marginBottom: "30px" }}
                    >
                      Welcome!
                    </Card.Title> */}
                    <Card.Title
                      className="fw600 fz24  black card-title"
                      // style={{ marginBottom: "70px" }}
                    >
                      Login to continue learning
                    </Card.Title>
                    <Form onSubmit={handleFormSubmit}>
                      <Form.Group
                        className="mb-3 posr"
                        controlId="formBasicEmail"
                      >
                        <Form.Label className="fw400 fz18 black">
                          Mobile Number 
                        </Form.Label>
                        <Image
                          src={mobicon}
                          className="posa r0 top45 marr10 password-field"
                        />
                        <Form.Control
                          type="tel"
                          name="mobile"
                          placeholder="Enter mobile number"
                          className="borltrn br0 bor2"
                          style={{ borderColor: "#6F3FBA", backgroundColor:"#FAF8FF" }}
                          value={credentials.mobile}
                          onChange={handleChange}
                          autoComplete="username"
                          required
                        />
                      </Form.Group>
                      <Form.Group
                        controlId="formBasicPassword"
                        className="posr mart20"
                      >
                        <Form.Label className="fw400 fz18 black">
                          Password 
                        </Form.Label>
                        <Image
                          src={!showPassword? eyeslash : eye}
                          onClick={handlePasswordClick}
                          className="posa r0 top45 marr10 password-field"
                        />
                        <Form.Control
                          type={!showPassword? "password" : "text"}
                          name="password"
                          placeholder="Password"
                          className="borltrn br0 mb-3 bor2 pad10"
                          style={{ borderColor: "#6F3FBA" , backgroundColor:"#FAF8FF"}}
                          autoComplete="current-password"
                          value={credentials.password}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                      {/* <Form.Text className="fr mb-3 light_black">
                        Forgot Password?
                      </Form.Text> */}
                      {error && (
                        <p className="w100 text-danger marb10">
                          {error}
                        </p>
                      )}
                      <Button
                        variant="primary"
                        type="submit"
                        className="w100  fz18 h50 log-btnClr"
                        style={{ border:"none"}}
                        disabled={buttonLoading}
                      >
                      {buttonLoading && (
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                      style={{ marginRight: "5px" }}
                    />
                  )}
                        Login
                      </Button>
                    </Form>
                    <div className="vmiddle mart30 login-snc-footer" >
                    <Card.Text className="black mt-4 light_black fz11 fw400 card-text-dec" >
                    <Image src={SiaLogo} style={{height:"30px", width:"auto", marginRight:"10px"}}>

                    </Image>
                    Designed and Developed by <a className="fw600" href="https://www.infographicanalytics.com/" target="_blank" rel="noreferrer" style={{color:"#3e3e3e"}}>Sundar Infographic Analytics</a>
                    </Card.Text>
                    </div>
                  </Card.Body>
                </Card>
              </div>
       
        
      </div>
      </Row>
        <Row  className=" vmiddle mart30 login-snc-footer">
           <div className=" vmiddle mart0">
            <Image className="" width={30} src={SNClogo} style={{marginRight:"10px"}}></Image>
            <p className="fw600">Intersection of Insight and Innovation</p>
           </div>
        </Row>
        <Modal show={showTimeoutModal} centered onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Session Timeout</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Your session has timed out. Please log in again.
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={handleClose}>
                OK
              </Button>
            </Modal.Footer>
          </Modal>
    </Container>
  )
}

export default LMS_Login
