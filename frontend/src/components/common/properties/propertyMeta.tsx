import React, { FC } from "react";
import { SingleProperty } from "@src/components/common/interfaces";
import { BedIcon, HomeIcon, ShowerIcon } from "../svgIcons";

interface IProps {
  property: SingleProperty;
}

export const PropertyMeta: FC<IProps> = ({ property }) => {
  return (
    <>
      <ul className="flex flex-col sm:flex-row items-start sm:items-center my-1 space-x-1 text-base font-normal leading-4 mb-3">
        {property.Bedroom && (
          <li className="flex flex-row items-center gap-1">
            <BedIcon dimensions="w-5 h-5" />
            {property.Bedroom} Bedroom{Number(property.Bedroom) > 1 && "s"}
          </li>
        )}

        {property.Bathroom && (
          <li className="flex flex-row items-center gap-1">
            <ShowerIcon dimensions="w-5 h-5" />
            {property.Bathroom} Bathroom{Number(property.Bathroom) > 1 && "s"}
          </li>
        )}

        {property.Size && (
          <li className="flex flex-row items-center gap-1">
            <HomeIcon dimensions="w-5 h-5" />
            {property.Size} sqm
          </li>
        )}
      </ul>
    </>
  );
};

export const PropertyCardMeta: FC<IProps> = ({ property }) => {
  return (
    <>
      <ul className="grid grid-cols-1 lg:grid-cols-2 gap-2">
        {property.Bedroom && (
          <li className="flex items-center gap-1">
            <BedIcon dimensions="w-5 h-5" />
            <p>
              {property.Bedroom} Bedroom{Number(property.Bedroom) > 1 && "s"}
            </p>
          </li>
        )}

        {property.Bathroom && (
          <li className="flex items-center gap-1">
            <ShowerIcon dimensions="w-5 h-5" />
            {property.Bathroom} Bathroom{Number(property.Bathroom) > 1 && "s"}
          </li>
        )}

        {property.Size && (
          <li className="flex items-center gap-1">
            <HomeIcon dimensions="w-5 h-5" />
            {property.Size} sqm
          </li>
        )}
      </ul>
    </>
  );
};
