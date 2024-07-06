import '../pages/index.css';
import '../blocks/popup/popup.css'
import { initialCards } from './cards.js';
import './modal.js'
import { closePopup, openPopup } from './modal.js';
import { createCard, likeCard, deleteCard, createCardElement, unlikeCard } from './card.js';

const cardsContainer = document.querySelector('.places__list');

export const editPopup = document.querySelector('.popup');
export const formElementProfile = editPopup.querySelector('form[name="edit-profile"]');
export const profileEditButton = document.querySelector('.profile__edit-button');
export const nameInputTitle = formElementProfile.querySelector('[name="name"]');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
export const descriptionInput = formElementProfile.querySelector('[name="description"]');
export const closeButtons = document.querySelectorAll('.popup__close');
export const confirmPopup = document.querySelector('.popup_type_confirm');
export const confirmDeleteForm = confirmPopup.querySelector('form[name="confirm-delete"]');
const avatar = document.querySelector('.profile__image');

const popupEditAvatar = document.querySelector('.popup_type_edit-avatar');
const formEditAvatar = popupEditAvatar.querySelector('form[name="edit-avatar"]');
const avatarInput = formEditAvatar.querySelector('input[name="avatar"]');

avatar.addEventListener('click', () => {
  openPopup(popupEditAvatar);
});

// Функция для отправки PATCH-запроса
function handleEditAvatarSubmit(event) {
  event.preventDefault();
  const submitButton = event.submitter;
  const defaultText = submitButton.textContent;
  setLoading(true, submitButton, defaultText);

  const newAvatarUrl = avatarInput.value;

  fetch(`https://nomoreparties.co/v1/${cohortId}/users/me/avatar`, {
    method: 'PATCH',
    headers: {
      authorization: token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ avatar: newAvatarUrl })
  })
  .then(response => {
    if (response.ok) return response.json();
    throw new Error(`Ошибка: ${response.status}`);
  })
  .then(data => {
    avatar.setAttribute(
      "style",
      `background-image: url('${data.avatar}')`
    );
    closePopup(popupEditAvatar);
    formEditAvatar.reset();
  })
  .catch(error => console.error('Произошла ошибка при обновлении аватара:', error))
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
    addNewCardServ(placeName, link);
    closePopup(popupNewCard); 
    clearNewCardForm(); 

    const submitButton = event.submitter;
  const defaultText = submitButton.textContent;
  setLoading(true, submitButton, defaultText);
}

newCardForm.addEventListener('submit', handleNewCardSubmit);

export const popupNewCard = document.querySelector('.popup_type_new-card');

function clearNewCardForm() {
    newCardForm.reset();
    const inputList = Array.from(newCardForm.querySelectorAll(validationConfigNewPlace.inputSelector));
    const buttonElement = newCardForm.querySelector(validationConfigNewPlace.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, validationConfigNewPlace);
}

const addCardBtn = document.querySelector('.profile__add-button');
addCardBtn.addEventListener('click', () => openPopup(popupNewCard));

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
    const profileNameValue = profileName.textContent;
    const profileDescriptionValue = profileDescription.textContent;
    nameInputTitle.value = profileNameValue;
    descriptionInput.value = profileDescriptionValue;
});

const editPopupCloseButton = editPopup.querySelector('.popup__close');
editPopupCloseButton.addEventListener('click', () => {
    closePopup(editPopup);
});

const newCardPopupCloseButton = popupNewCard.querySelector('.popup__close');
newCardPopupCloseButton.addEventListener('click', () => {
    closePopup(popupNewCard);
    clearNewCardForm();
});

const imagePopupCloseButton = imagePopup.querySelector('.popup__close');
imagePopupCloseButton.addEventListener('click', () => closePopup(imagePopup));

const editAvatarFormClose = popupEditAvatar.querySelector('.popup__close');
editAvatarFormClose.addEventListener('click', () => closePopup(popupEditAvatar));

const confirmClose = confirmPopup.querySelector('.popup__close');
confirmClose.addEventListener('click', () => closePopup(confirmPopup));

const showInputError = (formElement, inputElement, errorMessage, validationConfig) => {
    const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
    inputElement.classList.add(validationConfig.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(validationConfig.errorClass);
};

const hideInputError = (formElement, inputElement, validationConfig) => {
    const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
    inputElement.classList.remove(validationConfig.inputErrorClass);
    errorElement.classList.remove(validationConfig.errorClass);
    errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, validationConfig) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, validationConfig);
    } else {
        hideInputError(formElement, inputElement, validationConfig);
    }
};

const setEventListeners = (formElement, validationConfig) => {
    const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
    const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(formElement, inputElement, validationConfig);
            toggleButtonState(inputList, buttonElement, validationConfig);
        });
    });
};

function enableValidation(validationConfig) {
    const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        setEventListeners(formElement, validationConfig);
    });
}

function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => !inputElement.validity.valid);
}

function toggleButtonState(inputList, buttonElement, validationConfig) {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.remove('popup__button');
        buttonElement.classList.add('button-disabled');
        buttonElement.disabled = true;
    } else {
        buttonElement.classList.remove('button-disabled');
        buttonElement.classList.add('popup__button');
        buttonElement.disabled = false;
    }
}

