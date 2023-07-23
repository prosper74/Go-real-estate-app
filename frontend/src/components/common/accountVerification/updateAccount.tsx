import { FC, Fragment, useCallback, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { useDropzone } from "react-dropzone";
// @ts-ignore
import { Image } from "cloudinary-react";
import { setSnackbar } from "@src/store/reducers/feedbackReducer";
import { ForwardArrow, CloseIcon } from "@src/components/common/svgIcons";
import { IImageUpload, UserProps } from "../interfaces";

interface IProps {
  user?: UserProps;
  setIsOpen: (open: boolean) => void;
  setSelectedStep: (open: number) => void;
  steps: any;
}

const schema = z.object({
  phone: z
    .string()
    .min(11, { message: "Phone must be 11 numbers" })
    .max(11, { message: "Phone must be 11 numbers" }),
});

const UpdateAccount: FC<IProps> = ({ setIsOpen, steps, setSelectedStep }) => {
  const user = useSelector((state: IProps) => state.user);
  const [fetchedUser, setFetchedUser] = useState<UserProps>();
  const dispatch = useDispatch();
  const [uploadedImage, setUploadedImage] = useState<any>();
  const [loading, setLoading] = useState(false);

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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(schema),
  });

  const uploadedImageURL = uploadedImage && uploadedImage.url;

  const onSubmit = handleSubmit((data) => {
    setLoading(true);

    axios
      .post(
        `${process.env.NEXT_PUBLIC_REST_API}/verifications?user_id=${user?.userId}&jwt=${user?.jwt}`,
        {
          image: uploadedImageURL,
          phone: data.identity_number,
          user_id: user?.userId,
          jwt: user?.jwt,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${user?.jwt}`,
          },
        }
      )
      .then(() => {
        setLoading(false);
        dispatch(
          setSnackbar({
            status: "success",
            message: ` Account Updated`,
            open: true,
          })
        );
        const verifyAccount = steps.find(
          (step: { label: string }) => step.label === "Verify Account"
        );
        setSelectedStep(steps.indexOf(verifyAccount));
      })
      .catch(() => {
        setLoading(false);
        dispatch(
          setSnackbar({
            status: "error",
            message: ` There was an error. Please contact support`,
            open: true,
          })
        );
      });
  });

  useEffect(() => {
    if (user?.userId) {
      axios
        .get(
          `${process.env.NEXT_PUBLIC_REST_API}/auth/dashboard?id=${user.userId}`
        )
        .then((res) => {
          if (res.data.error) {
            console.error(res.data.error);
          } else {
            setFetchedUser(res.data.user);
          }
        })
        .catch((error) => console.error(error));
    }
  }, [user]);

  useEffect(() => {
    if (fetchedUser?.Phone && fetchedUser?.Image) {
      const verifyAccount = steps.find(
        (step: { label: string }) => step.label === "Verify Account"
      );
      setSelectedStep(steps.indexOf(verifyAccount));
    }
  }, [user]);

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <Dialog.Panel className="max-w-3xl max-h-[32rem] transform overflow-auto rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
      <Dialog.Title
        as="h3"
        className="text-lg font-medium leading-6 text-gray-900"
      >
        Update Account Information
      </Dialog.Title>
      <Dialog.Title as="p" className="text-base leading-6 text-gray-900">
        Please provide your image and valid phone number. <br />
        Note: You can only upload one image (PNG/JPEG), and image size should
        not exceed 1MB
      </Dialog.Title>

      <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200 mt-3">
        {/* Form Fields */}
        <div className="p-2 sm:px-5 sm:py-4">
          <form>
            <div className="grid gap-2">
              {/* ID Verification */}
              <p className="text-base font-medium leading-6 text-gray-900">
                Image (Must show your face and your ears clearly)
              </p>
              {/* Upload Image */}
              {uploadedImage ? (
                <h3 className="text-center text-xl font-semibold text-lime-500 mb-2">
                  Your image has been uploaded
                </h3>
              ) : (
                <p
                  {...getRootProps()}
                  className={`h-auto my-3 p-3 border-2 border-dashed border-purple-400 cursor-pointer md:text-xl text-center ${
                    isDragActive && "border-primary"
                  }`}
                >
                  <input {...getInputProps()} />
                  Upload your image. <br />
                  Click to add or drag n drop image
                </p>
              )}

              <div className="flex flex-row justify-center">
                {uploadedImage && (
                  <Image
                    cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_NAME}
                    publicId={uploadedImage.public_id}
                    width="150"
                    height="150"
                    crop="scale"
                    className="rounded-full object-cover"
                  />
                )}
              </div>

              {/* Phone number */}
              <p className="mt-4 text-base font-medium leading-6 text-gray-900">
                Phone Number
              </p>
              <div>
                <input
                  id="phone"
                  type="number"
                  autoComplete="phone"
                  placeholder="Enter your valid phone number"
                  {...register("phone")}
                  className={`focus:outline-gray-700 border rounded-lg px-3 py-2 mt-1 text-base w-full ${
                    errors.phone &&
                    "border-red-500 text-red-500 focus:outline-red-500"
                  }`}
                />
                {errors.phone?.message && (
                  <p className="text-red-500 text-sm mt-2">
                    {/* @ts-ignore */}
                    {errors.phone?.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex justify-between mt-4">
              <button
                // @ts-ignore
                disabled={loading || errors.phone || !uploadedImage}
                className="inline-flex justify-center items-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-purple-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-500"
                onClick={onSubmit}
              >
                <span className="mr-2">Submit & Next</span>
                {loading ? (
                  <div className="border-b-2 border-purple-600 rounded-full animate-spin w-5 h-5" />
                ) : (
                  <ForwardArrow />
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      <button onClick={closeModal} className="absolute top-2 right-4">
        <CloseIcon dimensions="w-8 h-8" fill="#9333EA" />
      </button>
    </Dialog.Panel>
  );
};

export default UpdateAccount;
