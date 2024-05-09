import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth.context";
import "./ProfilePage.css";
// import Link from "antd/es/typography/Link";
import { Tabs } from "antd";
import axios from "axios";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading";
import usePlaceModal from "../../hooks/usePlaceModal";
import CropImage from "./CropImage";

function ProfilePage() {
  const [fetchedUser, setFetchedUser] = useState(null);
  const { user } = useContext(AuthContext);
  const email = user.email;
  // Place modal
  const { showModal, Modal } = usePlaceModal();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/user/${user._id}`)
      .then((response) => {
        setFetchedUser(response.data);
      });
  }, [user]);

  if (!fetchedUser) {
    return <Loading />;
  }

  return (
    <div
      className="user-profile"
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "calc(100svh - 60px)",
        // justifyContent: "center",
        alignItems: "center",
        paddingBottom: "1rem",
      }}
    >
      <Modal />
      <div
        style={{
          backgroundImage: 'url("/profile-background.jpg")',
          backgroundPosition: "center",
          backgroundSize: "cover",
          height: 200,
          width: "100%",
          position: "relative",
        }}
      >
        <div className="profile-wrapper">
          <div className="user-image">
            <img
              src={
                fetchedUser.imageUrl ||
                `https://placeholder.fromundefined.com/${fetchedUser.email}`
              }
              alt={`Profile Picture`}
            />

            <CropImage>
              <a>
                <div
                  className="hover-text"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <span>Edit Image</span>
                </div>
              </a>
            </CropImage>
          </div>
          <h1 style={{ margin: 0, fontSize: "1.35rem", paddingTop: "0.35rem" }}>
            {email}
          </h1>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "1rem",
          paddingTop: "125px",
          width: "100%",
        }}
      >
        <Tabs
          style={{ width: "100%" }}
          defaultActiveKey="favoritesRegions"
          centered
          items={[
            { key: "favoritesRegions", label: "Favorite Regions" },
            { key: "favoritesCities", label: "Favorite Cities" },
            { key: "favoritesPlaces", label: "Favorite Places" },
          ].map((item, i) => {
            const id = String(i + 1);

            const data = fetchedUser[item.key];

            return {
              label: item.label,
              key: id,
              children: (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    paddingLeft: "12px",
                    paddingRight: "12px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "12px",
                      maxWidth: 1200,
                      width: "100% ",
                    }}
                  >
                    {data.length === 0 && (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          width: "100%",
                          height: 50,
                        }}
                      >
                        <span>Empty</span>
                      </div>
                    )}
                    {data.map((x, index) => {
                      function getHref() {
                        console.log("KK:", item.key);
                        switch (item.key) {
                          case "favoritesRegions":
                            return `/regions/${x._id}`;
                          case "favoritesCities":
                            return `/cities/${x._id}`;
                          case "favoritesPlaces":
                            return undefined;
                          default:
                            return undefined;
                        }
                      }

                      function getOnclick() {
                        if (item.key !== "favoritesPlaces") {
                          return undefined;
                        }

                        return () => showModal({ id: x._id, name: x.name });
                      }

                      return (
                        <Link
                          to={getHref()}
                          className="place-card hover-underline"
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            textDecorationColor: "black",
                          }}
                          key={index}
                          onClick={getOnclick()}
                        >
                          <img
                            width={"100%"}
                            height={200}
                            style={{
                              backgroundColor: "grey",
                              objectFit: "cover",
                            }}
                            src={x.imageUrl}
                          />
                          <h1
                            style={{
                              fontSize: "1.1rem",
                              color: "black",
                              margin: 0,
                              marginTop: "0.25rem   ",
                            }}
                          >
                            {x.name}
                          </h1>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ),
            };
          })}
        />
      </div>
    </div>
  );
}

export default ProfilePage;
