import React from "react";
import { Carousel } from "react-bootstrap";

const Banner = () => {

  // render html
  return (
    <Carousel style={{ margin: "20px" }}>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>বই </h3>
          <p>বই পড়ুন , নিজেকে জানুন</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://images.pexels.com/photos/2041540/pexels-photo-2041540.jpeg?cs=srgb&dl=pexels-rafael-cosquiere-2041540.jpg&fm=jpg"
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3>সর্ববৃহৎ সংগ্রহ</h3>
          <p>যেকোনো বই যেকোনো ভাষার !</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://images.pexels.com/photos/1883378/pexels-photo-1883378.jpeg?cs=srgb&dl=pexels-ylanite-koppens-1883378.jpg&fm=jpg"
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>উপহার বা প্রয়োজন </h3>
          <p>প্রিয়জনকে বই উপহার দিন , প্রয়োজনে অপ্রয়োজনে বই কিনুন.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default Banner;
