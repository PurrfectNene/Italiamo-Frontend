import { InboxOutlined } from "@ant-design/icons";
import { Form, Input, Modal, Select, Upload, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import { useState } from "react";

const { Dragger } = Upload;

export default function CitiesCreateModal({ state, regionsList }) {
  const [isModalOpen, setIsModalOpen] = state;
  const [createCityForm] = Form.useForm();
  const [imageUrlState, setImageUrlState] = useState("");

  const handleOk = async () => {
    const data = createCityForm.getFieldsValue();
    const storedToken = localStorage.getItem("authToken");

    await axios
      .post(`${import.meta.env.VITE_API_URL}/api/cities`, data, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((res) => {
        console.log(res.data);
        // reload page
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  const handleCancel = () => {
    createCityForm.resetFields();
    setIsModalOpen(false);
  };

  const uploadProps = {
    name: "file",
    multiple: false,
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        // console.log(info.file, info.fileList);
        if (info.fileList.length === 0) {
          // is deleting
          createCityForm.setFieldValue("imageUrl", "");
          setImageUrlState("");
        }
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    customRequest: async (options) => {
      const { onSuccess, onError, file, onProgress } = options;

      const fmData = new FormData();
      const config = {
        headers: { "content-type": "multipart/form-data" },
        onUploadProgress: (event) => {
          onProgress({ percent: (event.loaded / event.total) * 100 });
        },
      };
      fmData.append("imageUrl", file);
      try {
        const res = await axios
          .post(`${import.meta.env.VITE_API_URL}/api/upload`, fmData, config)
          .then((res) => {
            createCityForm.setFieldValue("imageUrl", res.data.fileUrl);
            setImageUrlState(res.data.fileUrl);
          });

        onSuccess();
        console.log("server res: ", res);
      } catch (err) {
        console.log("Error: ", err);
        onError({ err });
      }
    },
  };

  return (
    <>
      {/* {!isModalOpen && (
        <Form style={{ display: "none" }} form={createRegionForm} />
      )} */}
      <Modal
        title="Create City"
        open={isModalOpen}
        onOk={handleOk}
        okText="Create"
        onCancel={handleCancel}
        forceRender
        getContainer={false}
      >
        <Form form={createCityForm} layout="vertical">
          <Form.Item label="Name" name="name" style={{ marginBottom: 12 }}>
            <Input />
          </Form.Item>
          <Form.Item label="Region" name="region" style={{ marginBottom: 12 }}>
            <Select
              options={regionsList.map((region) => ({
                label: region.name,
                value: region._id,
              }))}
            />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            style={{ marginBottom: 12 }}
          >
            <TextArea rows={3} />
          </Form.Item>
          <Form.Item name="imageUrl" style={{ display: "none" }}>
            <TextArea />
          </Form.Item>
          {/* <Form.Item
      label="Image URL"
      name="imageUrl"
      style={{ marginBottom: 20 }}
    >
      <TextArea rows={3} />
    </Form.Item> */}

          <label style={{ marginBottom: 8, display: "block" }}>Image URL</label>

          <Dragger {...uploadProps}>
            {imageUrlState ? (
              <img
                width={"100%"}
                height={"160px"}
                style={{ objectFit: "cover" }}
                // preview={{
                //   visible: previewOpen,
                //   onVisibleChange: (visible) => setPreviewOpen(visible),
                //   afterOpenChange: (visible) => !visible && setPreviewImage(""),
                // }}
                src={imageUrlState}
              />
            ) : (
              <>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                  Click or drag file to this area to upload
                </p>
              </>
            )}
          </Dragger>
        </Form>
      </Modal>
    </>
  );
}
