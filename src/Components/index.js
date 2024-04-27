import '../pages/index.css';
import '../blocks/popup/popup.css'
import { initialCards } from './cards.js';
import './modal.js'
import { closePopup, openPopup } from './modal.js';
import { createCard, likeCard, deleteCard } from './card.js';

// @todo: DOM узлы
const cardsContainer = document.querySelector('.places__list');

function renderCards() {
    initialCards.forEach(function(item) {
        const newCard = createCard(item, deleteCard, likeCard);
        cardsContainer.append(newCard);
    });
}

renderCards();

export const editPopup = document.querySelector('.popup');
export const formElementProfile = editPopup.querySelector('form[name="edit-profile"]');
export const profileEditButton = document.querySelector('.profile__edit-button');
export const nameInputTitle = formElementProfile.querySelector('[name="name"]');
const profileName = document.querySelector('.profile__title')
const profileDescription = document.querySelector('.profile__description')
export const descriptionInput = formElementProfile.querySelector('[name="description"]');
export const closeButtons = document.querySelectorAll('.popup__close');

export function editProfileForm(evt) {
    evt.preventDefault(); // Отменяем стандартную отправку формы
  
    // Получаем значения полей из формы
    const newName = nameInputTitle.value;
    const newDescription = descriptionInput.value;
  
    // Обновляем элементы на странице новыми значениями
    profileName.textContent = newName;
    profileDescription.textContent = newDescription;
  
    // Закрываем попап
    closePopup(editPopup);
  }
  
  formElementProfile.addEventListener('submit', editProfileForm);

const newCardForm = document.querySelector('.popup__form[name="new-place"]');
newCardForm.addEventListener('submit', handleNewCardSubmit);

const placeNameInput = document.querySelector('.popup__input[name="place-name"]');
const linkInput = document.querySelector('.popup__input[name="link"]');
function handleNewCardSubmit(event) {
    event.preventDefault();

    const placeName = placeNameInput.value;
    const link = linkInput.value;

    addNewCard(placeName, link);

    closePopup(newCardForm); // Закрытие попапа с помощью универсальной функции closePopup
    clearNewCardForm();
}

function addNewCard(name, link) {
    const newCard = createCard({ name: name, link: link }, deleteCard, likeCard);
    cardsContainer.prepend(newCard);
}

export const popupNewCard = document.querySelector('.popup_type_new-card');

function clearNewCardForm() {
    newCardForm.reset();
}

const addCardBtn = document.querySelector('.profile__add-button');
addCardBtn.addEventListener('click', () => openPopup(popupNewCard));

export const imagePopup = document.querySelector('.popup_type_image');
const popupImage = imagePopup.querySelector('.popup__image');

export function openImagePopup(imgSrc, imgCaption) {
    
    const caption = imagePopup.querySelector('.popup__caption');
    imagePopup.classList.add('popup_is-opened');
    popupImage.src = imgSrc;
    popupImage.alt = imgCaption;
    caption.textContent = imgCaption;
  }


export function handleImageClick(event) {
    const imgSrc = event.target.src;
    const imgCaption = event.target.alt;
    openImagePopup(imgSrc, imgCaption);
}

// Далее следует код без изменений



//Модульные переменные











