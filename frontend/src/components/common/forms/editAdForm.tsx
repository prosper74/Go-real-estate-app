import React, { FC, useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import crypto from "crypto";
import { Tooltip } from "flowbite-react";
import { HiTrash } from "react-icons/hi";
import { useDropzone } from "react-dropzone";
// @ts-ignore
import { Image } from "cloudinary-react";
import Editor from "../editor";
import { setSnackbar } from "@src/store/reducers/feedbackReducer";
import { ForwardArrow } from "@src/components/common/helpers/svgIcons";
import {
  locations,
  propertyType,
  perPeriod,
  categories,
} from "../helpers/propertyData";
import { IImageUpload, SingleProperty, UserProps } from "../helpers/interfaces";

interface IProps {
  property?: SingleProperty;
  user?: UserProps;
  acceptedFles?: File[];
  files?: File[];
  onDrop?: (acceptedFiles: File[]) => void;
  public_id?: string;
  acceptedFile?: File[];
}

const schema = z.object({
  images: z.any(),
  category: z.string(),
  state: z.string(),
  type: z.string(),
  bedroom: z.string(),
  bathroom: z.string(),
  sittingroom: z.string(),
  period: z.string(),
});

const generateSHA1 = (data: any) => {
  const hash = crypto.createHash("sha1");
  hash.update(data);
  return hash.digest("hex");
};

const generateSignature = (publicId: string, apiSecret: string | undefined) => {
  const timestamp = new Date().getTime();
  return `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
};

export const EditAdForm: FC<IProps> = ({ property }) => {
  const user = useSelector((state: IProps) => state.user);
  const router = useRouter();
  const dispatch = useDispatch();
  const [isCategory, setIsCategory] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState(property?.Images);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [inputPrice, setInputPrice] = useState(property?.Price);
  const [inputValues, setInputValues] = useState({
    title: property?.Title,
    city: property?.City,
    size: property?.Size,
  });

  const handlePriceInputChange = (event: any) => {
    const rawValue = event.target.value.replace(/,/g, "");
    const formattedValue = Number(rawValue).toLocaleString();
    setInputPrice(formattedValue);
  };

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
      setUploadedFiles((old) => [...old, data.public_id]);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    // @ts-ignore
    accepts: "images/*",
    multiple: true,
    maxFiles: 4,
    minSize: 0,
    maxSize: 1000000,
  });

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(schema),
  });

  const onSubmit = handleSubmit((data) => {
    const imagesURL = uploadedFiles!.map((item: any) => item).join(", ");

    setLoading(true);

    axios
      .post(
        `${process.env.NEXT_PUBLIC_REST_API}/user/update-ad`,
        {
          id: property?.ID,
          title: inputValues.title,
          description: description || property?.Description,
          price: inputPrice,
          type: data.type,
          category:
            data.category === "Buy"
              ? "1"
              : data.category === "Rent"
              ? "2"
              : "3",
          state: data.state,
          city: inputValues.city,
          bedroom: selectedType === "Land" ? "" : data.bedroom,
          bathroom: selectedType === "Land" ? "" : data.bathroom,
          duration: selectedCategory === "Buy" ? "" : data.period,
          size: inputValues.size,
          images: imagesURL,
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
            message: ` Property updated`,
            open: true,
          })
        );
        router.back();
      })
      .catch(() => {
        setLoading(false);
        dispatch(
          setSnackbar({
            status: "error",
            message: ` There was an error. Please try again later`,
            open: true,
          })
        );
      });
  });

  useEffect(() => {
    setSelectedCategory(watch("category"));
    setSelectedType(watch("type"));

    selectedCategory === "Buy" ||
    selectedCategory === "Rent" ||
    selectedCategory === "Shortlet"
      ? setIsCategory(true)
      : setIsCategory(false);
  });

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
        setUploadedFiles(
          uploadedFiles!.filter((file: any) => file !== publicId)
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

  const otherCategories = categories.filter(
    (category) => category.name !== property?.Category.Title
  );

  return (
    <>
      <div className="flex flex-col justify-center">
        <div className="p-2 xs:p-0 mx-auto md:w-full  relative">
          <div className="bg-white shadow-lg w-full rounded-lg divide-y divide-gray-200">
            {/* Form Fields */}
            <div className="px-3 py-4">
              {/* Uplaod images  */}
              {uploadedFiles!.length >= 4 ? (
                <h3 className="text-center text-xl font-bold mb-2">
                  You have uploaded Up to four images
                </h3>
              ) : (
                <div
                  {...getRootProps()}
                  className={`h-auto my-3 p-3 border-2 border-dashed border-red-500 rounded-lg cursor-pointer md:text-xl text-center ${
                    isDragActive && "border-purple-600"
                  }`}
                >
                  <input {...getInputProps()} />
                  Drag and drop some files here, or click to select files. Min 1
                  image, Max 4 images. Max file size per image is 1mb. PNG/JPEG
                </div>
              )}

              <ul className="flex flex-row justify-center mb-3">
                {uploadedFiles!.map((file: any, i) => (
                  <li key={i} className="mr-1 relative">
                    <Image
                      cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_NAME}
                      publicId={file}
                      crop="scale"
                      className="w-[80px] h-[80px] md:w-[150px] md:h-[150px] object-cover rounded-lg m-1"
                    />

                    <button
                      className="absolute top-2 right-2 p-1 bg-white rounded-lg"
                      onClick={() => handleDelete(file)}
                    >
                      <Tooltip content={`Delete image`} style="light">
                        <HiTrash className="mx-auto h-4 w-4 text-red-600" />
                      </Tooltip>
                    </button>
                  </li>
                ))}
              </ul>

              <form>
                <div className="grid sm:grid-cols-2 gap-2">
                  <div>
                    <select
                      id="category"
                      placeholder="Select Category"
                      {...register("category")}
                      className={`focus:outline-purple-600 bg-slate-100 border rounded-lg px-3 py-2 mt-1 text-base w-full  ${
                        errors.phone &&
                        "border-red-500 text-red-500 focus:outline-red-500"
                      }`}
                    >
                      <option defaultValue="">
                        {property?.Category.Title}
                      </option>
                      {otherCategories.map((category, i) => (
                        <option key={i} value={category.name}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Title */}
                  <div>
                    <input
                      type="text"
                      autoComplete="title"
                      value={inputValues.title}
                      onChange={(e) =>
                        setInputValues({
                          ...inputValues,
                          title: e.target.value,
                        })
                      }
                      // {...register("title")}
                      className={`focus:outline-purple-600 focus:rounded-lg bg-slate-100 border rounded-lg px-3 py-2 mt-1 text-base w-full ${
                        errors.name &&
                        "border-red-500 text-red-500 focus:outline-red-500"
                      }`}
                      required
                    />
                    {errors.name?.message && (
                      <p className="text-red-500 text-sm mt-2">
                        {/* @ts-ignore */}
                        {errors.name?.message}
                      </p>
                    )}
                  </div>

                  {/* Location */}
                  <div>
                    <select
                      {...register("state")}
                      className={`focus:outline-purple-600 bg-slate-100 border rounded-lg px-3 py-2 mt-1 text-base w-full ${
                        errors.phone &&
                        "border-red-500 text-red-500 focus:outline-red-500"
                      }`}
                    >
                      <option defaultValue="">{property?.State}</option>
                      {locations.map((location, i) => (
                        <option key={i} value={location.name}>
                          {location.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Period */}
                  {selectedCategory !== "Buy" && (
                    <div>
                      <select
                        {...register("period")}
                        className="focus:outline-purple-600 bg-slate-100 border rounded-lg px-3 py-2 mt-1 text-base w-full "
                      >
                        <option defaultValue="">{property?.Duration}</option>
                        {perPeriod.map((period, i) => (
                          <option key={i} value={period.name}>
                            per {period.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                  {isCategory && (
                    <>
                      {/* City */}
                      <div>
                        <input
                          type="text"
                          autoComplete="city"
                          value={inputValues.city}
                          onChange={(e) =>
                            setInputValues({
                              ...inputValues,
                              city: e.target.value,
                            })
                          }
                          // {...register("city")}
                          className={`focus:outline-purple-600 bg-slate-100 border rounded-lg px-3 py-2 mt-1 text-base w-full ${
                            errors.city &&
                            "border-red-500 text-red-500 focus:outline-red-500"
                          }`}
                          required
                        />
                        {errors.city?.message && (
                          <p className="text-red-500 text-sm mt-2">
                            {/* @ts-ignore */}
                            {errors.city?.message}
                          </p>
                        )}
                      </div>

                      {/* Type */}
                      <div>
                        <select
                          {...register("type")}
                          className={`focus:outline-purple-600 bg-slate-100 border rounded-lg px-3 py-2 mt-1 text-base w-full ${
                            errors.phone &&
                            "border-red-500 text-red-500 focus:outline-red-500"
                          }`}
                        >
                          <option defaultValue="">{property?.Type}</option>
                          {propertyType.map((type, i) => (
                            <option key={i} value={type.name}>
                              {type.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Bedrooms */}
                      {selectedType !== "Land" && (
                        <div>
                          <select
                            {...register("bedroom")}
                            className="focus:outline-purple-600 bg-slate-100 border rounded-lg px-3 py-2 mt-1 text-base w-full"
                          >
                            <option defaultValue="">{property?.Bedroom}</option>
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(
                              (d: number) => (
                                <option key={d} value={d}>
                                  {d} Bedroom{d > 1 && "s"}
                                </option>
                              )
                            )}
                          </select>
                        </div>
                      )}

                      {/* Bathrooms */}
                      {selectedType !== "Land" && (
                        <div>
                          <select
                            {...register("bathroom")}
                            className="focus:outline-purple-600 bg-slate-100 border rounded-lg px-3 py-2 mt-1 text-base w-full"
                          >
                            <option defaultValue="">
                              {property?.Bathroom}
                            </option>
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(
                              (d: number) => (
                                <option key={d} value={d}>
                                  {d} Bathroom{d > 1 && "s"}
                                </option>
                              )
                            )}
                          </select>
                        </div>
                      )}

                      {/* Sitting Room */}
                      {selectedType !== "Land" && (
                        <div>
                          <select
                            {...register("sittingroom")}
                            className="focus:outline-purple-600 bg-slate-100 border rounded-lg px-3 py-2 mt-1 text-base w-full"
                          >
                            {[0, 1, 2, 3, 4, 5, 6, 7].map((d: number) => (
                              <option key={d} value={d}>
                                {d} Sitting Room{d > 1 && "s"}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}

                      {/* size */}
                      <div className="relative rounded-md shadow-sm">
                        <input
                          {...register("size")}
                          type="number"
                          value={inputValues.size}
                          onChange={(e) =>
                            setInputValues({
                              ...inputValues,
                              size: e.target.value,
                            })
                          }
                          className="focus:outline-purple-600 bg-slate-100 border rounded-lg px-3 py-2 mt-1 text-base w-full"
                        />
                        <div className="absolute top-2 right-10 flex items-center pointer-events-none">
                          <span className="text-gray-500 text-lg">Sqr</span>
                        </div>
                      </div>

                      {/* description */}
                      <div className="col-span-2">
                        <Editor
                          setOnChange={setDescription}
                          placeholder="Leave this field blank if you want to use the existing description"
                        />
                      </div>

                      {/* Price */}
                      <div className="col-span-2">
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 pt-1 flex items-center pointer-events-none">
                            <span className="text-gray-500 text-lg">₦</span>
                          </div>
                          <input
                            type="text"
                            placeholder="1200000"
                            value={inputPrice}
                            onChange={handlePriceInputChange}
                            className={`focus:outline-purple-600 pl-7 bg-slate-100 border rounded-lg px-3 py-2 mt-1 text-base w-full ${
                              errors.price &&
                              "border-red-500 text-red-500 focus:outline-red-500"
                            }`}
                          />
                        </div>
                      </div>
                    </>
                  )}
                </div>

                <button
                  type="button"
                  onClick={onSubmit}
                  disabled={
                    loading ||
                    !isCategory ||
                    uploadedFiles!.length < 1 ||
                    inputPrice!.replace(/[^0-9]/g, "").length < 3 ||
                    inputPrice!.trim().startsWith("0")
                  }
                  className={`mt-5 transition duration-200 bg-purple-600 w-full py-2.5 rounded-lg text-lg shadow-sm hover:shadow-md font-semibold text-center flex justify-center items-center disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 ${
                    loading
                      ? "hover:bg-purple-300 text-gray-300"
                      : "hover:bg-purple-700 text-white"
                  }`}
                >
                  <span className="mr-2">Submit</span>
                  {loading ? (
                    <div className="border-b-2 border-purple-600 rounded-full animate-spin w-6 h-6 " />
                  ) : (
                    <ForwardArrow />
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
