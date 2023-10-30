import "../vendor/normalize.css";
import "../fonts/inter.css";
import "../pages/styles/blocks/body/body.css";
import "./styles/blocks/button/edit-button/edit-button.css";
import "./styles/blocks/button/add-button/add-button.css";
import "../pages/styles/blocks/content/content.css";
import "../pages/styles/blocks/header/header.css";
import "../pages/styles/blocks/logo/logo.css";
import "../pages/styles/blocks/page/page.css";
import "../pages/styles/blocks/profile/profile.css";
import "../pages/styles/blocks/profile/avatar/avatar.css";
import "../pages/styles/blocks/profile/vector/vector.css";
import "../pages/styles/blocks/profile/profile__description/profile__description.css";
import "../pages/styles/blocks/profile/profile__description-name/profile__description-name.css";
import "../pages/styles/blocks/profile/profile__description-info/profile__description-info.css";
import "../pages/styles/blocks/elements/elements.css";
import "../pages/styles/blocks/elements/card/card.css";
import "../pages/styles/blocks/elements/card/card__image-text/card__image-text.css";
import "../pages/styles/blocks/elements/card/card-photo/card-photo.css";
import "../pages/styles/blocks/elements/icons/icons.css";
import "../pages/styles/blocks/elements/icons/icons__delete/icons__delete.css";
import "../pages/styles/blocks/elements/icons/icons__like/icons__like.css";
import "../pages/styles/blocks/elements/icons/icons__like_number/icons__like_number.css";
import "../pages/styles/blocks/popup/popup.css";
import "../pages/styles/blocks/popup/popupform/popupform.css";
import "../pages/styles/blocks/popup/popup_opened/popup_opened.css";
import "../pages/styles/blocks/popup/popup__container/popup__container.css";
import "../pages/styles/blocks/popup/popup__container_deleting/popup__container_deleting.css";
import "../pages/styles/blocks/popup/popup__container_edit/popup__container_edit.css";
import "../pages/styles/blocks/popup/popup__container-texts/popup__container-texts.css";
import "../pages/styles/blocks/popup/popup__container-title/popup__container-title.css";
import "../pages/styles/blocks/popup/popup__container-texts-input/popup__container-texts-input.css";
import "../pages/styles/blocks/popup/popup__container-texts-input-link-edit/popup__container-texts-input-link-edit.css";
import "../pages/styles/blocks/popup/popup__container-texts-deleting/popup__container-texts-deleting.css";
import "../pages/styles/blocks/popup/popup__container-btn-closed/popup__container-btn-closed.css";
import "../pages/styles/blocks/popup/popup__container-btn-closed-edit/popup__container-btn-closed-edit.css";
import "../pages/styles/blocks/popup/popup__container-btn-closed_images/popup__container-btn-closed_images.css";
import "../pages/styles/blocks/popup/popup__container-btn-closed-deleting/popup__container-btn-closed-deleting.css";
import "../pages/styles/blocks/popup/popup__handlers/popup__handlers.css";
import "../pages/styles/blocks/popup/popup__handlers-button/popup__handlers-button.css";
import "../pages/styles/blocks/imgcontainer/img__container.css";
import "../pages/styles/blocks/imgcontainer/img-card-popup/img-card-popup.css";
import "../pages/styles/blocks/footer/footer.css";
import "../pages/styles/blocks/global/global.css";

import { Card } from "../components/Card.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import { buttonEditChange, buttonDeletingCards, buttonProfileEdit, buttonCreatingCard } from "../utils/constantes.js";

const sectionContainer = ".contelements";
export const api = new Api();

const userInfo = new UserInfo({
  nameSelector: ".profile__description-name",
  infoSelector: ".profile__description-info",
  avatarSelector: ".avatar"
});

Promise.all([api.getUserInfoChanged(), api.getInitialCards()])
  .then(([user, data]) => {
    console.log(user._id)
    userInfo.setUserInfo(user);

    const cardSection = new Section(
      {
        data: data,
        renderer: (item) => {
          const card = new Card(item, "#template-cards", user);
          const cardElement = card.createCard();
          //item._likes = {}
          cardSection.addItem(cardElement);
        },
      },
      sectionContainer
    );
    cardSection.render();

    const addButton = document.querySelector(".add-button");
    const popupImages = new PopupWithForm(".popup_images", (cardData) => {
      buttonCreatingCard.textContent = "Creando..."
      api.addNewCard(cardData)
      .then((response) => {
        console.log(response)
        const { name, link, _id } = response;
        const newCard = new Card({ name, link, _id, likes: []}, "#template-cards", user);
        document.querySelector(".contelements").prepend(newCard.createCard());
        buttonCreatingCard.textContent = "Crear"
      })
        // const { name, link, _id } = cardData;
        // const newCard = new Card({ name, link, _id, likes: []}, "#template-cards", user);
        // document.querySelector(".contelements").prepend(newCard.createCard());
        // buttonCreatingCard.textContent = "Crear"
      });

    addButton.addEventListener("click", () => {
      popupImages.open();
    });
  })
  .catch((error) => {
    console.log(error);
    buttonCreatingCard.textContent = "Crear"
  });

document.addEventListener("click", (evt) => {
  if (evt.target.classList.contains("card-photo")) {
    const imageData = {
      src: evt.target.src,
      alt: evt.target.alt,
      name: evt.target.alt,
    };
    const popupWithImage = new PopupWithImage(".popup_preview_images");
    popupWithImage.open(imageData.name, imageData.src);
  }
});

const editButton = document.querySelector(".edit-button");
api.getUserInfo(userInfo);
const popupProfile = new PopupWithForm(".popup_profile", (data) => {
  userInfo.setUserInfo(data);
  buttonProfileEdit.textContent = "Guardando..."
  api.getUserInfoChanged(data)
    .then(() => {
      userInfo.setUserInfo();
      buttonProfileEdit.textContent = "Guardar"
    })
    .catch((error) => {
      console.log(error);
      buttonProfileEdit.textContent = "Guardar"
    });
});


editButton.addEventListener("click", () => {
  const { _nameInput, _jobInput } = userInfo;
  const { name, job } = userInfo.getUserInfo();

  _nameInput.value = name;
  _jobInput.value = job;
  popupProfile.open();
});

const editProfileForm = document.querySelector('.vector');
const popupProfileChange = new PopupWithForm('.popup_change_profile', (avatarLink) => {
  buttonEditChange.textContent = "Guardando..."
  api.updateAvatar(avatarLink)
    .then((response) => {
      const avatar = document.querySelector(".avatar");
      avatar.src = response.avatar;
      buttonEditChange.textContent = "Guardar;" // Actualizar la imagen del avatar con la URL devuelta por el servidor
    })
    .catch((error) => {
      console.log(error);
      buttonEditChange.textContent = "Guardar";
    });
});

editProfileForm.addEventListener('click', (event) => {
  event.preventDefault(); // Evitar que el formulario se envíe automáticamente // Obtener la URL de la imagen del avatar del campo de entrada
  popupProfileChange.open(); // Pasar la URL de la imagen del avatar al método open del popupProfileChange
});

export const popupDeleting = new PopupWithForm(".popup_deleting_cards", (cardToDelete, _id) => {
  buttonDeletingCards.textContent = "Eliminando..."
  api.deleteCard(_id)
    .then(() => {
      cardToDelete.remove();
      buttonDeletingCards.textContent = "Si";
    })
    .catch((error) => {
      console.error(`Error in deleting card: ${error}`);
      buttonDeletingCards.textContent = "Si";
    });
})