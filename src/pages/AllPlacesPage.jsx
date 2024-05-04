import { Button, Card, Flex } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
const { Meta } = Card;

function AllPlacesPage() {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/places`) // Fetch all places
      .then((response) => {
        setPlaces(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const truncateDescription = (description) => {
    return description.slice(0, 60) + (description.length > 60 ? "..." : "");
  };

  const renderPlacesByType = (type) => {
    const filteredPlaces = places.filter((place) => place.type === type);
    return (
      <div key={type}>
        <h1>{type}</h1>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-around",
          }}
        >
          {filteredPlaces.map((place) => (
            <Card
              key={place._id}
              hoverable
              style={{ width: 300, margin: 20 }}
              cover={<img alt={place.name} src={place.imageUrl} />}
            >
              <Meta
                title={place.name}
                description={truncateDescription(place.description)}
              />
              <br></br>
              <Flex gap="small" wrap="wrap">
                <Button type="link">Details</Button>
              </Flex>
            </Card>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div>
      <div
        style={{
          backgroundImage:
            'url("https://www.traveltaormina.com/templates/yootheme/cache/b9/teatro-greco-taormina-b9f83c50.webp")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "50vh",
        }}
      >
        <h1
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            fontWeight: "bold",
            color: "#fff",
            fontSize: "46px",
          }}
        >
          All Places
        </h1>
      </div>
      <div
        style={{
          backgroundColor: "rgba(242, 240, 228, 0.2)",
          padding: "20px",
          textAlign: "center",
        }}
      >
        <h2 style={{ fontSize: "36px" }}>Explore all places in Italy</h2>
        <p style={{ fontSize: "20px" }}>
          Discover the beauty and uniqueness of all places in Italy.
        </p>
      </div>
      {renderPlacesByType("Cultural")}
      {renderPlacesByType("Food&Wine")}
      {renderPlacesByType("Relax&Wellness")}
      {renderPlacesByType("Villages")}
      {renderPlacesByType("Nature")}
    </div>
  );
}

export default AllPlacesPage;
