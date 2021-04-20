import Popup from './Popup.js'

class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector)
       
    }

    open(name, link) {
        this._popup.querySelector('.popup__image').src = link
        this._popup.querySelector('.popup__caption').textContent = name

        super.open()
    }
}

export default PopupWithImage