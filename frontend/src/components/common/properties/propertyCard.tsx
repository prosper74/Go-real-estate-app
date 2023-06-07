import Link from "next/link";
import {
  BedIcon,
  FacebookIconFilled,
  HelpIcon,
  InstagramIcon,
  LocationIcon,
  ShowerIcon,
  TVIcon,
  TwitterIcon,
} from "../svgIcons";
import { SingleProperty } from "../interfaces";
import { PropertyCardMeta } from "./propertyMeta";

interface IProps {
  property: SingleProperty;
}

export default function PropertyCard({ property }: IProps) {
  console.log("Props:", property);

  return (
    <Link
      href="#"
      className="card items-center rounded-lg sm:flex max-h-[19rem] sm:max-h-[16rem]"
    >
      <div className="background-effect"></div>
      <img
        className="w-full sm:w-[40%] h-[220px] sm:h-full sm:rounded-none sm:rounded-l-lg object-cover"
        src={property.Images[0]}
        alt="Bonnie Avatar"
      />
      <div className="p-4 md:pr-10">
        <h3 className="text-xl md:text-2xl font-bold tracking-tight">
          {property.Title}
        </h3>

        <span className="flex items-center gap-2 mb-4">
          <HelpIcon />
          <p>{property.Type} | Period: per year</p>
        </span>

        {/* <ul className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <li className="flex items-center gap-1">
            <BedIcon dimensions="w-5 h-5" />
            <p>{property.Bedroom} Bedrooms</p>
          </li>

          <li className="flex items-center gap-1">
            <ShowerIcon dimensions="w-5 h-5" />
            <p>{property.Bathroom} Bathrooms</p>
          </li>

          <li className="flex items-center gap-1">
            <TVIcon dimensions="w-5 h-5" />
            <p>Kitchen</p>
          </li>
        </ul> */}

        <PropertyCardMeta property={property} />

        <div className="flex items-center justify-between mt-4">
          <span className="flex items-center gap-1">
            <LocationIcon dimensions="w-5 h-5" />
            <p>{property.City}, {property.State}</p>
          </span>

          <h3 className="font-bold text-xl md:text-2xl">
            ₦{Number(property.Price).toLocaleString()}
          </h3>
        </div>
      </div>
    </Link>
  );
}
