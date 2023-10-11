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

    const elements = element.querySelector(".icons__delete");
    elements.addEventListener("click", this.deletingCards.bind(this));

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

  deletingCards(evt) {
    if (evt.target.classList.contains("icons__delete")) {
      const cardElement = evt.target.closest(".elements");
      cardElement.remove();
    }
  }

  createCard() {
    return this._createCardElement();
  }
}
