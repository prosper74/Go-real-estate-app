import { FC, useEffect, useState } from "react";
import { SingleProperty } from "../helpers/interfaces";
import { FavouriteIcon } from "../helpers/svgIcons";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setSnackbar } from "@src/store/reducers/feedbackReducer";

interface IProps {
  property?: SingleProperty;
}

const FavouriteButton: FC<IProps> = ({ property }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_REST_API}/favourites?id=${property?.ID}`
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
          setLoading(false);
        }
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
  }, [])

  return (
    <button className="relative">
      <FavouriteIcon dimensions="w-10 h-10" fill="#9932cc" outline="none" />
      <span className="absolute top-0 right-0 w-4 h-4 rounded-full bg-primary flex items-center justify-center text-white text-[0.6rem] p-1">
        10
      </span>
    </button>
  );
};

export default FavouriteButton;
