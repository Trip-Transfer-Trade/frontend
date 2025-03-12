import React from "react";
import ReactDOM from "react-dom";
import { FiAlertCircle } from "react-icons/fi";

export default function ModalCenter({ children, onClose, isOpen }) {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      style={{ backdropFilter: "brightness(0.50)" }}
    >
      <div className="bg-white rounded-lg p-6 w-11/12 max-w-md shadow-lg relative">
        <FiAlertCircle className="text-red-500 text-4xl mx-auto mb-2 mt-5" />
        <button
          onClick={() => onClose()}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
        >
          ✖
        </button>

        {children}
      </div>
    </div>,
    document.getElementById("modal-root")
  );
}
