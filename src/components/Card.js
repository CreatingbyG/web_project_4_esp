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
    likeIcon.addEventListener("click", this._handleToggleClick.bind(this, "show", "hide"));

    const darkMode = element.querySelector(".icons__like_like-dark");
    darkMode.addEventListener("click", this._handleToggleClick.bind(this, "hide", "show"));

    const formElements = element.querySelector(".icons__delete");
    formElements.addEventListener("click", this._showingFormDelete.bind(this));

    return element;
  }

  _handleToggleClick(addClass, removeClass, evt) {
    const element = evt.target;
    const elementDark = element.nextElementSibling;
    elementDark.classList.add(addClass);
    elementDark.classList.remove(removeClass);
  }

  _showingFormDelete() {
    const popupDeleting = document.querySelector(".popup_deleting_cards")
    popupDeleting.classList.add("popup_opened")
    }

  createCard() {
    return this._createCardElement();
  }
}
