import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(selectorPopup) {
    super(selectorPopup);
    this._popupImage = this._popup.querySelector('.popup-image__element');
    this._popupText = this._popup.querySelector('.popup-image__text');
  }

  popupOpen = (userElementImage, userElementText) => {
    this._popupImage.src = userElementImage.src;
    this._popupImage.alt = userElementImage.alt;
    this._popupText.textContent = userElementText.textContent;
    super.popupOpen();
  }
}
