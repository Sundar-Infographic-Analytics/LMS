// ApiInterceptor.js
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ApiInterceptor = () => {
  const navigate = useNavigate();
  const [showTimeoutModal, setShowTimeoutModal] = useState(false);
  // const [logoutClicked, setLogoutClicked] = useState(false);

  useEffect(() => {
    // Create an Axios interceptor to globally handle 401 errors
    const interceptor = axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response && error.response.status === 401) {
          // Handle the 401 error and show the session timeout modal
         
            // Show the session timeout modal only if logout was not explicitly clicked
            localStorage.removeItem("jwtToken");
            localStorage.removeItem("jwtTokenExpiration");
            setShowTimeoutModal(true);
          
          return Promise.reject(error);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      // Remove the interceptor when the component unmounts
      axios.interceptors.response.eject(interceptor);
    };
  }, []);

  const handleClose = () => {
    // Close the session timeout modal
    setShowTimeoutModal(false);
    navigate("/");
  };

  

  return (
    <Modal show={showTimeoutModal} centered onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Session Timeout</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Your session is timed out. Please log in again.
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>
          OK
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ApiInterceptor;
