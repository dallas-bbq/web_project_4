import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector)
    }

    open() {
        this._popupSelector.classList.add('.popup_is_open')
    }
}