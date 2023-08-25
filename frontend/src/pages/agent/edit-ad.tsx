import React, { FC, useEffect } from "react";
import Head from "next/head";
import Router from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { setSnackbar } from "@src/store/reducers/feedbackReducer";
import { EditAdForm } from "@src/components/common/forms/editAdForm";
import {
  SingleProperty,
  UserProps,
} from "@src/components/common/helpers/interfaces";
import axios from "axios";

interface IProps {
  user: UserProps;
  property?: SingleProperty;
}

const EditProperty: FC<IProps> = ({ property }) => {
  const user = useSelector((state: IProps) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user.userId !== property?.UserID) {
      dispatch(
        setSnackbar({
          status: "error",
          message: "You are not authorized to edit this Ad",
          open: true,
        })
      );
      Router.push("/");
    }

    if (property?.Status === "pending") {
      dispatch(
        setSnackbar({
          status: "error",
          message: "Your Ad is still under review, you can not edit it",
          open: true,
        })
      );
      Router.push("/");
    }
  }, [user, property]);

  return (
    <>
      <Head>
        <title>Edit Ad | {property?.Title}</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <main className="px-4 mx-auto mt-24 sm:!px-10 lg:!px-32">
        <h1 className="font-bold text-center text-3xl mt-28 mb-10">
          Edit Ad | {property?.Title}
        </h1>

        <EditAdForm property={property} />
      </main>
    </>
  );
};

export default EditProperty;

export async function getServerSideProps(context: any) {
  const { id } = context.query;

  const res = await axios.get(`${process.env.NEXT_PUBLIC_REST_API}/all/${id}`);
  return {
    props: {
      property: res.data.property,
    },
  };
}
