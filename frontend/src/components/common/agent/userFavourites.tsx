import { FC, useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import FavouritesCard from "../properties/favouritesCard";
import { FavouriteProps, UserProps } from "../helpers/interfaces";
import { setSnackbar } from "@src/store/reducers/feedbackReducer";

interface IProps {
  favourites?: FavouriteProps;
  user?: UserProps;
}

const UserFavourites: FC<IProps> = () => {
  const user = useSelector((state: IProps) => state.user);
  const dispatch = useDispatch();
  const [favourites, setFavourites] = useState<FavouriteProps[]>();

  const handleRemoveFavourite = (propertyID: number) => {
    axios
      .post(
        `${process.env.NEXT_PUBLIC_REST_API}/user/remove-favourite`,
        {
          property_id: propertyID,
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
        if (res.data.error) {
          dispatch(
            setSnackbar({
              status: "error",
              message: ` ${res.data.error}`,
              open: true,
            })
          );
        } else {
          dispatch(
            setSnackbar({
              status: "success",
              message: ` Property Removed from favourites`,
              open: true,
            })
          );

          setFavourites(res.data.user_favourites);
        }
      })
      .catch(() => {
        dispatch(
          setSnackbar({
            status: "error",
            message: ` There was an error. Please try again later`,
            open: true,
          })
        );
      });
  };

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

  console.log("favourites: ", favourites);

  return (
    <>
      {favourites === null ? (
        <h3 className="font-medium text-lg text-center my-6">
          You do not have any favourites. Add some
        </h3>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 my-4">
          {favourites?.map((favorite: FavouriteProps) => (
            <span key={favorite.ID}>
              <FavouritesCard
                favourite={favorite}
                handleRemoveFavourite={handleRemoveFavourite}
              />
            </span>
          ))}
        </div>
      )}
    </>
  );
};

export default UserFavourites;
