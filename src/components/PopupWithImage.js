import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector("#img-card-popup");
    this._imageText = this._popup.querySelector(".img-card-name");
  }

  _handleImageClick(evt) {
    const routeImage = evt.target.src;
    const altImage = evt.target.alt;
    const nameImage = this._imageText;
    nameImage.textContent = evt.target.alt;
    const popUpFormImages = document.querySelector(".popup_preview_images");
    popUpFormImages.classList.add("popup_opened");
    const imagePopUp = this._image;
    imagePopUp.setAttribute("src", routeImage);
    imagePopUp.setAttribute("alt", altImage);
    document.addEventListener("keydown", this._handlePopupKeyDown.bind(this));
    document.addEventListener("click", this._handlePopupClick.bind(this));
  }

  open(name, link) {
    this._image.src = link;
    this._image.alt = name;
    this._imageText.textContent = name;
    super.open();
  }
}
