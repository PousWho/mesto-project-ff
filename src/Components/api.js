// src/api.js

const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-13',
  headers: {
    authorization: 'c7c0a1f1-8a9c-40f3-bc93-884b56d3d991',
    'Content-Type': 'application/json'
  }
};

export const getUserData = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
  .then(response => response.ok ? response.json() : Promise.reject(`Ошибка: ${response.status}`));
};

export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
  .then(response => response.ok ? response.json() : Promise.reject(`Ошибка: ${response.status}`));
};

export const updateUserProfile = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({ name, about })
  })
  .then(response => response.ok ? response.json() : Promise.reject(`Ошибка: ${response.status}`));
};

export const updateAvatar = (avatarUrl) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({ avatar: avatarUrl })
  })
  .then(response => response.ok ? response.json() : Promise.reject(`Ошибка: ${response.status}`));
};

export const addNewCard = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({ name, link })
  })
  .then(response => response.ok ? response.json() : Promise.reject(`Ошибка: ${response.status}`));
};
