"use client";

import { Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

interface IProps {
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
  handleDelete: any;
  propertyID?: number;
  reviewID: number;
}

export default function DeleteReviewModal({
  modalOpen,
  setModalOpen,
  handleDelete,
  propertyID,
  reviewID,
}: IProps) {
  function closeModal() {
    setModalOpen(false);
  }

  return (
    <>
      <Modal show={modalOpen} size="md" popup onClose={closeModal}>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-bold text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this review?
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color="failure"
                onClick={() => {
                  closeModal();
                  handleDelete(reviewID, propertyID);
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
