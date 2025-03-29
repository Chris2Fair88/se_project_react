import './ItemModal.css';
import closeIcon from '../../assets/close.png';
function ItemModal({activeModal, card, onClose}) {
    return (
        <div className={`modal ${activeModal === "preview" ? "modal__opened" : ""}`}> 
            <div className="modal__content modal__content_type_image">
            <button className="modal__close" type="button" onClick={onClose}>
                <img src={closeIcon}></img>
                    </button>
                    <img src={card.link} alt="" className="modal__image"/>
                    <div className="modal__footer">
                    <h2 className="modal__caption">{card.name}</h2>
                    <p className="modal__weather">Weather: {card.weather}</p>
            </div>
        </div>
    </div>
    );


}

export default ItemModal;