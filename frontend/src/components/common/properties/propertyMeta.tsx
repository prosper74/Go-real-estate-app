import React, { FC } from "react";
import { SingleProperty } from "@src/components/common/helpers/interfaces";
import {
  BedIcon,
  HelpIcon,
  LocationIcon,
  ShowerIcon,
} from "../helpers/svgIcons";

interface IProps {
  property?: SingleProperty;
}

export const PropertyMeta: FC<IProps> = ({ property }) => {
  return (
    <>
      <p className="flex items-center gap-3 mb-4">
        <span className="flex items-center gap-1">
          <HelpIcon />
          {property?.Type}
        </span>
        |
        <span className="flex items-center gap-1">
          <LocationIcon dimensions="w-5 h-5" />
          {property?.City}, {property?.State}
        </span>
      </p>

      <ul className="flex flex-col sm:flex-row items-start sm:items-center my-1 gap-4 text-base font-normal leading-4 mb-3">
        {property?.Bedroom && (
          <li className="flex flex-row items-center gap-1">
            <BedIcon dimensions="w-5 h-5" />
            {property?.Bedroom} Bedroom{Number(property?.Bedroom) > 1 && "s"}
          </li>
        )}

        {property?.Bathroom && (
          <li className="flex flex-row items-center gap-1">
            <ShowerIcon dimensions="w-5 h-5" />
            {property?.Bathroom} Bathroom{Number(property?.Bathroom) > 1 && "s"}
          </li>
        )}        
      </ul>
    </>
  );
};

export const PropertyCardMeta: FC<IProps> = ({ property }) => {
  return (
    <>
      <ul className="flex flex-col sm:flex-row items-start sm:items-center my-1 gap-4 text-base font-normal leading-4 mb-3">
        {property?.Bedroom && (
          <li className="flex items-center gap-1">
            <BedIcon dimensions="w-5 h-5" />
            <p>
              {property?.Bedroom} Bedroom{Number(property?.Bedroom) > 1 && "s"}
            </p>
          </li>
        )}   

        {property?.Bathroom && (
          <li className="flex flex-row items-center gap-1">
            <ShowerIcon dimensions="w-5 h-5" />
            {property?.Bathroom} Bathroom{Number(property?.Bathroom) > 1 && "s"}
          </li>
        )}    
      </ul>
    </>
  );
};
