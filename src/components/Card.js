export default class Card {
  constructor(cardElement, selectorTemplate, openZoomImagePopup) {
    this._selectorTemplate = selectorTemplate;
    this._openZoomImagePopup = openZoomImagePopup;
    this._name = cardElement.name;
    this._image = cardElement.link;
    this._ownerId = cardElement.owner._id;
    this._myId = "1f5e710cf307d373c1b02c43";
  }

  _getTemplate() {
    const cardTemplateElement = this._selectorTemplate.content
      .querySelector('.elements__card')
      .cloneNode(true);

    return cardTemplateElement;
  }

  _handleLikeButton (event) {
    event.target.classList.toggle('elements__card-btn_active');
  };

  _handleDeleteCard =() => {
    this._cardElement.remove();
  };

  _setEventListeners() {
    this._likeButton.addEventListener('click', this._handleLikeButton);
    this._basketDeletButton.addEventListener('click', this._handleDeleteCard);
    this._imageElement.addEventListener('click', () => {
      this._openZoomImagePopup(this._image, this._name);
    });
  }

  generateCard() {
    this._cardElement = this._getTemplate();
    this._likeButton = this._cardElement.querySelector('.elements__card-btn');
    this._basketDeletButton = this._cardElement.querySelector('.elements__card-basket');
    this._imageElement = this._cardElement.querySelector('.elements__card-image');
    this._textElement = this._cardElement.querySelector('.elements__card-text');
    this._setEventListeners();

    if (this._ownerId !== this._myId) {
      this._basketDeletButton.remove();
    }
    this._imageElement.src = this._image;
    this._imageElement.alt = this._name;
    this._textElement.textContent = this._name;

    return this._cardElement;
  }
}
