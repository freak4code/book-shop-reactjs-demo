import { useEffect, useState } from "react";

const useReview = () => {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_BASE_URL}/reviews`)
      .then((res) => res.json())
      .then((data) => {
        setReviews(data);
        console.log(data);
      });
  }, []);

  return [reviews, setReviews];
};

export default useReview;
