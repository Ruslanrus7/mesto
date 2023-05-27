export default class Card {
  constructor(cardElement, selectorTemplate, openZoomImagePopup, deleteCard, likeCard) {
    this._selectorTemplate = selectorTemplate;
    this._openZoomImagePopup = openZoomImagePopup;
    this._name = cardElement.name;
    this._image = cardElement.link;
    this._ownerId = cardElement.owner._id;
    this._myId = cardElement.myId;
    this._deleteCard = deleteCard;
    this._cardId = cardElement._id;
    this._likes = cardElement.likes;
    this._likeCard = likeCard;
    this._cardElement = this._getTemplate();
    this._likesElement = this._cardElement.querySelector('.elements__card-like-number');
    this._likeButton = this._cardElement.querySelector('.elements__card-btn');
    this._basketDeletButton = this._cardElement.querySelector('.elements__card-basket');
    this._imageElement = this._cardElement.querySelector('.elements__card-image');
    this._textElement = this._cardElement.querySelector('.elements__card-text');
  }

  _getTemplate() {
    const cardTemplateElement = this._selectorTemplate.content
      .querySelector('.elements__card')
      .cloneNode(true);

    return cardTemplateElement;
  }

  handleToggleLike (likes) {
    this._likeButton.classList.toggle('elements__card-btn_active');
    this._likesElement.textContent = likes;
  }

  handleDeleteCard =() => {
    this._cardElement.remove();
  };

  _checkActiveLike () {
    if(this._isLaked()) {
       this._likeButton.classList.add('elements__card-btn_active');
    }

    this._likesElement.textContent = this._likes.length;
  }

  _isLaked () {
    const isLaked = this._likes.find((user)=> {
      return  user._id === this._myId
    })
    return isLaked;
  }

  _changeDisplayDeleteButton () {
    if (this._ownerId !== this._myId) {
         this._basketDeletButton.remove();
       };
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._likeCard(this._likeButton, this._cardId)
    });
    this._basketDeletButton.addEventListener('click', () => {
      this._deleteCard(this._cardId);
    });
    this._imageElement.addEventListener('click', () => {
      this._openZoomImagePopup(this._image, this._name);
    });
  }

  generateCard() {
    this._changeDisplayDeleteButton();
    this._setEventListeners();
    this._checkActiveLike();

    this._imageElement.src = this._image;
    this._imageElement.alt = this._name;
    this._textElement.textContent = this._name;

    return this._cardElement;
  }
}
