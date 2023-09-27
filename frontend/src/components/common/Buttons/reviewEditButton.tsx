"use client";

import { useState } from "react";
import Link from "next/link";
import { Dropdown } from "flowbite-react";
import { HiStop, HiTrash, HiPencilAlt, HiDotsVertical } from "react-icons/hi";
import DeleteModal from "../modals/deleteModal";
import StatusUpdateModal from "../modals/statusUpdateModal";
import { Image, ReviewProps } from "../helpers/interfaces";

interface IProps {
  review: ReviewProps;
  isEditMode: boolean;
  setIsEditMode: (open: boolean) => void;
  handleDelete: any;
}

export default function ReviewEditButton({
  review,
  isEditMode,
  setIsEditMode,
  handleDelete,
}: IProps) {
  const [modalOpen, setModalOpen] = useState(false);

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
        <Dropdown.Item icon={HiPencilAlt} onClick={() => setIsEditMode(true)}>
          Edit
        </Dropdown.Item>

        <Dropdown.Item icon={HiTrash} onClick={() => setModalOpen(true)}>
          Delete
        </Dropdown.Item>
      </Dropdown>

      {/* <DeleteReviewModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        handleDelete={handleDelete}
        propertyID={propertyID}
        propertyImages={propertyImages}
      /> */}
    </>
  );
}
