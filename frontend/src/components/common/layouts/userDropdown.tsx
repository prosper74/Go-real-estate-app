// index.tsx
import React, { FC, Fragment, useState } from "react";
import Link from "next/link";
import axios from "axios";
import Cookies from "js-cookie";
import { Menu, Transition } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
// @ts-ignore 
import { Image } from "cloudinary-react";
import { setUser } from "@src/store/reducers/userReducer";
import { useIsMedium } from "@src/components/common/hooks/mediaQuery";
import { UserProps } from "../helpers/interfaces";

interface IProps {
  user?: UserProps;
}

const UserDropdown: FC<IProps> = () => {
  const user = useSelector((state: IProps) => state.user);
  const isMedium = useIsMedium();
  const dispatch = useDispatch();
  const defaultUser = { username: "Guest" };
  const [isOpen, setIsOpen] = useState(false);

  const userImage = user?.Image && user?.Image;

  const handleLogout = async () => {
    setIsOpen(!isOpen);
    typeof window !== "undefined" && Cookies.remove("user");
    dispatch(setUser(defaultUser));

    axios
      .get(`${process.env.NEXT_PUBLIC_REST_API}/user/logout`)
      .then()
      .catch((error) => console.error(error));
  };

  function handleModal() {
    setIsOpen(!isOpen);
  }

  console.log(user);

  return (
    <Menu as="div" className="relative inline-block text-left z-1000">
      <div>
        <Menu.Button
          onClick={handleModal}
          className="inline-flex justify-center w-full rounded-md border border-gray-100 shadow-sm px-3 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
        >
          <button className="flex items-center mr-2">
            <span>{isMedium && user?.FirstName.substring(0, 7)}</span>
            {user?.Image ? (
              <Image
                cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_NAME}
                publicId={user?.Image}
                alt="User settings"
                width="40"
                height="40"
                crop="scale"
                className="ml-2 sm:ml-4 w-10 h-10 object-cover rounded-full"
              />
            ) : (
              <img
                className="ml-2 sm:ml-4 w-10 h-10 object-cover rounded-full"
                src={userImage ? userImage : "/assets/images/avatar-online.png"}
                alt="user image"
              />
            )}

            <img
              className="ml-4"
              src="/assets/images/arrow-down-gray.svg"
              alt="arrow down icon"
            />
          </button>
        </Menu.Button>
      </div>

      <Transition
        appear
        as={Fragment}
        show={isOpen}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-[1000]">
          <div className="py-1">
            <Menu.Item>
              <Link href="/create-ad">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className={`text-gray-900 block px-4 py-2 w-full text-left text-sm font-bold rounded-md hover:bg-slate-100`}
                >
                  Create Ad
                </button>
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link href="/agent/account">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className={`text-gray-900 block px-4 py-2 w-full text-left text-sm rounded-md hover:bg-slate-100`}
                >
                  My Profile
                </button>
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link href="/faq">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className={`text-gray-900 block px-4 py-2 w-full text-left text-sm rounded-md hover:bg-slate-100`}
                >
                  Support
                </button>
              </Link>
            </Menu.Item>
            <Menu.Item>
              <button
                className={`text-gray-900 block px-4 py-2 w-full text-left text-sm rounded-md hover:bg-slate-100`}
                onClick={handleLogout}
              >
                Sign out
              </button>
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default UserDropdown;
