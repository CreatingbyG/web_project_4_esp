import "../vendor/normalize.css"
import "../fonts/inter.css"
import "../pages/styles/blocks/body/body.css"
import "./styles/blocks/button/edit-button/edit-button.css"
import "./styles/blocks/button/add-button/add-button.css"
import "../pages/styles/blocks/content/content.css"
import "../pages/styles/blocks/header/header.css"
import "../pages/styles/blocks/logo/logo.css"
import "../pages/styles/blocks/page/page.css"
import "../pages/styles/blocks/profile/profile.css"
import "../pages/styles/blocks/profile/avatar/avatar.css"
import "../pages/styles/blocks/profile/profile__description/profile__description.css"
import "../pages/styles/blocks/profile/profile__description-name/profile__description-name.css"
import "../pages/styles/blocks/profile/profile__description-info/profile__description-info.css"
import "../pages/styles/blocks/elements/elements.css"
import "../pages/styles/blocks/elements/card/card.css"
import "../pages/styles/blocks/elements/card/card__image-text/card__image-text.css"
import "../pages/styles/blocks/elements/card/card-photo/card-photo.css"
import "../pages/styles/blocks/elements/icons/icons.css"
import "../pages/styles/blocks/elements/icons/icons__delete/icons__delete.css"
import "../pages/styles/blocks/elements/icons/icons__like/icons__like.css"
import "../pages/styles/blocks/popup/popup.css"
import "../pages/styles/blocks/popup/popupform/popupform.css"
import "../pages/styles/blocks/popup/popup_opened/popup_opened.css"
import "../pages/styles/blocks/popup/popup__container/popup__container.css"
import "../pages/styles/blocks/popup/popup__container-texts/popup__container-texts.css"
import "../pages/styles/blocks/popup/popup__container-title/popup__container-title.css"
import "../pages/styles/blocks/popup/popup__container-texts-input/popup__container-texts-input.css"
import "../pages/styles/blocks/popup/popup__container-btn-closed/popup__container-btn-closed.css"
import "../pages/styles/blocks/popup/popup__container-btn-closed_images/popup__container-btn-closed_images.css"
import "../pages/styles/blocks/popup/popup__handlers/popup__handlers.css"
import "../pages/styles/blocks/popup/popup__handlers-button/popup__handlers-button.css"
import "../pages/styles/blocks/imgcontainer/img__container.css"
import "../pages/styles/blocks/imgcontainer/img-card-popup/img-card-popup.css"
import "../pages/styles/blocks/footer/footer.css"
import "../pages/styles/blocks/global/global.css"


import { initialCards } from "../utils/constantes.js"
import { Card } from "../components/Card.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";


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
  
  addButton.addEventListener("click", () => {
    popupImages.open();
  });

  cardSection.render();