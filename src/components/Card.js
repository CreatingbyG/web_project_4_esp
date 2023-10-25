import PopupWithForm from "./PopupWithForm.js";
export class Card {
  constructor({name, link, like, user_id, owner:{_id}}, templateSelector, user) {
    this.templateSelector = templateSelector;
    this.name = name;
    this.link = link;
    this.like = like;
    this.user = user._id;
    this.owner = _id;
  }

  _createCardElement() {
    const template = document.querySelector(this.templateSelector).content;
    const element = template.querySelector(".elements").cloneNode(true);

    const elementTitle = element.querySelector(".card__image-text");
    elementTitle.textContent = this.name;

    const elementImage = element.querySelector(".card-photo");
    elementImage.src = this.link;
    elementImage.alt = this.name;

    const likeIcon = element.querySelector(".icons__like");
    likeIcon.addEventListener("click", this._handleToggleClick.bind(this, "show", "hide"));

    const darkMode = element.querySelector(".icons__like_like-dark");
    darkMode.addEventListener("click", this._handleToggleClick.bind(this, "hide", "show"));
    
    const popupDeleting = new PopupWithForm(".popup_deleting_cards", () => {
      const deleteButton = document.querySelector(".popup__handlers-button-deleting");
      deleteButton.addEventListener("click", () => {
          this.cardToDelete.remove();
      });
    });

    const deleteBtnIcon = element.querySelector(".icons__delete");
    if (this.user !== this.owner){
      deleteBtnIcon.style.display = "none" 
    }
    
    deleteBtnIcon.addEventListener("click", (evt) => {   
    this.cardToDelete = evt.target.closest(".elements");  
      popupDeleting.open();
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