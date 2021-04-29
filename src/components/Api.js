class Api {
    constructor({ baseUrl, headers }) {
        this.baseUrl = baseUrl
        this.headers = headers
    }

    //GET https://around.nomoreparties.co/v1/groupId/users/me
    getUserInfo() {
        return fetch(this.baseUrl + '/users/me', {
            method: "GET",
            headers: this.headers
        })
            .then(res => res.ok ? res.json() : Promise.reject(`Error: ${res.status}`))
            .catch((err) => {
                console.log(err);
            });
    }

    //PATCH https://around.nomoreparties.co/v1/groupId/users/me editing profile
    setUserInfo({ name, about }) {
        return fetch(this.baseUrl + '/users/me', {
            method: "PATCH",
            headers: this.headers,
            body: JSON.stringify({ name, about })
        })
            .then(res => res.ok ? res.json() : Promise.reject(`Error: ${res.status}`))
            .catch((err) => {
                console.log(err);
            });
    }

    //GET https://around.nomoreparties.co/v1/groupId/cards
    getCardsList() {
        return fetch(this.baseUrl + '/cards', {
            method: "GET",
            headers: this.headers
        })
            .then(res => res.ok ? res.json() : Promise.reject(`Error: ${res.status}`))
            .catch((err) => {
                console.log(err);
            });
    }

    //POST https://around.nomoreparties.co/v1/groupId/cards
    addCard({ name, link }) {
        return fetch(this.baseUrl + '/cards', {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify({ name, link })
        })
            .then(res => res.ok ? res.json() : Promise.reject(`Error: ${res.status}`))
            .catch((err) => {
                console.log(err);
            });
    }

    //DELETE https://around.nomoreparties.co/v1/groupId/cards/cardId 
    removeCard(cardID) {
        return fetch(this.baseUrl + '/cards/' + `${cardID}`, {
            method: "DELETE",
            headers: this.headers
        })
            .then(res => res.ok ? res.json() : Promise.reject(`Error: ${res.status}`))
            .catch((err) => {
                console.log(err);
            })
    }
    
    addLike(cardID) {
        return fetch(this.baseUrl + '/cards/likes/' + cardID, {
            method: "PUT",
            headers: this.headers
        })
            .then (res => {
                if (res.ok) {
                    return res.json()
                } return Promise.reject(`Error: ${res.status}`)
            })
       
            .catch ((err) => {
                console.log(err);
            })
    }

    deleteLike(cardID) {
        return fetch(this.baseUrl + '/cards/likes/' + `${cardID}`, {
            method: "DELETE",
            headers: this.headers
        })
            .then(res => res.ok ? res.json() : Promise.reject(`Error: ${res.status}`))
            .catch((err) => {
                console.log(err);
            })
    }


    //PATCH https://around.nomoreparties.co/v1/groupId/users/me/avatar updating profile pic
    setUserPic() { }

    getInitialCards() {
        // ...
    }

    // other methods for working with the API
}

export default Api