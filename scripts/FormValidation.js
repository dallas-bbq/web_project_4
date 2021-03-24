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
            submitButton.disabled = true
            submitButton.classList.add(this._config.inactiveButtonClass)
        } else {
            submitButton.disabled = false
            submitButton.classList.remove(this._config.inactiveButtonClass)
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
        const submitButton = this._formElement.querySelector(this._config.submitButtonSelector);
        const formInputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));

        formInputList.forEach(input => {
            input.addEventListener('input', () => {
                this._checkInputValidity(input)
                this._toggleButton(submitButton, formInputList)
            })
        })
    }

    enableValidation() {
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        })

        this._setEventListeners();
    }
}

export default FormValidation