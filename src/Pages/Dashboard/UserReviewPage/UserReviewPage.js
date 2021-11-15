import axios from "axios";
import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import useAuth from "../../../Hooks/useAuth";
import "./UserReviewPage.css";

const UserReviewPage = () => {
  // using auth context
  const { user } = useAuth();
  // for showing modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [text, setText] = useState("");
  const [rating, setRating] = useState(5);

  const handleText = (e) => {
    console.log(e.target.value);
    setText(e.target.value);
  };

  const handleRating = (e) => {
    console.log(e.target.value);
    setRating(e.target.value);
  };

  // Placer order
  const sendReview = () => {
    const review = {
      name: user.displayName,
      email: user.email,
      text: text,
      rating: parseInt(rating, 10),
    };

    axios
      .post(`${process.env.REACT_APP_BASE_URL}/reviews/add`, review)
      .then((res) => {
        if (res.data.insertedId) {
          handleShow();
        }
      });
  };

  // render html
  return (
    <div>
      <Form className="dc-form">
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Name"
            value={user.displayName}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Your review</Form.Label>
          <Form.Control
            type="text"
            placeholder="Your review"
            onChange={handleText}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Rating (0 - 5)</Form.Label>
          <Form.Control
            type="text"
            placeholder="Rating (0 - 5)"
            onChange={handleRating}
          />
        </Form.Group>

        <Button variant="primary" type="button" onClick={sendReview}>
          Give Review
        </Button>
      </Form>

      {/* Modal */}

      <Modal backdrop="static" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Submitted</Modal.Title>
        </Modal.Header>
        <Modal.Body>{user.displayName}, review added successfully.</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Thank you !
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UserReviewPage;
