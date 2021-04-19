import Popup from './Popup.js'

class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector)
    }

    open(name, link) {
        document.querySelector('.popup__image').src = link,
        document.querySelector('.popup__caption').textContent = name,

        super.open()
    }
}

export default PopupWithImage