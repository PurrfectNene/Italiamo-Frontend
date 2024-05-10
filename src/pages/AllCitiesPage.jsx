import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import { Button, Card, Flex, Input, Pagination, Select } from "antd";
import axios from "axios";
import { motion } from "framer-motion";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

const MotionCard = motion(Card);

const { Meta } = Card;
const { Option } = Select;

function AllCitiesPage() {
  const { isLoggedIn, user } = useContext(AuthContext);
  const [cities, setCities] = useState([]);
  const [sortBy, setSortBy] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [citiesPerPage] = useState(6);
  const [filteredCities, setFilteredCities] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [citiesMaster, setCitiesMaster] = useState([]);
  const [favoritesCities, setFavoritesCities] = useState([]);
  const [firstTime, setFirstTime] = useState(true);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/cities`)
      .then((response) => {
        setCities(response.data);
        setFilteredCities(response.data);
        setCitiesMaster(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
    if (isLoggedIn && user) {
      axios
        .get(
          `${import.meta.env.VITE_API_URL}/api/users/${
            user._id
          }/favoritesCities`
        )
        .then((response) => {
          // console.log("fetched")
          setFavoritesCities(response.data);
          // console.log(response.data)
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isLoggedIn, user]);

  useEffect(() => {
    const indexOfLastCity = currentPage * citiesPerPage;
    const indexOfFirstCity = indexOfLastCity - citiesPerPage;
    const currentCities = filteredCities.slice(
      indexOfFirstCity,
      indexOfLastCity
    );
    setCities(currentCities);
  }, [filteredCities, currentPage, citiesPerPage]);

  const paginate = (pageNumber) => {
    setFirstTime(false);
    setCurrentPage(pageNumber);
  };

  const truncateDescription = (description) => {
    return description.slice(0, 60) + (description.length > 60 ? "..." : "");
  };

  const handleSort = (value) => {
    setSortBy(value);
    let sortedCities = [...cities];
    if (value === "alphabetical") {
      sortedCities.sort((a, b) => a.name.localeCompare(b.name));
    } else if (value === "reverse_alphabetical") {
      sortedCities.sort((a, b) => b.name.localeCompare(a.name));
    }
    setFilteredCities(sortedCities);
  };

  const handleSearch = (e) => {
    const searchText = e.target.value.toLowerCase();
    setSearchInput(e.target.value);
    if (searchText === "") {
      setFilteredCities(citiesMaster);
    } else {
      const filteredCities = cities.filter((city) =>
        city.region.name.toLowerCase().startsWith(searchText)
      );
      setFilteredCities(filteredCities);
    }
  };

  const toggleFavorite = (cityId) => {
    if (favoritesCities.includes(cityId)) {
      removeFavorite(cityId);
    } else {
      addFavorite(cityId);
    }
  };

  const addFavorite = (cityId) => {
    axios
      .post(`${import.meta.env.VITE_API_URL}/api/cities/${cityId}/favorites`, {
        userId: user._id,
      })
      .then((response) => {
        // console.log(response)
        // console.log("City added to favorites successfully!");
        alert("City added to favorites successfully!");
      })
      .catch((err) => {
        console.error("Error adding city to favorites:", err);
        alert("Error adding city to favorites. Please try again later.");
      });
  };

  const removeFavorite = (cityId) => {
    axios
      .delete(
        `${import.meta.env.VITE_API_URL}/api/cities/${cityId}/favorites/${
          user._id
        }`
      )
      .then((response) => {
        setFavoritesCities(favoritesCities.filter((id) => id !== cityId));
        // console.log("City removed from favorites successfully!");
        alert("City removed from favorites successfully!");
      })
      .catch((err) => {
        console.error("Error removing city from favorites:", err);
        alert("Error removing city from favorites. Please try again later.");
      });
  };

  const isFavorite = (cityId) => {
    if (user && user.favoritesCities)
      return user.favoritesCities.includes(cityId);
  };

  return (
    <div>
      <div
        style={{
          backgroundImage:
            'url("https://cdn.kimkim.com/files/a/images/55d7ea8718fda7b5b1c4c3a68f239c128e5b29a6/original-3e27ca9d22872719551bce400ed6a7db.jpg")',
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
          Italian Cities
        </h1>
      </div>
      <div
        style={{
          backgroundColor: "rgba(242, 240, 228, 0.2)",
          padding: "20px",
          textAlign: "center",
        }}
      >
        <h2 style={{ fontSize: "36px" }}>
          Italian cities are unique places full of art, history and culture that
          will easily enchant you
        </h2>
        <p style={{ fontSize: "20px" }}>
          From the art filled streets of Florence to the romantic canals of
          Venice, every Italian city has unparalleled charm waiting to be
          discovered. Enjoy a relaxing holiday, discover some of the most
          incredible history in the world, and taste delicious food and wine for
          which Italy is famous worldwide.
        </p>
      </div>
      <div style={{ marginBottom: "20px", textAlign: "center" }}>
        <Select
          defaultValue="Sort..."
          style={{ width: 120, marginRight: "10px" }}
          onChange={handleSort}
        >
          <Option value="alphabetical">A-Z</Option>
          <Option value="reverse_alphabetical">Z-A</Option>
        </Select>
        <Input
          placeholder="Search by region..."
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
        {filteredCities.map((city) => {
          return (
            <MotionCard
              initial={{
                opacity: !firstTime ? 1 : 0,
                bottom: !firstTime ? 0 : -50,
              }}
              viewport={{ amount: 0.3, once: true }}
              whileInView={{ opacity: 1, bottom: 0 }}
              transition={{ duration: 0.7 }}
              key={city._id}
              hoverable
              style={{ width: 300, margin: 20 }}
              cover={
                <Link
                  to={`/cities/${city._id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <img
                    alt={city.name}
                    src={city.imageUrl.replace(
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
                to={`/cities/${city._id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Meta
                  title={city.name}
                  description={truncateDescription(city.description)}
                />
                <p style={{ margin: "10px 0", fontWeight: "bold" }}>
                  {city.region.name}
                </p>
              </Link>
              <Flex
                gap="small"
                wrap="wrap"
                style={{ justifyContent: "flex-end" }}
              >
                {isLoggedIn && (
                  <button
                    onClick={() => toggleFavorite(city._id)}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      outline: "none",
                    }}
                  >
                    {favoritesCities.includes(city._id) ? (
                      <HeartFilled style={{ color: "#5F4E44" }} />
                    ) : (
                      <HeartOutlined />
                    )}
                  </button>
                )}
                <Link
                  to={`/cities/${city._id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <Button type="link" style={{ color: "#5F4E44" }}>
                    Read more
                  </Button>
                </Link>
              </Flex>
            </MotionCard>
          );
        })}
      </div>
      <div style={{ textAlign: "center", paddingBottom: 20, marginTop: 80 }}>
        <Pagination
          current={currentPage}
          onChange={paginate}
          pageSize={citiesPerPage}
          total={filteredCities.length}
        />
      </div>
    </div>
  );
}

export default AllCitiesPage;
