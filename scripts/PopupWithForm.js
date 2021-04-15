import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitHandler) {
        super(popupSelector)
        this._submitHandler = submitHandler
        this.setEventListeners()
    }

    _getInputValues() { 
        const values = {}

        const inputs = Array.from(this._form.querySelectorAll('.popup__input'))
        inputs.forEach(input => {
            values[input.name] = input.value
        })

        return values
    }

    close() { 
        super.close();
        this._form = document.querySelector('.popup__form');
        this._form.reset();
    }

    setEventListeners() {
        super.setEventListeners();
        
            this._popup.addEventListener('submit', (e) => {
            e.preventDefault()
            this._submitHandler()
        })
     } 
    
}