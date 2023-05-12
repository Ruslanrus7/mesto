export default class UserInfo {
  constructor({nameUser, infoUser}) {
    this._nameUser = document.querySelector(nameUser);
    this._infoUser = document.querySelector(infoUser);
  }

  getUserInfo () {
    this.userInfo = {
      nameUser: this._nameUser.textContent,
      jobUser: this._infoUser.textContent,
    }

    return this.userInfo;
  }

  setUserInfo (data) {
    this._nameUser.textContent = data.nameUser;
    this._infoUser.textContent = data.jobUser;
  }
}
