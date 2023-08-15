"use client";

import { Dropdown } from "flowbite-react";
import { HiStop, HiTrash, HiPencilAlt, HiDotsVertical } from "react-icons/hi";

interface IProps {
  propertyID: number;
  handleDelete: any;
}

export default function CardEditButton({ propertyID, handleDelete }: IProps) {
  return (
    <Dropdown
      label
      renderTrigger={() => (
        <button>
          <HiDotsVertical />
        </button>
      )}
    >
      <Dropdown.Item icon={HiPencilAlt}>Edit</Dropdown.Item>
      <Dropdown.Item icon={HiStop}>Dissable</Dropdown.Item>
      <Dropdown.Item icon={HiTrash} onClick={() => handleDelete()}>Delete</Dropdown.Item>
    </Dropdown>
  );
}
