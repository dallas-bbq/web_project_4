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

const editProfileModal = document.querySelector('.popup_profile');
const placesList = document.querySelector('.places__list');

const openProfileModal = document.querySelector('.profile__edit');
const closeProfileModal = document.querySelector('.popup__close_profile');

const nameInput = document.querySelector('.popup__input_type-name');
const jobInput = document.querySelector('.popup__input_type-about-me');
const profileForm = document.querySelector('.popup__container_type-profile');
const profileName = document.querySelector('.profile__name');
const profileTitle = document.querySelector('.profile__title');

const openCardModal = document.querySelector('.profile__add');
const closeCardModal = document.querySelector('.popup__close_add-card');
const createButton = document.querySelector('.popup__button_type-create');
const cardForm = document.querySelector('.popup_add-card');
const cardTitleInput = document.querySelector('.popup__input_type-title');
const cardImageInput = document.querySelector('.popup__input_type-link');

const imagePreview = document.querySelector('.popup_image-preview');
const closeImagePreview = document.querySelector('.popup__close_image-preview');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');

function toggleModal(modalWindow) {
    if (modalWindow.classList.contains('.popup_is')) {

    }
    modalWindow.classList.toggle('popup_is_open')
}

function openEditProfile() {

    nameInput.value = profileName.textContent
    jobInput.value = profileTitle.textContent

    toggleModal(editProfileModal)
}

function submitEditProfile(evt) {
    evt.preventDefault();

    profileName.textContent = nameInput.value;
    profileTitle.textContent = jobInput.value;

    toggleModal(editProfileModal);
}

profileForm.addEventListener('submit', submitEditProfile);

openProfileModal.addEventListener('click', () => openEditProfile());
closeProfileModal.addEventListener('click', () => toggleModal(editProfileModal));

function openAddCard() {

    cardImageInput.value = "";
    cardTitleInput.value = "";

    toggleModal(cardForm)
}

openCardModal.addEventListener('click', () => openAddCard());
closeCardModal.addEventListener('click', () => toggleModal(cardForm));

function showPreview(card) {
    popupImage.src = card.link;
    popupCaption.textContent = card.name;
    popupImage.alt = card.name;
    toggleModal(imagePreview);
}

function createCardElement(card) {
    const cardTemplate = document.querySelector('#card-template').content.querySelector('.places__item');
    const cardElement = cardTemplate.cloneNode(true);

    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__text');

    cardTitle.textContent = card.name;
    cardImage.style.backgroundImage = `url(${card.link})`;
    cardImage.alt = card.name;

    const likeButton = cardElement.querySelector('.card__like');
    likeButton.addEventListener('click', () => {
        likeButton.classList.toggle('card__like_act')
    });

    const deleteButton = cardElement.querySelector('.card__delete');
    deleteButton.addEventListener('click', () => {
        const cardItem = deleteButton.closest('.places__item');
        cardItem.remove();
    })

    cardImage.addEventListener('click', () => showPreview(card));

    placesList.append(cardElement);

    return cardElement;
}

initialCards.forEach(card => {
    const cardElement = createCardElement(card);
    placesList.append(cardElement);
});

closeImagePreview.addEventListener('click', () => toggleModal(imagePreview));

function submitCardForm(evt) {
    evt.preventDefault();

    const card = {
        name: cardTitleInput.value,
        link: cardImageInput.value
    }

    const cardElement = createCardElement(card);

    placesList.prepend(cardElement);

    toggleModal(cardForm);
}

cardForm.addEventListener('submit', submitCardForm);
