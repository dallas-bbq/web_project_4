export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector)
    }

    _handleEscClose(e) {
        if (e.key === 'Escape') {
            this._popup.classList.remove('.popup_is_open')
        }
    }

    open() {
        this._popupS.classList.add('.popup_is_open')
        document.addEventListener('keydown', this._handleEscClose())
    }

    close() {
        document.removeEventListener('keydown', this._handleEscClose())
        this._popup.classList.remove('.popup_is_open')
    }

    setEventListeners() {
        const closeButton = this._popup.querySelector('.popup__close');
        closeButton.addEventListener('click', () => this.close())
    }
}