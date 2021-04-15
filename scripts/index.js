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

// rendering popups


const popupList = new Popup('.popup');
popupList.setEventListeners();

const popupWithImage = new PopupWithImage('.popup_image-preview');
popupWithImage.setEventListeners();

const editProfilePopup = new PopupWithForm(
    '.popup_profile', 
    () => { 
        const userInfo = new UserInfo('.popup__input_type-name', '.popup__input_type-about-me');
        userInfo.getUserInfo(),
        userInfo.setUserInfo({ name: nameInput.value, job: jobInput.value }),
        editProfilePopup.close()
    })

const editProfileValidator = new FormValidation(config, profileForm);
const addCardValidator = new FormValidation(config, cardForm);

editProfileValidator.enableValidation();
addCardValidator.enableValidation(); 

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

// event listeners
openProfileModal.addEventListener('click', () => { editProfilePopup.open() } )