import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import "./Modal.css";

const modalRoot = document.getElementById("modal-root");

const Modal = ({ header, content, footer, setIsModalOpen }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    modalRef.current?.focus();
  }, []);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") setIsModalOpen(false);
    };

    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [setIsModalOpen]);

  if (!modalRoot) return null;

  return ReactDOM.createPortal(
    <div
      id="modal"
      className="modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-content"
      onClick={() => setIsModalOpen(false)}
    >
      <div
        ref={modalRef}
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="header">
          <span
            className="close-button"
            aria-label="Close modal"
            onClick={() => setIsModalOpen(false)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                setIsModalOpen(false);
              }
            }}
          >
            &times;
          </span>
          {header || <h2 id="modal-title">This is Header</h2>}
        </div>

        <div className="content" id="modal-content">
          {content || <p>This is content</p>}
        </div>

        <div className="footer">{footer || <h4>This is footer</h4>}</div>
      </div>
    </div>,
    modalRoot,
  );
};

export default Modal;
