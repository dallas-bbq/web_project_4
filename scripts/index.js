import Card from './Card.js'
import FormValidation from './FormValidation.js'
import Section from './Section.js'
import {
    initialCards, placesList, popups, popupImage, editProfileModal, openProfileModal, nameInput,
    jobInput, profileForm, profileName, profileTitle, openCardModal, cardForm, cardTitleInput,
    cardImageInput, popupCaption, config, popupWithImagePreview
} from '../utils/constants.js'
import Popup from './Popup.js'
import PopupWithImage from './PopupWithImage.js'

// rendering popups

const popupList = new Popup(popups);
popupList.setEventListeners();
const popupWithImage = new PopupWithImage(popupWithImagePreview);

// rendering cards 
const handleCardClick = (name, link) => {
    popupImage.src = link;
    popupCaption.textContent = name;
    popupImage.alt = name;
    console.log(popupWithImage);
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

const editProfileValidator = new FormValidation(config, profileForm);
const addCardValidator = new FormValidation(config, cardForm);

editProfileValidator.enableValidation();
addCardValidator.enableValidation(); 


// function toggleModal(modalWindow) {
//     modalWindow.classList.toggle('popup_is_open');
//     if (modalWindow.classList.contains('popup_is_open')) {
//         document.addEventListener('keydown', closeByEsc);
//     } else {
//         document.removeEventListener('keydown', closeByEsc);
//     }
// }



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

// openProfileModal.addEventListener('click', () => openEditProfile());

// openCardModal.addEventListener('click', () => openAddCard());

cardForm.addEventListener('submit', submitCardForm);

// popups.forEach((popup) => {
//     popup.addEventListener('click', (evt) => {
//         if (evt.target.classList.contains('popup_is_open')) {
//             toggleModal(popup)
//         }
//         if (evt.target.classList.contains('popup__close')) {
//             toggleModal(popup)
//         }
//     })
// })
