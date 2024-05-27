// src/components/Modal.tsx
import React from 'react';
import '@/components/Modal/modal.css'

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                {children}
                <button
                    onClick={onClose}
                    className="mt-4 bg-blue-500 text-white p-2 rounded"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default Modal;
