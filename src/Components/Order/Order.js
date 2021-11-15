import React from "react";
import { Card } from "react-bootstrap";
import useAuth from "../../Hooks/useAuth";

const Order = ({ order, handleDeleteOrder, handleUpdateOrderStatus }) => {
  // destructuring object
  const { _id, name, email,phone, address, book, order_status } = order;
  const image = book?.book_image.replace("teambooksreaders", "book.snnafi");
  const { admin, user } = useAuth();

  // render html
  return (
    <Card style={{ width: "100%" }}>
      {order_status === 0 ? (
        <Card.Header className="text-danger font-weight-bold">
          <h1>Pending</h1>
        </Card.Header>
      ) : (
        <Card.Header className="text-success font-weight-bold">
          <h1>Approved</h1>
        </Card.Header>
      )}

      <Card.Img variant="top" src={image} width="170px" height="330px" />
      <Card.Body>
        <Card.Text>Book Name: {book?.book_name}</Card.Text>
        <Card.Text>User Name: {name}</Card.Text>
        <Card.Text>User Email: {email}</Card.Text>
        <Card.Text>User Phone: {phone}</Card.Text>
        <Card.Text>Book Price: {book?.book_price}</Card.Text>
        <Card.Text>Book Delivery Address: {address}</Card.Text>

        {order_status === 0 && admin ? (
          <button
            className="btn btn-warning m-3 "
            onClick={() => handleUpdateOrderStatus(_id, order)}
          >
            Approved Order
          </button>
        ) : (
          <div></div>
        )}

        <button
          className="btn btn-danger m-3"
          onClick={() => handleDeleteOrder(_id)}
        >
          Delete Order
        </button>
      </Card.Body>
    </Card>
  );
};

export default Order;
