// @ts-nocheckee
import { useRef, useState } from "react";
import { Image as CloudinaryImage } from "cloudinary-react";
import { ReviewProps, UserProps } from "../helpers/interfaces";
import { timeSince } from "../helpers/dateFunction";
import Rating from "../helpers/starRating";
import { useDispatch, useSelector } from "react-redux";
import ReviewEditButton from "../Buttons/reviewEditButton";
import { CloseIcon, ForwardArrow } from "../helpers/svgIcons";
import axios from "axios";
import { setSnackbar } from "@src/store/reducers/feedbackReducer";

interface IProps {
  user?: UserProps;
  review: ReviewProps;
  handleDelete?: any;
  setReviews?: any;
}

export default function ReviewCard({
  review,
  handleDelete,
  setReviews,
}: IProps) {
  const user = useSelector((state: IProps) => state.user);
  const dispatch = useDispatch();
  const [isEditMode, setIsEditMode] = useState(false);
  const [tempRating, setTempRating] = useState(0);
  const [rating, setRating] = useState(review.Rating);
  const [isReview, setIsReview] = useState(review.Description);
  const [isReviewError, setIsReviewError] = useState(false);
  const [loading, setLoading] = useState(false);
  const ratingRef = useRef(null);

  const onSubmit = () => {
    setLoading(true);

    axios
      .post(
        `${process.env.NEXT_PUBLIC_REST_API}/user/update-review`,
        {
          review: isReview,
          rating,
          property_id: review.PropertyID,
          user_id: user?.ID,
          jwt: user?.jwt,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((res) => {
        setLoading(false);

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
            setSnackbar({
              status: "success",
              message: ` Review Updated`,
              open: true,
            })
          );
          // set reviews to the new reviews from server
          setReviews(res.data.propertyReviews);
          setIsEditMode(false);
        }
      })
      .catch((error) => {
        console.error(error);
        dispatch(
          setSnackbar({
            status: "error",
            message: ` There was an error, please contact support`,
            open: true,
          })
        );
        setLoading(false);
      });
  };

  const handleReviewChange = (e: any) => {
    setIsReview(e.target.value);

    isReview.length < 10 || isReview.length > 400
      ? setIsReviewError(true)
      : setIsReviewError(false);
  };

  return (
    <div className="relative border border-purple-500 rounded-lg p-3 my-3">
      <div className="flex gap-2">
        <CloudinaryImage
          cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_NAME}
          publicId={review.User.Image}
          alt="User image"
          width="48"
          height="45"
          crop="scale"
          className="rounded-full object-cover"
        />

        <div>
          <h3 className="font-bold text-lg text-stone-900 pr-4">
            {review.User.FirstName + " " + review.User.LastName}
          </h3>

          <div className="flex items-center justify-between">
            {isEditMode ? (
              <div className="flex items-center">
                <button
                  className="flex items-center"
                  ref={ratingRef}
                  onClick={() => setRating(tempRating)}
                  onMouseLeave={() => {
                    if (tempRating > rating) {
                      setTempRating(rating);
                    }
                  }}
                  onMouseMove={(e) => {
                    const hoverRating =
                      ((ratingRef.current.getBoundingClientRect().left -
                        e.clientX) /
                        ratingRef.current.getBoundingClientRect().width) *
                      -5;

                    setTempRating(Math.round(hoverRating * 2) / 2);
                  }}
                >
                  <Rating number={rating > tempRating ? rating : tempRating} />
                </button>

                <p>{tempRating || "Enter star rating"}</p>
              </div>
            ) : (
              <span className="flex items-center">
                <Rating
                  number={review.Rating}
                  dimensions="w-4 h-4"
                  halfStarDimensions="w-[15px] h-[15px]"
                />
              </span>
            )}

            {!isEditMode && (
              <>
                &nbsp; | &nbsp;
                <p>
                  <em>{timeSince(new Date(review.CreatedAt))} ago</em>
                </p>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="mt-2">
        {isEditMode ? (
          <form>
            <textarea
              id="exampleFormControlTextarea1"
              rows={3}
              value={isReview}
              onChange={handleReviewChange}
              className={`focus:outline-purple-600 focus:rounded-lg bg-slate-100 border rounded-lg px-3 py-2 mt-1 text-base w-full ${
                isReviewError &&
                "border-red-500 text-red-500 focus:outline-red-500"
              }`}
            />
            {isReviewError && (
              <p className="text-red-500 text-sm mt-2">
                Min 10 characters and max 400 characters
              </p>
            )}

            <button
              type="button"
              onClick={onSubmit}
              disabled={
                loading ||
                !rating ||
                isReview.length < 10 ||
                isReview.length > 500
              }
              className={`mt-2 transition duration-200 bg-purple-600 focus:bg-purple-800 focus:shadow-sm focus:ring-4 focus:ring-purple-500 focus:ring-opacity-50 w-full py-2.5 rounded-lg text-lg shadow-sm hover:shadow-md font-semibold text-center flex justify-center items-center ${
                loading
                  ? "hover:bg-purple-300 text-gray-300"
                  : "hover:bg-purple-700 text-white"
              }`}
            >
              <span className="mr-2">Update Review</span>
              {loading ? (
                <div className="border-b-2 border-white rounded-full animate-spin w-6 h-6 "></div>
              ) : (
                <ForwardArrow />
              )}
            </button>
          </form>
        ) : (
          <p>{review.Description}</p>
        )}
      </div>

      {user?.ID === review.UserID && (
        <span className="absolute top-4 right-3">
          {isEditMode ? (
            <button onClick={() => setIsEditMode(false)}>
              <CloseIcon />
            </button>
          ) : (
            <ReviewEditButton
              review={review}
              setIsEditMode={setIsEditMode}
              handleDelete={handleDelete}
            />
          )}
        </span>
      )}
    </div>
  );
}
