export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector),
        this.setEventListeners()
    }

    close() {
        document.removeEventListener('keyup', this._handleEscClose)
        this._popup.classList.remove('popup_is_open')
    }

    open() {
        this._popup.classList.add('popup_is_open')
        document.addEventListener('keyup', this._handleEscClose)
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close()
        }
    }

    setEventListeners() {
        const closeButton = this._popup.querySelector('.popup__close')
        closeButton.addEventListener('click', () => this.close())
    }
}