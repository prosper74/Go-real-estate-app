"use client";

import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
// @ts-ignore
import { Image } from "cloudinary-react";
import { setSnackbar } from "@src/store/reducers/feedbackReducer";
import { setUser } from "@src/store/reducers/userReducer";
import { UserProps } from "@src/components/common/helpers/interfaces";
import { Button, Modal } from "flowbite-react";

interface IProps {
  user?: UserProps;
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
}

export default function UpdateUserProfileModal({
  modalOpen,
  setModalOpen,
}: IProps) {
  const user = useSelector((state: IProps) => state.user);
  const dispatch = useDispatch();

  function closeModal() {
    setModalOpen(false);
  }

  const onSubmit = () => {
    axios
      .post(
        `${process.env.NEXT_PUBLIC_REST_API}/user/update-image`,
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
          dispatch(
            setUser({
              ...user,
              Image: res.data.user.Image,
            })
          );
          dispatch(
            setSnackbar({
              status: "success",
              message: ` Profile Updated`,
              open: true,
            })
          );
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

  return (
    <>
      <Modal show={modalOpen} size="md" popup onClose={closeModal}>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <h3 className="mb-2 text-xl font-bold text-gray-500 dark:text-gray-400">
              Update your profile information
            </h3>

            <form action=""></form>

            <div className="flex justify-center gap-4">
              <Button color="gray" onClick={closeModal}>
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
