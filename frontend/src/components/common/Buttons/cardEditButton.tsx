"use client";

import { useState } from "react";
import { Dropdown } from "flowbite-react";
import { HiStop, HiTrash, HiPencilAlt, HiDotsVertical } from "react-icons/hi";
import DeleteModal from "../modals/deleteModal";
import { Image } from "../helpers/interfaces";

interface IProps {
  propertyID: number;
  propertyStatus: string;
  propertyImages: Image[];
  handleDelete: any;
}

export default function CardEditButton({
  propertyID,
  propertyStatus,
  propertyImages,
  handleDelete,
}: IProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <>
      <Dropdown
        label
        placement="left-start"
        renderTrigger={() => (
          <button>
            <HiDotsVertical />
          </button>
        )}
      >
        <Dropdown.Item
          icon={HiPencilAlt}
          disabled={propertyStatus === "pending"}
        >
          Edit
        </Dropdown.Item>
        <Dropdown.Item icon={HiStop} disabled={propertyStatus === "pending"}>
          Dissable
        </Dropdown.Item>
        <Dropdown.Item
          color="#666"
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
          propertyImages={propertyImages}
        />
      )}
    </>
  );
}
