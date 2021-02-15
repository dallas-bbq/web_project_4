//Selecting window, buttons to show & close
let editProfileWindow = document.querySelector('.popup');
let showButton = document.querySelector('.profile__edit');
let closeButton = document.querySelector('.popup__close');
let saveButton = document.querySelector('.popup__container-save');
let nameInput = document.querySelector('.popup__input_name');
let jobInput = document.querySelector('.popup__input_about-me');
let profileName = document.querySelector('.profile__name');
let profileTitle = document.querySelector('.profile__title');
let form = document.querySelector('.popup__container');

function handleFormSubmit(evt) {
    evt.preventDefault();

    profileName.textContent = nameInput.value;
    profileTitle.textContent = jobInput.value;

    closePopup();
}

form.addEventListener('submit', handleFormSubmit);

function showPopup() {
    editProfileWindow.classList.remove('popup_closed')
    editProfileWindow.classList.add('popup_open')
    nameInput.value = profileName.textContent
    jobInput.value = profileTitle.textContent
};

function closePopup() {
    editProfileWindow.classList.add('popup_closed')
    editProfileWindow.classList.remove('popup_open')
};

showButton.addEventListener('click', showPopup);

closeButton.addEventListener('click', closePopup);

//Selecting like buttons
let likeButton = document.querySelectorAll('.photos__like');

//Function that goes through every like button
document.querySelectorAll('.photos__like').forEach(likeButton => {
    likeButton.addEventListener('click', event => {
        likeButton.classList.toggle('photos__like_act')
    })
});
