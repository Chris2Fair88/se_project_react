import { useState } from 'react'
import './App.css'
import Header from '../Header/Header'
import Main from '../Main/Main'
import ModalWithForm from '../ModalWithForm/ModalWithForm';

function App() {
const [weatherData, setWeatherData] = useState({type: "hot"});
  return (
      <div className='page'>
        <div className='page__content'>
          <Header />
          <Main weatherData={weatherData}/>
        </div>
        <ModalWithForm title="New garment" buttonText="Add garment">
        <label htmlFor="name" className="modal__label">Name{""}
            <input className="modal__input" type="text" id="name" placeholder="Name" />
            </label>
            <label htmlFor="imageurl" className="modal__label">Image{""}
            <input className="modal__input" type="url" id="link" placeholder="Image Url"/>
            </label>
            <fieldset className="modal__radio-buttons">
            <legend>Select weather type:</legend>
            <div className="modal__radio-button">
            <input 
            className="modal__radio-input"
            type="radio" 
            id="hot" 
            name="weather" 
            value="hot"
            />
            <label className="modal__radio-label" htmlFor="hot">Hot</label>
            </div>
            <div className="modal__radio-button">
            <input 
            className="modal__radio-input"
            type="radio" 
            id="warm" 
            name="weather" 
            value="warm"
            />
            <label className="modal__radio-label" htmlFor="warm">Warm</label>
            </div>
            <div className="modal__radio-button">
            <input 
            className="modal__radio-input"
            type="radio" 
            id="cold" 
            name="weather" 
            value="cold"
            />
            <label className="modal__radio-label" htmlFor="cold">Cold</label>
            </div> 
            </fieldset>
        </ModalWithForm>
    </div>
  )
}

export default App
