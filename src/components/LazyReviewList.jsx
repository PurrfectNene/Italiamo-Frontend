import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Rate, Spin } from "antd";
import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../context/auth.context";

export default function LazyReviewList({ load, placeId, state, readOnly }) {
  const { user } = useContext(AuthContext);

  const [reviews, setReviews] = state;
  const [editMode, setEditMode] = useState(null); // null or ID of the post editing

  // editing review
  const [newRating, setNewRating] = useState(0);
  const newReview = useRef(null);

  useEffect(() => {
    if (load && placeId) {
      axios
        .get(`${import.meta.env.VITE_API_URL}/api/places/${placeId}/reviews`)
        .then((response) => {
          setReviews(response.data);
        })
        .catch((error) => {
          console.error("Error fetching reviews:", error);
        });
    }

    return () => {
      setReviews(null);
    };
  }, [placeId, load, setReviews]);

  const ready = load && reviews;

  if (!ready) {
    return (
      <div
        style={{
          flex: 1,
          minHeight: 0,
          overflowY: "auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Spin />
      </div>
    );
  }

  return (
    <div
      className="hide-scroll"
      style={{
        flex: 1,
        minHeight: 0,
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      {reviews.map((review, index) => {
        return (
          <div
            key={index}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.25rem",
              overflow: "visible",
            }}
          >
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <h1 style={{ margin: 0, fontSize: "1.25rem" }}>
                {review.user.email}
              </h1>
              {review.user._id === user._id && (
                <div
                  style={{
                    display: "flex",
                    gap: "0.5rem",
                    marginLeft: "auto",
                  }}
                >
                  {!readOnly && (
                    <Button
                      size="small"
                      onClick={() => {
                        const editing = editMode === review._id;
                        if (editing) {
                          // submit
                          axios
                            .put(
                              `${
                                import.meta.env.VITE_API_URL
                              }/api/places/${placeId}/reviews/${review._id}`,
                              {
                                rating: newRating,
                                review: newReview.current.value,
                              }
                            )
                            .then((response) => {
                              // optimistic update
                              const updatedReviews = [...reviews];
                              updatedReviews[index].rating = newRating;
                              updatedReviews[index].review =
                                newReview.current.value;
                              setReviews(updatedReviews);
                              // reset
                              setEditMode(null);
                            })
                            .catch((error) => {
                              console.error("Error editing review:", error);
                            });

                          return;
                        }
                        // start editing
                        setNewRating(review.rating);
                        setEditMode(review._id);
                      }}
                    >
                      {editMode === review._id ? "Save" : <EditOutlined />}
                    </Button>
                  )}

                  {!readOnly && editMode !== review._id && (
                    <Popconfirm
                      title="Are you sure to Delete?"
                      onConfirm={() => {
                        axios
                          .delete(
                            `${
                              import.meta.env.VITE_API_URL
                            }/api/places/${placeId}/reviews/${review._id}`
                          )
                          .then(() => {
                            // optimistic update
                            setReviews(
                              reviews.filter(
                                (review_) => review_._id !== review._id
                              )
                            );
                          })
                          .catch((error) => {
                            console.error("Error deleting review:", error);
                          });
                      }}
                    >
                      <Button size="small">
                        <DeleteOutlined />
                      </Button>
                    </Popconfirm>
                  )}
                </div>
              )}
            </div>
            <Rate
              disabled={editMode !== review._id}
              value={editMode === review._id ? newRating : review.rating}
              style={{ fontSize: "0.75rem" }}
              onChange={(newVal) => setNewRating(newVal)}
            />

            {editMode === review._id ? (
              <textarea
                ref={newReview}
                style={{
                  marginTop: "0.25rem",
                  resize: "none",
                  padding: "0.5rem",
                }}
                defaultValue={review.review}
                rows={5}
              />
            ) : (
              <p style={{ margin: 0, fontSize: "1rem" }}>{review.review}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
