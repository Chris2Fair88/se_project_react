import { defaultClothingItems } from "../../utils/constants";
import ItemCard from "../ItemCard/ItemCard";
import './ClothesSection.css';

function ClothesSection() {
    const handleCardClick = (card) => {
        console.log(card);
    }
    return (
        <div className="clothes-section">
            <div className="clothes-section__header">
                <p>Your Items</p>
                <button> + Add New</button>
            </div>
            <ul className="cards__list">
                {defaultClothingItems.map((item) => {
                        return (
                            <ItemCard
                                item={item}
                                key={item._id}
                                onCardClick={handleCardClick}
                                 />
                        );
                    })}
            </ul>
        </div>

    );
}
export default ClothesSection;