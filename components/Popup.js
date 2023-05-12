export default class Popup {
  constructor (selectorPopup) {
    this._popup = document.querySelector(selectorPopup);
    this._buttonClose = this._popup.querySelector('.popup__close');
  }

  popupOpen () {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  popupClose () {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose = (event) => {
    if(event.key === 'Escape') {
      this.popupClose(this._selectorPopup);
    }
  }

  _handleOverlayClose = (event) => {
    if (event.target === event.currentTarget){
      this.popupClose()
    }
  }

  setEventListeners () {
    this._buttonClose.addEventListener('click', () => {
        this.popupClose();
      });

    this._popup.addEventListener('click', this._handleOverlayClose);
    };
}
