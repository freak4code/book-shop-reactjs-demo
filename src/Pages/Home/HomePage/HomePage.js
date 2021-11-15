import React from "react";
import Book from "../../../Components/Book/Book";
import Review from "../../../Components/Review/Review";
import useBook from "../../../Hooks/useBook";
import useReview from "../../../Hooks/useReview";
import Banner from "../Banner/Banner";
import HomeInfo from "../HomeInfo/HomeInfo";
import Subscribe from "../Subscribe/Subscribe";

const HomePage = () => {
  const [books, setBooks] = useBook();
  const [reviews, setReviews] = useReview();

  // render html
  return (
    <div>
      <Banner></Banner>
      <HomeInfo></HomeInfo>
      <div>
        <h1 className="text-center font-black text-success service-title">
          বইসমূহ
        </h1>
        <div className="service-container">
          {books.slice(0, 9).map((book) => (
            <Book key={book._id} book={book}></Book>
          ))}
        </div>
        <h1 className="text-center font-black text-success service-title">
          রিভিওসমূহ
        </h1>
        <div className="service-container">
          {reviews.slice(0, 9).map((review) => (
            <Review key={review._id} review={review}></Review>
          ))}
        </div>
      </div>
      <Subscribe></Subscribe>
    </div>
  );
};

export default HomePage;
