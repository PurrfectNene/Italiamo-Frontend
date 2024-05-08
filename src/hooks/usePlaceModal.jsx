import { Modal as ModalAntd } from "antd";
import { useState } from "react";
import LazyPlaceInfo from "../components/LazyPlaceInfo";

export default function usePlaceModal() {
  const [isModalOpen, setIsModalOpen] = useState(null); // null or {id: place._id, name: place.name}

  const showModal = (state) => {
    setIsModalOpen(state);
  };

  const handleOk = () => {
    setIsModalOpen(null);
  };

  const handleCancel = () => {
    setIsModalOpen(null);
  };

  const Modal = () => {
    return (
      <ModalAntd
        title={isModalOpen?.name || "Loading..."}
        open={isModalOpen != null}
        onOk={handleOk}
        onCancel={handleCancel}
        width={900}
      >
        <LazyPlaceInfo id={isModalOpen?.id} />
      </ModalAntd>
    );
  };

  return { isModalOpen, showModal, handleOk, handleCancel, Modal };
}
