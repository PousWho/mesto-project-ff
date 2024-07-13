import { openImagePopup, handleImageClick } from './index.js';
import { confirmPopup, confirmDeleteForm, handleLikeClick, userId } from './index.js'; // Убираем импорт currentUser
import { openPopup, closePopup } from './modal.js';
import { cohortId, token, likeCard as apiLikeCard, unlikeCard as apiUnlikeCard, deleteCard as apiDeleteCard } from './api.js';

let cardElementToDelete = null;
let cardIdToDelete = null;

function showDeleteConfirmationPopup(cardElement, cardId) {
  cardElementToDelete = cardElement;
  cardIdToDelete = cardId;
  openPopup(confirmPopup);
}

function handleConfirmDelete(event) {
  event.preventDefault();
  apiDeleteCard(cardElementToDelete, cardIdToDelete);
  closePopup(confirmPopup);
}

function setupDeleteConfirmationListener() {
  confirmDeleteForm.addEventListener('submit', handleConfirmDelete);
}

document.addEventListener('DOMContentLoaded', () => {
  setupDeleteConfirmationListener();
});

export function createCardElement(cardData) {
  const cardTemplate = document.querySelector('#card-template');
  const cardElement = cardTemplate.content.querySelector('.places__item').cloneNode(true);

  const cardImages = document.querySelectorAll('.card__image');
  cardImages.forEach(image => image.addEventListener('click', handleImageClick));

  const likeButtons = document.querySelectorAll('.card__like-button');
  likeButtons.forEach(likeButton => likeButton.addEventListener('click', handleLikeClick));
  cardElement.querySelector('.card__image').src = cardData.link;
  cardElement.querySelector('.card__image').alt = cardData.name;
  cardElement.querySelector('.card__title').textContent = cardData.name;
  cardElement.querySelector('.card__like-counter').textContent = cardData.likes.length;
  cardElement.dataset.cardId = cardData._id;

  if (cardData.likes.some(user => user._id === userId)) { // Используем userId вместо currentUser._id
    cardElement.querySelector('.card__like-button').classList.add('card__like-button_active');
  }

  if (cardData.owner._id === userId) { // Используем userId вместо currentUser._id
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

function updateCardLikes(cardElement, cardData) {
  const likeCounter = cardElement.querySelector('.card__like-counter');
  const likeButton = cardElement.querySelector('.card__like-button');

  likeCounter.textContent = cardData.likes.length;

  if (cardData.likes.some(user => user._id === userId)) { // Используем userId вместо currentUser._id
    likeButton.classList.add('card__like-button_active');
  } else {
    likeButton.classList.remove('card__like-button_active');
  }
}

export function likeCard(cardId, cardElement) {
  apiLikeCard(cardId, cardElement, updateCardLikes);
}

export function unlikeCard(cardId, cardElement) {
  apiUnlikeCard(cardId, cardElement, updateCardLikes);
}

export function deleteCard(cardElement, cardId) {
  apiDeleteCard(cardElement, cardId);
}
