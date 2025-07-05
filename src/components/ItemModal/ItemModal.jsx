import './ItemModal.css';
import closeIcon from '../../assets/close.png';
import { useContext } from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';
function ItemModal({ activeModal, card, onClose, onCardDelete }) {
    const currentUser = useContext(CurrentUserContext);
    const isOwn = card && card.owner === currentUser._id;
    return (
        <div className={`modal ${activeModal === "preview" ? "modal_opened" : ""}`}>

            <div className="modal__overlay">
            </div>
            <div className="modal__content 
                modal__content_type_image">
                <button className="modal__close" type="button" onClick={onClose}>
                    <img src={closeIcon}
                        alt='Close Modal'>
                    </img>
                </button>
                <img src={card?.imageUrl} alt={card?.name} className="modal__image" />
                <div className="modal__footer_container">
                    <div className="modal__footer">
                        <h2 className="modal__caption">{card?.name}</h2>
                        <p className="modal__weather">Weather: {card?.weather}</p>
                    </div>
                    {isOwn && (
                        <button className="modal__delete-button" onClick={() => onCardDelete(card._id)}>
                            Delete item
                        </button>
                    )}
                </div>
            </div>
        </div>
    );


}

export default ItemModal;