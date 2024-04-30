import React from 'react'
import axios from "axios";
import { useState, useContext } from "react";
import { AuthContext } from '../context/auth.context';

function ProfileImgPage() {
    const [imageUrl, setImageUrl] = useState("");
    const [error, setError] = useState(null);

    const {user} = useContext(AuthContext)
  
    const handleFileUpload = (e) => {
      console.log("The file to be uploaded is: ", e.target.files[0]);
  
      const uploadData = new FormData();
  
      uploadData.append("imageUrl", e.target.files[0]);
  
      axios
        .post("http://localhost:5005/api/upload", uploadData)
        .then((response) => {
          console.log(response.data.fileUrl);
          setImageUrl(response.data.fileUrl);
        })
        .catch((err) => {
          console.log(
            "Error while uploading the file: ",
            err.response.data.message.message
          );
          setError(err.response.data.message.message);
        });
    };

    function updatePicture(){

      axios.post(`http://localhost:5005/api/profile/image`,{_id:user._id,imageUrl})
      .then(response=>{
        console.log(response.data)
      })
    }
  
    return (
      <div>
        <input
          type="file"
          onChange={(e) => {
            handleFileUpload(e);
          }}
        />
        {imageUrl && <img src={imageUrl} alt="Uploaded Image" />}
  
        <button onClick={updatePicture}>Submit</button>
        {error && <h1>{error}</h1>}
      </div>
    );
}

export default ProfileImgPage