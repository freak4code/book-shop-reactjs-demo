import React from "react";
import { Card } from "react-bootstrap";

const Review = ({ review }) => {
  const { name, text, rating } = review;
  const noRating = 5 - rating;
  console.log(noRating);
  return (
    <Card style={{ width: "100%" }}>
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text> {text}</Card.Text>
      
       
      
        {Array.apply(null, Array(rating)).map((g) =>  <i class="fas fa-star"></i>)}
        {Array.apply(null, Array(noRating)).map((g) =>   <i class="far fa-star"></i>)}
       
        
      </Card.Body>
    </Card>
  );
};

export default Review;
