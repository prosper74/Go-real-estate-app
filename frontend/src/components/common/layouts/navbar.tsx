import React, { useState, useEffect } from "react";
import { Navbar, Dropdown, Avatar } from "flowbite-react";
import Link from "next/link";
import Image from "next/image";
// import { useSelector, RootStateOrAny } from 'react-redux';
// import UserDropdown from './userDropdown';
// import AuthPortal from '@src/components/auth';
// import LoginPopupButton from '../buttons/loginPopup';
// import {
//   HomeIcon,
//   RentIcon,
//   SettingsIcon,
//   ShortletIcon,
//   UserIcon,
// } from '../svgIcons';

export default function Header() {
  // const user = useSelector((state: RootStateOrAny) => state.user);
  const [selectedNav, setSelectedNav] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (window.location.href.indexOf("/buy") > -1) {
      setSelectedNav("buy");
    } else if (window.location.href.indexOf("/rent") > -1) {
      setSelectedNav("rent");
    } else if (window.location.href.indexOf("/shortlet") > -1) {
      setSelectedNav("shortlet");
    } else {
      setSelectedNav("");
    }
  });

  return (
    <Navbar
      fluid={true}
      rounded={true}
      className="shadow-lg fixed w-full z-20 top-0 left-0 border-b border-gray-200 !backdrop-blur-[8px] !bg-transparent sm:!px-10"
    >
      <Navbar.Brand href="https://flowbite.com/">
        <img
          src="https://flowbite.com/docs/images/logo.svg"
          className="mr-3 h-6 sm:h-9"
          alt="Flowbite Logo"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Flowbite
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Dropdown
          arrowIcon={false}
          inline={true}
          label={
            <Avatar
              alt="User settings"
              img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              rounded={true}
            />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">Bonnie Green</span>
            <span className="block truncate text-sm font-medium">
              name@flowbite.com
            </span>
          </Dropdown.Header>
          <Dropdown.Item>Dashboard</Dropdown.Item>
          <Dropdown.Item>Settings</Dropdown.Item>
          <Dropdown.Item>Earnings</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item>Sign out</Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link href="/navbars" active={true}>
          Home
        </Navbar.Link>
        <Navbar.Link href="/navbars">About</Navbar.Link>
        <Navbar.Link href="/navbars">Services</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
