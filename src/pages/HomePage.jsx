import { Button, Card, Flex, Input, List, Select } from "antd";
import axios from "axios";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const { Meta } = Card;
const { Option } = Select;

const MotionCard = motion(Card);
const MotionButton = motion(Button);

function HomePage() {
  const [regions, setRegions] = useState([]);
  const [cities, setCities] = useState([]);
  const [places, setPlaces] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [searchType, setSearchType] = useState("all");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/regions`)
      .then((response) => {
        const shuffledRegions = response.data.sort(() => Math.random() - 0.5);
        setRegions(shuffledRegions.slice(0, 8));
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(`${import.meta.env.VITE_API_URL}/api/cities`)
      .then((response) => {
        const shuffledCities = response.data.sort(() => Math.random() - 0.5);
        setCities(shuffledCities.slice(0, 8));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const truncateDescription = (description) => {
    return description.slice(0, 60) + (description.length > 60 ? "..." : "");
  };

  const handleSearchChange = (value) => {
    setSearchValue(value);
  };

  const handleTypeChange = (value) => {
    setSearchType(value);
  };

  const filteredData = () => {
    let filteredItems = [];

    if (searchType === "all") {
      filteredItems = regions.concat(cities).concat(places);
    } else if (searchType === "regions") {
      filteredItems = regions;
    } else if (searchType === "cities") {
      filteredItems = cities;
    } else if (searchType === "places") {
      filteredItems = places;
    }
    // console.log(
    //   filteredItems.filter((item) =>
    //     item.name.toLowerCase().includes(searchValue.toLowerCase())
    //   ),
    //   searchValue,
    //   searchType
    // );
    return filteredItems.filter((item) =>
      item.name.toLowerCase().includes(searchValue.toLowerCase())
    );
  };

  const renderPlaceCards = () => {
    return (
      <React.Fragment>
        <MotionCard
          initial={{ opacity: 0, bottom: -50 }}
          viewport={{ amount: 0.3, once: true }}
          whileInView={{ opacity: 1, bottom: 0 }}
          transition={{ duration: 0.7 }}
          hoverable
          style={{ width: 200, margin: 20 }}
          cover={
            <Link
              to={{ pathname: "/places/cultural" }}
              style={{ textDecoration: "none", width: "100%" }}
            >
              <img
                alt="Cultural"
                src="https://www.meisterdrucke.lu/kunstwerke/1260px/Sandro_Botticelli_-_Venus_-_%28MeisterDrucke-686929%29.jpg"
                style={{ height: 200, objectFit: "cover", width: "100%" }}
              />
            </Link>
          }
        >
          <Link
            to={{ pathname: "/places/cultural" }}
            style={{ textDecoration: "none", width: "100%" }}
          >
            <Meta
              title="Art&Culture"
              description="Explore Italy's Cultural Wonders: Where Every Place Tells a Story of Beauty and History."
            />
          </Link>
        </MotionCard>

        <MotionCard
          initial={{ opacity: 0, bottom: -50 }}
          viewport={{ amount: 0.3, once: true }}
          whileInView={{ opacity: 1, bottom: 0 }}
          transition={{ duration: 0.7 }}
          hoverable
          style={{ width: 200, margin: 20 }}
          cover={
            <Link
              to={{ pathname: "/places/food&wine" }}
              style={{ textDecoration: "none", width: "100%" }}
            >
              <img
                alt="Food&Wine"
                src="https://t3.ftcdn.net/jpg/02/39/91/54/360_F_239915415_3o2mMjkYZNrSsvyKWQaFuw9GYOs9OzzH.jpg"
                style={{ height: 200, objectFit: "cover", width: "100%" }}
              />
            </Link>
          }
        >
          <Link
            to={{ pathname: "/places/food&wine" }}
            style={{ textDecoration: "none", width: "100%" }}
          >
            <Meta
              title="Food&Wine"
              description="Indulge in Italy's flavorful symphony: Taste the Passion, Savor the Tradition"
            />
          </Link>
        </MotionCard>

        <MotionCard
          initial={{ opacity: 0, bottom: -50 }}
          viewport={{ amount: 0.3, once: true }}
          whileInView={{ opacity: 1, bottom: 0 }}
          transition={{ duration: 0.7 }}
          hoverable
          style={{ width: 200, margin: 20 }}
          cover={
            <Link
              to={{ pathname: "/places/villages" }}
              style={{ textDecoration: "none", width: "100%" }}
            >
              <img
                alt="Villages"
                src="https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/positano-fishing-village-amalfi-coast-campania-italy-20170918-v2-vertical-wingsdomain-art-and-photography.jpg"
                style={{ height: 200, objectFit: "cover", width: "100%" }}
              />
            </Link>
          }
        >
          <Link
            to={{ pathname: "/places/villages" }}
            style={{ textDecoration: "none", width: "100%" }}
          >
            <Meta
              title="Villages"
              description="Step into Italy's Timeless Charm: Where Every Village Tells a Story of Tradition and Warmth."
            />
          </Link>
        </MotionCard>

        <MotionCard
          initial={{ opacity: 0, bottom: -50 }}
          viewport={{ amount: 0.3, once: true }}
          whileInView={{ opacity: 1, bottom: 0 }}
          transition={{ duration: 0.7 }}
          hoverable
          style={{ width: 200, margin: 20 }}
          cover={
            <Link
              to={{ pathname: "/places/nature" }}
              style={{ textDecoration: "none", width: "100%" }}
            >
              <img
                alt="Nature"
                src="https://handluggageonly.co.uk/wp-content/uploads/2018/09/Hand-Luggage-Only-15-4.jpg"
                style={{ height: 200, objectFit: "cover", width: "100%" }}
              />
            </Link>
          }
        >
          <Link
            to={{ pathname: "/places/nature" }}
            style={{ textDecoration: "none", width: "100%" }}
          >
            <Meta
              title="Nature"
              description="Embrace Italy's Natural Splendor: Where beauty blooms and serenity flourishes."
            />
          </Link>
        </MotionCard>

        <MotionCard
          initial={{ opacity: 0, bottom: -50 }}
          viewport={{ amount: 0.3, once: true }}
          whileInView={{ opacity: 1, bottom: 0 }}
          transition={{ duration: 0.7 }}
          hoverable
          style={{ width: 200, margin: 20 }}
          cover={
            <Link
              to={{ pathname: "/places/relax&wellness" }}
              style={{ textDecoration: "none", width: "100%" }}
            >
              <img
                alt="Relax&Wellness"
                src="https://domusdejanas.com/wp-content/uploads/2015/02/centrospa.jpg"
                style={{ height: 200, objectFit: "cover", width: "100%" }}
              />
            </Link>
          }
        >
          <Link
            to={{ pathname: "/places/relax&wellness" }}
            style={{ textDecoration: "none", width: "100%" }}
          >
            <Meta
              title="Relax&Wellness"
              description="Revel in Italy's Tranquil Retreats: Renew Your Soul in the Heart of Relaxation."
            />
          </Link>
        </MotionCard>
      </React.Fragment>
    );
  };

  return (
    <div>
      <div>
        <video autoPlay loop muted width="100%" height="auto">
          <source src="/Video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "200px",
        }}
      >
        <img
          src="/logo-italiamo.png"
          alt="Logo Italiamo"
          width="400"
          height="auto"
        />
      </div>

      <div
        style={{
          marginTop: "150px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#FDFCFA",
        }}
      >
        <div style={{ display: "flex" }}>
          <Select
            defaultValue="all"
            onChange={handleTypeChange}
            style={{ width: 120, marginRight: 10 }}
          >
            <Option value="all">All</Option>
            <Option value="regions">Regions</Option>
            <Option value="cities">Cities</Option>
            <Option value="places">Places</Option>
          </Select>
          <Input
            placeholder={`Search ${searchType}`}
            value={searchValue}
            onChange={(e) => handleSearchChange(e.target.value)}
            style={{ width: 200, marginBottom: 10 }}
          />
        </div>
        <div style={{ position: "relative", width: "100%" }}>
          {searchValue && (
            <div
              style={{
                position: "absolute",
                top: "calc(100% + 5px)",
                left: "0",
                width: "100%",
                zIndex: "1",
                background: "#fff",
                border: "1px solid #d9d9d9",
                borderRadius: "4px",
                maxHeight: "200px",
                overflowY: "auto",
              }}
            >
              <List
                dataSource={filteredData()}
                renderItem={(item) => (
                  <List.Item key={item._id}>
                    <a>{item.name}</a>
                  </List.Item>
                )}
              />
            </div>
          )}
        </div>
      </div>

      <div style={{ marginTop: "100px" }}>
        <motion.h2
          initial={{ opacity: 0, bottom: -50 }}
          viewport={{ amount: 0.3, once: true }}
          whileInView={{ opacity: 1, bottom: 0 }}
          transition={{ duration: 0.7 }}
        >
          Regions
        </motion.h2>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-around",
          }}
        >
          {regions.map((region) => (
            <MotionCard
              initial={{ opacity: 0, bottom: -50 }}
              viewport={{ amount: 0.3, once: true }}
              whileInView={{ opacity: 1, bottom: 0 }}
              transition={{ duration: 0.7 }}
              key={region._id}
              hoverable
              style={{ width: 300, margin: 20 }}
              cover={
                <Link
                  to={`/regions/${region._id}`}
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                    width: "100%",
                  }}
                >
                  <img
                    alt={region.name}
                    src={region.imageUrl.replace(
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
                to={`/regions/${region._id}`}
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  width: "100%",
                }}
              >
                <Meta
                  title={region.name}
                  description={truncateDescription(region.description)}
                />
                <br></br>
                <Flex gap="small" wrap="wrap">
                  <Button type="link" style={{ color: "#5F4E44" }}>
                    Read more
                  </Button>
                </Flex>
              </Link>
            </MotionCard>
          ))}
        </div>
        <Link to="/regions" style={{ textDecoration: "none" }}>
          <Button
            initial={{ opacity: 0, bottom: -50 }}
            viewport={{ amount: 0.3, once: true }}
            whileInView={{ opacity: 1, bottom: 0 }}
            transition={{ duration: 0.7 }}
            type="primary"
            style={{ background: "#927766" }}
          >
            Discover all regions
          </Button>
        </Link>
      </div>
      <br />

      <div>
        <motion.h2
          initial={{ opacity: 0, bottom: -50 }}
          viewport={{ amount: 0.3, once: true }}
          whileInView={{ opacity: 1, bottom: 0 }}
          transition={{ duration: 0.7 }}
        >
          Cities
        </motion.h2>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-around",
          }}
        >
          {cities.map((city) => (
            <MotionCard
              initial={{ opacity: 0, bottom: -50 }}
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
                to={`/regions/${city.region._id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Meta
                  title={city.name}
                  description={truncateDescription(city.description)}
                />
                <p style={{ margin: "10px 0", fontWeight: "bold" }}>
                  {city.region.name}
                </p>
                <Flex
                  gap="small"
                  wrap="wrap"
                  style={{ justifyContent: "flex-end" }}
                ></Flex>
              </Link>
            </MotionCard>
          ))}
        </div>
        <Link to="/cities" style={{ textDecoration: "none" }}>
          <Button
            initial={{ opacity: 0, bottom: -50 }}
            viewport={{ amount: 0.3, once: true }}
            whileInView={{ opacity: 1, bottom: 0 }}
            transition={{ duration: 0.7 }}
            type="primary"
            style={{ background: "#927766" }}
          >
            Discover all cities
          </Button>
        </Link>
      </div>

      <br />

      <div>
        <h2>Getting inspiration</h2>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-around",
          }}
        >
          {renderPlaceCards()}
        </div>

        <div style={{ marginBottom: "50px" }}>
          <Link to="/places/allplaces" style={{ textDecoration: "none" }}>
            <Button
              initial={{ opacity: 0, bottom: -50 }}
              viewport={{ amount: 0.3, once: true }}
              whileInView={{ opacity: 1, bottom: 0 }}
              transition={{ duration: 0.7 }}
              type="primary"
              style={{ background: "#927766" }}
            >
              Discover all places
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
