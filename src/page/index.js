import "./index.css"
import Card from '../components/Card.js'
import FormValidation from '../components/FormValidation.js'
import Section from '../components/Section.js'
import PopupWithImage from '../components/PopupWithImage.js'
import PopupWithForm from '../components/PopupWithForm.js'
import PopupWithConfirm from '../components/PopupWithConfirm.js'
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

// classes
const editProfileValidator = new FormValidation(config, profileForm);
const addCardValidator = new FormValidation(config, cardForm);

const userInfo = new UserInfo({ userNameSelector: '.profile__name', userJobSelector: '.profile__title' });
const imagePreview = new PopupWithImage('.popup_image-preview');
const confirmDeletePopup = new PopupWithConfirm('.popup_confirm');

editProfileValidator.enableValidation();
addCardValidator.enableValidation();

// profile

api.getUserInfo()
    .then(res => {
        userInfo.setUserInfo(res)
    })

const editProfilePopup = new PopupWithForm(
    {
        popupSelector: '.popup_profile',
        handleFormSubmit: (info) => {
            api.setUserInfo({ name: info['user-name'], about: info['user-about'] })
                .then(info => {
                    userInfo.setUserInfo(info)
                    editProfilePopup.close();
                })
        }
    });

// cards
const handleCardClick = (name, link) => {
    imagePreview.open(name, link);
}

const createCard = (data) => {
    const card = new Card(
        data,
        data._id,
        data.likes,
        data.owner._id === userInfo._id,
        data.likes.some((item) => { return item._id === userInfo._id }),
        '#card-template',
        handleCardClick,
        () => {
            if (card._likedByOwner) {
                api.deleteLike(data._id)
                    .then((res) => {
                        card.setLikes(res.likes)
                        card.likeButtonToggle()
                    })
            } else {
                api.addLike(data._id)
                    .then((res) => {
                        card.setLikes(res.likes)
                        card.likeButtonToggle()
                    })
            }
        },
        () => {
            confirmDeletePopup.open();
            confirmDeletePopup.handleConfirmClick(() => {
                confirmDeletePopup.setLoadingButton();
                api.removeCard(data._id)
                    .then(res => { card.deleteCard() })
            });
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
                    .then(data => {
                        addCardPopup.setLoadingButton();
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