import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Subscribe.css";

const Subscribe = () => {
  // for showing modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // render html
  return (
    <div>
      <Form className="subscribe">
        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Button
          className="text-center"
          style={{ width: "100%" }}
          variant="success"
          type="button"
          onClick={handleShow}
        >
          Subscribe
        </Button>
      </Form>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Thanks</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          We will only give you about our important updates.
        </Modal.Body>
        <Modal.Footer>
          <Link to="/register">
            <Button variant="secondary" onClick={handleClose}>
              Consider Sign Up
            </Button>
          </Link>
          <Link to="/">
            <Button variant="primary" onClick={handleClose}>
              Close
            </Button>
          </Link>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Subscribe;
