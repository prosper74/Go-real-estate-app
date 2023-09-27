// @ts-ignore
import { Image as CloudinaryImage } from "cloudinary-react";
import { ReviewProps } from "../helpers/interfaces";
import { timeSince } from "../helpers/dateFunction";
import Rating from "../helpers/starRating";

interface IProps {
  review: ReviewProps;
}

export default function ReviewCard({ review }: IProps) {
  return (
    <div
    className="border border-purple-500 rounded-lg p-3 my-3">
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
  );
}
