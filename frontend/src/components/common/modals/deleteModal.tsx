"use client";

import { Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

interface IProps {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  handleDelete: any;
}

export default function PopUpModal({ isModalOpen, setIsModalOpen, handleDelete }: IProps) {

  return (
    <>
      {/* <Button onClick={() => props.setOpenModal('pop-up')}>Toggle modal</Button> */}
      <Modal
        show={isModalOpen}
        size="md"
        popup
        onClose={() => setIsModalOpen(false)}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this product?
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color="failure"
                onClick={() => handleDelete()}
              >
                Yes, I'm sure
              </Button>
              <Button
                color="gray"
                onClick={() => setIsModalOpen(false)}
              >
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
