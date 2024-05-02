import { InboxOutlined } from "@ant-design/icons";
import { Form, Input, Modal, Upload, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import { useState } from "react";

const { Dragger } = Upload;

export default function RegionsCreateModal({ state }) {
  const [isModalOpen, setIsModalOpen] = state;
  const [createRegionForm] = Form.useForm();
  const [imageUrlState, setImageUrlState] = useState("");

  const handleOk = async () => {
    const data = createRegionForm.getFieldsValue();
    const storedToken = localStorage.getItem("authToken");

    console.log(data);
    await axios
      .post(`${import.meta.env.VITE_API_URL}/api/regions`, data, {
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
    createRegionForm.resetFields();
    setIsModalOpen(false);
  };

  const uploadProps = {
    name: "file",
    multiple: false,
    action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        // console.log(info.file, info.fileList);
        if (info.fileList.length === 0) {
          // is deleting
          createRegionForm.setFieldValue("imageUrl", "");
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
            createRegionForm.setFieldValue("imageUrl", res.data.fileUrl);
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
        title="Create Region"
        open={isModalOpen}
        onOk={handleOk}
        okText="Create"
        onCancel={handleCancel}
        forceRender
        getContainer={false}
      >
        <Form form={createRegionForm} layout="vertical">
          <Form.Item label="Name" name="name" style={{ marginBottom: 12 }}>
            <Input />
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
