import { initialCards } from "./constantes.js";
import { Card } from "./Card.js";
//import { renderingCards } from "./Card.js"
//import {formValidator, objConfig} from "./FormValidation.js";
import Popup from "./Popup.js";
import PopupWithImage from "./PopupWithImage.js";
import Section from "./Section.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";
import {titleValue, imageValue} from "./constantes.js"

//formValidator;
//renderingCards();
//objConfig;
//initialCards;
//Popup;



const sectionContainer = ".contelements";
const cardSection = new Section({
     data: initialCards,
     renderer: (item) => {
       const card = new Card (item, "#template-cards");
       const cardElement = card.createCard();
       cardSection.addItem(cardElement);
   }
   }, sectionContainer);


   document.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("card-photo")){
      const imageData = {
        src: evt.target.src,
        alt: evt.target.alt,
        name: evt.target.alt
      };
      const popupWithImage = new PopupWithImage(".popup_preview_images");
      popupWithImage.open(imageData.name, imageData.src);
    }
  });

  const editButton = document.querySelector(".edit-button");
  const userInfo = new UserInfo({ 
    nameSelector: ".profile__description-name", 
    infoSelector: ".profile__description-info" 
  });
  const popupProfile = new PopupWithForm(".popup_profile", 
  (data) => {
      userInfo.setUserInfo(data);
    }
  );
 
  editButton.addEventListener("click", () => {
    const {_nameInput, _jobInput} = userInfo
    const {name, job} = userInfo.getUserInfo();

    _nameInput.value = name
    _jobInput.value = job
    popupProfile.open();
  });

  
  const addButton = document.querySelector(".add-button");
  
  const popupImages = new PopupWithForm(".popup_images", (cardData) => {
    const {name, link} = cardData;
    const newCard = new Card({name, link, like: false}, "#template-cards");
    document.querySelector(".contelements").prepend(newCard.createCard());
  });
  //popupImages._setEventListeners();
  
  addButton.addEventListener("click", () => {
    popupImages.open();
  });

  cardSection.render();