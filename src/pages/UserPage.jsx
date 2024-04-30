import {useContext} from "react";
import './UserPage.css'; 
import ProfileImgPage from "./ProfileImgPage";
import { AuthContext } from "../context/auth.context";


function UserPage() {
  // const image = <ProfilePicture/>
  const image = <ProfileImgPage/>

  const {user} = useContext(AuthContext)
  console.log(user)
  const email = user.email

  return (
    <div className="user-profile">
      <div className="user-image">
        <img src={user.imageUrl} alt={`ciao`} />
      </div>
      <div>
        <p>{email}</p>
      </div>
    </div>
  );
}

export default UserPage;
