import Popup from "./Popup.js";
import { FormValidator, objConfig } from "./FormValidation.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, callBack) {
    super(popupSelector);
    this._submitCallBack = callBack;
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._formValidator = new FormValidator(objConfig);
  }

  _getInputValues() {
    this._inputList = this._form.querySelectorAll(".form__input");
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  _getNewValues() {
    if (this._form.id == "confirm"){
      this._submitCallBack(this.cardToDelete, this.cardId)
    } else {
    this._submitCallBack(this._getInputValues());
    }
  }

  _formSubmitHandler = (evt) => {
    evt.preventDefault();
    this._getNewValues();
    this.close();
  };

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", this._formSubmitHandler);
  }

  open(cardToDelete, _id) {
    super.open();
    this._formValidator.enableValidation();
    this.cardToDelete = cardToDelete
    this.cardId = _id;
  }

  close(cardToDelete) {
    super.close();
    this._form.reset();
    cardToDelete ? this._form.id="delete" : null ;
  }
}
