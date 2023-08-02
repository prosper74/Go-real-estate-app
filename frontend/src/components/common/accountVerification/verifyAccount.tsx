import { FC, useCallback, useState } from "react";
import { Dialog } from "@headlessui/react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useDispatch, useSelector } from "react-redux";
import { useDropzone } from "react-dropzone";
// @ts-ignore
import { Image } from "cloudinary-react";
import { setUser } from "@src/store/reducers/userReducer";
import { setSnackbar } from "@src/store/reducers/feedbackReducer";
import { ForwardArrow, CloseIcon } from "@src/components/common/helpers/svgIcons";
import { IImageUpload, UserProps } from "../helpers/interfaces";

interface IProps {
  user?: UserProps;
  setIsOpen: (open: boolean) => void;
  setSelectedStep: (open: number) => void;
  setIsVerification: (open: boolean) => void;
  steps: any;
}

const schema = z.object({
  identity: z.string(),
  identity_number: z
    .string()
    .min(3, { message: "Minimum 3 characters" })
    .max(40, { message: "Maximun 35 characters" }),
  address: z.string(),
});

const VerifyAccount: FC<IProps> = ({
  setIsOpen,
  steps,
  setSelectedStep,
  setIsVerification,
}) => {
  const user = useSelector((state: IProps) => state.user);
  const dispatch = useDispatch();
  const [uploadedImages, setUploadedImages] = useState<any[]>([]);
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
      setUploadedImages((old) => [...old, data]);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    // @ts-ignore
    accepts: {
      image: [".png", ".gif", ".jpeg", ".jpg"],
    },
    multiple: true,
    maxFiles: 2,
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

  const uploadedIdentityImageURL =
    uploadedImages.length === 2 && uploadedImages[0].url;
  const uploadedAddressImageURL =
    uploadedImages.length === 2 && uploadedImages[1].url;

  const onSubmit = handleSubmit((data) => {
    setLoading(true);

    axios
      .post(
        `${process.env.NEXT_PUBLIC_REST_API}/user/verification`,
        {
          identity: data.identity,
          identity_number: data.identity_number,
          identity_image: uploadedIdentityImageURL,
          address: data.address,
          address_image: uploadedAddressImageURL,
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
      .then((res) => {
        setLoading(false);

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
              Verification: true,
            })
          );
          setIsVerification(true);
          const Complete = steps.find(
            (step: { label: string }) => step.label === "Complete"
          );
          setSelectedStep(steps.indexOf(Complete));
        }
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

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <Dialog.Panel className="max-w-3xl max-h-[32rem] transform overflow-auto rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
      <Dialog.Title
        as="h3"
        className="text-lg font-medium leading-6 text-gray-900"
      >
        Account Verification
      </Dialog.Title>
      <Dialog.Title as="p" className="text-base leading-6 text-gray-900">
        Please provide valid documents to verify your account. Note all files
        must be image format (PNG/JPEG). Image size should not exceed 1MB
      </Dialog.Title>

      <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200 mt-3">
        {/* Form Fields */}
        <div className="p-2 sm:px-5 sm:py-4">
          <form>
            <div className="grid gap-2">
              {/* ID Verification */}
              <p className="text-base font-medium leading-6 text-gray-900">
                Identity verification
              </p>
              <div>
                <select
                  {...register("identity")}
                  className={`focus:outline-purple-600 bg-slate-100 border rounded-lg px-3 py-2 mt-1 text-base w-full `}
                >
                  <option value="International passport">
                    International Passport
                  </option>
                  <option value="Drivers licence">Drivers Licence</option>
                  <option value="ID card">
                    ID card (Issued by the government)
                  </option>
                </select>
              </div>

              <div>
                <input
                  id="identity_number"
                  type="text"
                  autoComplete="identity_number"
                  placeholder="Enter the identity number"
                  {...register("identity_number")}
                  className={`focus:outline-gray-700 border rounded-lg px-3 py-2 mt-1 text-base w-full ${
                    errors.identity_number &&
                    "border-red-500 text-red-500 focus:outline-red-500"
                  }`}
                />
                {errors.identity_number?.message && (
                  <p className="text-red-500 text-sm mt-2">
                    {/* @ts-ignore */}
                    {errors.identity_number?.message}
                  </p>
                )}
              </div>

              {/* Address Verification  */}
              <p className="mt-4 text-base font-medium leading-6 text-gray-900">
                Address verification
              </p>
              <div>
                <select
                  {...register("address")}
                  className="focus:outline-purple-600 bg-slate-100 border rounded-lg px-3 py-2 mt-1 text-base w-full"
                >
                  <option value="Bank statement">Bank statement</option>
                  <option value="Utility bill">Utility bill</option>
                </select>
              </div>
            </div>

            {/* Upload Images */}
            {uploadedImages.length === 2 ? (
              <h3 className="text-center text-xl font-bold mb-2">
                Your images has been uploaded
              </h3>
            ) : (
              <p
                {...getRootProps()}
                className={`h-auto m-3 p-3 border-2 border-dashed border-purple-400 cursor-pointer md:text-lg text-center ${
                  isDragActive && "border-primary"
                }`}
              >
                <input {...getInputProps()} />
                Upload identity first, then address images <br />
                Click to add or drag n drop image
              </p>
            )}
            <div className="flex flex-row justify-center">
              {uploadedImages.map((file: IImageUpload) => (
                <li key={file.public_id} className="mr-1">
                  <Image
                    cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_NAME}
                    publicId={file.public_id}
                    width="150"
                    height="150"
                    crop="scale"
                    className="object-cover"
                  />
                </li>
              ))}
            </div>

            {errors.images?.message && (
              <p className="text-red-500 text-sm mt-2">
                {/* @ts-ignore */}
                {errors.images?.message}
              </p>
            )}

            <div className="flex justify-between mt-4">
              <button
                // @ts-ignore
                disabled={
                  loading || uploadedImages.length < 2 || errors.identity_number
                }
                className="inline-flex justify-center items-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-purple-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-500"
                onClick={onSubmit}
              >
                <span className="mr-2">Submit</span>
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

export default VerifyAccount;
