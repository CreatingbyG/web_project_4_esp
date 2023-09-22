import { escPopUpDeleting } from "./utils.js";
import { popUps } from "./utils.js";
import { deletingPopUpClick } from "./utils.js";
import { deletingEvents } from "./utils.js";
import { closeAllPopups } from "./utils.js";
import { closePopUpProfile } from "./utils.js";
import { closePopUpFormImages } from "./utils.js";
import { popUpProfile } from "./utils.js";
import { popUpFormImages } from "./utils.js";
import { initialCards } from "./constantes.js";
import { renderingCards } from "./Card.js";
import {titulo, subtitle, nameInput, jobInput, titleValue, imageValue} from "./constantes.js";
popUps;

export const objConfig = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit",
  inactiveButtonClass: "popup__button_inactive",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
};

export class FormValidator {
  constructor(config) {
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
  }

  _toggleInputError(inputElement, show) {
    const errorElement = inputElement.nextElementSibling;
    if (show) {
      inputElement.classList.add(this._inputErrorClass);
      errorElement.textContent = inputElement.validationMessage;
      errorElement.classList.add(this._errorClass);
    } else {
      inputElement.classList.remove(this._inputErrorClass);
      errorElement.classList.remove(this._errorClass);
      errorElement.textContent = "";
    }
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._toggleInputError(inputElement, true); // Show error
    } else {
      this._toggleInputError(inputElement, false); // Hide error
    }
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => !inputElement.validity.valid);
  }

  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.disabled = true;
      buttonElement.classList.add(this._inactiveButtonClass);
      buttonElement.classList.add("disabled-hover");
    } else {
      buttonElement.disabled = false;
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.classList.remove("disabled-hover");
    }
  }

  _setEventListeners(formElement) {
    const inputList = Array.from(
      formElement.querySelectorAll(this._inputSelector)
    );
    const buttonElement = formElement.querySelector(this._submitButtonSelector);
    this._toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
    const editButton = document.querySelector(".edit-button");
    editButton.addEventListener(
      "click",
      this._validFormPopUpProfile.bind(this)
    );

    const addButton = document.querySelector(".add-button");
    addButton.addEventListener("click", this._validFormPopUpImages.bind(this));


    const formProfile = document.querySelector(".popup__container-texts");
    formProfile.addEventListener("keydown", this._enterKeydownEventProfile.bind(this));

    const formProfileImages = document.querySelector(".popup__container-texts-images");
    formProfileImages.addEventListener("keydown", this._enterKeyDownEventImages.bind(this));

    const CreateNewCard = document.querySelector(".popup__handlers-button-create");
    CreateNewCard.addEventListener("click", this._newCardAdded);

    const btnClosed = document.querySelector(".popup__container-btn-closed");
    btnClosed.addEventListener("click", closePopUpProfile);

    const btnClosedImages = document.querySelector(
      ".popup__container-btn-closed-image"
    );
    btnClosedImages.addEventListener("click", closePopUpFormImages);

  }

  enableValidation() {
    const element = document.querySelectorAll(".form__input-error_active");
    element.forEach((el) => {
      el.classList.remove("form__input-error_active");
    });
    const formList = Array.from(document.querySelectorAll(this._formSelector));
    formList.forEach((formElement) => {
      formElement.addEventListener("submit", (evt) => {
        evt.preventDefault();
      });
      this._setEventListeners(formElement);
    });
  }

  _validFormPopUpProfile() {
    popUpProfile.classList.add("popup_opened");
    nameInput.value = titulo.textContent;
    jobInput.value = subtitle.textContent;
    formValidator.enableValidation();
    document.addEventListener("keydown", escPopUpDeleting);
    document.addEventListener("click", deletingPopUpClick);
  }

  _validFormPopUpImages(){
  popUpFormImages.classList.add("popup_opened");
  formValidator.enableValidation();
  document.addEventListener("keydown", escPopUpDeleting);
  document.addEventListener("click", deletingPopUpClick);
  }

  _enterKeydownEventProfile(evt) {
    const formProfile = document.querySelector(".popup__container-texts");
    if (evt.key === "Enter") {
      evt.preventDefault();
      const hasInvalidInput = this._hasInvalidInput(Array.from(formProfile.querySelectorAll(".form__input")));
      if (!hasInvalidInput) {
        titulo.textContent = nameInput.value;
        subtitle.textContent = jobInput.value;
        popUpProfile.classList.remove("popup_opened");
      }
      this._toggleInputError(nameInput, hasInvalidInput); // Show/hide error on nameInput
      this._toggleInputError(jobInput, hasInvalidInput);  // Show/hide error on jobInput
      deletingEvents();
    }
  }
  
  _enterKeyDownEventImages(evt){
    const formProfileImages = document.querySelector(".popup__container-texts-images");
    if (evt.key === "Enter") {
      evt.preventDefault();
      const hasInvalidInput = this._hasInvalidInput(Array.from(formProfileImages.querySelectorAll(".form__input")));
      if (!hasInvalidInput) {
        const newCard = {
          name: titleValue.value,
          link: imageValue.value,
        };
        initialCards.unshift(newCard);
        titleValue.value = "";
        imageValue.value = "";
        renderingCards(newCard);
        popUpFormImages.classList.remove("popup_opened");
      }
      this._toggleInputError(titleValue, hasInvalidInput); // Show/hide error on titleValue
      this._toggleInputError(imageValue, hasInvalidInput); // Show/hide error on imageValue
      deletingEvents();
    }
  };

_newCardAdded(evt){
  evt.preventDefault();
  const newCard = {
    name: titleValue.value,
    link: imageValue.value,
  };
  initialCards.unshift(newCard);
  titleValue.value = "";
  imageValue.value = "";
  renderingCards(newCard);
  popUpFormImages.classList.remove("popup_opened");
  deletingEvents();
}

  _handlePopupKeyDown(evt) {
    if (evt.key === "Escape") {
      closeAllPopups();
    }
  }

  _handlePopupClick(evt) {
    if (evt.target.classList.contains("popup_opened")) {
      closeAllPopups();
    }
  }
}
export const formValidator = new FormValidator(objConfig);
formValidator.enableValidation();