import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
// @ts-ignore
import { Image } from "cloudinary-react";
import { UserProps } from "../helpers/interfaces";
import Rating from "../helpers/starRating";

interface IProps {
  user?: UserProps;
  propertyID?: number;
  reviews?: any;
}

export default function Review() {
  const user = useSelector((state: IProps) => state.user);
  const dispatch = useDispatch();
  const ratingRef = useRef(null);

  return (
    <section>
      <h3 className="font-bold text-stone-950 text-lg">Prosper Atu</h3>

      <div className="flex items-center">
        <Rating number={3.5}  />
      </div>
    </section>
  );
}
