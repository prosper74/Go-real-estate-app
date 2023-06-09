import React, { FC } from "react";
import ImageSlider from "./imageSlider";
import { PropertyMeta } from "./propertyMeta";
import { timeSince } from "@src/components/common/dateFunction";
import AgentCard from "./agentCard";
import { RelatedPropertiesSlide } from "./relatedProperties";
import { SingleProperty } from "../interfaces";
import { CalendarIcon } from "../svgIcons";

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
      <p className="mt-6 italic">{property.Category.Title}</p>
      <h3 className="font-bold text-2xl md:text-3xl">{property.Title}</h3>
      <PropertyMeta property={property} />
      <ul className="flex items-center my-1 space-x-1 text-lg font-normal leading-4 text-coolGray-500">
        <li>
          <CalendarIcon dimensions="w-5 h-5" fill="#9932cc" />
        </li>
        <li>
          <span className="font-medium">Added: </span>{" "}
          {timeSince(new Date(property.CreatedAt))} ago
        </li>
      </ul>
      <h3 className="text-purple-600 font-bold text-2xl md:text-4xl my-4">
        ₦{Number(property.Price).toLocaleString()}
        {property.Duration ? `/${property.Duration}` : ""}
      </h3>

      <AgentCard agent={propertyAgent} />

      <h3 className="text-3xl font-medium">Description</h3>
      <p className="text-lg">{property.Description}</p>

      <h3 className="text-3xl font-medium my-6">Related Properties</h3>
      <RelatedPropertiesSlide propertyType={property.Type} propertyId={property.ID} />
    </section>
  );
};

export default SinglePropertyBody;
