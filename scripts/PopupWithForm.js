import Popup from './Popup.js'

class PopupWithForm extends Popup {
    constructor({ popupSelector, handleFormSubmit }) {
        super(popupSelector)
        this._handleFormSubmit = handleFormSubmit
    }

    close() {
        super.close();
    }

    _getInputValues() {
        this._inputList = this._popup.querySelectorAll(".popup__input");

        this._formValues = {};
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });

        return this._formValues;
    }

    setEventListeners() {
        this._form = document.querySelector('.popup__form');

        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
            this._form.reset();
        });

        super.setEventListeners()
    }
}

export default PopupWithForm