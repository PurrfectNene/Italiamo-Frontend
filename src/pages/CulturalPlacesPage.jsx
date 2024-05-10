import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import { Card, Flex, Input, Select } from "antd";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import usePlaceModal from "../hooks/usePlaceModal";

const { Meta } = Card;

function CulturalPlacesPage() {
  const { isLoggedIn, user } = useContext(AuthContext);
  const [places, setPlaces] = useState([]);
  const [sortBy, setSortBy] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [placesPerPage] = useState(14);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [placesMaster, setPlacesMaster] = useState([]);
  const [favoritesPlaces, setFavoritesPlaces] = useState([]);

  // Place modal
  const { showModal, Modal } = usePlaceModal();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/places/type/Cultural`)
      .then((response) => {
        setPlaces(response.data);
        setFilteredPlaces(response.data);
        setPlacesMaster(response.data);
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
          console.log("fetched");
          setFavoritesPlaces(response.data);
          console.log(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isLoggedIn, user]);

  useEffect(() => {
    const indexOfLastPlace = currentPage * placesPerPage;
    const indexOfFirstPlace = indexOfLastPlace - placesPerPage;
    const currentPlaces = filteredPlaces.slice(
      indexOfFirstPlace,
      indexOfLastPlace
    );
    setPlaces(currentPlaces);
  }, [filteredPlaces, currentPage, placesPerPage]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const truncateDescription = (description) => {
    return description.slice(0, 60) + (description.length > 60 ? "..." : "");
  };

  const handleSort = (value) => {
    setSortBy(value);
    let sortedPlaces = [...places];
    if (value === "alphabetical") {
      sortedPlaces.sort((a, b) => a.name.localeCompare(b.name));
    } else if (value === "reverse_alphabetical") {
      sortedPlaces.sort((a, b) => b.name.localeCompare(a.name));
    }
    setFilteredPlaces(sortedPlaces);
  };

  const handleSearch = (e) => {
    console.log("in handleSearch");
    const searchText = e.target.value.toLowerCase();
    setSearchInput(e.target.value); // Try track search input separately
    if (searchText === "") {
      console.log("in if statement empty string");
      setFilteredPlaces(placesMaster); // And here reset filter
      setPlaces(placesMaster);
    } else {
      console.log("in else filtering");
      const filteredPlaces = places.filter((place) =>
        place.city.name.toLowerCase().startsWith(searchText)
      );
      setFilteredPlaces(filteredPlaces);
      setPlaces(filteredPlaces);
    }
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
        console.log(response);
        console.log("Place added to favorites successfully!");
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
        console.log(response);
        console.log("Place removed from favorites successfully!");
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

  return (
    <div>
      <Modal />
      <div
        style={{
          backgroundImage:
            'url("https://ichef.bbci.co.uk/images/ic/1920x1080/p0bwmfzm.jpg")',
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
          Art&Culture
        </h1>
      </div>
      <div
        style={{
          backgroundColor: "rgba(242, 240, 228, 0.2)",
          padding: "20px",
          textAlign: "center",
        }}
      >
        <h2 style={{ fontSize: "36px" }}>Explore Cultural Gems</h2>
        <p style={{ fontSize: "20px" }}>
          Discover places rich in culture and history waiting to be explored.
        </p>
      </div>
      <div style={{ marginBottom: "20px", textAlign: "center" }}>
        <Select
          defaultValue="Sort..."
          style={{ width: 120, marginRight: "10px" }}
          onChange={handleSort}
        >
          <Select.Option value="alphabetical">A-Z</Select.Option>
          <Select.Option value="reverse_alphabetical">Z-A</Select.Option>
        </Select>
        <Input
          placeholder="Search by city"
          onChange={handleSearch}
          style={{ width: 200 }}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
        }}
      >
        {places.map((place) => (
          <Card
            key={place._id}
            hoverable
            style={{ width: 300, margin: 20 }}
            cover={
              <Link
                onClick={() => showModal({ id: place._id, name: place.name })}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <img
                  alt={place.name}
                  src={place.imageUrl.replace(
                    "upload/",
                    "upload/c_scale,w_500/"
                  )}
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                  }}
                />
              </Link>
            }
          >
            <Link
              onClick={() => showModal({ id: place._id, name: place.name })}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Meta
                title={place.name}
                description={truncateDescription(place.description)}
              />
            </Link>
            <Flex
              gap="small"
              wrap="wrap"
              style={{ justifyContent: "flex-end" }}
            >
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
              <Link
                to={`/cities/${place.city._id}`}
                style={{ textDecoration: "none", color: "#5F4E44" }}
              >
                <p style={{ margin: "10px 0", fontWeight: "bold" }}>
                  {place.city.name}
                </p>
              </Link>
            </Flex>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default CulturalPlacesPage;
