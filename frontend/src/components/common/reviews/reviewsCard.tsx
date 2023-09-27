import { useState } from "react";
// @ts-ignore
import { Image as CloudinaryImage } from "cloudinary-react";
import { ReviewProps, UserProps } from "../helpers/interfaces";
import { timeSince } from "../helpers/dateFunction";
import Rating from "../helpers/starRating";
import { useSelector } from "react-redux";
import ReviewEditButton from "../Buttons/reviewEditButton";

interface IProps {
  user?: UserProps;
  review: ReviewProps;
  handleDelete?: any;
}

export default function ReviewCard({ review, handleDelete }: IProps) {
  const user = useSelector((state: IProps) => state.user);
  const [isEditMode, setIsEditMode] = useState(false);

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
        </div>
      </div>

      <div className="mt-2">
        <p>{review.Description}</p>
      </div>

      {user?.ID === review.UserID && (
        <span className="absolute top-4 right-3">
          <ReviewEditButton
            review={review}
            setIsEditMode={setIsEditMode}
            handleDelete={handleDelete}
          />
        </span>
      )}
    </div>
  );
}
