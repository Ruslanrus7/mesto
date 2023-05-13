import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(selectorPopup) {
    super(selectorPopup);
    this._popupImage = this._popup.querySelector('.popup-image__element');
    this._popupText = this._popup.querySelector('.popup-image__text');
  }

  open = (userImage, userText) => {
    this._popupImage.src = userImage;
    this._popupImage.alt = userText;
    this._popupText.textContent = userText;
    super.open();
  }
}
