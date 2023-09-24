import { closeAllPopups } from "./utils.js";
import { popUps } from "./utils.js";
popUps;
import { initialCards } from "./constantes.js";

export class Card {
  constructor(cardData, templateSelector) {
    this.cardData = cardData;
    this.templateSelector = templateSelector;
  }

  _createCardElement() {
    const template = document.querySelector(this.templateSelector).content;
    const element = template.querySelector(".elements").cloneNode(true);

    const elementTitle = element.querySelector(".card__image-text");
    elementTitle.textContent = this.cardData.name;

    const elementImage = element.querySelector(".card-photo");
    elementImage.src = this.cardData.link;
    elementImage.alt = this.cardData.name;

    const likeIcon = element.querySelector(".icons__like");
    likeIcon.addEventListener("click", this._handleLikeClick.bind(this));

    const darkMode = element.querySelector(".icons__like_like-dark");
    darkMode.addEventListener("click", this._handleDarkModeClick.bind(this));

    const cardImage = element.querySelector(".card-photo");
    cardImage.addEventListener("click", this._handleImageClick.bind(this));

    const elements = element.querySelector(".icons__delete");
    elements.addEventListener("click", this._deletingCards.bind(this));

    const btnClosedCard = document.querySelector(".popup__container-btn-closed_images");
    btnClosedCard.addEventListener("click", closeAllPopups);

    return element;
  }

  _handleLikeClick(evt) {
    this.cardData.liked = true;
    const element = evt.target;
    const elementDark = element.nextElementSibling;
    elementDark.classList.add("show");
    elementDark.classList.remove("hide");
  }

  _handleDarkModeClick(evt) {
    const elementDark = evt.target;
    const element = elementDark.previousElementSibling;
    elementDark.classList.add("hide");
    elementDark.classList.remove("show");
  }

  _handleImageClick(evt) {
    const routeImage = evt.target.src;
    const altImage = evt.target.alt;
    const nameImage = document.querySelector(".img-card-name");
    nameImage.textContent = evt.target.alt;
    const popUpFormImages = document.querySelector(".popup_preview_images");
    popUpFormImages.classList.add("popup_opened");
    const imagePopUp = document.getElementById("img-card-popup");
    imagePopUp.setAttribute("src", routeImage);
    imagePopUp.setAttribute("alt", altImage);
    document.addEventListener("keydown", this._handlePopupKeyDown.bind(this));
    document.addEventListener("click", this._handlePopupClick.bind(this));
  }

  _handlePopupKeyDown(evt) {
    if (evt.key === "Escape") {
      closeAllPopups();
    };
  }

  _handlePopupClick(evt) {
    if (evt.target.classList.contains("popup_opened")) {
      closeAllPopups();
    }
  }

  _deletingCards(evt) {
    if (evt.target.classList.contains("icons__delete")) {
      const elements = evt.target.parentElement.parentElement.parentElement;
      const image = elements.querySelector(".card-photo").src;
      initialCards.forEach((card, i) => {
        if (image === card.link) {
          initialCards.splice(i, 1);
          elements.remove();
        }
      });
    }
  }

  createCard() {
    return this._createCardElement();
  }
}

export function renderingCards(second = false) {
  const cardContainer = document.querySelector(".contelements");

  initialCards.forEach((cardData, i) => {
    const card = new Card(cardData, "#template-cards");

    if (second && i === 0) {
      cardContainer.prepend(card.createCard());
    } else if (!second) {
      cardContainer.append(card.createCard());
    }
  });
}
