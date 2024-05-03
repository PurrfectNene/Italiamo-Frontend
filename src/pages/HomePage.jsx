import { Button, Card, Flex, Input, List, Select } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const { Meta } = Card;
const { Option } = Select;

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
        setRegions(response.data.slice(0, 4));
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(`${import.meta.env.VITE_API_URL}/api/cities`)
      .then((response) => {
        setCities(response.data.slice(0, 4));
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(`${import.meta.env.VITE_API_URL}/api/places`)
      .then((response) => {
        setPlaces(response.data.slice(0, 4));
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
    console.log(
      filteredItems.filter((item) =>
        item.name.toLowerCase().includes(searchValue.toLowerCase())
      ),
      searchValue,
      searchType
    );
    return filteredItems.filter((item) =>
      item.name.toLowerCase().includes(searchValue.toLowerCase())
    );
  };

  const renderPlaceCards = () => {
    return (
      <React.Fragment>
        <Card
          hoverable
          style={{ width: 300, margin: 20 }}
          cover={
            <img
              alt="Cultural"
              src="https://www.meisterdrucke.lu/kunstwerke/1260px/Sandro_Botticelli_-_Venus_-_%28MeisterDrucke-686929%29.jpg"
              style={{ height: 200, objectFit: "cover" }}
            />
          }
        >
          <Meta
            title="Art&Culture"
            description="Description of cultural place"
          />
        </Card>
        <Card
          hoverable
          style={{ width: 300, margin: 20 }}
          cover={
            <img
              alt="Food&Wine"
              src="https://t3.ftcdn.net/jpg/02/39/91/54/360_F_239915415_3o2mMjkYZNrSsvyKWQaFuw9GYOs9OzzH.jpg"
              style={{ height: 200, objectFit: "cover" }}
            />
          } // Replace villages.jpg with your image URL
        >
          <Meta title="Food&Wine" description="Description of villages place" />
        </Card>
        <Card
          hoverable
          style={{ width: 300, margin: 20 }}
          cover={
            <img
              alt="Villages"
              src="https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/positano-fishing-village-amalfi-coast-campania-italy-20170918-v2-vertical-wingsdomain-art-and-photography.jpg"
              style={{ height: 200, objectFit: "cover" }}
            />
          } // Replace cultural.jpg with your image URL
        >
          <Meta title="Villages" description="Description of cultural place" />
        </Card>
        <Card
          hoverable
          style={{ width: 300, margin: 20 }}
          cover={
            <img
              alt="Nature"
              src="https://handluggageonly.co.uk/wp-content/uploads/2018/09/Hand-Luggage-Only-15-4.jpg"
              style={{ height: 200, objectFit: "cover" }}
            />
          } // Replace cultural.jpg with your image URL
        >
          <Meta title="Nature" description="Description of cultural place" />
        </Card>
        <Card
          hoverable
          style={{ width: 300, margin: 20 }}
          cover={
            <img
              alt="Relax&Wellness"
              src="https://domusdejanas.com/wp-content/uploads/2015/02/centrospa.jpg"
              style={{ height: 200, objectFit: "cover" }}
            />
          } // Replace cultural.jpg with your image URL
        >
          <Meta
            title="Relax&Wellness"
            description="Description of cultural place"
          />
        </Card>
      </React.Fragment>
    );
  };
  // carrousel & links to revise
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
          backgroundColor: "B76F38",
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
        <h2>Regions</h2>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
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
                cover={<img alt={region.name} src={region.imageUrl} />}
              >
                <Meta
                  title={region.name}
                  description={truncateDescription(region.description)}
                />
                <br></br>
                <Flex gap="small" wrap="wrap">
                  <Button type="link">What to see</Button>
                </Flex>
              </Card>
            </Link>
          ))}
        </div>
        <Link to="/regions">Discover all regions</Link>
      </div>

      <div>
        <h2>Cities</h2>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          {cities.map((city) => (
            <Link
              to={`/cities/${city._id}`}
              key={city._id}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Card
                hoverable
                style={{ width: 300, margin: 20 }}
                cover={<img alt={city.name} src={city.imageUrl} />}
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
                </Link>
                <Flex
                  gap="small"
                  wrap="wrap"
                  style={{ justifyContent: "flex-end" }}
                ></Flex>
              </Card>
            </Link>
          ))}
        </div>
        <Link to="/cities">Discover all cities</Link>
      </div>

      <div>
        <h2>Getting inspiration</h2>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          {renderPlaceCards()}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
