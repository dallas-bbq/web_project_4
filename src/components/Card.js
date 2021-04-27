class Card {
    constructor({ data, cardTemplateSelector, handleCardClick, handleDeleteClick }) {
        this._data = data;
        this._cardTemplateSelector = cardTemplateSelector;
        this._handleCardClick = handleCardClick;
        this._handleDeleteClick = handleDeleteClick;
        this._id = data._id;
    }

    getId() {
        console.log(this._id)
    }

    _getCardTemplate() {
        const cardTemplate = document
            .querySelector(this._cardTemplateSelector)
            .content
            .querySelector('.places__item')
            .cloneNode(true)

        return cardTemplate;
    }

    _handleLikeButton(evt) {
        evt.target.classList.toggle('card__like_act');
    }

    handleDeleteButton() {
        this._cardElement.remove();
    }

    _setEventListeners() {
        const likeButton = this._cardElement.querySelector('.card__like');
        const deleteButton = this._cardElement.querySelector('.card__delete');
        const cardImage = this._cardElement.querySelector('.card__image');

        likeButton.addEventListener('click', this._handleLikeButton);

        deleteButton.addEventListener('click', () => this.getId());

        cardImage.addEventListener('click', () => this._handleCardClick(this._data.name, this._data.link));
    }

    createCardElement() {
        this._cardElement = this._getCardTemplate();

        const cardImage = this._cardElement.querySelector('.card__image');
        const cardTitle = this._cardElement.querySelector('.card__text');

        cardTitle.textContent = this._data.name;
        cardImage.style.backgroundImage = `url(${this._data.link})`;
        cardImage.alt = this._data.name;

        this._setEventListeners();

        return this._cardElement;
    }
}


export default Card