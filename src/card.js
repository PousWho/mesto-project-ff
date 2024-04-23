const likeButton = card.querySelector('.card__like-button');

likeButton.addEventListener('click', function() {
    likeCallback(likeButton); // Вызов функции-колбэка для лайка карточки
});

export default function likeCard(likeButton) {
    likeButton.classList.toggle('card__like-button_is-active');
}
