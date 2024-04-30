import React from "react";
import './UserPage.css'; 
import ProfilePicture from "../components/ProfilePicture";


function UserPage() {
  // const image = <ProfilePicture/>
  const image = 'https://res.cloudinary.com/dwrndt1iw/image/upload/v1714496934/italiamo-project/fo8grvgxtaclfrvltoxh.jpg'
  const email = `iiii@test.com`

  return (
    <div className="user-profile">
      <div className="user-image">
        <img src={image} alt={`ciao`} />
      </div>
      <div>
        <p>{email}</p>
      </div>
    </div>
  );
}

export default UserPage;
