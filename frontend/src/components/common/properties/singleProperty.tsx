import React, { FC } from "react";
import ImageSlider from "./imageSlider";
import { PropertyMeta } from "./propertyMeta";
import { timeSince } from "@src/components/common/helpers/dateFunction";
import AgentCard from "./agentCard";
import { SingleProperty } from "../helpers/interfaces";
import { CalendarIcon, FavouriteIcon, HomeIcon } from "../helpers/svgIcons";
import DescriptionTab from "./descriptionTab";

interface IProps {
  property: SingleProperty;
}

const SinglePropertyBody: FC<IProps> = ({ property }) => {
  const propertyAgent = property.User;

  return (
    <section className="mb-6">
      {/* Property Image Slide */}
      <ImageSlider property={property} />

      {/* Property Name  */}
      <div className="flex justify-between items-center my-3 ">
        <p className="italic">{property.Category.Title}</p>
        <span>
          <FavouriteIcon dimensions="w-8 h-8" fill="#9932cc" outline="none" />
        </span>
      </div>

      <h3 className="font-bold text-2xl md:text-3xl">{property.Title}</h3>
      <PropertyMeta property={property} />
      {property.Size && (
        <span className="flex items-center gap-1">
          <HomeIcon dimensions="w-5 h-5" />
          {property.Size} sqm
        </span>
      )}
      <ul className="flex items-center my-4 space-x-1 text-lg font-normal leading-4 text-coolGray-500">
        <li>
          <CalendarIcon dimensions="w-5 h-5" fill="#9932cc" />
        </li>
        <li>
          <span className="font-medium">Added: </span>{" "}
          {timeSince(new Date(property.CreatedAt))} ago
        </li>
      </ul>
      <h3 className="text-purple-600 font-bold text-2xl md:text-4xl mb-4">
        ₦{property.Price}
        {property.Duration ? `/${property.Duration}` : ""}
      </h3>

      <AgentCard agent={propertyAgent} />

      <DescriptionTab property={property} />
    </section>
  );
};

export default SinglePropertyBody;
