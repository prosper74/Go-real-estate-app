import { FC, useEffect, useState } from "react";
import {
  FavouriteProps,
  SingleProperty,
  UserProps,
} from "../helpers/interfaces";
import { FavouriteIcon } from "../helpers/svgIcons";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setSnackbar } from "@src/store/reducers/feedbackReducer";
import { Tooltip } from "flowbite-react";

interface IProps {
  property?: SingleProperty;
  favourites?: FavouriteProps;
  user?: UserProps;
}

const FavouriteButton: FC<IProps> = ({ property }) => {
  const user = useSelector((state: IProps) => state.user);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [favourites, setFavourites] = useState<FavouriteProps[]>();

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_REST_API}/favourites?id=${property?.ID}`)
      .then((response) => {
        if (response.data.error) {
          dispatch(
            setSnackbar({
              status: "error",
              message: response.data.error,
              open: true,
            })
          );
          setLoading(false);
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

  useEffect(() => {
    if (
      favourites?.some(
        (favorite: FavouriteProps) => favorite.UserID === user?.userId
      )
    ) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  }, [favourites, user]);

  return (
    <button className="relative">
      {loading ? (
        <div className="border-b-2 border-primary rounded-full animate-spin w-10 h-10" />
      ) : (
        <Tooltip content={isLiked ? "Remove from favourites" : "Add to favourites"} style="light">
          <FavouriteIcon
            dimensions="w-10 h-10"
            fill={isLiked ? "#9932cc" : "none"}
            outline={isLiked ? "none" : "#9932cc"}
          />
          <span className="absolute top-0 right-0 w-5 h-5 rounded-full bg-[#9932cc] flex items-center justify-center text-white text-[0.7rem] p-1">
            {favourites === null ? 0 : favourites?.length}
          </span>
        </Tooltip>
      )}
    </button>
  );
};

export default FavouriteButton;
