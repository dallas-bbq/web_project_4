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

const openProfileModal = document.querySelector('.profile__edit');
const openCardModal = document.querySelector('.profile__add');

const profileForm = document.querySelector('.popup__container_type-profile');
const cardForm = document.querySelector('.popup_add-card');

const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');

const nameInput = document.querySelector('.popup__input_type-name');
const jobInput = document.querySelector('.popup__input_type-about-me');

const likeButton = document.querySelector('.card__like');

export {
    initialCards, openProfileModal, profileForm, popupImage, popupCaption, openCardModal, 
    cardForm, config, nameInput, jobInput, likeButton
}