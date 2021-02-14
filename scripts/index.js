//Selecting window, buttons to show & close
let editProfileWindow = document.querySelector('.popup');
let showButton = document.querySelector('.profile__edit');
let closeButton = document.querySelector('.popup__close');
let saveButton = document.querySelector('.popup__container-save');

// Show  and close edit profile window
showButton.addEventListener('click', function showPopup() {
    editProfileWindow.style.display = 'flex'
});

function closePopup() {
    editProfileWindow.style.display = 'none'
};

closeButton.addEventListener('click', closePopup);

saveButton.addEventListener('click', closePopup);

// Selecting form 
let form = document.querySelector('.popup__container');

function handleFormSubmit(evt) {
    //Stopping default submit
    evt.preventDefault();

    // Selecting name and title input fields
    let nameInput = document.querySelector('.popup__container-name');
    let jobInput = document.querySelector('.popup__container-about-me');

    //Getting values
    let nameInputValue = nameInput.value;
    let jobInputValue = jobInput.value;

    //Getting elements where field values will be enetered
    let profileName = document.querySelector('.profile__name');
    let profileTitle = document.querySelector('.profile__title');

    //Inserting new values
    profileName.textContent = nameInputValue;
    profileTitle.textContent = jobInputValue;
}

// Connecting handler to the form
form.addEventListener('submit', handleFormSubmit);

//Selecting like buttons
let likeButton = document.querySelectorAll('.photos__like');

//Function that goes through every like button
document.querySelectorAll('.photos__like').forEach(likeButton => {
    likeButton.addEventListener('click', event => {
        likeButton.classList.toggle('photos__like_act')
    })
});
