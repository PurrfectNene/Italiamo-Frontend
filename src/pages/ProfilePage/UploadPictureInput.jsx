import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import CropImage from "./CropImage";

export default function UploadPictureInput() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { user, authenticateUser } = useContext(AuthContext);

  const handleFileUpload = (e) => {
    showModal();
    return;

    console.log("The file to be uploaded is: ", e.target.files[0]);

    const uploadData = new FormData();

    uploadData.append("imageUrl", e.target.files[0]);

    axios
      .post(`${import.meta.env.VITE_API_URL}/api/upload`, uploadData)
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

  function updatePicture() {
    if (!imageUrl) {
      setError("Please, upload a picture to submit.");
      return;
    }

    axios
      .post(`${import.meta.env.VITE_API_URL}/api/profile/image`, {
        _id: user._id,
        imageUrl,
      })
      .then((response) => {
        console.log(response.data);
        navigate("/profile");
      })
      .catch((err) => {
        setError(err);
      });
  }

  return (
    <div
      style={{ display: "flex", alignItems: "center", flexDirection: "column" }}
    >
      <CropImage />
      {/* <Modal
        title="Crop Picture"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal> */}
      {/* 
      <input
        style={{ display: "none" }}
        id="image-upload"
        type="file"
        onChange={(e) => {
          handleFileUpload(e);
        }}
      /> */}

      {/* <Button type="default" onClick={updatePicture}>
        Submit
      </Button> */}
      {error && <h1>{error}</h1>}
    </div>
  );
}
