"use client";

import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
// @ts-ignore
import { Image } from "cloudinary-react";
import { setSnackbar } from "@src/store/reducers/feedbackReducer";
import { UserProps } from "@src/components/common/helpers/interfaces";
import { Modal } from "flowbite-react";
import { ForwardArrow } from "../helpers/svgIcons";

interface IProps {
  user?: UserProps;
  fetchedUser?: UserProps;
  setFetchedUser: any;
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
}

const inspectionFormSchema = z.object({
  first_name: z
    .string()
    .min(3, { message: "Min 3 characters" })
    .max(30, { message: "Max 30 letters" }),
  last_name: z
    .string()
    .min(3, { message: "Min 3 characters" })
    .max(30, { message: "Max 30 letters" }),
  phone: z.string().regex(/^[0]\d{10}$/, "must be 11 digits"),
  address: z
    .string()
    .min(5, { message: "Min 5 characters" })
    .max(40, { message: "Max 40 letters" }),
});

export default function UpdateUserProfileModal({
  fetchedUser,
  setFetchedUser,
  modalOpen,
  setModalOpen,
}: IProps) {
  const user = useSelector((state: IProps) => state.user);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  function closeModal() {
    setModalOpen(false);
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(inspectionFormSchema),
  });

  const onSubmit = handleSubmit((data: any) => {
    setLoading(true);

    axios
      .post(
        `${process.env.NEXT_PUBLIC_REST_API}/user/update-profile`,
        {
          first_name: data.first_name,
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
          setFetchedUser(res.data.user);
          dispatch(
            setSnackbar({
              status: "success",
              message: ` Profile Updated`,
              open: true,
            })
          );
        }
        setLoading(false)
      })
      .catch(() => {
        dispatch(
          setSnackbar({
            status: "error",
            message: ` Please log out and log back in. If error persist contact support`,
            open: true,
          })
        );
        setLoading(false)
      });
  });

  return (
    <>
      <Modal show={modalOpen} size="md" popup onClose={closeModal}>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <h3 className="mb-2 text-xl font-bold text-gray-500 dark:text-gray-400">
              Update your profile information
            </h3>

            <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
              To update your password, please logout and click forgot password
              button on the login form modal
            </p>

            <form>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label htmlFor="first_name">{fetchedUser?.FirstName}</label>
                  <input
                    id="first_name"
                    autoComplete="first_name"
                    placeholder="First Name"
                    type="text"
                    {...register("first_name")}
                    className={`focus:outline-purple-600 focus:rounded-lg bg-slate-100 border rounded-lg px-3 py-2 mt-1 text-base w-full ${
                      errors.first_name &&
                      "border-red-500 text-red-500 focus:outline-red-500"
                    }`}
                  />
                  {errors.first_name?.message && (
                    <p className="text-red-500 text-sm mt-2">
                      {/* @ts-ignore */}
                      {errors.first_name?.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="last_name">{fetchedUser?.LastName}</label>
                  <input
                    id="last_name"
                    autoComplete="last_name"
                    placeholder="Last Name"
                    type="text"
                    {...register("last_name")}
                    className={`focus:outline-purple-600 focus:rounded-lg bg-slate-100 border rounded-lg px-3 py-2 mt-1 text-base w-full ${
                      errors.last_name &&
                      "border-red-500 text-red-500 focus:outline-red-500"
                    }`}
                  />
                  {errors.last_name?.message && (
                    <p className="text-red-500 text-sm mt-2">
                      {/* @ts-ignore */}
                      {errors.last_name?.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="email">{fetchedUser?.Email}</label>
                  <input
                    disabled
                    id="email"
                    autoComplete="email"
                    placeholder="Contact support to update your email"
                    type="text"
                    {...register("email")}
                    className="focus:outline-purple-600 bg-slate-100 border rounded-lg px-3 py-2 mt-1 text-base w-full"
                  />
                </div>

                <div>
                  <label htmlFor="phone">{fetchedUser?.Phone || "+234"}</label>
                  <input
                    id="phone"
                    autoComplete="phone"
                    placeholder="Your Phone Number"
                    type="number"
                    {...register("phone")}
                    className={`focus:outline-purple-600 bg-slate-100 border rounded-lg px-3 py-2 mt-1 text-base w-full ${
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

                {/* Message */}
                <div className="col-span-2">
                  <label htmlFor="address">
                    {fetchedUser?.Address || "House address"}
                  </label>
                  <input
                    id="address"
                    autoComplete="address"
                    placeholder="Your Address"
                    type="text"
                    {...register("address")}
                    className={`focus:outline-purple-600 focus:rounded-lg bg-slate-100 border rounded-lg px-3 py-2 mt-1 text-base w-full ${
                      errors.address &&
                      "border-red-500 text-red-500 focus:outline-red-500"
                    }`}
                  />
                  {errors.address?.message && (
                    <p className="text-red-500 text-sm mt-2">
                      {/* @ts-ignore */}
                      {errors.address?.message}
                    </p>
                  )}
                </div>
              </div>

              <button
                type="button"
                onClick={onSubmit}
                disabled={loading}
                className={`mt-5 transition duration-200 bg-purple-600 focus:bg-purple-800 focus:shadow-sm focus:ring-4 focus:ring-purple-500 focus:ring-opacity-50 w-full py-2.5 rounded-lg text-lg shadow-sm hover:shadow-md font-semibold text-center flex justify-center items-center ${
                  loading
                    ? "hover:bg-purple-300 text-gray-300"
                    : "hover:bg-purple-700 text-white"
                }`}
              >
                <span className="mr-2">Update</span>
                {loading ? (
                  <div className="border-b-2 border-white rounded-full animate-spin w-6 h-6 "></div>
                ) : (
                  <ForwardArrow />
                )}
              </button>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
