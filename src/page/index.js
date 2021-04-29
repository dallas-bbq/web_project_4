import "./index.css"
import Card from '../components/Card.js'
import FormValidation from '../components/FormValidation.js'
import Section from '../components/Section.js'
import PopupWithImage from '../components/PopupWithImage.js'
import PopupWithForm from '../components/PopupWithForm.js'
import UserInfo from '../components/UserInfo.js'
import Api from '../components/Api.js'

import { openProfileModal, profileForm, openCardModal, cardForm, config, nameInput, jobInput } from '../utils/constants.js'


// API
const api = new Api({
    baseUrl: "https://around.nomoreparties.co/v1/group-10",
    headers: {
        authorization: "64475879-5827-45ba-be3f-04a139568764",
        "Content-Type": "application/json"
    }
});

// validators
const editProfileValidator = new FormValidation(config, profileForm);
const addCardValidator = new FormValidation(config, cardForm);

editProfileValidator.enableValidation();
addCardValidator.enableValidation();

// handle profile info

const userInfo = new UserInfo({ userNameSelector: '.profile__name', userJobSelector: '.profile__title' });

api.getUserInfo()
    .then((user) => {
        userInfo.setUserInfo(user)
    })

const editProfilePopup = new PopupWithForm(
    {
        popupSelector: '.popup_profile',
        handleFormSubmit: (profileInfo) => {
            api.setUserInfo({ name: profileInfo['user-name'], about: profileInfo['user-about'] })
                .then((user) => userInfo.setUserInfo(user))
            editProfilePopup.close();
        }
    });

// handle cards
const imagePreview = new PopupWithImage('.popup_image-preview');

const handleCardClick = (name, link) => {
    imagePreview.open(name, link);
}

const createCard = (data) => {
    const card = new Card(
        data,
        data._id,
        data.likes,
        '#card-template',
        handleCardClick,
        () => {
            // if (data.likes.some((user) => { data.likes._id === userInfo.setUserInfo()._id })) {
            //     api.deleteLike(data._id)
            //         .then(res => card.setLikes())
            //         .then(res => card.likeButtonToggle())
            // } else
                api.addLike(data._id)
                    .then((res) => {
                        card.setLikes(data.likes)
                        card.likeButtonToggle()
                    })
        }
    )

    const cardItem = card.createCardElement();
    return cardItem;
}

api.getCardsList()
    .then(res => {
        const cardsList = new Section({
            data: res,
            renderer: (data) => {
                const cardElement = createCard(data);
                cardsList.setItem(cardElement);
            }
        },
            '.places__list')

        cardsList.renderItems();

        // add new card
        const addCardPopup = new PopupWithForm({
            popupSelector: '.popup_add-card',
            handleFormSubmit: (data) => {
                api.addCard(data)
                    .then(res => {
                        const cardElement = createCard(data);
                        cardsList.setItem(cardElement);
                        addCardPopup.close();
                    })
            }
        });

        // add card modal open 
        openCardModal.addEventListener('click', () => {
            addCardPopup.open();
            addCardValidator.resetValidation();
        });
    })

// event listeners

openProfileModal.addEventListener('click', () => {
    const { name, job } = userInfo.getUserInfo();
    nameInput.value = name;
    jobInput.value = job;
    editProfilePopup.open();
    editProfileValidator.resetValidation();
});