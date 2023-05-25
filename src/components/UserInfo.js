export default class UserInfo {
  constructor({nameUserSelector, infoUserSelector, avatarUserSelector}) {
    this._nameUser = document.querySelector(nameUserSelector);
    this._infoUser = document.querySelector(infoUserSelector);
    this._avatarUser = document.querySelector(avatarUserSelector);
  }

  getUserInfo () {
    this.userInfo = {
      nameUser: this._nameUser.textContent,
      jobUser: this._infoUser.textContent,
    }

    return this.userInfo;
  }

  setUserInfo (data) {
    this._nameUser.textContent = data.name;
    this._infoUser.textContent = data.about;
    this._avatarUser.src = data.avatar;
  }
}
