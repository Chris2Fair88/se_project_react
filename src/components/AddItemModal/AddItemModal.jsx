import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import React from "react";
import { useState } from "react";
    export default function AddItemModal({ isOpen, onClose, onAddItemModalSubmit }) {
        const [name, setName] = useState("");
        const [imageUrl, setImageUrl] = useState("");
        const [weather, setWeather] = useState("");
        
        const handlenameChange = (e) => {
            setName(e.target.value);
        }
        const handleimageUrlChange = (e) => {
            setImageUrl(e.target.value);
        }
        const handleweatherChange = (e) => {
            setWeather(e.target.value);
        }

        const handleSubmit = (e) => {
            e.preventDefault();
            onAddItemModalSubmit({name, link: imageUrl, weather});
            setName("");
            setImageUrl("");
            setWeather("");

        }
    return (
        <ModalWithForm 
        title="New garment"
         buttonText="Add garment" 
         isOpen={isOpen}
         onClose={onClose}
          onSubmit={handleSubmit}
          
         >
          <label htmlFor="name" className="modal__label">
            Name{""}
            <input className="modal__input" 
            value={name}
            onChange={handlenameChange}
            type="text" 
            id="name" 
            minLength="1"
            maxLength="30"
            placeholder="Name" 
            required/>
            
          </label>
          <label htmlFor="imageurl" className="modal__label">
            Image{""}
            <input className="modal__input"
            value={imageUrl}
            onChange={handleimageUrlChange}
            type="url" 
            id="imageurl" 
            placeholder="Image Url" />
          </label>
          <fieldset className="modal__radio-buttons">
            <legend className="legend">Select weather type:</legend>
            <div className="modal__radio-button">
              <input
                className="modal__radio-input"
                type="radio"
                id="hot"
                name="weather"
                checked={weather === "hot"}
                value="hot"
                onChange={handleweatherChange}
              />
              <label className="modal__radio-label" htmlFor="hot">Hot</label>
            </div>
            <div className="modal__radio-button">
              <input
                className="modal__radio-input"
                type="radio"
                id="warm"
                name="weather"
                checked={weather === "warm"}
                value="warm"
                onChange={handleweatherChange}
              />
              <label className="modal__radio-label" htmlFor="warm">Warm</label>
            </div>
            <div className="modal__radio-button">
              <input
                className="modal__radio-input"
                type="radio"
                id="cold"
                name="weather"
                checked={weather === "cold"}
                value="cold"
                onChange={handleweatherChange}
              />
              <label className="modal__radio-label" htmlFor="cold">Cold</label>
            </div>
          </fieldset>
        </ModalWithForm>
    )
}