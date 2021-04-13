export default class Popup {
    constructor(popupSelector) {
        this._popupSelector = popupSelector
    }

    _handleEscClose(e) {
        if (e.key === 'Escape') {
            this._popupSelector.classList.remove('.popup_is_open')
        }
    }

    open() {
        this._popupSelector.classList.add('.popup_is_open')
        document.addEventListener('keydown', this._handleEscClose())
    }

    close() {
        document.removeEventListener('keydown', this._handleEscClose())
        this._popupSelector.classList.remove('.popup_is_open')
    }

    setEventListeners() {
        const closeButton = this._popupSelector.querySelector('.popup__close');
        closeButton.addEventListener('click', () => this.close())
    }
}