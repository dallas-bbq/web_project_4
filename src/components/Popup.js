class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this);
        this._submitButton = this._popup.querySelector('.popup__submit');
        this.setEventListeners();
    }

    open() {
        this._popup.classList.add('popup_is_open');
        document.addEventListener('keyup', this._handleEscClose);
    }


    close() {
        document.removeEventListener('keyup', this._handleEscClose);
        this._popup.classList.remove('popup_is_open');
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    _handleOverlayClose(evt) {
        if (evt.target.classList.contains('popup')) {
            this.close();
        }
    }

    setLoadingButton() {
        this._submitButton.textContent = 'Saving...';
    }

    setEventListeners() {
        const closeButton = this._popup.querySelector('.popup__close');
        closeButton.addEventListener('click', () => { this.close() });

        this._popup.addEventListener('click', (evt) => { this._handleOverlayClose(evt) });
    }
}

export default Popup