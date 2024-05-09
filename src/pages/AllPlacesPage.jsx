import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import { Button, Card, Flex } from "antd";
import axios from "axios";
import { motion } from "framer-motion";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import usePlaceModal from "../hooks/usePlaceModal";
const { Meta } = Card;

const MotionCard = motion(Card);

function AllPlacesPage() {
  const placesShuffleCache = useRef({});
  const { isLoggedIn, user } = useContext(AuthContext);
  const [places, setPlaces] = useState([]);
  const [favoritesPlaces, setFavoritesPlaces] = useState([]);
  // Place modal
  const { showModal, Modal } = usePlaceModal();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/places`)
      .then((response) => {
        setPlaces(response.data);
      })
      .catch((err) => {
        console.log(err);
      });

    if (isLoggedIn && user) {
      axios
        .get(
          `${import.meta.env.VITE_API_URL}/api/users/${
            user._id
          }/favoritesPlaces`
        )
        .then((response) => {
          // console.log("fetched");
          setFavoritesPlaces(response.data);
          // console.log(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isLoggedIn, user]);

  const truncateDescription = (description) => {
    return description.slice(0, 60) + (description.length > 60 ? "..." : "");
  };

  const shuffleArray = (array) => {
    let currentIndex = array.length,
      temporaryValue,
      randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  };

  const toggleFavorite = (placeId) => {
    if (favoritesPlaces.includes(placeId)) {
      removeFavorite(placeId);
    } else {
      addFavorite(placeId);
    }
  };

  const addFavorite = (placeId) => {
    axios
      .post(`${import.meta.env.VITE_API_URL}/api/places/${placeId}/favorites`, {
        userId: user._id,
      })
      .then((response) => {
        // console.log(response);
        // console.log("Place added to favorites successfully!");
        alert("Place added to favorites successfully!");
      })
      .catch((err) => {
        console.error("Error adding place to favorites:", err);
        alert("Error adding place to favorites. Please try again later.");
      });
  };

  const removeFavorite = (placeId) => {
    axios
      .delete(
        `${import.meta.env.VITE_API_URL}/api/regions/${placeId}/favorites/${
          user._id
        }`
      )
      .then((response) => {
        // console.log(response);
        // console.log("Place removed from favorites successfully!");
        alert("Place removed from favorites successfully!");
      })
      .catch((err) => {
        console.error("Error removing place from favorites:", err);
        alert("Error removing place from favorites. Please try again later.");
      });
  };
  const isFavorite = (placeId) => {
    if (user && user.favoritesPlaces) {
      return user.favoritesRegions.includes(placeId);
    }
    return false;
  };

  const renderPlacesByType = (type) => {
    let shuffledPlaces;

    if (
      placesShuffleCache.current[type] &&
      placesShuffleCache.current[type].length > 0
    ) {
      shuffledPlaces = placesShuffleCache.current[type];
    } else {
      const filteredPlaces = places.filter((place) => place.type === type);
      shuffledPlaces = shuffleArray(filteredPlaces).slice(0, 8);
      placesShuffleCache.current[type] = shuffledPlaces;
    }

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
          {shuffledPlaces.map((place) => (
            <MotionCard
              initial={{ opacity: 0, bottom: -50 }}
              viewport={{ amount: 0.3, once: true }}
              whileInView={{ opacity: 1, bottom: 0 }}
              transition={{ duration: 0.7 }}
              key={place._id}
              hoverable
              style={{ width: 300, margin: 20 }}
              cover={
                <img
                  style={{ height: 200 }}
                  alt={place.name}
                  src={place.imageUrl.replace(
                    "upload/",
                    "upload/c_scale,w_500/"
                  )}
                />
              }
              onClick={() => showModal({ id: place._id, name: place.name })}
            >
              <Meta
                title={place.name}
                description={truncateDescription(place.description)}
              />
              <br />
              <Flex gap="small" wrap="wrap">
                {isLoggedIn && (
                  <button
                    onClick={() => toggleFavorite(place._id)}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      outline: "none",
                    }}
                  >
                    {favoritesPlaces.includes(place._id) ? (
                      <HeartFilled style={{ color: "#5F4E44" }} />
                    ) : (
                      <HeartOutlined />
                    )}
                  </button>
                )}
                <Button type="link">Details</Button>
              </Flex>
            </MotionCard>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div>
      <Modal />
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
      <div id="cultural">
        {renderPlacesByType("Cultural")}
        <Link to="/places/cultural">
          <Button
            type="primary"
            style={{
              background: "#927766",
              marginTop: "20px",
              marginBottom: "50px",
            }}
          >
            Discover all cultural places
          </Button>
        </Link>
      </div>
      <div id="food&wine">
        {renderPlacesByType("Food&Wine")}
        <Link to="/places/food&wine">
          <Button
            type="primary"
            style={{
              background: "#927766",
              marginTop: "20px",
              marginBottom: "50px",
            }}
          >
            Discover all food places
          </Button>
        </Link>
      </div>
      <div id="relax&wellness">
        {renderPlacesByType("Relax&Wellness")}
        <Link to="//places/relax&wellness">
          <Button
            type="primary"
            style={{
              background: "#927766",
              marginTop: "20px",
              marginBottom: "50px",
            }}
          >
            Discover all relax & wellness places
          </Button>
        </Link>
      </div>
      <div id="villages">
        {renderPlacesByType("Villages")}
        <Link to="//places/villages">
          <Button
            type="primary"
            style={{
              background: "#927766",
              marginTop: "20px",
              marginBottom: "50px",
            }}
          >
            Discover all villages
          </Button>
        </Link>
      </div>
      <div id="nature">
        {renderPlacesByType("Nature")}
        <Link to="/places/nature">
          <Button
            type="primary"
            style={{
              background: "#927766",
              marginTop: "20px",
              marginBottom: "50px",
            }}
          >
            Discover all nature places
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default AllPlacesPage;
