export const cohortId = 'wff-cohort-13';
export const token = 'c7c0a1f1-8a9c-40f3-bc93-884b56d3d991';

export function updateUserProfile(name, about) {
  return fetch(`https://nomoreparties.co/v1/${cohortId}/users/me`, {
    method: 'PATCH',
    headers: {
      authorization: token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, about })
  })
  .then(response => response.ok ? response.json() : Promise.reject(`Ошибка: ${response.status}`))
  .catch(error => {
    console.error('Произошла ошибка при обновлении данных пользователя:', error);
    throw error;
  });
}

export function getUserData() {
  return fetch(`https://nomoreparties.co/v1/${cohortId}/users/me`, {
    headers: { authorization: token }
  })
  .then(response => response.ok ? response.json() : Promise.reject(`Ошибка: ${response.status}`))
  .catch(error => {
    console.error('Произошла ошибка при получении данных о пользователе:', error);
    throw error;
  });
}

export function getCards() {
  return fetch(`https://nomoreparties.co/v1/${cohortId}/cards`, {
    headers: { authorization: token }
  })
  .then(response => response.ok ? response.json() : Promise.reject(`Ошибка: ${response.status}`))
  .catch(error => {
    console.error('Произошла ошибка при получении карточек:', error);
    throw error;
  });
}



export function updateAvatar(newAvatarUrl) {
  return fetch(`https://nomoreparties.co/v1/${cohortId}/users/me/avatar`, {
    method: 'PATCH',
    headers: {
      authorization: token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ avatar: newAvatarUrl })
  })
  .then(response => response.ok ? response.json() : Promise.reject(`Ошибка: ${response.status}`))
  .catch(error => {
    console.error('Произошла ошибка при обновлении аватара:', error);
    throw error;
  });
}

export function addNewCard(name, link) {
  return fetch(`https://nomoreparties.co/v1/${cohortId}/cards`, {
    method: 'POST',
    headers: {
      authorization: token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, link })
  })
  .then(response => response.ok ? response.json() : Promise.reject(`Ошибка: ${response.status}`))
  .catch(error => {
    console.error('Произошла ошибка при добавлении новой карточки:', error);
    throw error;
  });
}
// Функция для постановки лайка
export function likeCard(cardId, cardElement, updateCardLikes) {
    fetch(`https://nomoreparties.co/v1/${cohortId}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: {
            authorization: token,
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) return response.json();
        throw new Error(`Ошибка: ${response.status}`);
    })
    .then(data => {
        updateCardLikes(cardElement, data);
    })
    .catch(error => console.error('Произошла ошибка при постановке лайка:', error));
}

// Функция для снятия лайка
export function unlikeCard(cardId, cardElement, updateCardLikes) {
    fetch(`https://nomoreparties.co/v1/${cohortId}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: {
            authorization: token,
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) return response.json();
        throw new Error(`Ошибка: ${response.status}`);
    })
    .then(data => {
        updateCardLikes(cardElement, data);
    })
    .catch(error => console.error('Произошла ошибка при снятии лайка:', error));
}

// Функция для удаления карточки
export function deleteCard(cardElement, cardId) {
    fetch(`https://mesto.nomoreparties.co/v1/${cohortId}/cards/${cardId}`, {
        method: 'DELETE',
        headers: {
            authorization: token
        }
    })
    .then(res => res.json())
    .then(() => {
        cardElement.remove();
    })
    .catch((err) => console.error(`Ошибка: ${err}`));
}