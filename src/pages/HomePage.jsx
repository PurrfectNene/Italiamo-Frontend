import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import { Card, Button, Flex, Input, Select, List } from 'antd';
const { Meta } = Card;
const { Option } = Select;

function HomePage() {
  const [regions, setRegions] = useState([]);
  const [cities, setCities] = useState([]);
  const [places, setPlaces] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [searchType, setSearchType] = useState("all");

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/regions`)
      .then(response => {
        setRegions(response.data.slice(0, 4));
      })
      .catch(err => {
        console.log(err);
      });

    axios.get(`${import.meta.env.VITE_API_URL}/api/cities`)
      .then(response => {
        setCities(response.data.slice(0, 4));
      })
      .catch(err => {
        console.log(err);
      });

    axios.get(`${import.meta.env.VITE_API_URL}/api/places`)
      .then(response => {
        setPlaces(response.data.slice(0, 4));
      })
      .catch(err => {
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
      filteredItems = regions
        .concat(cities)
        .concat(places);
    } else if (searchType === "regions") {
      filteredItems = regions;
    } else if (searchType === "cities") {
      filteredItems = cities;
    } else if (searchType === "places") {
      filteredItems = places;
    }
  console.log(filteredItems.filter((item) =>
  item.name.toLowerCase().includes(searchValue.toLowerCase())
), searchValue, searchType)
    return filteredItems.filter((item) =>
      item.name.toLowerCase().includes(searchValue.toLowerCase())
    );
  };

  const renderPlaceCards = (type) => {
    return places
      .filter(place => place.type === type)
      .slice(0, 5)
      .map(place => (
        <Link to={`/places/${place._id}`} key={place._id} style={{ textDecoration: "none", color: "inherit" }}>
          <Card
            hoverable
            style={{ width: 300, margin: 20 }}
            cover={<img alt={place.name} src={place.imageUrl} />}
          >
            
            <Flex gap="small" wrap="wrap" style={{ justifyContent: 'flex-end' }}>
            </Flex>
          </Card>
        </Link>
      ));
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
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
        <img src="/logo-italiamo.png" alt="Logo Italiamo" width="400" height="auto" />
      </div>

      <div style={{ marginTop: '150px', display: 'flex', flexDirection:"column", justifyContent: 'center', alignItems: 'center', backgroundColor:'B76F38' }}>
      <div style={{display: 'flex'}}>
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
        /></div>
        <div style={{position:"relative", width:"100%"}}>
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

      <div style={{ marginTop: '100px' }}>
        <h2>Regions</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {regions.map(region => (
            <Link to={`/regions/${region._id}`} key={region._id} style={{ textDecoration: "none", color: "inherit" }}>
              <Card
                hoverable
                style={{ width: 300, margin: 20 }}
                cover={<img alt={region.name} src={region.imageUrl} />}
              >
                <Meta title={region.name} description={truncateDescription(region.description)} />
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
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {cities.map(city => (
            <Link to={`/cities/${city._id}`} key={city._id} style={{ textDecoration: "none", color: "inherit" }}>
              <Card
                hoverable
                style={{ width: 300, margin: 20 }}
                cover={<img alt={city.name} src={city.imageUrl} />}
              >
                <Link to={`/regions/${city.region._id}`} style={{ textDecoration: "none", color: "inherit" }}>
                  <Meta title={city.name} description={truncateDescription(city.description)} />
                  <p style={{ margin: '10px 0', fontWeight: 'bold' }}>{city.region.name}</p>
                </Link>
                <Flex gap="small" wrap="wrap" style={{ justifyContent: 'flex-end' }}>
                </Flex>
              </Card>
            </Link>
          ))}
        </div>
        <Link to="/cities">Discover all cities</Link>
      </div>

      <div>
        <h2>Getting inspiration</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {renderPlaceCards("Cultural")}
          {renderPlaceCards("Villages")}
          {/* Render cards for other types of places as needed */}
        </div>
      </div>
    </div>
  );
}

export default HomePage;

