import Link from "next/link";
import { HelpIcon, LocationIcon } from "../svgIcons";
import { SingleProperty } from "../interfaces";
import { PropertyCardMeta } from "./propertyMeta";

interface IProps {
  property: SingleProperty;
  fixed?: boolean;
  source?: string;
}

export default function PropertyCard({
  property,
  fixed = false,
  source = "",
}: IProps) {
  return (
    <Link
      href={
        property.Title
          ? `/${property?.Category?.Title.toLowerCase()}/property?title=${property?.Title.toLowerCase().replace(
              / /g,
              "-"
            )}&id=${property.ID}`
          : ""
      }
      className={`card rounded-lg sm:flex h-auto ${fixed && "sm:flex-col"}`}
    >
      <div className="background-effect"></div>
      <img
        className={`w-full sm:w-[40%] h-[220px] sm:h-full sm:rounded-none sm:rounded-l-lg object-cover ${
          fixed && "sm:w-full sm:h-[220px]"
        }`}
        // @ts-ignore
        src={property.Images[0]}
        alt="Property Image"
      />
      <div className="p-4 md:pr-10">
        <span className="bg-primary rounded-lg pt-[1px] pb-[3px] px-[8px] text-white italics">
          {property.Category.Title}
        </span>

        <h3 className="text-xl md:text-2xl font-bold tracking-tight">
          {property.Title}
        </h3>

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

        {source === "home page" && (
          <p className="my-4 hidden lg:block">
            {property.Description.substring(0, 50)}...
          </p>
        )}

        <PropertyCardMeta property={property} />

        <div className="flex items-center justify-between mt-4">
          {property.Category.Title === "Buy" ? (
            "Buy for life"
          ) : (
            <p>Period: {property.Duration}</p>
          )}

          <h3 className="font-bold text-xl md:text-2xl">
            ₦{Number(property.Price).toLocaleString()}
          </h3>
        </div>
      </div>
    </Link>
  );
}
