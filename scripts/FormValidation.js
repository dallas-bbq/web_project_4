class FormValidation {
    constructor(config, formElement) {
        this._config = config
        this._formElement = formElement
    }

    _showError(input, inputValidationMessage) {
        const formError = this._formElement.querySelector(`#${input.id}-error`);
        input.classList.add(this._config.inputErrorClass);
        formError.classList.add(this._config.errorClass);
        formError.textContent = inputValidationMessage;
    }

    _hideError(input) {
        const formError = this._formElement.querySelector(`#${input.id}-error`);
        input.classList.remove(this._config.inputErrorClass);
        formError.textContent = '';
        formError.classList.remove(this._config.errorClass);
    }

    _toggleButton(submitButton, formInputList) {
        const isValid = formInputList.every((input) => {
            return input.validity.valid
        })

        if (!isValid) {
            this._submitButton.disabled = true
            this._submitButton.classList.add(this._config.inactiveButtonClass)
        } else {
            this._submitButton.disabled = false
            this._submitButton.classList.remove(this._config.inactiveButtonClass)
        }
    }

    _checkInputValidity(input) {
        if (!input.validity.valid) {
            this._showError(input, input.validationMessage)
        } else {
            this._hideError(input)
        }
    }

    _setEventListeners() {
        this._submitButton = this._formElement.querySelector(this._config.submitButtonSelector);
        this._formInputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));

        this._formInputList.forEach(input => {
            input.addEventListener('input', () => {
                this._checkInputValidity(input)
                this._toggleButton(this._submitButton, this._formInputList)
            })
        })
    }

    resetValidation() {
        this._formInputList.forEach((input) => {
            this._hideError(input)
        });

        this._toggleButton(this._submitButton, this._formInputList);
    }

    enableValidation() {
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        })

        this._setEventListeners();
    }
}

export default FormValidation