import { Col, Row } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PlaceHoverableCard from "../components/PlaceHoverableCard";

function CityDetailsPage() {
  const { id } = useParams();
  const [city, setCity] = useState(null);
  const [places, setPlaces] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(0);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/cities/${id}`)
      .then((response) => {
        setCity(response.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(`${import.meta.env.VITE_API_URL}/api/cities/${id}/places`)
      .then((response) => {
        setPlaces(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  if (!city) {
    return <div>Loading...</div>;
  }
  return (
    <div
      style={{
        paddingLeft: "2rem",
        paddingRight: "2rem",
        paddingBottom: "2rem",
        height: "calc(100svh - 60px)",
      }}
    >
      <article
        id="city-info"
        style={{
          backgroundColor: "white",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "100%",
          maxHeight: "100%",
        }}
      >
        <Row
          style={{
            width: "100%",
            maxWidth: 1200,
            alignItems: "center",
          }}
        >
          <h1 style={{ marginTop: 0, marginBottom: 0, fontSize: "2rem" }}>
            {city.name}
          </h1>
        </Row>
        <Row
          style={{
            width: "100%",
            maxWidth: 1200,
            marginTop: "1rem",
            gap: "1rem",
            flex: 1,
            minHeight: 0,
          }}
        >
          <Col style={{ flex: 1 }}>
            <img
              src={city?.imageUrl}
              style={{
                boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                objectFit: "cover",
                borderRadius: "1rem",
              }}
              width="100%"
              height="100%"
            />
          </Col>
          <Col
            className="hide-scroll"
            style={{
              width: 160,
              overflowY: "auto",
              height: "100%",
              display: "flex",
              flexWrap: "wrap",
              gap: "1rem",
            }}
          >
            {places.map((place, index) => (
              <PlaceHoverableCard
                key={index}
                onClick={() => setSelectedPlace(index)}
                data={place}
              />
            ))}
          </Col>
          <Col
            style={{
              width: 360,
              boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
              //   height: "100%",
              height: "fit-content",
              borderRadius: "1rem",
              padding: "1.25rem",
            }}
          >
            {places?.[selectedPlace]?._id && (
              <Link to={`/places/${places?.[selectedPlace]?._id}`}>
                <img
                  src={places?.[selectedPlace]?.imageUrl}
                  width="100%"
                  height="200px"
                  style={{ borderRadius: "0.5rem" }}
                />
              </Link>
            )}
            <h1
              style={{
                marginTop: "0.25rem",
                marginBottom: 0,
                fontSize: "1.5rem",
              }}
            >
              {places?.[selectedPlace]?.name}
            </h1>
            <span style={{ color: "#797979" }}>
              {places?.[selectedPlace]?.type}
            </span>
            <p style={{ marginTop: "0.35rem", marginBottom: 0 }}>
              {places?.[selectedPlace]?.description}
            </p>
          </Col>
        </Row>
      </article>
    </div>
  );
}

export default CityDetailsPage;
