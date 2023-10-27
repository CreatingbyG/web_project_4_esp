export default class UserInfo {
  constructor({ nameSelector, infoSelector, avatarSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._infoElement = document.querySelector(infoSelector);
    this._avatarElement = document.querySelector(avatarSelector)
    this._nameInput = document.querySelector(
      ".popup__container-texts-input-name"
    );
    this._jobInput = document.querySelector(
      ".popup__container-texts-input-info"
    );
  }

  getUserInfo() {
    const userData = {
      name: this._nameElement.textContent,
      job: this._infoElement.textContent,
      avatar: this._avatarElement.src
    };
    return userData;
  }

  setUserInfo({ name, about, avatar }) {
    this._nameElement.textContent = name;
    this._infoElement.textContent = about;
    this._avatarElement.src = avatar
  }
}
