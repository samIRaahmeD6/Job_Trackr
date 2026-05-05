import React from 'react'
import { useEffect } from "react";
const Modal = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      {/* overlay click */}
      <div
        className="absolute inset-0"
        onClick={onClose}
      ></div>

      {/* modal box */}
      <div className=" bg-[#262624] w-125 h-165 p-6 rounded-lg z-10">
        {children}
      </div>
    </div>
  );
};

export default Modal