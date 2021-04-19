import "./styles/index.css"
import { initialCards, openProfileModal, profileForm, popupImage, popupCaption, openCardModal, cardForm, config, nameInput, jobInput } from '../utils/constants.js'
import Card from '../scripts/Card.js'
import FormValidation from '../scripts/FormValidation.js'
import Section from '../scripts/Section.js'
import PopupWithImage from '../scripts/PopupWithImage.js'
import PopupWithForm from '../scripts/PopupWithForm.js'
import UserInfo from '../scripts/UserInfo.js'

// validators
const editProfileValidator = new FormValidation(config, profileForm);
const addCardValidator = new FormValidation(config, cardForm);

editProfileValidator.enableValidation();
addCardValidator.enableValidation();

// cards 
const handleCardClick = (name, link) => {
    const imagePreview = new PopupWithImage('.popup_image-preview')
    imagePreview.open(name, link)
}

const cardsList = new Section({
    data: initialCards,
    renderer: (data) => {
        const card = new Card(data, '#card-template', handleCardClick);
        const cardElement = card.createCardElement();

        const cardImage = cardElement.querySelector('.card__image');
        cardImage.addEventListener('click', () => handleCardClick(data.name, data.link));

        cardsList.setItem(cardElement);

    },
}, '.places__list');

cardsList.renderItems();

// edit profile

const userInfo = new UserInfo({ userNameSelector: '.profile__name', userJobSelector: '.profile__title' });

const editProfilePopup = new PopupWithForm(
    {
        popupSelector: '.popup_profile',
        handleFormSubmit: (profileInfo) => {
            userInfo.setUserInfo(profileInfo['user-name'], profileInfo['user-about'])
            editProfilePopup.close();
        }
    });


// add card

const addCardPopup = new PopupWithForm({
    popupSelector: '.popup_add-card',
    handleFormSubmit: (cardInfo) => {
        const newCard = new Card(cardInfo, '#card-template', handleCardClick);
        const cardElement = newCard.createCardElement();

        const cardImage = cardElement.querySelector('.card__image');
        cardImage.addEventListener('click', () => handleCardClick(cardInfo.name, cardInfo.link));

        cardsList.prependItem(newCard);
        addCardPopup.close();
    }
});


// event listeners

openProfileModal.addEventListener('click', () => editProfilePopup.open());

openCardModal.addEventListener('click', () => addCardPopup.open());