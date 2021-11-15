import { BookmarkAdded } from "@mui/icons-material";
import React from "react";
import { Spinner } from "react-bootstrap";
import Book from "../../../Components/Book/Book";
import Order from "../../../Components/Order/Order";
import useAuth from "../../../Hooks/useAuth";
import useBook from "../../../Hooks/useBook";
import useOrder from "../../../Hooks/useOrder";

const AdminManageProduct = () => {
  // Uodate product status by force fake state update
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  // use auth context
  const { admin, user } = useAuth();

  const [books, setBooks] = useBook();
  console.log(user.email);

  // Delete book by id
  const handleDeleteBook = (id) => {
    const proceed = window.confirm(
      "Are you sure, you want to delete this book ?"
    );
    if (proceed) {
      fetch(`${process.env.REACT_APP_BASE_URL}/books/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount > 0) {
            alert("Book deleted successfully");
            const remainingBooks = books.filter((book) => book._id !== id);
            setBooks(remainingBooks);
          }
        });
    }
  };

  // render html

  return (
    <div>
      <h3 className="text-center font-black service-title text-success mt-3">
        Manage All Books
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
            <Book
              key={book._id}
              book={book}
              editable={true}
              handleDeleteBook={handleDeleteBook}
            ></Book>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminManageProduct;
