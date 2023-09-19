"use client";

import { useCallback, useState } from "react";
import axios from "axios";
import crypto from "crypto";
import { Tooltip } from "flowbite-react";
import { HiTrash } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { useDropzone } from "react-dropzone";
// @ts-ignore
import { Image } from "cloudinary-react";
import { setSnackbar } from "@src/store/reducers/feedbackReducer";
import { setUser } from "@src/store/reducers/userReducer";
import {
  IImageUpload,
  UserProps,
} from "@src/components/common/helpers/interfaces";
import { Button, Modal } from "flowbite-react";

interface IProps {
  user?: UserProps;
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
  profilePhoto?: string;
}

const generateSHA1 = (data: any) => {
  const hash = crypto.createHash("sha1");
  hash.update(data);
  return hash.digest("hex");
};

const generateSignature = (
  publicId: string | undefined,
  apiSecret: string | undefined
) => {
  const timestamp = new Date().getTime();
  return `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
};

export default function StatusImageModal({
  modalOpen,
  setModalOpen,
  profilePhoto,
}: IProps) {
  const user = useSelector((state: IProps) => state.user);
  const dispatch = useDispatch();
  const [uploadedImage, setUploadedImage] = useState<any>();

  function closeModal() {
    setModalOpen(false);
  }

  const onDrop = useCallback(async (acceptedFiles: any) => {
    const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/upload`;

    acceptedFiles.forEach(async (acceptedFile: IImageUpload) => {
      const formData = new FormData();
      // @ts-ignore
      formData.append("file", acceptedFile);
      formData.append(
        "upload_preset",
        // @ts-ignore
        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
      );

      const response = await fetch(url, {
        method: "post",
        body: formData,
      });

      const data = await response.json();
      // @ts-ignore
      setUploadedImage(data);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    // @ts-ignore
    accepts: {
      image: [".png", ".gif", ".jpeg", ".jpg"],
    },
    multiple: true,
    maxFiles: 1,
    minSize: 0,
    maxSize: 1000000,
  });

  const uploadedImageURL = uploadedImage && uploadedImage.public_id;

  const onSubmit = () => {
    axios
      .post(
        `${process.env.NEXT_PUBLIC_REST_API}/user/update-image`,
        {
          image: uploadedImageURL,
          user_id: user?.ID,
          jwt: user?.jwt,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${user?.jwt}`,
          },
        }
      )
      .then((res) => {
        if (res.data.error) {
          dispatch(
            setSnackbar({
              status: "error",
              message: res.data.error,
              open: true,
            })
          );
        } else {
          dispatch(
            setUser({
              ...user,
              Image: res.data.user.Image,
            })
          );
          dispatch(
            setSnackbar({
              status: "success",
              message: ` Image Updated`,
              open: true,
            })
          );

          // delete the former user profilePhoto from cloudinary
          const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_NAME;
          const timestamp = new Date().getTime();
          const apiKey = process.env.NEXT_PUBLIC_CLOUDINARY_KEY;
          const apiSecret = process.env.NEXT_PUBLIC_CLOUDINARY_SECRET;
          const signature = generateSHA1(
            generateSignature(profilePhoto, apiSecret)
          );
          const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`;

          axios
            .post(url, {
              public_id: profilePhoto,
              signature: signature,
              api_key: apiKey,
              timestamp: timestamp,
            })
            .then(() => {})
            .catch(() => {});
        }
      })
      .catch(() => {
        dispatch(
          setSnackbar({
            status: "error",
            message: ` Please log out and log back in. If error persist contact support`,
            open: true,
          })
        );
      });
  };

  const onCancel = () => {
    if (uploadedImage) {
      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_NAME;
      const timestamp = new Date().getTime();
      const apiKey = process.env.NEXT_PUBLIC_CLOUDINARY_KEY;
      const apiSecret = process.env.NEXT_PUBLIC_CLOUDINARY_SECRET;
      const signature = generateSHA1(
        generateSignature(uploadedImage.public_id, apiSecret)
      );
      const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`;

      axios
        .post(url, {
          public_id: uploadedImage.public_id,
          signature: signature,
          api_key: apiKey,
          timestamp: timestamp,
        })
        .then(() => {
          setUploadedImage("");
        })
        .catch(() => {});
    }

    closeModal();
  };

  const handleDelete = (publicId: string) => {
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
        setUploadedImage("");

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

  return (
    <>
      <Modal show={modalOpen} size="md" popup onClose={closeModal}>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <h3 className="mb-2 text-xl font-bold text-gray-500 dark:text-gray-400">
              Update your profile image
            </h3>

            <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
              Please provide your image. <br />
              Note: You can only upload one image (PNG/JPEG), and image size
              should not exceed 1MB
            </p>

            {/* Upload Image */}
            {uploadedImage ? (
              <h3 className="text-center text-xl font-semibold text-lime-500 mb-1">
                Your image has been uploaded
              </h3>
            ) : (
              <p
                {...getRootProps()}
                className={`h-auto my-3 p-3 border-2 border-dashed border-purple-400 cursor-pointer text-center ${
                  isDragActive && "border-primary"
                }`}
              >
                <input {...getInputProps()} />
                Upload your image. <br />
                Click to add or drag n drop image
              </p>
            )}

            <div className="flex flex-row justify-center my-5">
              {uploadedImage && (
                <span className="relative">
                  <Image
                    cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_NAME}
                    publicId={uploadedImage.public_id}
                    width="150"
                    height="150"
                    crop="scale"
                    className="rounded-full object-cover"
                  />

                  <button
                    className="absolute top-2 right-2 p-1 bg-white rounded-lg"
                    onClick={(event) => {
                      event.preventDefault();
                      handleDelete(uploadedImage.public_id);
                    }}
                  >
                    <Tooltip content={`Delete image`} style="light">
                      <HiTrash className="mx-auto h-4 w-4 text-red-600" />
                    </Tooltip>
                  </button>
                </span>
              )}
            </div>

            <div className="flex justify-center gap-4">
              <Button color="gray" onClick={onCancel}>
                Cancel
              </Button>

              <Button
                color="success"
                onClick={() => {
                  closeModal();
                  onSubmit();
                }}
              >
                Update
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
