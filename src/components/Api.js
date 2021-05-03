class Api {
    constructor({ baseUrl, headers }) {
        this.baseUrl = baseUrl
        this.headers = headers
    }

    getUserInfo() {
        return fetch(this.baseUrl + '/users/me', {
            method: "GET",
            headers: this.headers
        })
            .then(res => res.ok ? res.json() : Promise.reject(`Error: ${res.status}`))
    }

    setUserInfo({ name, about }) {
        return fetch(this.baseUrl + '/users/me', {
            method: "PATCH",
            headers: this.headers,
            body: JSON.stringify({ name, about })
        })
            .then(res => res.ok ? res.json() : Promise.reject(`Error: ${res.status}`))
    }

    getCardsList() {
        return fetch(this.baseUrl + '/cards', {
            method: "GET",
            headers: this.headers
        })
            .then(res => res.ok ? res.json() : Promise.reject(`Error: ${res.status}`))
    }

    addCard({ name, link }) {
        return fetch(this.baseUrl + '/cards', {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify({ name, link })
        })
            .then(res => res.ok ? res.json() : Promise.reject(`Error: ${res.status}`))
    }

    removeCard(cardID) {
        return fetch(this.baseUrl + '/cards/' + `${cardID}`, {
            method: "DELETE",
            headers: this.headers
        })
            .then(res => res.ok ? res.json() : Promise.reject(`Error: ${res.status}`))
    }

    addLike(cardID) {
        return fetch(this.baseUrl + '/cards/likes/' + cardID, {
            method: "PUT",
            headers: this.headers
        })
            .then(res => res.ok ? res.json() : Promise.reject(`Error: ${res.status}`))
    }

    deleteLike(cardID) {
        return fetch(this.baseUrl + '/cards/likes/' + cardID, {
            method: "DELETE",
            headers: this.headers
        })
            .then(res => res.ok ? res.json() : Promise.reject(`Error: ${res.status}`))
    }

    setUserPic({ avatar }) {
        return fetch(this.baseUrl + '/users/me/avatar', {
            method: "PATCH",
            headers: this.headers,
            body: JSON.stringify({ avatar })
        })
            .then(res => res.ok ? res.json() : Promise.reject(`Error: ${res.status}`))
    }
}

export default Api