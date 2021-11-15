import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import "./Book.css";

const Book = ({ book, editable, handleDeleteBook }) => {
  const { admin, user } = useAuth();
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
  const image = book_image.replace("teambooksreaders", "book.snnafi");
  // render html
  return (
    <Card style={{ width: "100%" }}>
      <Card.Img variant="top" src={image} width="170px" height="500px" />
      <Card.Body>
        <Card.Title>{book_name}</Card.Title>
        <Card.Text> {book_writer}</Card.Text>
        <Card.Text> {book_publisher}</Card.Text>
        <Card.Text> {book_review}</Card.Text>
        <Card.Text> মূল্য: {book_price}</Card.Text>

        {editable && admin ? (
          <button
            className="btn btn-danger m-3"
            onClick={() => handleDeleteBook(_id)}
          >
            Delete Book
          </button>
        ) : (
          <Link to={`/place-order/${_id}`}>
            <button className="btn btn-warning">এখনই কিনুন</button>
          </Link>
        )}
      </Card.Body>
    </Card>
  );
};

export default Book;
