
// popap edit
const popupProfileEdit = document.querySelector('.popup_form_edit');
const popupEditButton = document.querySelector('.profile__info-button');
const formEditElement = popupProfileEdit.querySelector('.popup__form_type_edit');
const nameEditInput = formEditElement.querySelector('.popup__input_type_name');
const jobEditInput = formEditElement.querySelector('.popup__input_type_job');
const nameUser = document.querySelector('.profile__info-name');
const jobUser = document.querySelector('.profile__info-text');
const formEditButton = popupProfileEdit.querySelector('.popup__form-btn_type_edit');
// popap add cards
const popupElementAdd = document.querySelector('.popup_form_add');
const popupAddButton = document.querySelector('.profile__button');
const formAddElement = popupElementAdd.querySelector('.popup__form_type_add');
const nameAddInput = formAddElement.querySelector('.popup__input_type_mesto-name');
const imageAddInput = formAddElement.querySelector('.popup__input_type_image');
const formButtonAdd = formAddElement.querySelector('.popup__form-btn_type_add');
// добавление карточек
const templateElements = document.querySelector('#template-elements').content;
const userElements = document.querySelector('.elements');
// увеличение картинки
const popupImageElement = document.querySelector('.popup-image');
const popupImageBig = popupImageElement.querySelector('.popup-image__element');
const popupImageText = popupImageElement.querySelector('.popup-image__text');
// закрытие карточек
const buttonsClosePopup = document.querySelectorAll('.popup__close');
// кнопки форм
const buttonsFormElements = document.querySelectorAll('.popup__form-btn');
// для кнопок при открытии popap
const buttonSubmitEdit = formEditElement.querySelector('.popup__form-btn');
const bottonSubmitAdd = formAddElement.querySelector('.popup__form-btn');
const inputListEdit = Array.from(formEditElement.querySelectorAll('.popup__input'));
const inputListAdd = Array.from(formAddElement.querySelectorAll('.popup__input'));

// функция добавления карточек
function createCard (item) {
  const userElement = templateElements.querySelector('.elements__card').cloneNode(true);
  const userElementImage = userElement.querySelector('.elements__card-image');
  const userElementText = userElement.querySelector('.elements__card-text');
  userElementText.textContent = item.name;
  userElementImage.src = item.link;
  userElementImage.alt = item.name;

  setToggleLikeEventListener (userElement);
  setDeleteCardEventListener (userElement);
  setZoomImageEventListener (userElementImage, userElementText);
  return userElement;
};

function addCard (card) {
  userElements.prepend(card);
};

// функция добавления карточки
function submitAddCardForm (evt) {
  evt.preventDefault();
  const card ={
  name: nameAddInput.value,
  link: imageAddInput.value,
  };

  addCard(createCard (card));
  closePopup(popupElementAdd);

  evt.target.reset();
};

initialCards.forEach(function (item){
  addCard(createCard (item));
});

// фукция поставить лайк
function setToggleLikeEventListener (userElement) {
  const likeButton = userElement.querySelector('.elements__card-btn');

  likeButton.addEventListener('click', function(event) {
    event.target.classList.toggle('elements__card-btn_active');
});
};

// функция удаления карточки
function setDeleteCardEventListener (userElement) {
  const basketDeletButton = userElement.querySelector('.elements__card-basket');

  basketDeletButton.addEventListener('click', function (event) {
    event.target.closest('.elements__card').remove();
  });
}

// функция увеличения картинки
function setZoomImageEventListener (userElementImage, userElementText) {

  userElementImage.addEventListener('click', function() {
    popupImageBig.src = userElementImage.src;
    popupImageBig.alt = userElementImage.alt;
    popupImageText.textContent = userElementText.textContent;
    openPopup(popupImageElement);
  });
};

//функция закрытия popup по escape
function closePopupKeydownEscape (event) {
  if(event.key === 'Escape') {
    const popupOpenedElement = document.querySelector('.popup_opened');
    closePopup(popupOpenedElement);
  }
}

// открытие попапа
function openPopup (popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupKeydownEscape);
};

//закрытие попапа
function closePopup (popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupKeydownEscape);
};

//закрытие попапа overlay
const closePopupByClickOnOverlay = function(event) {
  if (event.target === event.currentTarget){
    closePopup(event.target);
  }
};

// функция сохранить edit
function submitEditProfileForm (evt) {
  evt.preventDefault();
  nameUser.textContent = nameEditInput.value;
  jobUser.textContent = jobEditInput.value;
  closePopup(popupProfileEdit);
};

// кнопка открытия попапа edit
popupEditButton.addEventListener('click', function() {
  resetErorForm(formEditElement);
  nameEditInput.value = nameUser.textContent;
  jobEditInput.value = jobUser.textContent;
  toggleButtonState(inputListEdit, buttonSubmitEdit, validationList);
  openPopup(popupProfileEdit);
});

popupProfileEdit.addEventListener('click', closePopupByClickOnOverlay);

popupElementAdd.addEventListener('click', closePopupByClickOnOverlay);

popupImageElement.addEventListener('click', closePopupByClickOnOverlay);

// отпраквка формы edit
formEditElement.addEventListener('submit', submitEditProfileForm);

// открытие попапа add
popupAddButton.addEventListener('click', function() {
  resetErorForm(formAddElement);
  formAddElement.reset();
  toggleButtonState(inputListAdd, bottonSubmitAdd, validationList);
  openPopup(popupElementAdd);
});

// отправка формы add
formAddElement.addEventListener('submit', submitAddCardForm);

//закрытие попапа
buttonsClosePopup.forEach(function (button) {
  const popupCloseElement = button.closest('.popup');
  button.addEventListener('click', function () {
    closePopup(popupCloseElement);
  });
});