const validationConfigProfile = {
    formSelector: '.popup_type_edit .popup__form',
    inputSelector: '.popup_type_edit .popup__input',
    submitButtonSelector: '.popup_type_edit .popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

const validationConfigNewPlace = {
    formSelector: '.popup_type_new-card .popup__form',
    inputSelector: '.popup_type_new-card .popup__input',
    submitButtonSelector: '.popup_type_new-card .popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

function hideAllValidationErrors(validationConfig) {
    const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
    formList.forEach((formElement) => {
        const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
        inputList.forEach((inputElement) => {
            hideInputError(formElement, inputElement, validationConfig);
        });
    });
}

closeButtons.forEach((closeButton) => {
    closeButton.addEventListener('click', () => {
        hideAllValidationErrors(validationConfigProfile);
        hideAllValidationErrors(validationConfigNewPlace);
    });
});

enableValidation(validationConfigProfile);
enableValidation(validationConfigNewPlace);

export const cohortId = 'wff-cohort-13';
export const token = 'c7c0a1f1-8a9c-40f3-bc93-884b56d3d991';

export const currentUser = {
    _id: 'abfb6e60304d26790b5aa8d8',
};

function renderCards(cardsData) {
    const cardsContainer = document.querySelector('.places__list');
    cardsData.forEach(cardData => cardsContainer.appendChild(createCardElement(cardData)));
    console.log('Все карточки:', cardsData);

    const likeButtons = document.querySelectorAll('.card__like-button');
    likeButtons.forEach(likeButton => likeButton.addEventListener('click', handleLikeClick));
}

function handleLikeClick(event) {
    const likeButton = event.target;
    const cardElement = likeButton.closest('.places__item');
    const cardId = cardElement.dataset.cardId;
    likeButton.classList.toggle('card__like-button_is-active'); 
    if (likeButton.classList.contains('card__like-button_active')) {
        unlikeCard(cardId, cardElement);
    } else {
        likeCard(cardId, cardElement);
    }
}

function addNewCardServ(name, link) {
  return fetch(`https://nomoreparties.co/v1/${cohortId}/cards`, {
    method: 'POST',
    headers: {
      authorization: token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, link })
  })
  .then(response => {
    if (response.ok) return response.json();
    throw new Error(`Ошибка: ${response.status}`);
  })
  .then(data => {
    console.log('Новая карточка добавлена:', data);
    const newCard = createCardElement(data);
    cardsContainer.prepend(newCard);
  })
  .catch(error => console.error('Произошла ошибка при добавлении новой карточки:', error));
}

// Функция для получения данных о пользователе с сервера и обновления DOM
function getUserDataAndRender() {
  fetch(`https://nomoreparties.co/v1/${cohortId}/users/me`, {
    headers: {
      authorization: token
    }
  })
  .then(response => response.ok ? response.json() : Promise.reject(`Ошибка: ${response.status}`))
  .then(userData => {
    updateUserDataInDOM(userData);
    avatar.setAttribute("style", `background-image: url('${userData.avatar}')`);
  })
  .catch(error => console.error('Произошла ошибка при получении данных о пользователе:', error));
}

function updateUserDataInDOM(userData) {
  profileName.textContent = userData.name;
  profileDescription.textContent = userData.about;
}

// Получаем данные о пользователе и обновляем DOM при загрузке страницы
getUserDataAndRender();

Promise.all([
    fetch(`https://mesto.nomoreparties.co/v1/${cohortId}/users/me`, {
        headers: {
            authorization: token
        }
    }).then(res => res.json()),
    fetch(`https://mesto.nomoreparties.co/v1/${cohortId}/cards`, {
        headers: {
            authorization: token
        }
    }).then(res => res.json())
]).then(([userData, cardsData]) => {
    currentUser._id = userData._id; // Обновляем currentUser с данными от сервера
    renderCards(cardsData);
    const cardImages = document.querySelectorAll('.card__image');
    cardImages.forEach(image => image.addEventListener('click', handleImageClick)); 
})

.catch(error => console.error('Произошла ошибка при загрузке данных:', error));

function updateUserProfile(name, about) {
  return fetch(`https://nomoreparties.co/v1/${cohortId}/users/me`, {
    method: 'PATCH',
    headers: {
      authorization: token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      about: about
    })
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(`Ошибка: ${response.status}`);
  })
  .then(data => {
    console.log('Данные пользователя обновлены:', data);
    profileName.textContent = data.name;
    profileDescription.textContent = data.about;
    return data;
  })
  .catch(error => {
    console.error('Произошла ошибка при обновлении данных пользователя:', error);
  });
}


formElementProfile.addEventListener('submit', function(event) {
  event.preventDefault();
  const newNameFe = nameInputTitle.value;
  const newDescriptionFe = descriptionInput.value;
  updateUserProfile(newNameFe, newDescriptionFe);
  closePopup(editPopup);

  const submitButton = event.submitter;
  const defaultText = submitButton.textContent;
  setLoading(true, submitButton, defaultText);

  updateUserProfile(newNameFe, newDescriptionFe)
    .then(() => closePopup(editPopup))
    .finally(() => setLoading(false, submitButton, defaultText));

});

























