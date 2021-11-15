import { useEffect, useState } from "react";

const useBook = () => {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_BASE_URL}/books`)
      .then((res) => res.json())
      .then((data) => {
        setBooks(data);
        console.log(data);
      });
  }, []);

  return [books, setBooks];
};

export default useBook;
