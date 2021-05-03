import Popup from './Popup.js'

class PopupWithForm extends Popup {
    constructor({ popupSelector, defaultButtonText, handleFormSubmit }) {
        super(popupSelector, defaultButtonText);
        this._handleFormSubmit = handleFormSubmit;
        this._inputList = this._popup.querySelectorAll(".popup__input");
    }

    close() {
        this._form.reset();
        super.close();
    }

    _getInputValues() {
        this._formValues = {};
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });

        return this._formValues;
    }

    setEventListeners() {
        this._form = this._popup.querySelector('.popup__form');

        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
        });

        super.setEventListeners()
    }
}

export default PopupWithForm