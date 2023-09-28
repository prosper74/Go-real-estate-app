"use client";

import { useState } from "react";
import { Dropdown } from "flowbite-react";
import { HiTrash, HiPencilAlt, HiDotsVertical } from "react-icons/hi";
import { ReviewProps } from "../helpers/interfaces";
import DeleteReviewModal from "../modals/deleteReviewModal";

interface IProps {
  review: ReviewProps;
  setIsEditMode: (open: boolean) => void;
  handleDelete: any;
}

export default function ReviewEditButton({
  review,
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

      <DeleteReviewModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        handleDelete={handleDelete}
        propertyID={review.PropertyID}
        reviewID={review.ID}
      />
    </>
  );
}
