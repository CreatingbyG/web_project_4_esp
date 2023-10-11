import { deletingEvents } from "../utils/utils.js"
import { closeAllPopups } from "../utils/utils.js";
import { popUpProfile } from "../utils/utils.js";
import { popUpFormImages } from "../utils/utils.js";
import {titulo, subtitle, nameInput, jobInput, titleValue, imageValue} from "../utils/constantes.js";
import { Card } from "./Card.js";





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
  
     _enterKeyDownEventImages(evt) {
      const formProfileImages = document.querySelector(".popup__container-texts-images");
      if (evt.key === "Enter") {
        evt.preventDefault();
        const hasInvalidInput = this._hasInvalidInput(Array.from(formProfileImages.querySelectorAll(".form__input")));
        if (!hasInvalidInput) {
          const newCardData = {
            name: titleValue.value,
            link: imageValue.value,
          };
          const newCard = new Card(newCardData, "#template-cards");
          document.querySelector(".contelements").prepend(newCard.createCard());
          popUpFormImages.classList.remove("popup_opened");
        }
        this._toggleInputError(titleValue, hasInvalidInput); // Show/hide error on titleValue
        this._toggleInputError(imageValue, hasInvalidInput); // Show/hide error on imageValue
        deletingEvents();
      }
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
