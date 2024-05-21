const BASE_URL = "https://nomoreparties.co/v1/wff-cohort-9";

const apiRoutes = {
  user: "users/me",
  cards: "cards",
  likes: "likes",
};


const headers = {
  Authorization: "d2e70dd3-0080-4863-b348-4caea4b1f52f",
  "Content-Type": "application/json",
};

const checkData = (data) => {
  if (data.ok) {
    return data.json();
  } else {
    return Promise.reject(`Error: ${data.status}`);
  }
};

function request(endpoint, options) {
  return fetch(`${BASE_URL}/${endpoint}`, options).then(checkData);
}

const getCards = () => {
  return request(apiRoutes.cards, {
    method: "GET",
    headers,
  });
};

const postCard = (name, link) => {
  return request(apiRoutes.cards, {
    method: "POST",
    headers,
    body: JSON.stringify({
      name,
      link,
    }),
  });
};


const deleteCardApi = (id) => {
  return request(`${apiRoutes.cards}/${id}`, {
    method: "DELETE",
    headers,
  });
};

const getUser = () => {
  return request(apiRoutes.user, {
    method: "GET",
    headers,
  });
};

const patchUser = (name, about) => {
  return request(apiRoutes.user, {
    method: "PATCH",
    headers,
    body: JSON.stringify({
      name,
      about,
    }),
  });
};

const addLikeCard = (id)  => {
  return request(`${apiRoutes.cards}/${apiRoutes.likes}/${id}`, {
    method: "PUT",
    headers
  });
};

const deleteLikeCard = (id) => {
  return request(`${apiRoutes.cards}/${apiRoutes.likes}/${id}`, {
    method: "DELETE",
    headers,
  });
};

const patchAvatar = (avatar) => {
  return request(`${apiRoutes.user}/avatar`, {
    method: "PATCH",
    headers,
    body: JSON.stringify({ avatar: avatar }),
  });
};
// экспорт нужных функций
export {
  getCards,
  postCard,
  deleteCardApi,
  getUser,
  patchUser,
  addLikeCard,
  deleteLikeCard,
  patchAvatar
};

export const editFormElement = document.forms["edit-profile"];
export const newPlaceFormElement = document.forms["new-place"];
export const avatarFormElement = document.forms["edit-avatar"];
export const deleteCardForm = document.forms["delete-card"];
export const buttonTypeCard = document.querySelector('.popup_type_image');
export const profileEditButton = document.querySelector(".profile__edit-button");
export const profileAddButton = document.querySelector(".profile__add-button");
export const popupsArray = Array.from(document.querySelectorAll('.popup'));
export const editForm = document.querySelector('.popup_type_edit');
export const newCardForm = document.querySelector('.popup_type_new-card');
export const avatarForm = document.querySelector(".popup_type_avatar");
export const deletePopup = document.querySelector(".popup_type_delete-card");
export const placesList = document.querySelector(".places__list");
export const avatarImage = document.querySelector(".profile__image");
export const nameInput = document.querySelector('.popup__input_type_name');
export const jobInput = document.querySelector('.popup__input_type_description');
export const userNameElement = document.querySelector('.profile__title');
export const userJobElement = document.querySelector('.profile__description');
export const newPlaceNameInput = newPlaceFormElement.elements["place-name"];
export const newLinkInput = newPlaceFormElement.elements.link;
export const popupImageCaption = document.querySelector(".popup__caption");
export const popupImage = document.querySelector(".popup__image");