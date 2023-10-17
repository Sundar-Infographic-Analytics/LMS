// src/components/LogoutModal.js
import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function LogoutModal({ show, handleClose, handleLogout }) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header  closeButton>
        <Modal.Title>Logout Confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to log out?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleLogout}>
          Logout
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default LogoutModal;
