import React, { FC } from "react";

interface IProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  buttonText: string;
}

const AuthButton: FC<IProps> = ({ isOpen, setIsOpen, buttonText }) => {
  return (
    <button
      type="button"
      onClick={() => setIsOpen(!isOpen)}
      className="flex justify-center shadow-lg tracking-tighter font-medium px-2 py-1 text-white text-center bg-primary rounded-lg"
    >
      {buttonText}
    </button>
  );
};

export default AuthButton;
