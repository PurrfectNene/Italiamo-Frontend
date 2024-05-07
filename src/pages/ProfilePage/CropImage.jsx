import { UploadOutlined } from "@ant-design/icons";
import { Upload, message } from "antd";
import ImgCrop from "antd-img-crop";
import axios from "axios";
import React from "react";

function getImage(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeCrop(file) {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";

  const isLt2M = file.size / 1024 / 1024 < 2;

  return isJpgOrPng && isLt2M;
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must be smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
}

export const CropImage = () => {
  const handleChange = (info) => {
    console.log("running handle change");
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getImage(info.file.originFileObj, async (image) => {
        const storedToken = localStorage.getItem("authToken");
        const config = {
          headers: {
            "content-type": "multipart/form-data",
            Authorization: `Bearer ${storedToken}`,
          },
        };

        console.log(info.file);
        console.log(image);
        await axios.post(
          `${import.meta.env.VITE_API_URL}/api/profile/image`,
          {
            imageUrl: image.path,
          },
          config
        );

        // refresh page
        window.location.reload();
      });
    }
  };

  async function customRequest(options) {
    console.log("AFTER CROP");
    const { onSuccess, onError, file } = options;

    const fmData = new FormData();
    fmData.append("imageUrl", file);

    const storedToken = localStorage.getItem("authToken");
    const config1 = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `Bearer ${storedToken}`,
      },
    };

    try {
      // upload cropped
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/upload`,
        fmData,
        config1
      );

      const config2 = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${storedToken}`,
        },
      };

      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/profile/image`,
        {
          imageUrl: res.data.fileUrl,
        },
        config2
      );

      onSuccess();
      console.log("server res: ", res);
    } catch (err) {
      console.log("Error: ", err);
      onError({ err });
    }
  }

  return (
    <ImgCrop beforeCrop={beforeCrop}>
      <Upload
        rootClassName="upload-style"
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        onChange={handleChange}
        customRequest={customRequest}
        beforeUpload={beforeUpload}
      >
        <a
          style={{
            display: "flex",
            color: "white",
            backgroundColor: "#5f4e44",
            cursor: "pointer",
            padding: "0.5rem 0.75rem",
            width: "fit-content",
            gap: "0.5rem",
          }}
          htmlFor="image-upload"
        >
          <UploadOutlined />
          Change Picture
        </a>
      </Upload>
    </ImgCrop>
  );
};

export default CropImage;
