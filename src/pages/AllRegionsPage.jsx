import { Button, Card, Flex } from "antd";
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
const { Meta } = Card;

function AllRegionsPage() {
  const { isLoggedIn, user } = useContext(AuthContext);
  console.log(user)

  const [regions, setRegions] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/regions`)
      .then((response) => {
        setRegions(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const truncateDescription = (description) => {
    return description.slice(0, 60) + (description.length > 60 ? "..." : "");
  };

  
  const addToFavorites = (regionId) => {
    axios.post(`${import.meta.env.VITE_API_URL}/api/regions/${regionId}/favorites`, {
      userId: user._id,
    })
    .then((response) => {
      console.log(response)
      console.log("Region added to favorites successfully!");
      alert("Region added to favorites successfully!");
    })
    .catch((err) => {
      console.error("Error adding region to favorites:", err);
      alert("Error adding region to favorites. Please try again later.");
    });
  };
  

  const isFavorite = (regionId) => {
    if (user && user.favoritesRegions) {
      return user.favoritesRegions.includes(regionId);
    }
    return false;
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
            <Card
              hoverable
              style={{ width: 300, margin: 20 }}
              cover={<img alt={region.name} src={region.imageUrl} style={{ width: "100%", height: "200px", objectFit: "cover" }}/>}
            >
              <Meta
                title={region.name}
                description={truncateDescription(region.description)}
              />
              <br></br>
              <Flex gap="small" wrap="wrap">
              {isLoggedIn && (
                    <button onClick={() => addToFavorites(region._id)} style={{ background: 'none', border: 'none', cursor: 'pointer', outline: 'none' }}>
                      {isFavorite(region._id) ? <HeartFilled style={{ color: '#5F4E44' }} /> : <HeartOutlined />}
                    </button>
                  )}
                  <Button type="link" style={{ color: "#5F4E44" }}>Read more</Button>
              </Flex>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default AllRegionsPage;
