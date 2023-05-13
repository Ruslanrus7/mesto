export default class Popup {
  constructor (selectorPopup) {
    this._popup = document.querySelector(selectorPopup);
    this._buttonClose = this._popup.querySelector('.popup__close');
  }

  open () {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close () {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose = (event) => {
    if(event.key === 'Escape') {
      this.close();
    }
  }

  _handleOverlayClose = (event) => {
    if (event.target === event.currentTarget){
      this.close()
    }
  }

  setEventListeners () {
    this._buttonClose.addEventListener('click', () => {
        this.close();
      });

    this._popup.addEventListener('click', this._handleOverlayClose);
    };
}
