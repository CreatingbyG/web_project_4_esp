import PopupWithForm from "./PopupWithForm";
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

    const popupDeleting = new PopupWithForm(".popup_deleting_cards", () => {
      const deleteButton = document.querySelector(".popup__handlers-button-deleting");
      deleteButton.addEventListener("click", (evt) => {
        const cardElement = evt.target.closest(".card");
        if (cardElement) {
          cardElement.remove();
        }
      });
    });
    const formSure = document.querySelectorAll(".icons__delete");
    formSure.forEach((element) => {
      element.addEventListener("click", () => {
        popupDeleting.open();
      });
    });

    return element;
  }

  _handleToggleClick(addClass, removeClass, evt) {
    const element = evt.target;
    const elementDark = element.nextElementSibling;
    elementDark.classList.add(addClass);
    elementDark.classList.remove(removeClass);
  }

  // deletingCards(evt) {
  //   if (evt.target.classList.contains("icons__delete")) {
  //     const cardElement = evt.target.closest(".elements");
  //     cardElement.remove();
  //   }
  // }

  createCard() {
    return this._createCardElement();
  }
}