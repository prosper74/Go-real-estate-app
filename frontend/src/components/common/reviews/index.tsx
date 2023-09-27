import { useEffect, useState } from "react";
// @ts-ignore
import { Image as CloudinaryImage } from "cloudinary-react";
import Review from "./review";
import { ReviewProps, UserProps } from "../helpers/interfaces";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setSnackbar } from "@src/store/reducers/feedbackReducer";
import PaginationWithNavigation from "../helpers/pagination";
import ReviewCard from "./reviewsCard";

interface IProps {
  user?: UserProps;
  reviews?: ReviewProps;
  propertyID: number;
}

export default function Reviews({ propertyID }: IProps) {
  const user = useSelector((state: IProps) => state.user);
  const dispatch = useDispatch();
  const [reviews, setReviews] = useState<ReviewProps[]>();
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, _setPostsPerPage] = useState(5);

  const handleDelete = (reviewID: number) => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_REST_API}/user/reviews?user_id=${user?.ID}&property_id=${propertyID}&review_id=${reviewID}&jwt=${user?.jwt}`
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
            setSnackbar({
              status: "success",
              message: ` Review deleted`,
              open: true,
            })
          );
          setReviews(res.data.propertyReviews);
        }
      })
      .catch((err) => {
        console.error(err);
        dispatch(
          setSnackbar({
            status: "error",
            message:
              " There was an error deleting review, please contact support",
            open: true,
          })
        );
      });
  };

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

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentReviews = reviews?.slice(firstPostIndex, lastPostIndex);

  const totalReviews = reviews?.length || 0;

  return (
    <section className="sm:p-4">
      <Review propertyID={propertyID} setReviews={setReviews} />

      {totalReviews < 1 ? (
        <div className="text-center my-4">
          <h3 className="font-semibold text-stone-700">
            No review for this ad
          </h3>
          <p className="text-stone-700">Be the first to review 👌</p>
        </div>
      ) : (
        <>
          {/* latest reviews  */}
          {currentReviews?.map((review) => (
            <ReviewCard
              key={review.ID}
              setReviews={setReviews}
              review={review}
              handleDelete={handleDelete}
            />
          ))}

          <PaginationWithNavigation
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalReviews={totalReviews}
            postsPerPage={postsPerPage}
          />
        </>
      )}
    </section>
  );
}
