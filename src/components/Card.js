class Card {
    constructor(data, id, likes, cardOwned, likedByOwner, cardTemplateSelector, handleCardClick, handleLikeClick, handleDeleteClick) {
        this._data = data;
        this._id = id;
        this._likes = likes;
        this._cardOwned = cardOwned;
        this._likedByOwner = likedByOwner;
        this._cardTemplateSelector = cardTemplateSelector;
        this._handleCardClick = handleCardClick;
        this._handleLikeClick = handleLikeClick;
        this._handleDeleteClick = handleDeleteClick;
    }


    createCardElement() {
        this._cardElement = this._getCardTemplate();

        const deleteButton = this._cardElement.querySelector('.card__delete');
        deleteButton.style.display = this._cardOwned ? "block" : "none";

        const likeButton = this._cardElement.querySelector('.card__like');
        if (this._likedByOwner) {
            likeButton.classList.add('card__like_act');
        }

        const cardImage = this._cardElement.querySelector('.card__image');
        const cardTitle = this._cardElement.querySelector('.card__text');

        cardTitle.textContent = this._data.name;
        cardImage.style.backgroundImage = `url(${this._data.link})`;
        cardImage.alt = this._data.name;

        const likeCount = this._cardElement.querySelector('.card__like-count');
        likeCount.textContent = this._likes.length;

        this._setEventListeners();

        return this._cardElement;
    }

    setLikes(likes) {
        this._likes = likes;
        const likeCount = this._cardElement.querySelector('.card__like-count');
        likeCount.textContent = this._likes.length;
    }

    _getCardTemplate() {
        const cardTemplate = document
            .querySelector(this._cardTemplateSelector)
            .content
            .querySelector('.places__item')
            .cloneNode(true)

        return cardTemplate;
    }

    likeButtonToggle() {
        const likeButton = this._cardElement.querySelector('.card__like');
        likeButton.classList.toggle('card__like_act');
    }

    deleteCard() {
        this._cardElement.remove();
    }

    _setEventListeners() {
        const likeButton = this._cardElement.querySelector('.card__like');
        const deleteButton = this._cardElement.querySelector('.card__delete');
        const cardImage = this._cardElement.querySelector('.card__image');

        likeButton.addEventListener('click', () => this._handleLikeClick());

        deleteButton.addEventListener('click', () => this._handleDeleteClick());

        cardImage.addEventListener('click', () => this._handleCardClick(this._data.name, this._data.link));
    }

}


export default Card