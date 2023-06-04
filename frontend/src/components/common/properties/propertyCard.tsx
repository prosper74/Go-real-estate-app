import Link from "next/link";
import { FacebookIconFilled, InstagramIcon, TwitterIcon } from "../svgIcons";

export default function PropertyCard() {
  return (
    <Link
      href="#"
      className="items-center !bg-white rounded-lg shadow-lg sm:flex cursor-pointer"
    >
      <img
        className="w-full sm:w-1/2 md:w-[45%] h-[10rem] md:h-[16rem] rounded-lg sm:rounded-none sm:rounded-l-lg object-cover"
        src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png"
        alt="Bonnie Avatar"
      />
      <div className="p-4 md:pr-10">
        <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
          Property Name
        </h3>
        <span className="text-gray-500 dark:text-gray-400">Location</span>
        <p className="mt-3 mb-4 font-light text-gray-500 dark:text-gray-400">
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
