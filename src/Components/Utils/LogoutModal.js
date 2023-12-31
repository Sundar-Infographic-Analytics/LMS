// src/components/LogoutModal.js
import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function LogoutModal({ show, handleClose, handleLogout }) {
  
  return (
    <Modal show={show} onHide={handleClose} style={{margin:"0px"}}>
      <Modal.Header  closeButton className='logout-modal' >
        <Modal.Title className='fw500' >Logout Confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to log out?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary padl50 padr50 white_bg black h50 br5 fw600 fz18" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary padl50 padr50 dark_purple_bg h50 br5 fw600 fz18 btn_color born" onClick={handleLogout}>
          Logout
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default LogoutModal;
