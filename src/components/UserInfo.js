export default class UserInfo {
  constructor({nameUserSelector, infoUserSelector}) {
    this._nameUser = document.querySelector(nameUserSelector);
    this._infoUser = document.querySelector(infoUserSelector);
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
