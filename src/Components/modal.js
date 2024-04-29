

// Функции openPopup и closePopup теперь экспортируются из модуля
export function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closePopupOnEsc);
  document.addEventListener('click', closePopupOnClickOutside);
}

export function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closePopupOnEsc);
  document.removeEventListener('click', closePopupOnClickOutside);
};

// Обработчики закрытия попапа по нажатию на Esc и клику вне области попапа
function closePopupOnEsc(event) {
  if (event.keyCode === 27) {
    const openPopup = document.querySelector('.popup_is-opened');
    if (openPopup) {
      closePopup(openPopup);
    }
  }
}


function closePopupOnClickOutside(event) {
  const openPopup = document.querySelector('.popup_is-opened');
  if (openPopup && event.target.classList.contains('popup') && !event.target.classList.contains('popup__content')) {
    closePopup(openPopup);
  }
}


