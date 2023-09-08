import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { Tooltip } from "flowbite-react";
// @ts-ignore
import { Image } from "cloudinary-react";
import CardEditButton from "../Buttons/cardEditButton";
import { FavouriteIcon, LocationIcon } from "../helpers/svgIcons";
import {
  FavouriteProps,
  SingleProperty,
  UserProps,
} from "../helpers/interfaces";
import { PropertyCardMeta } from "./propertyMeta";
import { useEffect, useState } from "react";
import axios from "axios";
import { setSnackbar } from "@src/store/reducers/feedbackReducer";

interface IProps {
  property: SingleProperty;
  fixed?: boolean;
  user?: UserProps;
  handleDelete?: any;
  handleStatusUpdate?: any;
  isUserDashboard?: boolean;
}

export default function PropertyCard({
  property,
  fixed = false,
  handleDelete,
  handleStatusUpdate,
  isUserDashboard = false,
}: IProps) {
  const user = useSelector((state: IProps) => state.user);
  const dispatch = useDispatch();
  const [favourites, setFavourites] = useState<FavouriteProps[]>();

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

  const adLink =
    property.Status === "pending" || property.Status === "disabled"
      ? "#!"
      : property.Title
      ? `/${property?.Category?.Title.toLowerCase()}/property?title=${property?.Title.toLowerCase().replace(
          / /g,
          "-"
        )}&id=${property.ID}`
      : "";

  return (
    <div className="card grid grid-cols-1 sm:grid-cols-3 rounded-lg">
      <div className="background-effect" />

      <Link href={adLink}>
        <Image
          cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_NAME}
          publicId={property.Images[0]}
          crop="scale"
          className={`w-full h-[160px] sm:h-[210px] sm:rounded-none sm:rounded-l-lg object-cover ${
            fixed && "sm:h-[180px]"
          }`}
        />
      </Link>

      <div className="relative sm:col-span-2 p-4">
        <span className="bg-primary rounded-lg py-0.5 px-2 text-white text-center italics">
          {property.Category.Title} | {property.Type}
        </span>

        <Link href={adLink}>
          <h3 className="text-xl md:text-2xl font-bold tracking-tight">
            {property.Title}
          </h3>
        </Link>

        <span className="flex items-center gap-1">
          <LocationIcon dimensions="w-5 h-5" />
          {property.City}, {property.State}
        </span>

        {isUserDashboard ? (
          <p className="my-1.5 flex items-center gap-1">
            <FavouriteIcon dimensions="w-5 h-5" fill="currentColor" />
            {favourites === null ? 0 : favourites?.length}{" "}
            {favourites?.length === 1 ? "person" : "people"} liked this ad
          </p>
        ) : (
          <PropertyCardMeta property={property} />
        )}

        <div className="flex items-center justify-between">
          {property.Category.Title === "Buy" ? (
            "Buy for life"
          ) : (
            <p>Period: {property.Duration}</p>
          )}

          <h3 className="font-bold text-xl md:text-2xl">
            ₦{property.Price || 0}
          </h3>
        </div>

        {property.Status === "pending" && (
          <Tooltip
            content={`Your property is under review and will be live when review is completed by our agent`}
            style="light"
          >
            <span className="bg-primary rounded-lg pt-[1px] pb-[3px] px-[8px] italic text-white">
              Pending
            </span>
          </Tooltip>
        )}

        {property.Status === "disabled" && (
          <Tooltip
            content={`Your property is disabled, you can click the options menu and enable it`}
            style="light"
          >
            <span className="bg-primary rounded-lg pt-[1px] pb-[3px] px-[8px] italic text-white">
              Disabled
            </span>
          </Tooltip>
        )}

        {user?.userId === property.UserID && (
          <div className="absolute top-4 right-4">
            <CardEditButton
              propertyID={property.ID}
              propertyStatus={property.Status}
              propertyImages={property.Images}
              handleDelete={handleDelete}
              handleStatusUpdate={handleStatusUpdate}
            />
          </div>
        )}
      </div>
    </div>
  );
}
