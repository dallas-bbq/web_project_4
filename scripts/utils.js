export const popupImage = document.querySelector('.popup__image');
export const popupCaption = document.querySelector('.popup__caption');
export const imagePreview = document.querySelector('.popup_image-preview');

export function closeByEsc(evt) {
    if (evt.key === 'Escape') {
        const openedModal = document.querySelector('.popup_is_open')
        toggleModal(openedModal)
    }
}

export function toggleModal(modalWindow) {
    modalWindow.classList.toggle('popup_is_open')
    if (modalWindow.classList.contains('popup_is_open')) {
        document.addEventListener('keydown', closeByEsc);
    } else {
        document.removeEventListener('keydown', closeByEsc);
    }
}