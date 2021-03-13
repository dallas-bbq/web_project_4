function showError(input, inputValidationMessage, form, config) {
    input.classList.add(config.inputErrorClass);
    const formError = form.querySelector(`#${input.id}-error`);
    formError.classList.add(config.errorClass);
    formError.textContent = inputValidationMessage;
}

function hideError(input, form, config) {
    input.classList.remove(config.inputErrorClass);
    const formError = form.querySelector(`#${input.id}-error`);
    formError.textContent = '';
    formError.classList.remove(config.errorClass);
}

function toggleButton(submitButton, formInput, config) {
    const isValid = formInput.every((input) => {
        return input.validity.valid
    })

    if (!isValid) {
        submitButton.disabled = true
        submitButton.classList.add(config.inactiveButtonClass)
    } else {
        submitButton.disabled = false
        submitButton.classList.remove(config.inactiveButtonClass)
    }
}

function checkInputValiditiy(input, form, config) {
    if (!input.validity.valid) {
        showError(input, input.validationMessage, form, config)
    } else {
        hideError(input, form, config)
    }
}

function enableValidation(config) {
    const formElement = document.querySelectorAll(config.formSelector);
    formElement.forEach(form => {
        form.addEventListener('submit', (evt) => {
            evt.preventDefault()
        })

        const submitButton = form.querySelector(config.submitButtonSelector);
        const formInput = Array.from(form.querySelectorAll(config.inputSelector));
        
        toggleButton(submitButton, formInput, config)

        formInput.forEach(input => {
            input.addEventListener('input', (evt) => {
                checkInputValiditiy(input, form, config)
                toggleButton(submitButton, formInput, config)
            })
        })
    })
}

enableValidation({
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible"
}); 