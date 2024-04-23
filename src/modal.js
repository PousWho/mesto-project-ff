const editPopup = document.querySelector('.popup');
  const formElement = editPopup.querySelector('form[name="edit-profile"]');
  const closeButton = document.querySelectorAll('.popup__close');
  const popupOpen = document.querySelector('.profile__edit-button');
  const nameInputTitle = formElement.querySelector('[name="name"]');
  const descriptionInput = formElement.querySelector('[name="description"]');
  // Функция открытия попапа
function openPopup () {
    editPopup.classList.add('popup_is-opened');
    const nameValue = nameInputTitle.textContent;
    const jobValue = descriptionInput.textContent;
    nameInputTitle.value = nameValue;
    descriptionInput.value = jobValue;
};


// Находим элементы, которые нужно обновить на странице
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

// Обработчик «отправки» формы
function handleFormSubmit(evt) {
    evt.preventDefault(); // Отменяем стандартную отправку формы

    // Получаем значения полей из формы
    const newName = nameInputTitle.value;
    const newDescription = descriptionInput.value;

    // Обновляем элементы на странице новыми значениями
    profileName.textContent = newName;
    profileDescription.textContent = newDescription;

    // Закрываем попап
    closePopup();
}

// Прикрепляем обработчик к форме
formElement.addEventListener('submit', handleFormSubmit);


function closePopupOnEsc(event) {
    if (event.keyCode === 27) {
        editPopup.classList.remove('popup_is-opened');
        popupNewCard.classList.remove('popup_is-opened');
        imagePopup.classList.remove('popup_is-opened');
    }
}

function closePopupOnClickOutside(event) {
    // Проверяем, был ли клик вне области попапа, но внутри его оверлея
    if (event.target.classList.contains('popup') && !event.target.classList.contains('popup__content')) {
        editPopup.classList.remove('popup_is-opened');
        popupNewCard.classList.remove('popup_is-opened');
        imagePopup.classList.remove('popup_is-opened');
    }
}


function closePopup() {
  const popups = document.querySelector('.popup_is-opened');
  if (popups) {
      popups.classList.remove('popup_is-opened');
  }
};

if (closeButton.length > 0) {
  closeButton.forEach(btn => {
    btn.addEventListener('click', closePopup);
  });
};

document.addEventListener('click', closePopupOnClickOutside);
document.addEventListener('keydown', closePopupOnEsc);
popupOpen.addEventListener('click', openPopup);

const popupNewCard = document.querySelector('.popup_type_new-card');
const addCardBtn = document.querySelector('.profile__add-button');

function cardPopup () {
  popupNewCard.classList.add('popup_is-opened');
}


addCardBtn.addEventListener('click', cardPopup);

// Находим необходимые DOM элементы
const imagePopup = document.querySelector('.popup_type_image');

// Функция для открытия попапа с изображением
export function openImagePopup(imgSrc, imgCaption) {
  
  const popupImage = imagePopup.querySelector('.popup__image');
  const caption = imagePopup.querySelector('.popup__caption');
  imagePopup.classList.add('popup_is-opened');
  popupImage.src = imgSrc;
  popupImage.alt = imgCaption;
  caption.textContent = imgCaption;
}

// Обработчик клика на изображение
export function handleImageClick(event) {
  const imgSrc = event.target.src;
  const imgCaption = event.target.alt;
  openImagePopup(imgSrc, imgCaption);
}



