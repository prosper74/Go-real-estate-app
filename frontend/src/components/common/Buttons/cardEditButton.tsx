"use client";

import { Dropdown } from "flowbite-react";
import { HiStop, HiTrash, HiPencilAlt, HiDotsVertical } from "react-icons/hi";

interface IProps {
  propertyID: number;
}

export default function CardEditButton({ propertyID }: IProps) {
  return (
    <Dropdown
      label
      renderTrigger={() => (
        <button>
          <HiDotsVertical />
        </button>
      )}
      className="bg-[#fdeeffa8] !backdrop-blur-[12px]"
    >
      <Dropdown.Item icon={HiPencilAlt}>Edit</Dropdown.Item>
      <Dropdown.Item icon={HiStop}>Dissable</Dropdown.Item>
      <Dropdown.Item icon={HiTrash}>Delete</Dropdown.Item>
    </Dropdown>
  );
}
