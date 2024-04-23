import './pages/index.css';
import './blocks/popup/popup.css'
import { initialCards } from './cards.js';
import './modal.js'
import { handleImageClick, openImagePopup } from './modal.js';



// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
// @todo: DOM узлы
const cardsContainer = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard(cardData, deleteCallback, likeCallback) {
    const card = cardTemplate.querySelector('.places__item').cloneNode(true);
    const cardImg = card.querySelector('.card__image');
    const cardDelButton = card.querySelector('.card__delete-button');
    const cardText = card.querySelector('.card__title');
    const likeButton = card.querySelector('.card__like-button');
    cardImg.src = cardData.link;
    cardImg.alt = cardData.name;
    cardText.textContent = cardData.name;

    cardDelButton.addEventListener('click', function() {
        deleteCallback(card); // Вызов функции-колбэка для удаления карточки из данных
    });

    likeButton.addEventListener('click', function() {
        likeCallback(likeButton); // Вызов функции-колбэка для лайка карточки
    });

    cardImg.addEventListener('click', handleImageClick);

    return card;
}

function likeCard(likeButton) {
    likeButton.classList.toggle('card__like-button_is-active');
}


// Функция удаления карточки из данных 
function deleteCard(cardElement) {
    cardElement.remove(); // Удаление карточки из DOM
}

// Вывод всех карточек из массива на страницу
function renderCards() {
    initialCards.forEach(function(item) {
        const newCard = createCard(item, deleteCard, likeCard);
        cardsContainer.append(newCard);
    });
}

// Вызов функции для создания и вывода карточек
renderCards();

// Обработчик события submit для формы добавления новой карточки
const newCardForm = document.querySelector('.popup__form[name="new-place"]');
newCardForm.addEventListener('submit', handleNewCardSubmit);

function handleNewCardSubmit(event) {
    event.preventDefault();

    const placeNameInput = document.querySelector('.popup__input[name="place-name"]');
    const linkInput = document.querySelector('.popup__input[name="link"]');

    const placeName = placeNameInput.value;
    const link = linkInput.value;

    addNewCard(placeName, link);

    closeNewCardPopup();
    clearNewCardForm();
}

// Функция добавления новой карточки
function addNewCard(name, link) {
    const newCard = createCard({ name: name, link: link }, deleteCard, likeCard);
    cardsContainer.prepend(newCard);
}

// Функция закрытия диалогового окна для добавления новой карточки
function closeNewCardPopup() {
    const newCardPopup = document.querySelector('.popup_type_new-card');
    newCardPopup.classList.remove('popup_is-opened');
}

// Функция очистки формы добавления новой карточки
function clearNewCardForm() {
    const newCardForm = document.querySelector('.popup__form[name="new-place"]');
    newCardForm.reset();
}










