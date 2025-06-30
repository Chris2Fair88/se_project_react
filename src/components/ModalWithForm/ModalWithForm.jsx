import './ModalWithForm.css';
import closeIcon from '../../assets/close.png';
function ModalWithForm({ children, buttonText, title, onClose, isOpen, onSubmit, actions }) {
    return (
        <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
            <div className="modal__overlay">
            </div>
            <div className="modal__content">
                <h2 className="modal__title">
                    {title}</h2>
                <button
                    className="modal__close"
                    type="button"
                    onClick={onClose}>
                    <img src={closeIcon}></img>
                </button>
                <form className="modal__form" onSubmit={onSubmit}>
                    {children}
                    <div className="modal__actions">
                        <button type="submit" className="modal__submit">{buttonText}</button>
                        {actions}
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ModalWithForm