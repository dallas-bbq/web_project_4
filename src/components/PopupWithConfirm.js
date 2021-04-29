import Popup from './Popup.js'

class PopupWithConfirm extends Popup {
  constructor(popupSelector) {
    super(popupSelector)
  }

  handleConfirmClick(confirm) {
    this._confirm = confirm;
  }

  setEventListeners() {
    const submitButton = this._popup.querySelector('.popup__submit');

    submitButton.addEventListener('submit', (evt) => {
      evt.preventDefault();
      // this._confirm();
      console.log('clicked');
      this._popup.close();
    })
    
    super.setEventListeners();
  }
}

export default PopupWithConfirm