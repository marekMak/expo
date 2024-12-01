import React, { useEffect } from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <dialog className="modal" open>
      <div className="modal-box">
        <div className="modal-content">
          {children}
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </dialog>
  );
};

export default Modal;
