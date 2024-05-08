import { useContext, useEffect, useState } from "react";
import './UserPage.css'; 
import ProfileImgPage from "./ProfileImgPage";
import { AuthContext } from "../context/auth.context";
import { Link } from 'react-router-dom'
import FavouritesList from "../components/FavouritesList";
import axios from "axios";

function UserPage() {
  const [fetchedUser, setFetchedUser] = useState(null);
  const { user } = useContext(AuthContext);
  const email = user.email;

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/user/${user._id}`)
      .then((response) => {
        setFetchedUser(response.data);
      });
  }, []);

  return (
    <div className="user-profile">
      {fetchedUser && (
        <div>
          <div className="user-image">
            <img src={fetchedUser.imageUrl} alt={`ciao`} />
          </div>
          <Link to="/profile-picture">
            <button>Edit</button>
          </Link>
          <div>
            <p>{email}</p>
          </div>
          <div>
            <FavouritesList favoritesRegions={fetchedUser.favoritesRegions} favoritesCities={fetchedUser.favoritesCities} favoritesPlaces={fetchedUser.favoritesPlaces} fetchedUser={fetchedUser} />
          </div>
        </div>
      )}
    </div>
  );
}

export default UserPage;

