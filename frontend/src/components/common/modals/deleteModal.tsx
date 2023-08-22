"use client";

import { Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Image } from "../helpers/interfaces";

interface IProps {
  modalOpen: string;
  setModalOpen: (open: string) => void;
  handleDelete: any;
  propertyID: number;
  propertyImages: Image[];
}

export default function DeleteModal({
  modalOpen,
  setModalOpen,
  handleDelete,
  propertyID,
  propertyImages,
}: IProps) {
  function closeModal() {
    setModalOpen("");
  }

  return (
    <>
      <Modal show={modalOpen === "delete"} size="md" popup onClose={closeModal}>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-bold text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this property?
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color="failure"
                onClick={() => {
                  closeModal();
                  handleDelete(propertyID, propertyImages);
                }}
              >
                Yes, I'm sure
              </Button>
              <Button color="gray" onClick={closeModal}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
