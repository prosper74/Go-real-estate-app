"use client";

import { useState } from "react";
import { Dropdown } from "flowbite-react";
import { HiStop, HiTrash, HiPencilAlt, HiDotsVertical } from "react-icons/hi";
import DeleteModal from "../modals/deleteModal";

interface IProps {
  propertyID: number;
  handleDelete: any;
}

export default function CardEditButton({ propertyID, handleDelete }: IProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <>
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
        <Dropdown.Item
          color="red"
          icon={HiTrash}
          onClick={() => setIsModalOpen(true)}
        >
          Delete
        </Dropdown.Item>
      </Dropdown>

      {isModalOpen && (
        <DeleteModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          handleDelete={handleDelete}
          propertyID={propertyID}
        />
      )}
    </>
  );
}
