import axios from "axios";
import React, { useState } from "react";
import { Button, Card, Form, Modal, Spinner } from "react-bootstrap";
import { useParams } from "react-router";
import useAuth from "../../Hooks/useAuth";
import useBookDetail from "../../Hooks/useBookDetail";
import "./PlaceOrderPage.css";

const PlaceOrderPage = () => {
  // using auth c
  const { user } = useAuth();
  const { id } = useParams();
  const book = useBookDetail(id);
  // destructuring object
  const {
    _id,
    book_image,
    book_name,
    book_writer,
    book_review,
    book_publisher,
    book_price,
  } = book;
  const image = book_image?.replace("teambooksreaders", "book.snnafi");
  // for showing modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [dAddress, setdAddress] = useState("");
  const [dPhone, setdPhone] = useState("");

  const handlePhoneNumber = (e) => {
    console.log(e.target.value);
    setdPhone(e.target.value);
  };

  const handleDeliveryAddress = (e) => {
    console.log(e.target.value);
    setdAddress(e.target.value);
  };

  // Placer order
  const placeOrder = () => {
    const order = {
      name: user.displayName,
      email: user.email,
      address: dAddress,
      phone: dPhone,
      book: book,
      order_status: 0,
    };

    axios
      .post(`${process.env.REACT_APP_BASE_URL}/orders/add`, order)
      .then((res) => {
        if (res.data.insertedId) {
          handleShow();
        }
      });
  };

  // render html
  return (
    <div>
      {book_name === "loading" ? (
        <div className="spinner-arena">
          <div className="spinnner-position">
            <Spinner animation="grow" variant="waring" />
          </div>
        </div>
      ) : (
        <Card className="m-5" style={{ width: "50%" }}>
          <Card.Img variant="top" src={image} width="170px" height="500px" />
          <Card.Body>
            <Card.Title>{book_name}</Card.Title>
            <Card.Text> {book_writer}</Card.Text>
            <Card.Text> {book_publisher}</Card.Text>
            <Card.Text> {book_review}</Card.Text>
            <Card.Text> মূল্য: {book_price}</Card.Text>
          </Card.Body>
        </Card>
      )}

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
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Email" value={user.email} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Phone number</Form.Label>
          <Form.Control
            type="number"
            placeholder="Phone number"
            onChange={handlePhoneNumber}
          />
        </Form.Group>


        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Delivery address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Delivery Address"
            onChange={handleDeliveryAddress}
          />
        </Form.Group>

        <Button variant="primary" type="button" onClick={placeOrder}>
          Place Order
        </Button>
      </Form>

      {/* Modal */}

      <Modal backdrop="static" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Submitted</Modal.Title>
        </Modal.Header>
        <Modal.Body>{user.displayName}, order placed successfully.</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Thank you !
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PlaceOrderPage;
