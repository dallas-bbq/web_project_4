let editProfileWindow = document.querySelector('.popup');
let showButton = document.querySelector('.profile__edit');
let closeButton = document.querySelector('.popup__close');
let saveButton = document.querySelector('.popup__container-save');
let nameInput = document.querySelector('.popup__input_type-name');
let jobInput = document.querySelector('.popup__input_type-about-me');
let profileName = document.querySelector('.profile__name');
let profileTitle = document.querySelector('.profile__title');
let form = document.querySelector('.popup__container');

function showPopup() {
    editProfileWindow.classList.remove('popup_closed')
    nameInput.value = profileName.textContent
    jobInput.value = profileTitle.textContent
};

function closePopup() {
    editProfileWindow.classList.add('popup_closed')
};

function handleFormSubmit(evt) {
    evt.preventDefault();

    profileName.textContent = nameInput.value;
    profileTitle.textContent = jobInput.value;

    closePopup();
}

form.addEventListener('submit', handleFormSubmit);

showButton.addEventListener('click', showPopup);

closeButton.addEventListener('click', closePopup);