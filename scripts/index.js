import Card from './Card.js'
import FormValidation from './FormValidation.js'
import Section from './Section.js'
import { initialCards, placesList } from '../utils/constants.js'
// import Popup from './Popup.js'
// import PopupWithForm from './PopupWithForm.js'
// import PopupWithImage from './PopupWithImage.js'

const editProfileModal = document.querySelector('.popup_profile');
const openProfileModal = document.querySelector('.profile__edit');

const nameInput = document.querySelector('.popup__input_type-name');
const jobInput = document.querySelector('.popup__input_type-about-me');
const profileForm = document.querySelector('.popup__container_type-profile');
const profileName = document.querySelector('.profile__name');
const profileTitle = document.querySelector('.profile__title');

const openCardModal = document.querySelector('.profile__add');
const cardForm = document.querySelector('.popup_add-card');
const cardTitleInput = document.querySelector('.popup__input_type-title');
const cardImageInput = document.querySelector('.popup__input_type-link');

const popups = document.querySelectorAll('.popup');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');
const imagePreview = document.querySelector('.popup_image-preview');

const config = {
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible"
};

const handleCardClick = (name, link) => {
    popupImage.src = link;
    popupCaption.textContent = name;
    popupImage.alt = name;
    toggleModal(imagePreview);
}

const defaultCardList = new Section({
    items: initialCards,
    renderer: () => {
        const card = new Card(data, '#card-template', handleCardClick);
        const cardElement = card.createCardElement();
        return cardElement;
    },
}, placesList);

defaultCardList.addItem()

const editProfileValidator = new FormValidation(config, profileForm);
const addCardValidator = new FormValidation(config, cardForm);

editProfileValidator.enableValidation();
addCardValidator.enableValidation();


function closeByEsc(evt) {
    if (evt.key === 'Escape') {
        const openedModal = document.querySelector('.popup_is_open')
        toggleModal(openedModal)
    }
}

function toggleModal(modalWindow) {
    modalWindow.classList.toggle('popup_is_open');
    if (modalWindow.classList.contains('popup_is_open')) {
        document.addEventListener('keydown', closeByEsc);
    } else {
        document.removeEventListener('keydown', closeByEsc);
    }
}


function openEditProfile() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileTitle.textContent;

    editProfileValidator.resetValidation();

    toggleModal(editProfileModal)
}

function submitEditProfile(evt) {
    evt.preventDefault();

    profileName.textContent = nameInput.value;
    profileTitle.textContent = jobInput.value;

    toggleModal(editProfileModal);
}

function openAddCard() {

    cardImageInput.value = "";
    cardTitleInput.value = "";

    addCardValidator.resetValidation();

    toggleModal(cardForm)
}

function submitCardForm(evt) {
    evt.preventDefault();

    const data = {
        name: cardTitleInput.value,
        link: cardImageInput.value
    }

    placesList.prepend(createCard(data))

    toggleModal(cardForm);
}


// event listeners

profileForm.addEventListener('submit', submitEditProfile);

openProfileModal.addEventListener('click', () => openEditProfile());

openCardModal.addEventListener('click', () => openAddCard());

cardForm.addEventListener('submit', submitCardForm);

popups.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup_is_open')) {
            toggleModal(popup)
        }
        if (evt.target.classList.contains('popup__close')) {
            toggleModal(popup)
        }
    })
})
