"use client";

import { Dropdown } from "flowbite-react";
import {
  HiCog,
  HiCurrencyDollar,
  HiLogout,
  HiViewGrid,
  HiDotsVertical,
} from "react-icons/hi";

export default function CardEditButton() {
  return (
    <Dropdown
      label
      renderTrigger={() => (
        <button>
          <HiDotsVertical />
        </button>
      )}
    >
      <Dropdown.Item icon={HiViewGrid}>Dashboard</Dropdown.Item>
      <Dropdown.Item icon={HiCog}>Settings</Dropdown.Item>
      <Dropdown.Item icon={HiCurrencyDollar}>Earnings</Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item icon={HiLogout}>Sign out</Dropdown.Item>
    </Dropdown>
  );
}
