// popap edit
const popupElement = document.querySelector('.popup_form_edit');
const popupEditButton = document.querySelector('.profile__info-button');
const popupCloseButton = popupElement.querySelector('.popup__close_form_edit');
const formElement = popupElement.querySelector('.popup__form_type_edit');
let nameInput = formElement.querySelector('.popup__input_type_name');
let jobInput = formElement.querySelector('.popup__input_type_job');
let nameUser = document.querySelector('.profile__info-name');
let jobUser = document.querySelector('.profile__info-text');
const formButton = popupElement.querySelector('.popup__form-btn_type_edit');
// popap add cards
const popupElementAdd = document.querySelector('.popup_form_add');
const popupAddButton = document.querySelector('.profile__button');
const popupCloseAddButton = popupElementAdd.querySelector('.popup__close_form_add');
const formAddElement = popupElementAdd.querySelector('.popup__form_type_add');
let mestoNameInput = formAddElement.querySelector('.popup__input_type_mesto-name');
let mestoImageInput = formAddElement.querySelector('.popup__input_type_image');
const formButtonAdd = formAddElement.querySelector('.popup__form-btn_type_add');
// добавление карточек
const templateElements = document.querySelector('#template-elements').content;
const userElements = document.querySelector('.elements');


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
function createCardAdd (item) {
  const userElement = templateElements.querySelector('.elements__card').cloneNode(true);

  userElement.querySelector('.elements__card-text').textContent = item.name;
  userElement.querySelector('.elements__card-image').src = item.link;
  userElement.querySelector('.elements__card-image').alt = item.name;

  userElements.prepend(userElement);

  activeLike ();
  deliteCard ();
  increaseImage ();
};


// функция добавления карточки
function createCard (evt) {
  evt.preventDefault();
  let card ={
  name: `${mestoNameInput.value}`,
  link: `${mestoImageInput.value}`,
  };

  createCardAdd(card);
  closePopup(popupElementAdd);

  evt.target.reset();
};


initialCards.forEach(function (item){
  createCardAdd (item);
});


// фукция поставить лайк
function activeLike () {
  const likeButton = document.querySelector('.elements__card-btn');

  likeButton.addEventListener('click', function(event) {
    event.target.classList.toggle('elements__card-btn_active');
});
};


// функция удаления карточки
function deliteCard () {

  const basketButton = document.querySelector('.elements__card-basket');

  basketButton.addEventListener('click', function (event) {
    event.target.closest('.elements__card').remove();
  });
}


// функция увеличения картинки
function increaseImage () {

  let imageElement = document.querySelector('.elements__card-image');
  let popupImgElement = document.querySelector('.popup-image');
  let bigImage = popupImgElement.querySelector('.popup-image__element');
  let popupImgText = popupImgElement.querySelector('.popup-image__text');
  let popupCloseImgButton = popupImgElement.querySelector('.popup-image__close');
  let textElement = document.querySelector('.elements__card-text');


  imageElement.addEventListener('click', function(event) {
    bigImage.src = imageElement.src;
    bigImage.alt = imageElement.alt;
    popupImgText.textContent = textElement.textContent;
    popupImgElement.classList.add('popup-image_active');
  });

  popupCloseImgButton.addEventListener('click', function() {
    popupImgElement.classList.remove('popup-image_active');
  });
};


// открытие попапа
const openPopup = function (popup) {
  popup.classList.add('popup_opened');
};


//закрытие попапа
const closePopup = function (popup) {
  popup.classList.remove('popup_opened');
};


const closePopupByClickOnOverlay = function(event) {
  if (event.target === event.currentTarget)
  closePopup(popupElement);
};


// функция сохранить edit
function handleFormSubmit (evt) {
  evt.preventDefault();
  nameUser.textContent = nameInput.value;
  jobUser.textContent = jobInput.value;
  closePopup(popupElement);
};


// кнопка открытия попапа edit
popupEditButton.addEventListener('click', function() {
  openPopup(popupElement);
  nameInput.value = nameUser.textContent;
  jobInput.value = jobUser.textContent;
});

// закрытие попапа edit
popupCloseButton.addEventListener('click', function () {
  closePopup(popupElement)
});


popupElement.addEventListener('click', closePopupByClickOnOverlay);


// отпраквка формы edit
formElement.addEventListener('submit', handleFormSubmit);


// открытие попапа add
popupAddButton.addEventListener('click', function() {
  openPopup(popupElementAdd);
});


// закрытие попапа add
popupCloseAddButton.addEventListener('click', function(){
  closePopup(popupElementAdd);
});


// отправка формы add
formAddElement.addEventListener('submit', createCard);
