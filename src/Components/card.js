import { userId } from './index.js';
import { likeCard as apiLikeCard, unlikeCard as apiUnlikeCard, deleteCard as apiDeleteCard } from './api.js';

export function createCardElement(cardData, handleImageClick, handleLikeClick, handleDeleteClick) {
  const cardTemplate = document.querySelector('#card-template');
  const cardElement = cardTemplate.content.querySelector('.places__item').cloneNode(true);

  const cardImage = cardElement.querySelector('.card__image');
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardImage.addEventListener('click', handleImageClick);

  cardElement.querySelector('.card__title').textContent = cardData.name;
  cardElement.querySelector('.card__like-counter').textContent = cardData.likes.length;
  cardElement.dataset.cardId = cardData._id;

  const likeButton = cardElement.querySelector('.card__like-button');
  likeButton.addEventListener('click', handleLikeClick);
  if (cardData.likes.some(user => user._id === userId)) {
    likeButton.classList.add('card__like-button_is-active');
  }

  if (cardData.owner._id === userId) {
    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', () => {
      handleDeleteClick(cardElement, cardData._id);
    });
  } else {
    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.style.display = 'none';
  }

  return cardElement;
}

function updateCardLikes(cardElement, cardData) {
  const likeCounter = cardElement.querySelector('.card__like-counter');
  const likeButton = cardElement.querySelector('.card__like-button');

  likeCounter.textContent = cardData.likes.length;

  if (cardData.likes.some(user => user._id === userId)) {
    likeButton.classList.add('card__like-button_is-active');
  } else {
    likeButton.classList.remove('card__like-button_is-active');
  }
}

export function likeCard(cardId, cardElement) {
  apiLikeCard(cardId)
    .then(data => updateCardLikes(cardElement, data))
    .catch(err => console.error(`Ошибка: ${err}`));
}

export function unlikeCard(cardId, cardElement) {
  apiUnlikeCard(cardId)
    .then(data => updateCardLikes(cardElement, data))
    .catch(err => console.error(`Ошибка: ${err}`));
}

export function deleteCard(cardElement, cardId) {
  apiDeleteCard(cardId)
    .then(() => {
      cardElement.remove();
    })
    .catch(err => console.error(`Ошибка: ${err}`));
}
