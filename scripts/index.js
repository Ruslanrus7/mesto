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
const popupCloseButton = document.querySelectorAll('.popup__close');

const initialCards = [
  {
    name: 'Карачаевск',
    link: './images/karachaevsk.jpg'
  },

  {
    name: 'Гора Эльбрус',
    link: './images/elbrus.jpg'
  },

  {
    name: 'Домбай',
    link: './images/dombay.jpg'
  },

  {
    name: 'Гора Эльбрус',
    link: './images/elbrus.jpg'
  },

  {
    name: 'Карачаево-Черкессия',
    link: './images/karachaevsk.jpg'
  },

  {
    name: 'Алтай',
    link: './images/Altai.jpg'
  },
];

// функция добавления карточек
function createCard (item) {
  const userElement = templateElements.querySelector('.elements__card').cloneNode(true);
  const userElementImage = userElement.querySelector('.elements__card-image');
  const userElementText = userElement.querySelector('.elements__card-text');
  userElementText.textContent = item.name;
  userElementImage.src = item.link;
  userElementImage.alt = item.name;

  addCard (userElement);
  activeteLike ();
  deleteCard ();
  increaseImage (userElementImage, userElementText);
};

function addCard (card) {
  userElements.prepend(card);
}

// функция добавления карточки
function submitAddCardForm (evt) {
  evt.preventDefault();
  const card ={
  name: `${nameAddInput.value}`,
  link: `${imageAddInput.value}`,
  };

  createCard(card);
  closePopup(popupElementAdd);

  evt.target.reset();
};

initialCards.forEach(function (item){
  createCard (item);
});

// фукция поставить лайк
function activeteLike () {
  const likeButton = document.querySelector('.elements__card-btn');

  likeButton.addEventListener('click', function(event) {
    event.target.classList.toggle('elements__card-btn_active');
});
};

// функция удаления карточки
function deleteCard () {

  const basketDeletButton = document.querySelector('.elements__card-basket');

  basketDeletButton.addEventListener('click', function (event) {
    event.target.closest('.elements__card').remove();
  });
}

// функция увеличения картинки
function increaseImage (userElementImage, userElementText) {

  userElementImage.addEventListener('click', function() {
    popupImageBig.src = userElementImage.src;
    popupImageBig.alt = userElementImage.alt;
    popupImageText.textContent = userElementText.textContent;
    openPopup(popupImageElement);
  });
};

// открытие попапа
function openPopup (popup) {
  popup.classList.add('popup_opened');
};

//закрытие попапа
function closePopup (popup) {
  popup.classList.remove('popup_opened');
};

const closePopupByClickOnOverlay = function(event) {
  if (event.target === event.currentTarget)
  closePopup(popupProfileEdit);
};

// функция сохранить edit
function handleFormSubmit (evt) {
  evt.preventDefault();
  nameUser.textContent = nameEditInput.value;
  jobUser.textContent = jobEditInput.value;
  closePopup(popupProfileEdit);
};

// кнопка открытия попапа edit
popupEditButton.addEventListener('click', function() {
  openPopup(popupProfileEdit);
  nameEditInput.value = nameUser.textContent;
  jobEditInput.value = jobUser.textContent;
});

popupProfileEdit.addEventListener('click', closePopupByClickOnOverlay);

// отпраквка формы edit
formEditElement.addEventListener('submit', handleFormSubmit);

// открытие попапа add
popupAddButton.addEventListener('click', function() {
  openPopup(popupElementAdd);
  nameAddInput.value = '';
  imageAddInput.value = '';
});

// отправка формы add
formAddElement.addEventListener('submit', submitAddCardForm);

//закрытие попапа
popupCloseButton.forEach(function (closeElement) {
  const popupCloseElement = closeElement.closest('.popup');
  closeElement.addEventListener('click', function () {
  closePopup(popupCloseElement);
  });
});
