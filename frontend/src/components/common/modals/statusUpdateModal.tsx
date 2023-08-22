"use client";

import { Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

interface IProps {
  modalOpen: string;
  setModalOpen: (open: string) => void;
  handleStatusUpdate: any;
  propertyID: number;
  propertyStatus: string;
}

export default function StatusUpdateModal({
  modalOpen,
  setModalOpen,
  handleStatusUpdate,
  propertyID,
  propertyStatus,
}: IProps) {
  function closeModal() {
    setModalOpen("");
  }

  return (
    <>
      <Modal show={modalOpen === "status"} size="md" popup onClose={closeModal}>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-xl font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to{" "}
              {propertyStatus === "disabled" ? "Enable" : "Disable"} this item?
            </h3>
            <p className="mb-5 font-normal text-gray-500 dark:text-gray-400">
              {propertyStatus === "disabled" ? "Enabling this property will make it available for public view" : "Disabling this property will remove it from public view, but you can always enable it again in your dashboard"}              
            </p>
            <div className="flex justify-center gap-4">
              <Button
                color="failure"
                onClick={() => {
                  closeModal();
                  // handleStatusUpdate(propertyID, propertyStatus);
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
