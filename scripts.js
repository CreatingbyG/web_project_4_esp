const editButton = document.querySelector(".edit-button");
const btnClosed = document.querySelector(".popup__container-btn-closed");
const addButton = document.querySelector(".add-button");
const btnClosedImages = document.querySelector(
  ".popup__container-btn-closed-image"
);
const titulo = document.querySelector(".profile__description-name");
const subtitle = document.querySelector(".profile__description-info");
const saveButton = document.querySelector(".popup__handlers-button");
const popUpProfile = document.querySelector(".popup_profile");
const popUpFormImages = document.querySelector(".popup_images");
let nameInput = document.querySelector(".popup__container-texts-input-name");
let jobInput = document.querySelector(".popup__container-texts-input-info");
const likeIcon = document.querySelectorAll(".icons__like");
const darkMode = document.querySelectorAll(".icons__like_like-dark");
const cardImage = document.querySelectorAll(".card-photo");
const btnClosedCard = document.querySelector(".popup__container-btn-closed_images")

editButton.addEventListener("click", openPopUpProfile);
btnClosed.addEventListener("click", closePopUpProfile);
addButton.addEventListener("click", openPopUpFormImages);
btnClosedImages.addEventListener("click", closePopUpFormImages);
saveButton.addEventListener("click", handlerProfileFormSubmit);
btnClosedCard.addEventListener("click", closePopUpPreviewImagesModal);

likeIcon.forEach((heart) => {
  heart.addEventListener("click", (evt) => {
    const element = evt.target;
    const elementDark = element.nextElementSibling;
    element.classList.add("hide");
    element.classList.remove("hide");
    elementDark.classList.add("show");
    elementDark.classList.remove("hide");
  });
});

darkMode.forEach((darkHeart) => {
  darkHeart.addEventListener("click", (evt) => {
    const elementDark = evt.target;
    const element = elementDark.previousElementSibling;
    element.classList.remove("hide");
    element.classList.add("show");
    elementDark.classList.add("hide");
    elementDark.classList.remove("show");
  });
});

function openPopUpProfile() {
  popUpProfile.classList.add("popup_opened");
  nameInput.value = titulo.textContent;
  jobInput.value = subtitle.textContent;
}

function closePopUpProfile(evt) {
  evt.preventDefault();
  popUpProfile.classList.remove("popup_opened");
}

function openPopUpFormImages() {
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

cardImage.forEach((card) => {
  card.addEventListener("click", (evt) => {
    const routeImage = evt.target.src;
    const altImage = evt.target.alt;
    const popUpFormImages = document.querySelector(".popup_preview_images");
    popUpFormImages.classList.add("popup_opened");
    const imagePopUp = document.getElementById("img-card-popup");
    imagePopUp.setAttribute("src", routeImage);
    imagePopUp.setAttribute("alt", altImage);
  });
});

function closePopUpPreviewImagesModal() {
  const popUpPreview = document.querySelector(".popup_preview_images");
  popUpPreview.classList.remove("popup_opened");
}
