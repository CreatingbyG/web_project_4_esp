import { closeAllPopups, deletingEvents } from "../utils/utils.js";


export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._popup = document.querySelector(this._popupSelector); // Agrega esta línea para asignar el elemento
    this._form = this._popup.firstElementChild;
    this._closeButton = this._popup.querySelector(".popup__container-btn-closed");
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleOverlayClose = this._handleOverlayClose.bind(this);
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
  }

  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
    this._popup.addEventListener("click", this._handleOverlayClose);
    this.setEventListeners();
    
  }

  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
    this._popup.removeEventListener("click", this._handleOverlayClose);
    this._closeButton.removeEventListener("click", this.close.bind(this));
  }

  _handleEscClose(event) {
    if (event.key === "Escape") {
      closeAllPopups();
      deletingEvents();
    }
  }

  _formSubmitHandler(e) {
    e.preventDefault();
  }

  _handleOverlayClose(event) {
    if (event.target === this._popup) {
      closeAllPopups();
      deletingEvents();
    }
  }

  setEventListeners() {
    this._closeButton.addEventListener("click", this.close.bind(this));
  }
}
