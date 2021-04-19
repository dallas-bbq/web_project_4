class UserInfo {
    constructor({userNameSelector, userJobSelector}) {
        this._userName = document.querySelector(userNameSelector),
        this._userJob = document.querySelector(userJobSelector)
    }

    getUserInfo() { 
        return {
            name: this._userName.textContent,
            job: this._userJob.textContent
        }
    }

    setUserInfo(info) {
        this._userName.textContent = info.name;
        this._userJob.textContent = info.job
    }
}

export default UserInfo