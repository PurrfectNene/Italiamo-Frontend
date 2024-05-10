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

function AllRegionsPage() {
  const [firstTime, setFirstTime] = useState(true);
  const { isLoggedIn, user } = useContext(AuthContext);
  const [regions, setRegions] = useState([]);
  const [sortBy, setSortBy] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [regionsPerPage] = useState(14);
  const [filteredRegions, setFilteredRegions] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [regionsMaster, setRegionsMaster] = useState([]);
  const [favoritesRegions, setFavoritesRegions] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/regions`)
      .then((response) => {
        setRegions(response.data);
        setFilteredRegions(response.data);
        setRegionsMaster(response.data);
      })
      .catch((err) => {
        console.log(err);
      });

    if (isLoggedIn && user) {
      axios
        .get(
          `${import.meta.env.VITE_API_URL}/api/users/${
            user._id
          }/favoritesRegions`
        )
        .then((response) => {
          // console.log("fetched");
          setFavoritesRegions(response.data);
          // console.log(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isLoggedIn, user]);

  useEffect(() => {
    const indexOfLastRegion = currentPage * regionsPerPage;
    const indexOfFirstRegion = indexOfLastRegion - regionsPerPage;
    const currentRegions = filteredRegions.slice(
      indexOfFirstRegion,
      indexOfLastRegion
    );
    setRegions(currentRegions);
  }, [filteredRegions, currentPage, regionsPerPage]);

  const paginate = (pageNumber) => {
    setFirstTime(false);
    setCurrentPage(pageNumber);
  };

  const truncateDescription = (description) => {
    return description.slice(0, 60) + (description.length > 60 ? "..." : "");
  };

  const handleSort = (value) => {
    setSortBy(value);
    let sortedRegions = [...regions];
    if (value === "alphabetical") {
      sortedRegions.sort((a, b) => a.name.localeCompare(b.name));
    } else if (value === "reverse_alphabetical") {
      sortedRegions.sort((a, b) => b.name.localeCompare(a.name));
    }
    setFilteredRegions(sortedRegions);
  };

  const handleSearch = (e) => {
    const searchText = e.target.value.toLowerCase();
    setSearchInput(e.target.value);
    if (searchText === "") {
      setFilteredRegions(regionsMaster);
    } else {
      const filteredRegions = regions.filter((region) =>
        region.name.toLowerCase().includes(searchText)
      );
      setFilteredRegions(filteredRegions);
    }
  };

  const toggleFavorite = (regionId) => {
    if (favoritesRegions.includes(regionId)) {
      removeFavorite(regionId);
    } else {
      addFavorite(regionId);
    }
  };

  const addFavorite = (regionId) => {
    axios
      .post(
        `${import.meta.env.VITE_API_URL}/api/regions/${regionId}/favorites`,
        {
          userId: user._id,
        }
      )
      .then((response) => {
        // console.log(response);
        // console.log("Region added to favorites successfully!");
        alert("Region added to favorites successfully!");
      })
      .catch((err) => {
        console.error("Error adding region to favorites:", err);
        alert("Error adding region to favorites. Please try again later.");
      });
  };

  const removeFavorite = (regionId) => {
    axios
      .delete(
        `${import.meta.env.VITE_API_URL}/api/regions/${regionId}/favorites/${
          user._id
        }`
      )
      .then((response) => {
        // console.log(response);
        // console.log("Region removed from favorites successfully!");
        alert("Region removed from favorites successfully!");
      })
      .catch((err) => {
        console.error("Error removing region from favorites:", err);
        alert("Error removing region from favorites. Please try again later.");
      });
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
          Italian Regions
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
          Go in search of the most beautiful places in Italy, get lost in the
          wonders of its regions
        </h2>
        <p style={{ fontSize: "20px" }}>
          Where to go on holiday in Italy? The Italian regions to visit offer
          something unique and well worth exploring. From the snow capped peaks
          of Veneto, to the sunny beaches of Calabria, each has its own climate
          and landscape. A diversity that is also reflected in the food,
          architecture and even the language spoken.
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
          placeholder="Search region..."
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
        {regions.map((region) => (
          <Link
            to={`/regions/${region._id}`}
            key={region._id}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <MotionCard
              initial={{
                opacity: !firstTime ? 1 : 0,
                bottom: !firstTime ? 0 : -50,
              }}
              viewport={{ amount: 0.3, once: true }}
              whileInView={{ opacity: 1, bottom: 0 }}
              transition={{ duration: 0.7 }}
              hoverable
              style={{ width: 300, margin: 20 }}
              cover={
                <img
                  alt={region.name}
                  src={region.imageUrl.replace(
                    "upload/",
                    "upload/c_scale,w_500/"
                  )}
                  style={{ width: "100%", height: "200px", objectFit: "cover" }}
                />
              }
            >
              <Meta
                title={region.name}
                description={truncateDescription(region.description)}
              />
              <br />
              <Flex gap="small" wrap="wrap">
                {isLoggedIn && (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      toggleFavorite(region._id);
                    }}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      outline: "none",
                    }}
                  >
                    {favoritesRegions.includes(region._id) ? (
                      <HeartFilled style={{ color: "#5F4E44" }} />
                    ) : (
                      <HeartOutlined />
                    )}
                  </button>
                )}
                <Button type="link" style={{ color: "#5F4E44" }}>
                  Read more
                </Button>
              </Flex>
            </MotionCard>
          </Link>
        ))}
      </div>
      <Pagination
        style={{ textAlign: "center", marginTop: 80, paddingBottom: 20 }}
        current={currentPage}
        onChange={paginate}
        pageSize={regionsPerPage}
        total={filteredRegions.length}
      />
    </div>
  );
}

export default AllRegionsPage;
