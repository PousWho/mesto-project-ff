import { popupNewCard, editPopup, profileEditButton, closeButtons, imagePopup, openImagePopup } from './index';

// Функции openPopup и closePopup теперь экспортируются из модуля
export function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closePopupOnEsc);
  document.addEventListener('click', closePopupOnClickOutside);
}

export function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  const popups = document.querySelector('.popup_is-opened');
  if (popups) {
      popups.classList.remove('popup_is-opened');
  }
  document.removeEventListener('keydown', closePopupOnEsc);
  document.removeEventListener('click', closePopupOnClickOutside);
};

// Обработчики закрытия попапа по нажатию на Esc и клику вне области попапа
function closePopupOnEsc(event) {
  if (event.keyCode === 27) {
    closePopup(editPopup);
    closePopup(popupNewCard);
    closePopup(imagePopup);
  }
}

function closePopupOnClickOutside(event) {
  if (
    event.target.classList.contains('popup') &&
    !event.target.classList.contains('popup__content')
  ) {
    closePopup(editPopup);
    closePopup(popupNewCard);
    closePopup(imagePopup);
  }
}


document.addEventListener('DOMContentLoaded', function() {
  profileEditButton.addEventListener('click', () => openPopup(editPopup));
  if (closeButtons.length > 0) {
    closeButtons.forEach(btn => {
      btn.addEventListener('click', () => closePopup(editPopup));
    });
  }
});


