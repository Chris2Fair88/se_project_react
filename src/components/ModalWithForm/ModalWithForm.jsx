import React, { useEffect } from "react";
import './ModalWithForm.css';
import closeIcon from '../../assets/close.png';

function ModalWithForm({ children, buttonText, title, onClose, isOpen, onSubmit, actions, disabled, contentClassName }) {
    useEffect(() => {
        if (!isOpen) return;
        const handleEsc = (e) => {
            if (e.key === "Escape") {
                onClose();
            }
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [isOpen, onClose]);

    const handleOverlayClick = (e) => {
        if (e.target.classList.contains("modal__overlay")) {
            onClose();
        }
    };

    return (
        <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
            <div className="modal__overlay" onClick={handleOverlayClick}></div>
            <div className={contentClassName ? contentClassName : "modal__content"}>
                <h2 className="modal__title">{title}</h2>
                <button
                    className="modal__close"
                    type="button"
                    onClick={onClose}>
                    <img src={closeIcon} alt="Close" />
                </button>
                <form className="modal__form" onSubmit={onSubmit}>
                    {children}
                    <div className="modal__actions">
                        <button type="submit" className="modal__submit" disabled={disabled}>{buttonText}</button>
                        {actions}
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ModalWithForm;