import { Button, Card, Flex } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const { Meta } = Card;

function AllCitiesPage() {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/cities`)
      .then((response) => {
        setCities(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const truncateDescription = (description) => {
    return description.slice(0, 60) + (description.length > 60 ? "..." : "");
  };

  return (
    <div>
      <div
        style={{
          backgroundImage:
            'url("https://i0.wp.com/www.viaggiascrittori.com/wp-content/uploads/2019/01/43904814971_95aecd48bc_b.jpg?fit=1024%2C683&ssl=1")',
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
          All Italian Cities
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
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
        }}
      >
        {cities.map((city) => {
          console.log(city);
          {
            /*           <Link to={`/cities/${city._id}`} key={city._id} style={{ textDecoration: "none", color: "inherit" }}>
             */
          }
          return (
            <Card
              key={city._id}
              hoverable
              style={{ width: 300, margin: 20 }}
              cover={<img alt={city.name} src={city.imageUrl} style={{ width: "100%", height: "200px", objectFit: "cover" }}/>}
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
                <Button>Add to favourite</Button>
                <Button type="link">Read more</Button>
              </Flex>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export default AllCitiesPage;
