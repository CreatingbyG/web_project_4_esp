//import { titulo, subtitle } from "./constantes.js";

// export default class UserInfo {
//   constructor(nameElement, infoElement) {
//     this._nameElement = nameElement;
//     this._infoElement = infoElement;
//   }

//   getUserInfo() {
//     const name = this._nameElement.textContent;
//     const info = this._infoElement.textContent;
//     return {name, info };
//   }

//   setUserInfo({ name, info }) {
//   const titulo = document.querySelector(".profile__description-name");
//   const subtitle = document.querySelector(".profile__description-info");
//     titulo.value = name;
//     subtitle.value = info;
//   }
// }

export default class UserInfo {
  constructor({nameSelector, infoSelector}) {
    this._nameElement = document.querySelector(nameSelector);
    this._infoElement = document.querySelector(infoSelector);
    this._nameInput  = document.querySelector(".popup__container-texts-input-name");
    this._jobInput = document.querySelector(".popup__container-texts-input-info");
  }

  getUserInfo() {
    const userData = {
      name: this._nameElement.textContent,
      job: this._infoElement.textContent,
    }
    return userData;
  }

  setUserInfo({ name, job }) {
    this._nameElement.textContent = name;
    this._infoElement.textContent = job;
  }
}