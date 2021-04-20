import "./index.css"
import { initialCards, openProfileModal, profileForm, openCardModal, cardForm, config, nameInput, jobInput } from '../utils/constants.js'
import Card from '../components/Card.js'
import FormValidation from '../components/FormValidation.js'
import Section from '../components/Section.js'
import PopupWithImage from '../components/PopupWithImage.js'
import PopupWithForm from '../components/PopupWithForm.js'
import UserInfo from '../components/UserInfo.js'

// validators
const editProfileValidator = new FormValidation(config, profileForm);
const addCardValidator = new FormValidation(config, cardForm);

editProfileValidator.enableValidation();
addCardValidator.enableValidation();

// cards 
const imagePreview = new PopupWithImage('.popup_image-preview');

const handleCardClick = (name, link) => {
    imagePreview.open(name, link);
}

const createCard = (data) => {
    const card = new Card(data, '#card-template', handleCardClick);
    const cardItem = card.createCardElement();

    return cardItem;
}

const cardsList = new Section({
    data: initialCards,
    renderer: (data) => {
        const cardElement = createCard(data);
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
            userInfo.setUserInfo(profileInfo['user-name'], profileInfo['user-about']);

            editProfilePopup.close();
        }
    });


// add card

const addCardPopup = new PopupWithForm(
    {
        popupSelector: '.popup_add-card',
        handleFormSubmit: (data) => {
            const cardElement = createCard(data);
            cardsList.setItem(cardElement);
            addCardPopup.close();
        }
    });


// event listeners

openProfileModal.addEventListener('click', () => {
    const { name, job } = userInfo.getUserInfo();
    nameInput.value = name;
    jobInput.value = job;
    editProfilePopup.open();
    editProfileValidator.resetValidation();
});

openCardModal.addEventListener('click', () => {

    addCardPopup.open();
    addCardValidator.resetValidation();
});