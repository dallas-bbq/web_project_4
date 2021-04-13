const initialCards = [
    {
        name: "Yosemite Valley",
        link: "https://code.s3.yandex.net/web-code/yosemite.jpg"
    },
    {
        name: "Lake Louise",
        link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
    },
    {
        name: "Bald Mountains",
        link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
    },
    {
        name: "Latemar",
        link: "https://code.s3.yandex.net/web-code/latemar.jpg"
    },
    {
        name: "Vanoise National Park",
        link: "https://code.s3.yandex.net/web-code/vanoise.jpg"
    },
    {
        name: "Lago di Braies",
        link: "https://code.s3.yandex.net/web-code/lago.jpg"
    }
];

const config = {
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible"
};

const placesList = document.querySelector('.places__list');

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

const popups = document.querySelector('.popup');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');
const popupWithImagePreview = document.querySelector('.popup__container_type-image-preview')

export {
    initialCards, placesList, popups, popupImage, editProfileModal, openProfileModal, nameInput,
    jobInput, profileForm, profileName, profileTitle, openCardModal, cardForm, cardTitleInput, 
    cardImageInput, popupCaption, popupWithImagePreview, config
}