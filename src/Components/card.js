import { openImagePopup, handleImageClick } from './index.js';
import { currentUser } from './index.js'; // Импортируем currentUser

export function createCard(cardData) {
    const cardTemplate = document.querySelector('#card-template');
    const cardElement = cardTemplate.content.querySelector('.places__item').cloneNode(true);

    cardElement.querySelector('.card__image').src = cardData.link;
    cardElement.querySelector('.card__image').alt = cardData.name;
    cardElement.querySelector('.card__title').textContent = cardData.name;

    const likeButton = cardElement.querySelector('.card__like-button');
    likeButton.addEventListener('click', () => {
        likeCard(cardData._id, likeButton);
    });

    cardElement.querySelector('.card__image').addEventListener('click', handleImageClick);

    if (cardData.owner._id === currentUser._id) {
        const deleteButton = cardElement.querySelector('.card__delete-button');
        deleteButton.addEventListener('click', () => {
            deleteCard(cardElement, cardData._id);
        });
    } else {
        const deleteButton = cardElement.querySelector('.card__delete-button');
        deleteButton.style.display = 'none';
    }

    return cardElement;
}

export function likeCard(cardId, likeButton) {
    // Логика для лайка карточки
    fetch(`https://mesto.nomoreparties.co/v1/cohortId/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: {
            authorization: 'c7c0a1f1-8a9c-40f3-bc93-884b56d3d991'
        }
    })
    .then(res => res.json())
    .then((data) => {
        likeButton.classList.toggle('card__like-button_active');
    })
    .catch((err) => console.error(`Ошибка: ${err}`));
}

export function deleteCard(cardElement, cardId) {
    // Логика для удаления карточки
    fetch(`https://mesto.nomoreparties.co/v1/cohortId/cards/${cardId}`, {
        method: 'DELETE',
        headers: {
            authorization: 'c7c0a1f1-8a9c-40f3-bc93-884b56d3d991'
        }
    })
    .then(res => res.json())
    .then(() => {
        cardElement.remove();
    })
    .catch((err) => console.error(`Ошибка: ${err}`));
}
