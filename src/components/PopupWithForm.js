import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(selectorPopup, submitForm) {
    super(selectorPopup);
    this._popupForm = this._popup.querySelector('.popup__form');
    this._submitForm = submitForm;
    this._inputList = this._popupForm.querySelectorAll('.popup__input');
    this._buttonSubmit = this._popupForm.querySelector('.popup__form-btn');
    this._defaultTextbuttonSubmit = this._buttonSubmit.textContent;
  }

  _getInputValues () {
    this._inputValues = {}
    this._inputList.forEach(input => {
      this._inputValues[input.name] = input.value;
    })
    return this._inputValues;
  }

  setInputValues (data) {
    this._inputList.forEach(input => {
      input.value = data[input.name];
    })
  }

  setEventListeners () {
    super.setEventListeners ();

    this._popupForm.addEventListener('submit', (evt)=> {
      evt.preventDefault();
      this._submitForm(this._getInputValues());
    });
  }

  close () {
    super.close();
    this._popupForm.reset();
  }

  renderLoading (isLoading) {
    if (isLoading) {
    this._buttonSubmit.textContent = `${this._buttonSubmit.textContent}...`;
    } else {
      this._buttonSubmit.textContent = this._defaultTextbuttonSubmit;
    }
  }
}
