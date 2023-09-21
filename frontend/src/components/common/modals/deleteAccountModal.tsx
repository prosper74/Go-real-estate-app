"use client";

import { useState } from "react";
import Router from "next/router";
import { Button, Modal } from "flowbite-react";
import axios from "axios";
import { setSnackbar } from "@src/store/reducers/feedbackReducer";
import { setUser } from "@src/store/reducers/userReducer";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { UserProps } from "../helpers/interfaces";
import Cookies from "js-cookie";
import { DeleteIcon } from "../helpers/svgIcons";

interface IProps {
  user?: UserProps;
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
}

export default function DeleteAccountModal({
  modalOpen,
  setModalOpen,
}: IProps) {
  const user = useSelector((state: IProps) => state.user);
  const defaultUser = { username: "Guest" };
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  function closeModal() {
    setModalOpen(false);
  }

  const handleDelete = () => {
    setLoading(true);

    axios
      .post(
        `${process.env.NEXT_PUBLIC_REST_API}/user/update-profile`,
        {
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
          typeof window !== "undefined" && Cookies.remove("user");
          dispatch(setUser(defaultUser));
          dispatch(
            setSnackbar({
              status: "success",
              message: ` Account Deleted`,
              open: true,
            })
          );
          Router.push("/");
        }
        setLoading(false);
        closeModal();
      })
      .catch(() => {
        dispatch(
          setSnackbar({
            status: "error",
            message: ` Please log out and log back in. If error persist contact support`,
            open: true,
          })
        );
        setLoading(false);
      });
  };

  return (
    <>
      <Modal show={modalOpen} size="md" popup onClose={closeModal}>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />

            <h3 className="mb-5 text-lg font-bold text-gray-500 dark:text-gray-400">
              Are you sure you want to delete your Account?
            </h3>

            <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
              This action is irreversible. All your ads will also be deleted
            </p>

            <div className="flex justify-center gap-4">
              <Button
                color="failure"
                onClick={handleDelete}
                className={`text-center flex justify-center items-center ${
                  loading
                    ? "hover:bg-purple-300 text-gray-300"
                    : "hover:bg-purple-700 text-white"
                }`}
              >
                <span className="mr-2">Yes, I'm sure</span>
                {loading ? (
                  <div className="border-b-2 border-white rounded-full animate-spin w-6 h-6 "></div>
                ) : (
                  <DeleteIcon />
                )}
                
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
