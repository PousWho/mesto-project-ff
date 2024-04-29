import { handleImageClick } from "./index";

// @todo: Функция создания карточки
// Вместо импорта из index.js, передаем функцию handleImageClick как параметр
export function createCard(cardData, deleteCallback, likeCallback, openImageCallback) {
    const cardTemplate = document.querySelector('#card-template').content;
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

    // Добавляем обработчик клика на изображение, используя переданную функцию
    cardImg.addEventListener('click', function(event) {
        openImageCallback(event);
    });

    return card;
}


export function likeCard(likeButton) {
    likeButton.classList.toggle('card__like-button_is-active');
}

export function deleteCard(cardElement) {
    cardElement.remove(); // Удаление карточки из DOM
}
