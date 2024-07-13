import '../pages/index.css';
import '../blocks/popup/popup.css';
import { initialCards } from './cards.js';
import './modal.js';
import { closePopup, openPopup } from './modal.js';
import { createCard, likeCard, deleteCard, createCardElement, unlikeCard } from './card.js';
import { updateUserProfile, getUserData, getCards, updateAvatar, addNewCard } from './api.js';
import {
  enableValidation,
  validationConfig,
  showInputError,
  hideInputError,
  checkInputValidity,
  hasInvalidInput,
  toggleButtonState,
  clearValidation
} from './validation.js';

const cardsContainer = document.querySelector('.places__list');

export const editPopup = document.querySelector('.popup_type_edit');
export const formElementProfile = editPopup.querySelector('form[name="edit-profile"]');
export const profileEditButton = document.querySelector('.profile__edit-button');
export const nameInputTitle = formElementProfile.querySelector('[name="name"]');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
export const descriptionInput = formElementProfile.querySelector('[name="description"]');
const avatar = document.querySelector('.profile__image');

const popupEditAvatar = document.querySelector('.popup_type_edit-avatar');
const formEditAvatar = popupEditAvatar.querySelector('form[name="edit-avatar"]');
const avatarInput = formEditAvatar.querySelector('input[name="avatar"]');

export let userId; // Глобальная переменная для userId

avatar.addEventListener('click', () => {
  openPopup(popupEditAvatar);
  clearValidation(formEditAvatar, validationConfig);
});

function handleEditAvatarSubmit(event) {
  event.preventDefault();
  const submitButton = event.submitter;
  const defaultText = submitButton.textContent;
  setLoading(true, submitButton, defaultText);

  const newAvatarUrl = avatarInput.value;

  updateAvatar(newAvatarUrl)
    .then(data => {
      avatar.setAttribute("style", `background-image: url('${data.avatar}')`);
      closePopup(popupEditAvatar);
      formEditAvatar.reset();
    })
    .finally(() => setLoading(false, submitButton, defaultText));
}

formEditAvatar.addEventListener('submit', handleEditAvatarSubmit);

function setLoading(isLoading, button, defaultText) {
  if (isLoading) {
    button.textContent = 'Сохранение...';
  } else {
    button.textContent = defaultText;
  }
}

const newCardForm = document.querySelector('.popup__form[name="new-place"]');
const placeNameInput = document.querySelector('.popup__input[name="place"]');
const linkInput = document.querySelector('.popup__input[name="link"]');

function handleNewCardSubmit(event) {
  event.preventDefault();
  const placeName = placeNameInput.value;
  const link = linkInput.value;

  const submitButton = event.submitter;
  const defaultText = submitButton.textContent;
  setLoading(true, submitButton, defaultText);

  addNewCard(placeName, link)
    .then(data => {
      console.log('Новая карточка добавлена:', data);
      const newCard = createCardElement(data, handleImageClick, handleLikeClick);
      cardsContainer.prepend(newCard);
      closePopup(popupNewCard);
      clearNewCardForm();
    })
    .finally(() => setLoading(false, submitButton, defaultText));
}

newCardForm.addEventListener('submit', handleNewCardSubmit);

export const popupNewCard = document.querySelector('.popup_type_new-card');

function clearNewCardForm() {
  newCardForm.reset();
  clearValidation(newCardForm, validationConfig);
}

const addCardBtn = document.querySelector('.profile__add-button');
addCardBtn.addEventListener('click', () => {
  openPopup(popupNewCard);
  clearValidation(newCardForm, validationConfig);
});

export const imagePopup = document.querySelector('.popup_type_image');
const popupImage = imagePopup.querySelector('.popup__image');
const caption = imagePopup.querySelector('.popup__caption');

export function openImagePopup(imgSrc, imgCaption) {
  openPopup(imagePopup);
  popupImage.src = imgSrc;
  popupImage.alt = imgCaption;
  caption.textContent = imgCaption;
}

export function handleImageClick(event) {
  const imgSrc = event.target.src;
  const imgCaption = event.target.alt;
  openImagePopup(imgSrc, imgCaption);
}

profileEditButton.addEventListener('click', () => {
  openPopup(editPopup);
  nameInputTitle.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  clearValidation(formElementProfile, validationConfig);
});

const editPopupCloseButton = editPopup.querySelector('.popup__close');
editPopupCloseButton.addEventListener('click', () => closePopup(editPopup));

const newCardPopupCloseButton = popupNewCard.querySelector('.popup__close');
newCardPopupCloseButton.addEventListener('click', () => {
  closePopup(popupNewCard);
  clearNewCardForm();
});

const imagePopupCloseButton = imagePopup.querySelector('.popup__close');
imagePopupCloseButton.addEventListener('click', () => closePopup(imagePopup));

const editAvatarFormClose = popupEditAvatar.querySelector('.popup__close');
editAvatarFormClose.addEventListener('click', () => closePopup(popupEditAvatar));

function renderCards(cardsData) {
  cardsData.forEach(cardData => {
    const cardElement = createCardElement(cardData, handleImageClick, handleLikeClick);
    cardsContainer.appendChild(cardElement);
  });
  console.log('Все карточки:', cardsData);
}

export function handleLikeClick(event) {
  const likeButton = event.target;
  const cardElement = likeButton.closest('.places__item');
  const cardId = cardElement.dataset.cardId;
  likeButton.classList.toggle('card__like-button_is-active'); // Поменяем состояние лайка
  if (likeButton.classList.contains('card__like-button_is-active')) {
    likeCard(cardId, cardElement);
  } else {
    unlikeCard(cardId, cardElement);
  }
}

function handleProfileFormSubmit(event) {
  event.preventDefault();
  const name = nameInputTitle.value;
  const about = descriptionInput.value;

  const submitButton = event.submitter;
  const defaultText = submitButton.textContent;
  setLoading(true, submitButton, defaultText);

  updateUserProfile(name, about)
    .then(data => {
      profileName.textContent = data.name;
      profileDescription.textContent = data.about;
      closePopup(editPopup);
    })
    .finally(() => setLoading(false, submitButton, defaultText));
}

formElementProfile.addEventListener('submit', handleProfileFormSubmit);

enableValidation(validationConfig);

Promise.all([getUserData(), getCards()])
  .then(([userData, cards]) => {
    userId = userData._id;
    profileName.textContent = userData.name;
    profileDescription.textContent = userData.about;
    avatar.setAttribute("style", `background-image: url('${userData.avatar}')`);
    renderCards(cards);
  })
  .catch((err) => {
    console.log(err);
  });
