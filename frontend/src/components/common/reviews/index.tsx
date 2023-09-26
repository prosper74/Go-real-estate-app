import { useEffect, useState } from "react";
// @ts-ignore
import { Image as CloudinaryImage } from "cloudinary-react";
import Review from "./review";
import { ReviewProps, UserProps } from "../helpers/interfaces";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setSnackbar } from "@src/store/reducers/feedbackReducer";
import { timeSince } from "../helpers/dateFunction";
import Rating from "../helpers/starRating";

interface IProps {
  user?: UserProps;
  reviews?: ReviewProps;
  propertyID: number;
}

export default function Reviews({ propertyID }: IProps) {
  const dispatch = useDispatch();
  const [reviews, setReviews] = useState<ReviewProps[]>();

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_REST_API}/reviews?id=${propertyID}`)
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
        setReviews(response.data.reviews);
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

  return (
    <section className="sm:p-4">
      <Review propertyID={propertyID} setReviews={setReviews} />

      {/* latest reviews  */}
      {reviews?.map((review) => (
        <div
          key={review.ID}
          className="border border-purple-500 rounded-lg p-3 my-3"
        >
          <div className="flex gap-2">
            <CloudinaryImage
              cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_NAME}
              publicId={review.User.Image}
              alt="User image"
              width="45"
              height="45"
              crop="scale"
              className="rounded-full object-cover"
            />

            <span>
              <h3 className="font-bold text-lg text-stone-900">
                {review.User.FirstName + " " + review.User.LastName}
              </h3>

              <div className="flex items-center">
                <span className="flex items-center">
                  <Rating
                    number={review.Rating}
                    dimensions="w-4 h-4"
                    halfStarDimensions="w-[15px] h-[15px]"
                  />
                </span>
                &nbsp; | &nbsp;
                <p>
                  <em>{timeSince(new Date(review.CreatedAt))} ago</em>
                </p>
              </div>
            </span>
          </div>

          <div className="mt-2">
            <p>{review.Description}</p>
          </div>
        </div>
      ))}
    </section>
  );
}
