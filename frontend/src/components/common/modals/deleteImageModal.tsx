"use client";

import { setSnackbar } from "@src/store/reducers/feedbackReducer";
import axios from "axios";
import { Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useDispatch } from "react-redux";

interface IProps {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  uploadedFiles: any;
  setUploadedFiles: any;
  publicId: string;
}

export default function DeleteImageModal({
  isModalOpen,
  setIsModalOpen,
  uploadedFiles,
  setUploadedFiles,
  publicId,
}: IProps) {
  const dispatch = useDispatch();

  const handleDelete = () => {
    const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/image/destroy`;

    axios
      .post(url, {
        public_id: publicId,
        api_key: process.env.NEXT_PUBLIC_CLOUDINARY_KEY,
        timestamp: new Date().getTime(),
      })
      .then((response) => {
        console.log("Image deleted from Cloudinary: ", response);
        setUploadedFiles(
          uploadedFiles.filter((file: any) => file.public_id !== publicId)
        );

        dispatch(
          setSnackbar({
            status: "success",
            message: ` Image has been removed`,
            open: true,
          })
        );
      })
      .catch((error) => {
        console.error("Error deleting image from Cloudinary:", error);
        dispatch(
          setSnackbar({
            status: "error",
            message: ` Unable to remove image. Please contact support`,
            open: true,
          })
        );
      });
  };

  function closeModal() {
    setIsModalOpen(false);
  }

  return (
    <>
      <Modal show={isModalOpen} size="md" popup onClose={closeModal}>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to remove this image?
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color="failure"
                onClick={() => {
                  closeModal();
                  handleDelete;
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
