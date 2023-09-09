import { FC, useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import AgentSidebar from "./agentSidebar";
import PropertyCard from "../properties/propertyCard";
import {
  FavouriteProps,
  SingleProperty,
  UserProps,
} from "../helpers/interfaces";
import { setSnackbar } from "@src/store/reducers/feedbackReducer";

interface IProps {
  favourites?: FavouriteProps;
  user?: UserProps;
}

const UserFavourites: FC<IProps> = () => {
  const user = useSelector((state: IProps) => state.user);
  const dispatch = useDispatch();
  const [favourites, setFavourites] = useState<FavouriteProps[]>();

  useEffect(() => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_REST_API}/user/favourites?user_id=${user?.userId}&jwt=${user?.jwt}`
      )
      .then((response) => {
        if (response.data.error) {
          dispatch(
            setSnackbar({
              status: "error",
              message: response.data.error,
              open: true,
            })
          );
        }
        setFavourites(response.data.favourites);
      })
      .catch((error) => {
        dispatch(
          setSnackbar({
            status: "error",
            message: error.response.data,
            open: true,
          })
        );
      });
  }, []);

  console.log("favourites: ", favourites)

  return (
    <>
      {favourites === null ? (
        <h3 className="font-medium text-lg text-center my-6">
          You do not have any favourites.
        </h3>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          favourites here
          {/* {favourites.map((property: SingleProperty) => (
            <span key={property.ID}>
              <PropertyCard
                property={property}
                isUserDashboard={true}
              />
            </span>
          ))} */}
        </div>
      )}
    </>
  );
};

export default UserFavourites;
