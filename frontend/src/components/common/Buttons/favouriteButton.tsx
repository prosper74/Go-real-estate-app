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
import AuthPortal from "@src/components/auth";

interface IProps {
  property?: SingleProperty;
  favourites?: FavouriteProps;
  user?: UserProps;
}

const FavouriteButton: FC<IProps> = ({ property }) => {
  const user = useSelector((state: IProps) => state.user);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [favourites, setFavourites] = useState<FavouriteProps[]>();

  const handleFavourite = () => {
    if (!user?.onboarding && !user?.jwt) {
      setIsOpen(true);
    } else {
      setLoading(true);

      axios
        .post(
          `${process.env.NEXT_PUBLIC_REST_API}/user/add-favourite`,
          {
            property_id: property?.ID,
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
                message: ` ${res.data.error}`,
                open: true,
              })
            );
          } else {
            dispatch(
              setSnackbar({
                status: "success",
                message: ` Property Added to favourites`,
                open: true,
              })
            ); 
            
            setFavourites(res.data.favourites)
          }                
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
    }
  };

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
    <>
      <button className="relative" onClick={handleFavourite} disabled={loading}>
        {loading ? (
          <div className="border-b-2 border-primary rounded-full animate-spin w-10 h-10" />
        ) : (
          <Tooltip
            content={isLiked ? "Remove from favourites" : "Add to favourites"}
            style="light"
          >
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

      <AuthPortal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default FavouriteButton;
