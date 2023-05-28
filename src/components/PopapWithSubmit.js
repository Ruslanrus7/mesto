import Popup from "./Popup.js";

export default class PopapWithSubmit extends Popup {
  constructor(selectorPopup, submitForm) {
    super(selectorPopup);
    this._popupForm = this._popup.querySelector('.popup__form');
    this._submitForm = submitForm;
    this._buttonSubmit = this._popupForm.querySelector('.popup__form-btn');
    this._defaultTextbuttonSubmit = this._buttonSubmit.textContent;
  }

  setEventListeners () {
    super.setEventListeners ();

    this._popupForm.addEventListener('submit', (evt)=> {
      evt.preventDefault();
      this._submitForm(this._card, this._cardId);
    });
  }

  renderLoading (isLoading) {
    if (isLoading) {
    this._buttonSubmit.textContent = `${this._buttonSubmit.textContent}...`;
    } else {
      this._buttonSubmit.textContent = this._defaultTextbuttonSubmit;
    }
  }

  open = (card, cardId) => {
    super.open();
    this._card = card;
    this._cardId = cardId;
  }
}
