import { useEffect, useState } from "react";


// hook for single service detail
const useBookDetail = (id) => {
  
  // set title to loading for showing spinner
  const [book, setBook] = useState({book_name: "loading"});
  useEffect(() => {
    fetch(`${process.env.REACT_APP_BASE_URL}/books/${id}`)
      .then((res) => res.json())
      .then((data) => setBook(data));
  }, [id]);

  return book;
};

export default useBookDetail;
