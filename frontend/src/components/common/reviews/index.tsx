import { useState } from "react";
import Review from "./review";
import { ReviewProps } from "../helpers/interfaces";

interface IProps {
  favourites?: ReviewProps;
  propertyID: number;
}

export default function Reviews({ propertyID }: IProps) {
  const [reviews, setReviews] = useState<ReviewProps[]>();

  console.log("Reviews: ", reviews);

  return (
    <section className="sm:p-4">
      <Review propertyID={propertyID} setReviews={setReviews} />

      {/* latest reviews  */}
    </section>
  );
}
