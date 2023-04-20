export class Card {
  constructor(cardElement, selectorTemplate, openZoomImagePopup) {
    this._selectorTemplate = selectorTemplate;
    this.openZoomImagePopup = openZoomImagePopup;
    this._name = cardElement.name;
    this._image = cardElement.link;
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

  _handleDeleteCard (event) {
      event.target.closest('.elements__card').remove();
  };


  _setEventListeners() {
    this._likeButton.addEventListener('click', this. _handleLikeButton);
    this._basketDeletButton.addEventListener('click', this. _handleDeleteCard);
    this._imageElement.addEventListener('click', () => {
      this.openZoomImagePopup(this._imageElement, this._textElement);
    });
  }

  generateCard() {
    this._cardElement = this._getTemplate();
    this._likeButton = this._cardElement.querySelector('.elements__card-btn');
    this._basketDeletButton = this._cardElement.querySelector('.elements__card-basket');
    this._imageElement = this._cardElement.querySelector('.elements__card-image');
    this._textElement = this._cardElement.querySelector('.elements__card-text');
    this._setEventListeners();

    this._cardElement.querySelector('.elements__card-image').src = this._image;
    this._cardElement.querySelector('.elements__card-text').textContent = this._name;

    return this._cardElement;
  }
}
