import React, { FC, useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Router from "next/router";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { setUser } from "@src/store/reducers/userReducer";
import { setSnackbar } from "@src/store/reducers/feedbackReducer";
import AuthPortal from "@src/components/auth";
import AuthButton from "@src/components/common/Buttons/authButton";
import { CreateAdForm } from "@src/components/common/forms/createAdForm";
import ResendEmailVerificationButton from "@src/components/common/Buttons/emailVerificationButton";
import VerificationModal from "@src/components/common/accountVerification";
import {
  SingleProperty,
  UserProps,
} from "@src/components/common/helpers/interfaces";

interface IProps {
  user: UserProps;
  property?: SingleProperty;
}

const EditProperty: FC<IProps> = ({ property }) => {
  const user = useSelector((state: IProps) => state.user);
  const defaultUser = { username: "Guest" };
  const dispatch = useDispatch();
  const [fetchedUser, setFetchedUser] = useState<UserProps>();
  const [isOpen, setIsOpen] = useState(false);
  const [isVerification, setIsVerification] = useState(false);
  const [verificationModalOpen, setVerificationModalOpen] = useState(false);

  useEffect(() => {
    if (user.userId !== property?.UserID) {
      dispatch(
        setSnackbar({
          status: "error",
          message: "You are not authorized to edit this Ad",
          open: true,
        })
      );
      Router.push("/")
    }

    if (property?.UserID) {
      dispatch(
        setSnackbar({
          status: "error",
          message: "You are not authorized to edit this Ad",
          open: true,
        })
      );
    }
  }, [user, property]);

  return (
    <>
      <Head>
        <title>Edit Ad | {property?.Title}</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <main className="px-4 mx-auto mt-24 sm:!px-10 lg:!px-32">
        <h3 className="font-bold text-center text-xl mt-24 mb-10">
          Please login or create an account before you can post an ad
        </h3>
      </main>
    </>
  );
};

export default EditProperty;
