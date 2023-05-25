import Popup from "./Popup.js";

export default class PopapWithSubmit extends Popup {
  constructor(selectorPopup, submitForm) {
    super(selectorPopup);
    this._popupForm = this._popup.querySelector('.popup__form');
    this._submitForm = submitForm;
  }

  setEventListeners () {
    super.setEventListeners ();

    this._popupForm.addEventListener('submit', (evt)=> {
      evt.preventDefault();
      this._submitForm();
      this.close();
    });
  }
}
