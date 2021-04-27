class Card {
    constructor({ data, cardTemplateSelector, handleCardClick, handleDeleteClick, handleLikeClick }) {
        this._data = data;
        this._cardTemplateSelector = cardTemplateSelector;
        this._handleCardClick = handleCardClick;
        this._handleDeleteClick = handleDeleteClick;
        this._id = data._id;
        this._likes = data._likes;
        this._handleLikeClick = handleLikeClick;
    }

    getId() {
        return this._id;
    }

    getLikes(){
        return this._likes;
    }

    createCardElement() {
        this._cardElement = this._getCardTemplate();

        const cardImage = this._cardElement.querySelector('.card__image');
        const cardTitle = this._cardElement.querySelector('.card__text');
        const likeCount = this._cardElement.querySelector('.card__like-count');

        cardTitle.textContent = this._data.name;
        cardImage.style.backgroundImage = `url(${this._data.link})`;
        cardImage.alt = this._data.name;

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

    handleLikeButton(evt) {
        evt.target.classList.toggle('card__like_act');
    }

    setLikeCount() {
        console.log('hi');
    }

    handleDeleteButton() {
        this._cardElement.remove();
    }

    _setEventListeners() {
        const likeButton = this._cardElement.querySelector('.card__like');
        const deleteButton = this._cardElement.querySelector('.card__delete');
        const cardImage = this._cardElement.querySelector('.card__image');

        likeButton.addEventListener('click', this.handleLikeButton);

        deleteButton.addEventListener('click', () => { this.handleDeleteButton() });

        cardImage.addEventListener('click', () => this._handleCardClick(this._data.name, this._data.link));
    }

}


export default Card