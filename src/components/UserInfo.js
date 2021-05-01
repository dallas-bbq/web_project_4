class UserInfo {
    constructor({ userNameSelector, userJobSelector, avatarSelector }) {
        this._userName = document.querySelector(userNameSelector);
        this._userJob = document.querySelector(userJobSelector);
        this._avatarSelector = document.querySelector(avatarSelector);
    }

    getUserInfo() {
        return {
            name: this._userName.textContent,
            job: this._userJob.textContent,
            id: this._id
        }
    }

    setUserInfo(newUser) {
        this._userName.textContent = newUser.name;
        this._userJob.textContent = newUser.about;
        this._avatarSelector.style.backgroundImage = `url(${newUser.avatar})`;
        this._id = newUser._id;
    }

}

export default UserInfo