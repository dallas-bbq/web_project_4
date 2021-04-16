import Card from './Card.js'
import FormValidation from './FormValidation.js'
import Section from './Section.js'
import {
    initialCards, placesList, openProfileModal, profileForm, popupImage, popupCaption, openCardModal,
    cardForm, config, nameInput, jobInput
} from '../utils/constants.js'
import Popup from './Popup.js'
import PopupWithImage from './PopupWithImage.js'
import PopupWithForm from './PopupWithForm.js'
import UserInfo from './UserInfo.js'

// rendering cards 
const handleCardClick = (name, link) => {
    popupImage.src = link;
    popupCaption.textContent = name;
    popupImage.alt = name;
    popupWithImage.open();
}

const defaultCardList = new Section({
    items: initialCards,
    renderer: (data) => {
        const card = new Card(data, '#card-template', handleCardClick);
        const cardElement = card.createCardElement();
        const cardImage = cardElement.querySelector('.card__image');
        cardImage.addEventListener('click', () => handleCardClick(data.name, data.link));
        defaultCardList.addItem(cardElement);
    },
}, placesList);

defaultCardList.renderItems();

// rendering popups
const popupList = new Popup('.popup');
popupList.setEventListeners();

const popupWithImage = new PopupWithImage('.popup_image-preview');
popupWithImage.setEventListeners();

const userInfo = new UserInfo('.profile__name', '.profile__title');

const editProfilePopup = new PopupWithForm(
    '.popup_profile',
    () => {
        const newUserInfo = userInfo.getUserInfo({ name: nameInput.textContent, job: jobInput.textContent });
        userInfo.setUserInfo(newUserInfo);
        editProfilePopup.close()
    })

const editProfileValidator = new FormValidation(config, profileForm);
const addCardValidator = new FormValidation(config, cardForm);

editProfileValidator.enableValidation();
addCardValidator.enableValidation();

const addCardPopup = new PopupWithForm(
    '.popup_add-card',
    (info) => {
        const newCard = new Card(
            info,
            '#card-template',
            handleCardClick
        )
        const cardImage = newCard.querySelector('.card__image');
        cardImage.addEventListener('click', () => handleCardClick(info.name, info.link));
        defaultCardList.prependItem(newCard);
    }

)

// event listeners
openProfileModal.addEventListener('click', () => {
    const userData = userInfo.getUserInfo();

    nameInput.textContent = userData.name;
    jobInput.textContent = userData.job;

    userInfo.setUserInfo(userData);

    editProfilePopup.open();
})