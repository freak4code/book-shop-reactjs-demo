import axios from "axios";
import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import useAuth from "../../../Hooks/useAuth";

import "./AdminAddProduct.css";

const AdminAddProduct = () => {
  // using auth context
  const { user } = useAuth();

  // for showing modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [book, setBook] = useState({});

  const handleInput = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    let newBook = { ...book };
    newBook[field] = value;
    setBook(newBook);
    console.log(field, value);
    console.log(newBook);
  };

  // Placer order
  const sendBook = () => {
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/books/add`, book)
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
          <Form.Label>Book Image</Form.Label>
          <Form.Control
            type="text"
            name="book_image"
            placeholder="Book Image URL"
            onChange={handleInput}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Book Name</Form.Label>
          <Form.Control type="text" name="book_name" placeholder="Book Name"   onChange={handleInput} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Writer Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Writer Name"
            name="book_writer"
            onChange={handleInput}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Book Publsiher</Form.Label>
          <Form.Control
            type="text"
            name="book_publisher"
            placeholder="Book Publsiher"
            onChange={handleInput}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Book Review</Form.Label>
          <Form.Control
            type="text"
            name="book_review"
            placeholder="Book Review"
            onChange={handleInput}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Book Price</Form.Label>
          <Form.Control
            type="text"
            name="book_price"
            placeholder="Book Price"
            onChange={handleInput}
          />
        </Form.Group>

        <Button variant="primary" type="button" onClick={sendBook}>
          Add Book
        </Button>
      </Form>

      {/* Modal */}

      <Modal backdrop="static" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Submitted</Modal.Title>
        </Modal.Header>
        <Modal.Body>{user.displayName}, book added successfully.</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Thank you !
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminAddProduct;
