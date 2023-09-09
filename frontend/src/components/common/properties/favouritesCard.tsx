import { useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { Tooltip } from "flowbite-react";
import axios from "axios";
import { setSnackbar } from "@src/store/reducers/feedbackReducer";
import { HiTrash } from "react-icons/hi";
// @ts-ignore
import { Image } from "cloudinary-react";
import { FavouriteIcon, LocationIcon } from "../helpers/svgIcons";
import {
  FavouriteProps,
  SingleProperty,
  UserProps,
} from "../helpers/interfaces";
import { PropertyCardMeta } from "./propertyMeta";

interface IProps {
  user?: UserProps;
  singleFavourite?: FavouriteProps;
  fixed?: boolean;
}

export default function FavouritesCard({ singleFavourite, fixed = false }: IProps) {
  const user = useSelector((state: IProps) => state.user);
  const dispatch = useDispatch();
  const [favourite, setFavourite] = useState(singleFavourite);

  const category =
    favourite?.Property.CategoryID === 1
      ? "buy"
      : favourite?.Property.CategoryID === 2
      ? "rent"
      : "shortlet";

  const adLink = favourite?.Property.Title
    ? `/${category.toLowerCase()}/property?title=${favourite?.Property.Title.toLowerCase().replace(
        / /g,
        "-"
      )}&id=${favourite?.Property.ID}`
    : "";

  return (
    <div className="card grid grid-cols-1 sm:grid-cols-3 rounded-lg">
      <div className="background-effect" />

      <Link href={adLink}>
        <Image
          cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_NAME}
          publicId={favourite?.Property.Images[0]}
          crop="scale"
          className={`w-full h-[160px] sm:h-[210px] sm:rounded-none sm:rounded-l-lg object-cover ${
            fixed && "sm:h-[180px]"
          }`}
        />
      </Link>

      <div className="relative sm:col-span-2 p-4">
        <span className="bg-primary rounded-lg py-0.5 px-2 text-white text-center italics">
          {category} | {favourite?.Property.Type}
        </span>

        <Link href={adLink}>
          <h3 className="text-xl md:text-2xl font-bold tracking-tight">
            {favourite?.Property.Title}
          </h3>
        </Link>

        <span className="flex items-center gap-1">
          <LocationIcon dimensions="w-5 h-5" />
          {favourite?.Property.City}, {favourite?.Property.State}
        </span>

        <PropertyCardMeta property={favourite?.Property} />

        <div className="flex items-center justify-between">
          <h3 className="font-bold text-xl md:text-2xl">
            ₦{favourite?.Property.Price || 0}
          </h3>
        </div>

        {user?.userId === favourite?.UserID && (
          <button className="absolute top-4 right-4">
            <Tooltip content={"Remove from favourites"} style="light">
              <HiTrash size={25} />
            </Tooltip>
          </button>
        )}
      </div>
    </div>
  );
}
