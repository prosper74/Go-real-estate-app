"use client";

import { useState } from "react";
import Link from "next/link";
import { Dropdown } from "flowbite-react";
import { HiStop, HiTrash, HiPencilAlt, HiDotsVertical } from "react-icons/hi";
import DeleteModal from "../modals/deleteModal";
import StatusUpdateModal from "../modals/statusUpdateModal";
import { Image } from "../helpers/interfaces";

interface IProps {
  propertyID: number;
  propertyStatus: string;
  propertyImages: Image[];
  handleDelete: any;
  handleStatusUpdate: any;
}

export default function CardEditButton({
  propertyID,
  propertyStatus,
  propertyImages,
  handleDelete,
  handleStatusUpdate,
}: IProps) {
  const [modalOpen, setModalOpen] = useState<string>("");

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
        {propertyStatus !== "pending" && (
          <>
            <Dropdown.Item
              icon={HiPencilAlt}
            >
              <Link
                href={`/agent/edit-ad?status=${propertyStatus}&id=${propertyID}`}
              >
                Edit
              </Link>
            </Dropdown.Item>

            <Dropdown.Item
              icon={HiStop}
              onClick={() => setModalOpen("status")}
            >
              {propertyStatus === "disabled" ? "Enable" : "Disable"}
            </Dropdown.Item>
          </>
        )}

        <Dropdown.Item
          icon={HiTrash}
          onClick={() => setModalOpen("delete")}
        >
          Delete
        </Dropdown.Item>
      </Dropdown>

      {modalOpen === "delete" ? (
        <DeleteModal
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          handleDelete={handleDelete}
          propertyID={propertyID}
          propertyImages={propertyImages}
        />
      ) : (
        <StatusUpdateModal
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          handleStatusUpdate={handleStatusUpdate}
          propertyID={propertyID}
          propertyStatus={propertyStatus}
        />
      )}
    </>
  );
}
