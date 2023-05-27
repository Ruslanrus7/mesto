export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  // загрузка карточек с сервера
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch(err => {
      console.log(err);
    })
  }

  // добавление новой карточки
  createCard (card) {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
      method: 'POST',
      body: JSON.stringify(card),
    })
    .then(res => {
      if(res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch(err => {
      console.log(err);
    })
  }

  // загрузка информации о пользователе
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    })
    .then(res => {
      if(res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch(err => {
      console.log(err);
    })
  }

  // редактирование профиля
  patchUserInfo(info) {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
      body: JSON.stringify({
        name: info.nameUser,
        about: info.jobUser,
      }),
      method: 'PATCH',
    })
    .then(res => {
      if(res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch(err => {
      console.log(err)
    })
  }

  // обновление аватара
  patchUserAvatar(link) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      headers: this._headers,
      body: JSON.stringify(link),
      method: 'PATCH',
    })
    .then(res => {
      if(res.ok) {
        return res.json()
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch(err => {
      console.log(err)
    })
  }

  // удаление карточки
  deleteCard (cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      headers:  this._headers,
      method: 'DELETE',
    })
    .then(res => {
      if(res.ok) {
        return res.json()
      }

      return Promise.reject(`Ошибка: ${res.status}`)
    })
    .catch(err => {
      console.log(err)
    })
  }

  // поставить лайк карточки
  likeCard (cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      headers:  this._headers,
      method: 'PUT',
    })
    .then(res => {
      if(res.ok) {
        return res.json()
      }

      return Promise.reject(`Ошибка: ${res.status}`)
    })
    .catch(err => {
      console.log(err)
    })
  }

  // убрать лайк карточки
  deleteLike (cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      headers:  this._headers,
      method: 'DELETE',
    })
    .then(res => {
      if(res.ok) {
        return res.json()
      }

      return Promise.reject(`Ошибка: ${res.status}`)
    })
    .catch(err => {
      console.log(err)
    })
  }
}
