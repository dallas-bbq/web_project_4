import "./index.css"
import Card from '../components/Card.js'
import FormValidation from '../components/FormValidation.js'
import Section from '../components/Section.js'
import PopupWithImage from '../components/PopupWithImage.js'
import PopupWithForm from '../components/PopupWithForm.js'
import PopupWithConfirm from '../components/PopupWithConfirm.js'
import UserInfo from '../components/UserInfo.js'
import Api from '../components/Api.js'

import { openProfileModal, profileForm, openCardModal, cardForm, config, nameInput, jobInput, avatarEditButton, avatarForm } from '../utils/constants.js'


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
const editAvatarValidator = new FormValidation(config, avatarForm);

const userInfo = new UserInfo({ userNameSelector: '.profile__name', userJobSelector: '.profile__title', avatarSelector: '.profile__avatar' });
const imagePreview = new PopupWithImage('.popup_image-preview');
const confirmDeletePopup = new PopupWithConfirm('.popup_confirm', 'Yes');

editProfileValidator.enableValidation();
addCardValidator.enableValidation();
editAvatarValidator.enableValidation();

Promise.all([api.getUserInfo(), api.getCardsList()])
    .then(([user, cards]) => {
        userInfo.setUserInfo(user);

        const cardsList = new Section({
            data: cards,
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
            defaultButtonText: 'Create',
            handleFormSubmit: (data) => {
                addCardPopup.setLoadingButton();
                api.addCard(data)
                    .then(data => {
                        const cardElement = createCard(data);
                        cardsList.setItem(cardElement);
                        addCardPopup.close();
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        });

        openCardModal.addEventListener('click', () => {
            addCardPopup.open();
            addCardPopup.setDefaultButton();
            addCardValidator.resetValidation();
        });
    })

const editProfilePopup = new PopupWithForm(
    {
        popupSelector: '.popup_profile',
        defaultButtonText: 'Save',
        handleFormSubmit: (info) => {
            editProfilePopup.setLoadingButton();
            api.setUserInfo({ name: info['user-name'], about: info['user-about'] })
                .then(info => {
                    userInfo.setUserInfo(info);
                    editProfilePopup.close();
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    });

const editAvatar = new PopupWithForm(
    {
        popupSelector: '.popup_edit-avatar',
        defaultButtonText: 'Save',
        handleFormSubmit: (info) => {
            editAvatar.setLoadingButton();
            api.setUserPic({ avatar: info['avatar-link'] })
                .then(info => {
                    userInfo.setUserInfo(info);
                    editAvatar.close();
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }
)

// card items
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
                        card.likeButtonToggle();
                    })
                    .catch((err) => {
                        console.log(err);
                    });
                card._likedByOwner = false;

            } else {
                api.addLike(data._id)
                    .then((res) => {
                        card.setLikes(res.likes);
                        card.likeButtonToggle();
                    })
                    .catch((err) => {
                        console.log(err);
                    });
                card._likedByOwner = true;
            }

        },
        () => {
            confirmDeletePopup.setDefaultButton();
            confirmDeletePopup.open();
            confirmDeletePopup.handleConfirmClick(() => {
                confirmDeletePopup.setLoadingButton();
                api.removeCard(data._id)
                    .then(res => card.deleteCard())
                    .catch((err) => {
                        console.log(err);
                    });

                confirmDeletePopup.close();
            });
        }
    )

    const cardItem = card.createCardElement();
    return cardItem;
}

// event listeners

openProfileModal.addEventListener('click', () => {
    const { name, job } = userInfo.getUserInfo();
    nameInput.value = name;
    jobInput.value = job;
    editProfilePopup.open();
    editProfilePopup.setDefaultButton();
    editProfileValidator.resetValidation();
});

avatarEditButton.addEventListener('click', () => {
    editAvatar.setDefaultButton();
    editAvatarValidator.resetValidation();
    editAvatar.open();
})

