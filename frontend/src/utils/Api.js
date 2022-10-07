class Api {
    constructor(data) {
        this._url = data.url;
        this._header = data.header;
    };

    _getResponse(res) {
        if (res.ok) {
            return res.json();
        };
        return Promise.reject(`Ошибка: ${res.status}`)
    };

    getInitialCards() {
        return fetch(`${this._url}/cards`, {
            headers: this._header
        })
            .then(res => this._getResponse(res));
    };

    getUserInfo() {
        return fetch(`${this._url}/users/me`, {
            headers: this._header
        })
            .then(res => this._getResponse(res));
    };

    setUserInfo(data) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: this._header,
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        })
            .then(res => this._getResponse(res));
    };

    setUserAvatar(data) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._header,
            body: JSON.stringify({
                avatar: data.avatar,
            })
        })
            .then(res => this._getResponse(res));
    };

    addCard(data) {
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: this._header,
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
            .then(res => this._getResponse(res));
    };

    deleteCard(data) {
        return fetch(`${this._url}/cards/${data}`, {
            method: 'DELETE',
            headers: this._header
        })
            .then(res => this._getResponse(res));
    };


    likeCard(data) {
        return fetch(`${this._url}/cards/${data}/likes`, {
            method: 'PUT',
            headers: this._header
        })
            .then(res => this._getResponse(res));
    };

    unlikeCard(data) {
        return fetch(`${this._url}/cards/${data}/likes`, {
            method: 'DELETE',
            headers: this._header
        })
            .then(res => this._getResponse(res));
    };
};

const ApiRequest = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-41',
    header: {
        authorization: '6e85cbb9-d07a-454d-87dc-f5801edbeaad',
        'Content-Type': 'application/json'
    }
});

export default ApiRequest;