import { popupImage, popupCaption, imagePreview, closeByEsc, toggleModal } from './utils.js'

class Card {
    constructor(data, cardTemplateSelector) {
        this._data = data
        this._cardTemplateSelector = cardTemplateSelector
    }

    _getCardTemplate() {
        const cardTemplate = document
            .querySelector(this._cardTemplateSelector)
            .content
            .querySelector('.places__item')
            .cloneNode(true)

        return cardTemplate
    }

    _handleLikeButton(evt) {
        evt.target.classList.toggle('card__like_act')
    }

    _handleDeleteButton() {
        this._cardElement.remove();
    }

    _handleShowPreview() {
        popupImage.src = this._data.link
        popupCaption.textContent = this._data.name;
        popupImage.alt = this._data.name;
        toggleModal(imagePreview);
    }

    _setEventListeners() {
        const likeButton = this._cardElement.querySelector('.card__like');
        const deleteButton = this._cardElement.querySelector('.card__delete');
        const cardImage = this._cardElement.querySelector('.card__image');
        const cardForm = document.querySelector('.popup_add-card');

        likeButton.addEventListener('click', this._handleLikeButton);
        deleteButton.addEventListener('click', () => this._handleDeleteButton());
        cardImage.addEventListener('click', () => this._handleShowPreview());
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