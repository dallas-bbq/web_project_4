import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
    constructor(popup) {
        super(popup)
    }

    open() {
        this._popup.classList.add('.popup_is_open')
    }
}