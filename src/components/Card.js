class Card {
    constructor(data, id, likes, cardTemplateSelector, handleCardClick, handleLikeClick) {
        this._data = data;
        this._id = id;
        this._likes = likes;
        this._cardTemplateSelector = cardTemplateSelector;
        this._handleCardClick = handleCardClick;
        this._handleLikeClick = handleLikeClick;
    }

    getId() {
        return this._id;
    }

    setLikes(likes) {
        const likeCount = this._cardElement.querySelector('.card__like-count');
        likeCount.textContent = this._likes.length;
    }

    createCardElement() {
        this._cardElement = this._getCardTemplate();

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

    _getCardTemplate() {
        const cardTemplate = document
            .querySelector(this._cardTemplateSelector)
            .content
            .querySelector('.places__item')
            .cloneNode(true)

        return cardTemplate;
    }

    likeButtonToggle() {
        this._cardElement.querySelector('.card__like').classList.toggle('card__like_act');      
    }

    handleDeleteButton() {
        this._cardElement.remove();
    }

    _setEventListeners() {
        const likeButton = this._cardElement.querySelector('.card__like');
        const deleteButton = this._cardElement.querySelector('.card__delete');
        const cardImage = this._cardElement.querySelector('.card__image');

        likeButton.addEventListener('click', () => this._handleLikeClick());

        deleteButton.addEventListener('click', () => { this.handleDeleteButton() });

        cardImage.addEventListener('click', () => this._handleCardClick(this._data.name, this._data.link));
    }

}


export default Card