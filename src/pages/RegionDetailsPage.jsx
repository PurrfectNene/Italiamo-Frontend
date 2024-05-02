import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Wrapper } from "@googlemaps/react-wrapper";
import { Button, Carousel, Col, Rate, Row, Tabs } from "antd";
import TabPane from "antd/es/tabs/TabPane";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import GoogleMap from "../components/GoogleMap";
import PlaceCard from "../components/PlaceCard";
import "./RegionDetailsPage.css";

function RegionDetailsPage() {
  const { id } = useParams();
  const [region, setRegion] = useState(null);
  const [cities, setCities] = useState([]);
  const [places, setPlaces] = useState([]);
  const [placesFilter, setPlacesFilter] = useState("Cultural");
  const filteredPlaces = places.filter((place) => place.type === placesFilter);
  const carouselRef = useRef(null);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/regions/${id}`)
      .then((response) => {
        setRegion(response.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(`${import.meta.env.VITE_API_URL}/api/regions/${id}/cities`)
      .then((response) => {
        setCities(response.data);
        axios
          .get(`${import.meta.env.VITE_API_URL}/api/regions/${id}/places`)
          .then((response) => {
            setPlaces(response.data);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  if (!region) {
    return <div>Loading...</div>;
  }

  return (
    <div
      style={{
        paddingLeft: "2rem",
        paddingRight: "2rem",
        paddingBottom: "2rem",
      }}
    >
      <div
        id="region-preview"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <section
          className="image-wrapper"
          style={{
            display: "flex",
            flexDirection: "column",
            itemsCenter: "center",
            borderRadius: "1rem",
            overflow: "hidden",
            maxWidth: 1200,
          }}
        >
          <img src={region?.imageUrl} />
          <div className="text-div">
            <h1 style={{ margin: 0, marginBottom: "1rem", fontSize: "3rem" }}>
              {region.name}
            </h1>
          </div>
        </section>
      </div>
      <section
        id="region-info"
        style={{
          backgroundColor: "white",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Row
          style={{
            width: "100%",
            maxWidth: 1200,
            marginTop: "1rem",
            alignItems: "center",
          }}
        >
          <h1 style={{ margin: 0, fontSize: "2rem" }}>Overview</h1>
          <Row
            style={{ gap: "0.75em", fontSize: "1.1rem", marginLeft: "auto" }}
          >
            <Rate
              disabled
              value={4}
              style={{
                fontSize: "1.25rem",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            />{" "}
            4.5 (1249 reviews)
          </Row>
        </Row>

        <Row
          style={{
            display: "flex",
            maxWidth: 1200,
            gap: "4rem",
          }}
        >
          <Col style={{ flex: 1, fontSize: "1rem" }}>
            <p>{region.description}</p>
          </Col>
          {/* <Col
            style={{
              backgroundColor: "white",
              padding: "1rem",
              borderRadius: "0.5rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
              minWidth: 400,
              height: "fit-content",
              boxShadow:
                "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
            }}
          >
            <h1 style={{ margin: 0, fontSize: "1.25rem" }}>Explore the area</h1>
            <Wrapper
              apiKey={import.meta.env.VITE_GOOGLEAPIKEY}
              render={() => {
                return <p>Loading...</p>;
              }}
            >
              <GoogleMap />
            </Wrapper>
            <Row style={{ gap: "0.75em" }}>
              <Rate
                disabled
                value={4}
                style={{ marginBottom: "0.5rem", fontSize: "1rem" }}
              />{" "}
              4.5 (1249 reviews)
            </Row>
          </Col> */}
        </Row>
      </section>
      <section
        id="map"
        style={{
          display: "flex",
          position: "relative",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            display: "flex",
            position: "relative",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Wrapper
            apiKey={import.meta.env.VITE_GOOGLEAPIKEY}
            render={() => {
              return <p>Loading...</p>;
            }}
          >
            <GoogleMap />
          </Wrapper>
          <div
            style={{
              position: "absolute",
              height: "100%",
              top: 0,
              right: 48,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                position: "relative",
                backgroundColor: "white",
                borderRadius: "0.5rem",
                height: "400px",
                width: "480px",
                marginRight: "80px",
                boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                // overflow: "hidden",
              }}
            >
              <Button
                style={{
                  padding: 4,
                  borderRadius: "100%",
                  width: "fit-content",
                  position: "absolute",
                  zIndex: 999,
                  top: "calc(200px - 16px)",
                  left: "-16px",
                }}
                shape="circle"
                onClick={() => {
                  carouselRef.current.prev();
                }}
              >
                <LeftOutlined />
              </Button>
              <Button
                style={{
                  padding: 4,
                  borderRadius: "100%",
                  width: "fit-content",
                  position: "absolute",
                  zIndex: 999,
                  top: "calc(200px - 16px)",
                  right: "-16px",
                }}
                shape="circle"
                onClick={() => {
                  carouselRef.current.next();
                }}
              >
                <RightOutlined />
              </Button>
              <Carousel
                ref={carouselRef}
                style={{ height: "400px" }}
                // adaptiveHeight
                afterChange={(currentSlide) => {
                  console.log(currentSlide);
                }}
              >
                {cities.map((city) => (
                  <div key={city._id}>
                    <img
                      src={city.imageUrl}
                      style={{
                        height: "280px",
                        width: "100%",

                        borderRadius: "0.5rem",
                        borderBottomRightRadius: 0,
                        borderBottomLeftRadius: 0,
                      }}
                    />
                    <div
                      style={{
                        height: "120px",
                        padding: "1rem",
                      }}
                    >
                      <Link
                        to={`/cities/${city._id}`}
                        style={{
                          fontSize: "1.35rem",
                          color: "black",
                          margin: 0,
                        }}
                      >
                        {city.name}
                      </Link>
                      <p style={{ margin: 0 }} className="clamp-2">
                        {city.description}
                      </p>
                    </div>
                  </div>
                ))}
              </Carousel>
            </div>
          </div>
        </div>
      </section>
      <section
        id="region-info"
        style={{
          backgroundColor: "white",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* <Row style={{ maxWidth: 1200, padding: "2rem" }}>
          <h1 style={{ margin: 0 }}>{region.name}</h1>
          <p>{region.description}</p>
          <h2>Cities in {region.name}</h2>
          <ul>
            {cities.map((city) => (
              <li key={city._id}>
                <Link to={`/cities/${city._id}`}>{city.name}</Link>
              </li>
            ))}
          </ul>
          <h2>Places in {region.name}</h2>
          <ul>
            {places.map((place) => (
              <li key={place._id}>
                <Link to={`/places/${place.city._id}`}>{place.name}</Link>
              </li>
            ))}
          </ul>
        </Row> */}
      </section>
      <section
        id="cities"
        style={{
          display: "flex",
          position: "relative",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            display: "flex",
            position: "relative",
            justifyContent: "center",
            width: "100%",
            marginTop: "1rem",
            flexDirection: "column",
          }}
        >
          <h1 style={{ textAlign: "center", marginTop: 24, marginBottom: 6 }}>
            What to see in {region.name}
          </h1>
          <Tabs
            defaultActiveKey="Cultural"
            style={{ width: "100%" }}
            centered
            onChange={(key) => {
              setPlacesFilter(key);
            }}
          >
            <TabPane tab="Cultural" key="Cultural">
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "12px",
                }}
              >
                {filteredPlaces.slice(0, 4).map((place, index) => (
                  <PlaceCard
                    key={index}
                    name={place.name}
                    imageSrc={place.imageUrl}
                  />
                ))}
              </div>
            </TabPane>
            <TabPane tab="Food&Wine" key="Food&Wine">
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "12px",
                }}
              >
                {filteredPlaces.slice(0, 4).map((place, index) => (
                  <PlaceCard
                    key={index}
                    name={place.name}
                    imageSrc={place.imageUrl}
                  />
                ))}
              </div>
            </TabPane>

            <TabPane tab="Relax&Wellness" key="Relax&Wellness">
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "12px",
                }}
              >
                {filteredPlaces.slice(0, 4).map((place, index) => (
                  <PlaceCard
                    key={index}
                    name={place.name}
                    imageSrc={place.imageUrl}
                  />
                ))}
              </div>
            </TabPane>
            <TabPane tab="Villages" key="Villages">
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "12px",
                }}
              >
                {filteredPlaces.slice(0, 4).map((place, index) => (
                  <PlaceCard
                    key={index}
                    name={place.name}
                    imageSrc={place.imageUrl}
                  />
                ))}
              </div>
            </TabPane>
            <TabPane tab="Nature" key="Nature">
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "12px",
                }}
              >
                {filteredPlaces.slice(0, 4).map((place, index) => (
                  <PlaceCard
                    key={index}
                    name={place.name}
                    imageSrc={place.imageUrl}
                  />
                ))}
              </div>
            </TabPane>
          </Tabs>
        </div>
      </section>
    </div>
  );
}

export default RegionDetailsPage;
