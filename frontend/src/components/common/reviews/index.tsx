import { useDispatch, useSelector } from "react-redux";
// @ts-ignore
import { Image } from "cloudinary-react";
import { UserProps } from "../helpers/interfaces";
import Review from "./review";

interface IProps {
  user?: UserProps;
  propertyID?: number;
  reviews?: any;
}

export default function Reviews() {
  const user = useSelector((state: IProps) => state.user);
  const dispatch = useDispatch();

  return (
    <section className="p-4">
      <Review />
    </section>
  );
}
