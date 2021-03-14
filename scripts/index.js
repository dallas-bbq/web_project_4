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

const nameInput = document.querySelector('.popup__input_type-name');
const jobInput = document.querySelector('.popup__input_type-about-me');
const profileForm = document.querySelector('.popup__container_type-profile');
const profileName = document.querySelector('.profile__name');
const profileTitle = document.querySelector('.profile__title');

const openCardModal = document.querySelector('.profile__add');
const createButton = document.querySelector('.popup__button_type-create');
const cardForm = document.querySelector('.popup_add-card');
const cardTitleInput = document.querySelector('.popup__input_type-title');
const cardImageInput = document.querySelector('.popup__input_type-link');

const imagePreview = document.querySelector('.popup_image-preview');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');

const popups = document.querySelectorAll('.popup');

function closeByEsc(evt) {
    if (evt.key === 'Escape') {
        const openedModal = document.querySelector('.popup_is_open')
        toggleModal(openedModal)
    }
}

function toggleModal(modalWindow) {
    modalWindow.classList.toggle('popup_is_open')
    if (modalWindow.classList.contains('popup_is_open')) {
        document.addEventListener('keydown', closeByEsc);
    } else {
        document.removeEventListener('keydown', closeByEsc);
    }
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

function openAddCard() {

    cardImageInput.value = "";
    cardTitleInput.value = "";

    toggleModal(cardForm)
}

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

    return cardElement;
}

initialCards.forEach(card => {
    const cardElement = createCardElement(card);
    placesList.append(cardElement);
});

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


// event listeners

profileForm.addEventListener('submit', submitEditProfile);

openProfileModal.addEventListener('click', () => openEditProfile());

openCardModal.addEventListener('click', () => openAddCard());

cardForm.addEventListener('submit', submitCardForm);

popups.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup_is_open')) {
            toggleModal(popup)
        }
        if (evt.target.classList.contains('popup__close')) {
            toggleModal(popup)
        }
    })
})
