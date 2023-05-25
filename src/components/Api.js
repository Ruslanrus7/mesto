export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

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
  }

  createCard (card) {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
      method: 'Post',
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

  deleteCard (cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}` {
      headers:  this._headers,
      method: 'DELETE',
    })
    .then(res => {
      if(res.ok) {
        return res.json()
      }
    })
  }
}
