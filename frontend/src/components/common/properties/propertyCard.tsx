import Link from "next/link";
import { useSelector } from "react-redux";
import { useRouter } from 'next/router';
import { Tooltip } from "flowbite-react";
import CardEditButton from "../Buttons/cardEditButton";
import { HelpIcon, LocationIcon } from "../helpers/svgIcons";
import { SingleProperty, UserProps } from "../helpers/interfaces";
import { PropertyCardMeta } from "./propertyMeta";

interface IProps {
  property: SingleProperty;
  fixed?: boolean;
  showDescription?: boolean;
  user: UserProps;
}

export default function PropertyCard({
  property,
  fixed = false,
  showDescription = false,
}: IProps) {
  const router = useRouter();
  const user = useSelector((state: IProps) => state.user);

  const handleRefresh = () => {
    router.reload();
  };

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
    <div className={`card rounded-lg sm:flex h-auto ${fixed && "sm:flex-col"}`}>
      <div className="background-effect"></div>

      <Link
        href={adLink}
        className={`w-full sm:w-[40%] h-[180px] sm:h-[250px] sm:rounded-none sm:rounded-l-lg ${
          fixed && "sm:w-full sm:h-[180px]"
        }`}
      >
        <img
          className={`w-full h-[180px] sm:h-[250px] sm:rounded-none sm:rounded-l-lg object-cover ${
            fixed && "sm:w-full sm:h-[180px]"
          }`}
          // @ts-ignore
          src={property.Images[0]}
          alt="Property Image"
        />
      </Link>

      <div className="relative p-4 ">
        <span className="bg-primary rounded-lg pt-[1px] pb-[3px] px-[8px] text-white italics">
          {property.Category.Title}
        </span>

        <Link href={adLink}>
          <h3 className="text-xl md:text-2xl font-bold tracking-tight">
            {property.Title}
          </h3>
        </Link>

        <p className="flex items-center gap-3 mb-4">
          <span className="flex items-center gap-1">
            <HelpIcon />
            {property.Type}
          </span>
          |
          <span className="flex items-center gap-1">
            <LocationIcon dimensions="w-5 h-5" />
            {property.City}, {property.State}
          </span>
        </p>

        {showDescription && (
          <Link href={adLink}>
            <p className="my-4 hidden lg:block">
              {property.Description.substring(0, 50)}...
            </p>
          </Link>
        )}

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

        {user.userId === property.UserID && (
          <div className="absolute top-4 right-4">
            <CardEditButton propertyID={property.ID} handleDelete={handleRefresh} />
          </div>
        )}
      </div>
    </div>
  );
}
