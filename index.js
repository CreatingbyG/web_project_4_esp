import { initialCards } from "./db-cards.js";
const editButton = document.querySelector(".edit-button");
const btnClosed = document.querySelector(".popup__container-btn-closed");
const addButton = document.querySelector(".add-button");
const btnClosedImages = document.querySelector(
  ".popup__container-btn-closed-image"
);
const titulo = document.querySelector(".profile__description-name");
const subtitle = document.querySelector(".profile__description-info");
const popUpProfile = document.querySelector(".popup_profile");
const popUpFormImages = document.querySelector(".popup_images");
const nameInput = document.querySelector(".popup__container-texts-input-name");
const jobInput = document.querySelector(".popup__container-texts-input-info");
const saveButton = document.querySelector(".popup__handlers-button"); 
const btnClosedCard = document.querySelector(
  ".popup__container-btn-closed_images"
);
const titleValue = document.querySelector(
  ".popup__container-texts-input-title"
);
const imageValue = document.querySelector(".popup__container-texts-input-link");
const deleteCard = document.querySelector(".icons");
const element = document.querySelector(".elements");

editButton.addEventListener("click", openPopUpProfile);
btnClosed.addEventListener("click", closePopUpProfile);
addButton.addEventListener("click", openPopUpFormImages);
saveButton.addEventListener("click", handlerProfileFormSubmit);
btnClosedImages.addEventListener("click", closePopUpFormImages);
btnClosedCard.addEventListener("click", closePopUpPreviewImagesModal);
document.addEventListener("DOMContentLoaded", renderingCards);
element.addEventListener("click", (evt) => {
if (evt.target.classList.contains("icons__delete")) {
      const element = evt.target.parentElement.parentElement;
      const image = element.querySelector(".card-photo").src;
      initialCards.forEach((link, i)=> {
        if (image === link.link){
        initialCards.splice(i, 1);
      cleaningAndRendering();
      }
    })
  }
})

function renderingCards() {
  const card = initialCards.forEach((card) => {
    const template = document.getElementById("template-cards").content;
    const element = template.querySelector(".elements").cloneNode(true);

    const elementTitle = element.querySelector(".card__image-text");
    elementTitle.textContent = card.name;

    const elementImage = element.querySelector(".card-photo");
    elementImage.src = card.link;
    elementImage.alt = card.name;

    const cardContainer = document.querySelector(".elements");
    cardContainer.append(element);

    const likeIcon = element.querySelector(".icons__like");
    likeIcon.addEventListener("click", (evt) => {
      const element = evt.target;
      const elementDark = element.nextElementSibling;
      element.classList.add("hide");
      element.classList.remove("hide");
      elementDark.classList.add("show");
      elementDark.classList.remove("hide");
    });

    const darkMode = element.querySelector(".icons__like_like-dark");
    darkMode.addEventListener("click", (evt) => {
      const elementDark = evt.target;
      const element = elementDark.previousElementSibling;
      element.classList.remove("hide");
      element.classList.add("show");
      elementDark.classList.add("hide");
      elementDark.classList.remove("show");
    });

    const cardImage = element.querySelector(".card-photo");
    cardImage.addEventListener("click", (evt) => {
      const routeImage = evt.target.src;
      const altImage = evt.target.alt;
      const nameImage = document.querySelector(".img-card-name");
      nameImage.textContent = evt.target.alt;
      const popUpFormImages = document.querySelector(".popup_preview_images");
      popUpFormImages.classList.add("popup_opened");
      const imagePopUp = document.getElementById("img-card-popup");
      imagePopUp.setAttribute("src", routeImage);
      imagePopUp.setAttribute("alt", altImage);
    });
  });
}

const CreateNewCard = document.querySelector(".popup__handlers-button-create");
CreateNewCard.addEventListener("click", (evt) => {
  evt.preventDefault();
  const newCard = {
    name: titleValue.value,
    link: imageValue.value,
  };
  initialCards.unshift(newCard);
  titleValue.value = "";
  imageValue.value = "";
  cleaningAndRendering();
  popUpFormImages.classList.remove("popup_opened");
});

const formProfile = document.querySelector(".popup__container-texts");
formProfile.addEventListener("keypress", (evt) => {
  if (evt.key === "Enter") {
    evt.preventDefault();
    titulo.textContent = nameInput.value;
    subtitle.textContent = jobInput.value;
    popUpProfile.classList.remove("popup_opened");
  }
});

const formProfileImages = document.querySelector(".popup__container-texts-images");
formProfileImages.addEventListener("keypress", (evt) => {
  if (evt.key === "Enter") {
    evt.preventDefault();
    const newCard = {
      name: titleValue.value,
      link: imageValue.value,
    };
    initialCards.unshift(newCard);
    titleValue.value = "";
    imageValue.value = "";
    cleaningAndRendering();
    popUpFormImages.classList.remove("popup_opened");
  }
});


function cleanHtml() {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

function openPopUpProfile() {
  popUpProfile.classList.add("popup_opened");
  nameInput.value = titulo.textContent;
  jobInput.value = subtitle.textContent;
}

function closePopUpProfile(evt) {
  evt.preventDefault();
  popUpProfile.classList.remove("popup_opened");
}

function openPopUpFormImages(evt) {
  evt.preventDefault();
  popUpFormImages.classList.add("popup_opened");
}

function closePopUpFormImages(evt) {
  evt.preventDefault();
  popUpFormImages.classList.remove("popup_opened");
}

function handlerProfileFormSubmit(evt) {
  evt.preventDefault();
  titulo.textContent = nameInput.value;
  subtitle.textContent = jobInput.value;
  popUpProfile.classList.remove("popup_opened");
}

function closePopUpPreviewImagesModal() {
  const popUpPreview = document.querySelector(".popup_preview_images");
  popUpPreview.classList.remove("popup_opened");
}

function cleaningAndRendering(){
  cleanHtml();
  renderingCards();
}
