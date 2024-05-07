import { useContext, useEffect, useState } from "react";
import FavouritesList from "../../components/FavouritesList";
import { AuthContext } from "../../context/auth.context";
import "./ProfilePage.css";
// import Link from "antd/es/typography/Link";
import axios from "axios";
import Loading from "../../components/Loading";
import CropImage from "./CropImage";

function ProfilePage() {
  const [fetchedUser, setFetchedUser] = useState(null);
  const { user } = useContext(AuthContext);
  const email = user.email;

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
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {fetchedUser && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <h1 style={{ margin: 0 }}>{email}</h1>
          <div className="user-image">
            <img
              src={
                fetchedUser.imageUrl ||
                `https://placeholder.fromundefined.com/${fetchedUser.email}`
              }
              alt={`Profile Picture`}
            />
          </div>
          <CropImage />

          <div>
            <FavouritesList favoritesRegions={fetchedUser.favoritesRegions} />
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
