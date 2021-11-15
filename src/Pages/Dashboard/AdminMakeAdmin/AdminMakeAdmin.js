import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import useAuth from "../../../Hooks/useAuth";

const AdminMakeAdmin = () => {
  // using auth context
  const { user } = useAuth();
  // for showing modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [email, setEmail] = useState("");

  const handleEmail = (e) => {
    console.log(e.target.value);
    setEmail(e.target.value);
  };

  // make admin
  const makeAdmin = () => {
    const userToMakeAdmin = { email: email };
    fetch(`${process.env.REACT_APP_BASE_URL}/users/admin/${user.email}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(userToMakeAdmin),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          handleShow();
        } else {
          alert("No user found with this email !");
        }
      });
  };

  // render html
  return (
    <div>
      <Form className="dc-form">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Enter user email to make admin</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter user email to make admin"
            onChange={handleEmail}
          />
        </Form.Group>

        <Button variant="primary" type="button" onClick={makeAdmin}>
          Make Admin
        </Button>
      </Form>

      {/* Modal */}

      <Modal backdrop="static" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Submitted</Modal.Title>
        </Modal.Header>
        <Modal.Body>{user.displayName}, Admin added successfully.</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Thank you !
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminMakeAdmin;
