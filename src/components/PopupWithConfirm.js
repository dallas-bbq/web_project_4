import Popup from './Popup.js'

class PopupWithConfirm extends Popup {
  constructor(popupSelector, defaultButtonText) {
    super(popupSelector, defaultButtonText)
  }

  handleConfirmClick(confirm) {
    this._confirm = confirm;
  }

  setEventListeners() {
    super.setEventListeners();

    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._confirm();
    })
  }
}

export default PopupWithConfirm