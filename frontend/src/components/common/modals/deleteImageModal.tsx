"use client";

import { setSnackbar } from "@src/store/reducers/feedbackReducer";
import axios from "axios";
import { useDispatch } from "react-redux";
import crypto from "crypto";
import { Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

interface IProps {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  uploadedFiles: any;
  setUploadedFiles: any;
  publicId: string;
}

const generateSHA1 = (data: any) => {
  const hash = crypto.createHash("sha1");
  hash.update(data);
  return hash.digest("hex");
};

const generateSignature = (publicId: string, apiSecret: string | undefined) => {
  const timestamp = new Date().getTime();
  return `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
};

export default function DeleteImageModal({
  isModalOpen,
  setIsModalOpen,
  uploadedFiles,
  setUploadedFiles,
  publicId,
}: IProps) {
  const dispatch = useDispatch();

  const handleDelete = () => {
    setIsModalOpen(false);

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_NAME;
    const timestamp = new Date().getTime();
    const apiKey = process.env.NEXT_PUBLIC_CLOUDINARY_KEY;
    const apiSecret = process.env.NEXT_PUBLIC_CLOUDINARY_SECRET;
    const signature = generateSHA1(generateSignature(publicId, apiSecret));
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`;

    axios
      .post(url, {
        public_id: publicId,
        signature: signature,
        api_key: apiKey,
        timestamp: timestamp,
      })
      .then(() => {
        setUploadedFiles(
          uploadedFiles.filter((file: any) => file.public_id !== publicId)
        );

        dispatch(
          setSnackbar({
            status: "success",
            message: ` Image Deleted`,
            open: true,
          })
        );
      })
      .catch(() => {
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
              <Button color="failure" onClick={handleDelete}>
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
