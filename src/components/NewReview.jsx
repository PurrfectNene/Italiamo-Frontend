import { Button, Rate } from "antd";
import axios from "axios";
import { useRef, useState } from "react";

export default function NewReview({ placeId, state }) {
  const [reviews, setReviews] = state;
  const [rating, setRating] = useState(1);
  const comment = useRef(null);

  function submitReview() {
    if (comment.current.value === "") {
      return null;
    }
    axios
      .post(
        `${import.meta.env.VITE_API_URL}/api/places/${placeId}/reviews`,
        { rating: rating, review: comment.current.value },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("authToken"),
          },
        }
      )
      .then((response) => {
        //   setReviews([...reviews, response.data]);
        //   setNewReview({ rating: '', review: '' });
        //   setShowAddReviewModal(false);
        setReviews([response.data, ...reviews]);
        comment.current.value = "";
        setRating(1);
      })
      .catch((error) => {
        console.error("Error adding review:", error);
      });
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
      }}
    >
      <h1 style={{ margin: 0, fontSize: "1.35rem" }}>Write a review</h1>
      <Rate
        style={{ fontSize: "1rem" }}
        value={rating}
        onChange={(newRate) => setRating(newRate)}
        allowClear={false}
      />
      <textarea
        ref={comment}
        rows={7}
        style={{ borderRadius: "0.25rem", resize: "none", padding: "0.5rem" }}
      />
      <Button onClick={submitReview}>Add Review</Button>
    </div>
  );
}
