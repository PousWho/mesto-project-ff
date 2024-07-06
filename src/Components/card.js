import { openImagePopup, handleImageClick } from './index.js';
import { currentUser, cohortId, token, confirmPopup, confirmDeleteForm } from './index.js'; // Импортируем currentUser
import { openPopup, closePopup } from './modal.js';

function showDeleteConfirmationPopup(cardElement, cardId) {
    openPopup(confirmPopup);

    // Обработчик для подтверждения удаления
    const handleConfirmDelete = (event) => {
        event.preventDefault();
        deleteCard(cardElement, cardId);
        closePopup(confirmPopup);
        confirmPopup.classList.remove('popup_opened');
        confirmDeleteForm.removeEventListener('submit', handleConfirmDelete);
    };

    // Добавляем обработчик на форму подтверждения удаления
    confirmDeleteForm.addEventListener('submit', handleConfirmDelete);
}

export function createCardElement(cardData) {
    const cardTemplate = document.querySelector('#card-template');
    const cardElement = cardTemplate.content.querySelector('.places__item').cloneNode(true);

    cardElement.querySelector('.card__image').src = cardData.link;
    cardElement.querySelector('.card__image').alt = cardData.name;
    cardElement.querySelector('.card__title').textContent = cardData.name;
    cardElement.querySelector('.card__like-counter').textContent = cardData.likes.length;
    cardElement.dataset.cardId = cardData._id; // Добавляем ID карточки в dataset

    if (cardData.likes.some(user => user._id === currentUser._id)) {
        cardElement.querySelector('.card__like-button').classList.add('card__like-button_active');
    }

    if (cardData.owner._id === currentUser._id) {
        const deleteButton = cardElement.querySelector('.card__delete-button');

        deleteButton.addEventListener('click', () => {
            showDeleteConfirmationPopup(cardElement, cardData._id);
        });
    } else {
        const deleteButton = cardElement.querySelector('.card__delete-button');
        deleteButton.style.display = 'none';
    }

    return cardElement;
}




export function likeCard(cardId, cardElement) {
    fetch(`https://nomoreparties.co/v1/${cohortId}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: {
            authorization: token,
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) return response.json();
        throw new Error(`Ошибка: ${response.status}`);
    })
    .then(data => {
        updateCardLikes(cardElement, data);
    })
    .catch(error => console.error('Произошла ошибка при постановке лайка:', error));
}

export function unlikeCard(cardId, cardElement) {
    fetch(`https://nomoreparties.co/v1/${cohortId}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: {
            authorization: token,
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) return response.json();
        throw new Error(`Ошибка: ${response.status}`);
    })
    .then(data => {
        updateCardLikes(cardElement, data);
    })
    .catch(error => console.error('Произошла ошибка при снятии лайка:', error));
}

function updateCardLikes(cardElement, cardData) {
    const likeCounter = cardElement.querySelector('.card__like-counter');
    const likeButton = cardElement.querySelector('.card__like-button');

    likeCounter.textContent = cardData.likes.length;

    if (cardData.likes.some(user => user._id === currentUser._id)) {
        likeButton.classList.add('card__like-button_active');
    } else {
        likeButton.classList.remove('card__like-button_active');
    }
}



export function deleteCard(cardElement, cardId) {
    fetch(`https://mesto.nomoreparties.co/v1/${cohortId}/cards/${cardId}`, {
        method: 'DELETE',
        headers: {
            authorization: token
        }
    })
    .then(res => res.json())
    .then(() => {
        cardElement.remove();
    })
    .catch((err) => console.error(`Ошибка: ${err}`));
}

