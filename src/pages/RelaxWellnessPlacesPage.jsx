import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import { Card, Flex, Input, Pagination, Select } from "antd";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import usePlaceModal from "../hooks/usePlaceModal";

const { Meta } = Card;

function RelaxWellnessPlacesPage() {
  const { isLoggedIn, user } = useContext(AuthContext);
  const [places, setPlaces] = useState([]);
  const [sortBy, setSortBy] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [placesPerPage] = useState(14);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [placesMaster, setPlacesMaster] = useState([]);
  // Place modal
  const { showModal, Modal } = usePlaceModal();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/places/type/Relax&Wellness`)
      .then((response) => {
        setPlaces(response.data);
        setFilteredPlaces(response.data);
        setPlacesMaster(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
    const searchText = e.target.value.toLowerCase();
    setSearchInput(e.target.value); // Track search input separately
    if (searchText === "") {
      setFilteredPlaces(placesMaster); // Reset filter if search input is empty
    } else {
      const filteredPlaces = placesMaster.filter((place) =>
        place.city.name.toLowerCase().startsWith(searchText)
      );
      setFilteredPlaces(filteredPlaces);
    }
  };

  const addToFavorites = (placeId) => {
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

  const isFavorite = (placeId) => {
    if (user && user.favoritesPlaces) {
      return user.favoritesPlaces.includes(placeId);
    }
    return false;
  };

  return (
    <div>
      <Modal />
      <div
        style={{
          backgroundImage:
            'url("https://tourismmedia.italia.it/is/image/mitur/3200X960_terme_e_spa_hub-2?wid=1600&hei=480&fit=constrain,1&fmt=webp")',
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
          Relax & Wellness
        </h1>
      </div>
      <div
        style={{
          backgroundColor: "rgba(242, 240, 228, 0.2)",
          padding: "20px",
          textAlign: "center",
        }}
      >
        <h2 style={{ fontSize: "36px" }}>Explore Relaxing Retreats</h2>
        <p style={{ fontSize: "20px" }}>
          Discover places to relax and rejuvenate your body and mind.
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
                  style={{ width: "100%", height: "200px", objectFit: "cover" }}
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
                  onClick={() => addToFavorites(place._id)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    outline: "none",
                  }}
                >
                  {isFavorite(place._id) ? (
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
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: 80,
          paddingBottom: 20,
        }}
      >
        <Pagination
          defaultCurrent={1}
          pageSize={placesPerPage}
          total={filteredPlaces.length}
          onChange={paginate}
        />
      </div>
    </div>
  );
}

export default RelaxWellnessPlacesPage;
