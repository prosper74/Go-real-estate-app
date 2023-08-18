import Link from "next/link";
import { useSelector } from "react-redux";
import { Tooltip } from "flowbite-react";
// @ts-ignore
import { Image } from "cloudinary-react";
import CardEditButton from "../Buttons/cardEditButton";
import { LocationIcon } from "../helpers/svgIcons";
import { SingleProperty, UserProps } from "../helpers/interfaces";
import { PropertyCardMeta } from "./propertyMeta";

interface IProps {
  property: SingleProperty;
  fixed?: boolean;
  user?: UserProps;
  handleDelete?: any;
}

export default function PropertyCard({
  property,
  fixed = false,
  handleDelete,
}: IProps) {
  const user = useSelector((state: IProps) => state.user);

  const adLink =
    property.Status === "pending"
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

        <PropertyCardMeta property={property} />

        <div className="flex items-center justify-between">
          {property.Category.Title === "Buy" ? (
            "Buy for life"
          ) : (
            <p>Period: {property.Duration}</p>
          )}

          <h3 className="font-bold text-xl md:text-2xl">
            ₦{Number(property.Price).toLocaleString()}
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

        {user?.userId === property.UserID && (
          <div className="absolute top-4 right-4">
            <CardEditButton
              propertyID={property.ID}
              handleDelete={handleDelete}
            />
          </div>
        )}
      </div>
    </div>
  );
}
