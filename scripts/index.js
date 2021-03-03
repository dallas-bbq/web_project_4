// Cards
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
const closeProfileModal = document.querySelector('.popup_close_profile');

const openCardModal = document.querySelector('.profile__add');
const closeCardModal = document.querySelector('.popup_close_add-card');
const createButton = document.querySelector('.popup__button_type-create');
const cardForm = document.querySelector('.popup_add-card');
const cardTitleInput = document.querySelector('.popup__input_type-title');
const cardImageInput = document.querySelector('.popup__input_type-link');

const imagePreview = document.querySelector('.popup_image-preview');
const closeImagePreview = document.querySelector('.popup_close_image-preview');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');

function toggleModal(modalWindow) {
    if (modalWindow.classList.contains('.popup_is')) {
        nameInput.value = profileName.textContent
        jobInput.value = profileTitle.textContent
    }
    modalWindow.classList.toggle('popup_is_closed')
};

openCardModal.addEventListener('click', () => toggleModal(cardForm));
closeCardModal.addEventListener('click', () => toggleModal(cardForm));

openProfileModal.addEventListener('click', () => toggleModal(editProfileModal));
closeProfileModal.addEventListener('click', () => toggleModal(editProfileModal));

function showPreview(card) {
    popupImage.src = card.link;
    popupCaption.textContent = card.name;
    toggleModal(imagePreview);
}

function createCardElement(card) {
    const cardTemplate = document.querySelector('#card-template').content.querySelector('.places__item');
    const cardElement = cardTemplate.cloneNode(true);

    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__text');

    cardTitle.textContent = card.name;
    cardImage.style.backgroundImage = `url(${card.link})`;

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
};

initialCards.forEach(card => {
    const cardElement = createCardElement(card);
    placesList.append(cardElement);
});

closeImagePreview.addEventListener('click', () => toggleModal(imagePreview));

function handleCardFormSubmit(evt) {
    evt.preventDefault();

    const card = {
        name: cardTitleInput.value,
        link: cardImageInput.value
    }

    const cardElement = createCardElement(card);

    const cardImage = document.querySelector('.card__image');

    cardImage.addEventListener('click', () => showPreview(card));

    const likeButton = document.querySelector('.card__like');
    likeButton.addEventListener('click', () => {
        likeButton.classList.toggle('card__like_act')
    });

    const deleteButton = cardElement.querySelector('.card__delete');
    deleteButton.addEventListener('click', () => {
        const cardItem = deleteButton.closest('.places__item');
        cardItem.remove();
    })

    placesList.prepend(cardElement);

    toggleModal(cardForm);

    return cardElement;
}

cardForm.addEventListener('submit', handleCardFormSubmit);
