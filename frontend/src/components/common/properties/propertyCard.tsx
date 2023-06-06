import Link from "next/link";
import { FacebookIconFilled, InstagramIcon, TwitterIcon } from "../svgIcons";
import { SingleProperty } from "../interfaces";

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
        <h3 className="text-xl md:text-2xl font-bold tracking-tight">{property.Title}</h3>

        <span className="flex items-center gap-2">
          <FacebookIconFilled />
          <p>{property.Type}</p>
        </span>
        
        <p className="mt-3 mb-4 font-light">Lorem ipsum elit. Expedita...</p>

        <span>{property.City}</span>
        <ul className="flex space-x-4 sm:mt-0">
          <li>
            <FacebookIconFilled />
          </li>
          <li>
            <InstagramIcon />
          </li>
          <li>
            <TwitterIcon />
          </li>
        </ul>
      </div>
    </Link>
  );
}
