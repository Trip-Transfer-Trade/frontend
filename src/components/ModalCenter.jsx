import React from "react";
import ReactDOM from "react-dom";
import { FiAlertCircle } from "react-icons/fi";

export default function ModalCenter({ children, onClose, isOpen }) {

    if (!isOpen) return null;
//   const handleOverlayClick = (e) => {
//     if (e.target === e.currentTarget) {
//       console.log("🛑 오버레이 클릭 감지됨");
//       onClose && onClose();
//     }
//   };
//   if (!document.getElementById("modal-root")) {
//     const modalRoot = document.createElement("div");
//     modalRoot.id = "modal-root";
//     document.body.appendChild(modalRoot);
//   }

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      onClick={(e)=>{
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      style={{ backdropFilter: "brightness(0.50)" }}
    >
       <div className="bg-white rounded-lg p-6 w-11/12 max-w-md shadow-lg relative">
        <FiAlertCircle className="text-red-500 text-4xl mx-auto mb-2" />

        <button
          onClick={(e) => {
            onClose()
        }}
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