"use client";

import { useState } from "react";
import { Dropdown } from "flowbite-react";
import { HiStop, HiTrash, HiPencilAlt, HiDotsVertical } from "react-icons/hi";
import DeleteModal from "../modals/deleteModal";
import { Image } from "../helpers/interfaces";
import StatusUpdateModal from "../modals/statusUpdateModal";

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
        <Dropdown.Item
          icon={HiPencilAlt}
          disabled={propertyStatus === "pending"}
          onClick={() => setModalOpen("edit")}
        >
          Edit
        </Dropdown.Item>
        <Dropdown.Item
          icon={HiStop}
          disabled={propertyStatus === "pending"}
          onClick={() => setModalOpen("status")}
        >
          {propertyStatus === "disabled" ? "Enable" : "Disable"}
        </Dropdown.Item>
        <Dropdown.Item
          color="#666"
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
          handleStatusUpdate={handleDelete}
          propertyID={propertyID}
          propertyStatus={propertyStatus}
        />
      )}
    </>
  );
}
