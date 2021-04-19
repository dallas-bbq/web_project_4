class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector),
        this.setEventListeners()
    }

    open() {
        this._popup.classList.add('popup_is_open')
        document.addEventListener('keyup', this._handleEscClose.bind(this))
    }


    close() {
        document.removeEventListener('keyup', this._handleEscClose.bind(this))
        this._popup.classList.remove('popup_is_open')
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close()
        }
    }

    setEventListeners() {
        const closeButton = this._popup.querySelector('.popup__close')
        closeButton.addEventListener('click', () => { this.close() })
    }
}

export default Popup