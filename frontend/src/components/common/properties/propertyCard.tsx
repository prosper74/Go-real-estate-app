import Link from "next/link";
import { FacebookIconFilled, InstagramIcon, TwitterIcon } from "../svgIcons";

export default function PropertyCard() {
  return (
    <Link
      href="#"
      className="card items-center rounded-lg sm:flex max-h-[19rem] sm:max-h-[16rem]"
    >
      <div className="background-effect"></div>
      <img
        className="w-full sm:w-1/2 h-1/2 sm:h-full sm:rounded-none sm:rounded-l-lg object-cover"
        src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png"
        alt="Bonnie Avatar"
      />
      <div className="p-4 md:pr-10">
        <h3 className="text-xl font-bold tracking-tight">
          Property Name
        </h3>
        <span>Location</span>
        <p className="mt-3 mb-4 font-light">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita...
        </p>
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
