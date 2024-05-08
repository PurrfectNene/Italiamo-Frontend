import { Col, Rate, Row, Spin } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import LazyReviewList from "./LazyReviewList";

export default function LazyPlaceInfo({ id }) {
  const [placeData, setPlaceData] = useState(null);

  // stores the reviews of the CURRENTLY SELECTED PLACE
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    if (id) {
      axios
        .get(`${import.meta.env.VITE_API_URL}/api/places/${id}`)
        .then((response) => {
          setPlaceData(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    return () => {
      setPlaceData(null);
    };
  }, [id]);

  function calculateReviewsAverage() {
    if (!reviews) {
      return 0;
    }

    const totalReviews = reviews.length;
    const sumReviews = reviews.reduce((accumulated, reviewObj) => {
      return accumulated + reviewObj.rating;
    }, 0);

    return sumReviews / totalReviews;
  }

  if (!placeData) {
    return (
      <div
        style={{
          height: 200,
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
    <>
      <Row style={{ gap: "2rem" }}>
        <Col
          style={{
            flex: 1,
            //   height: "100%",
            height: "fit-content",
            borderRadius: "1rem",
          }}
        >
          {placeData?._id && (
            <img
              src={placeData?.imageUrl}
              width="100%"
              height="300px"
              style={{ borderRadius: "0.5rem", objectFit: "cover" }}
            />
          )}
          <div style={{ display: "flex", alignItems: "center" }}>
            <h1
              style={{
                marginTop: "0",
                marginBottom: 0,
                fontSize: "1.5rem",
              }}
            >
              {placeData?.name}
            </h1>
            <a
              style={{
                display: "block",
                marginLeft: "auto",
                padding: "0.25rem",
              }}
              // className="force-pointer"
            >
              <Rate
                disabled
                value={calculateReviewsAverage()}
                style={{
                  fontSize: "1rem",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              />
            </a>
          </div>

          <span style={{ color: "#797979" }}>{placeData?.type}</span>
          <p style={{ marginTop: "0.35rem", marginBottom: 0 }}>
            {placeData?.description}
          </p>
        </Col>
        <Col
          className="hide-scroll"
          style={{
            width: 300,
            overflowY: "auto",
            minHeight: 0,
            position: "relative",
          }}
        >
          <div style={{ position: "absolute", width: "100%", height: "100%" }}>
            <LazyReviewList
              placeId={placeData?._id}
              load={open}
              state={[reviews, setReviews]}
              readOnly
            />
          </div>
        </Col>
      </Row>
    </>
  );
}
