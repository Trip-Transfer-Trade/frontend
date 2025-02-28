import React from "react";
import ReactDOM from "react-dom";

export default function SharedModal({ children, onClose }){
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose && onClose();
    }
  };

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 bg-parent flex items-end justify-center z-50"
      onClick={handleOverlayClick}
      style={{ backdropFilter: "brightness(0.75)" }}
    >
      {React.cloneElement(children, { onClose })}
    </div>,
    document.getElementById("modal-root")
  );
};