import React from "react";
import { Spinner } from "react-bootstrap";
import Book from "../../Components/Book/Book";
import useBook from "../../Hooks/useBook";
import "./Books.css";

const Books = () => {
  const [books, setBooks] = useBook();

  // render html
  return (
    <div>
      <h3 className="text-center font-black service-title text-success mt-3">
        বই সমূহ
      </h3>
      <div className="service-container">
        {books.length === 0 ? (
          <div className="spinner-arena">
            <div className="spinnner-position">
              <Spinner animation="grow" variant="waring" />
            </div>
          </div>
        ) : (
          books.map((book) => (
            <Book key={book._id} book={book}></Book>
          ))
        )}
      </div>
    </div>
  );
};

export default Books;
