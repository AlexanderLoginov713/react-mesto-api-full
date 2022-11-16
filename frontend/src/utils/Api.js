class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return res.json()
      .then((err) => {
        err.statusCode = res.status;
        return Promise.reject(err);
      })
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      credentials: 'include',
      headers: this._headers
    })
      .then((res) => this._handleResponse(res))
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      credentials: 'include',
      method: 'GET',
      headers: this._headers
    })
      .then((res) => this._handleResponse(res));
  }

  editProfile(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      credentials: 'include',
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data)
    })
      .then((res) => this._handleResponse(res));
  }

  addCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      credentials: 'include',
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
      .then((res) => this._handleResponse(res))
  }

  editAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      credentials: 'include',
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data)
    })
      .then((res) => this._handleResponse(res));
  }

  changeLikeCardStatus(cardId, isLiked) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes/`, {
      credentials: 'include',
      method: `${isLiked ? 'DELETE' : 'PUT'}`,
      headers: this._headers,
    }).then((res) => this._handleResponse(res));
  }

  deleteIcon(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      credentials: 'include',
      method: 'DELETE',
      headers: this._headers
    })
      .then((res) => this._handleResponse(res));
  }
}

const api = new Api(
  {
    baseUrl: 'https://apigha.students.nomoredomains.icu',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  }
);
export default api;


