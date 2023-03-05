const popupElement = document.querySelector('.popup');
const popupEditButton = document.querySelector('.profile__info-button');
const popupCloseButton = popupElement.querySelector('.popup__close');


const openPopup = function () {
  popupElement.classList.add('popup_opened');
}

const closePopup = function () {
  popupElement.classList.remove('popup_opened');

}


const closePopupByClickOnOverlay = function(event) {
  if (event.target === event.currentTarget)
  closePopup();
}


popupEditButton.addEventListener('click', openPopup)


popupCloseButton.addEventListener('click', closePopup);


popupElement.addEventListener('click', closePopupByClickOnOverlay);


const formElement = popupElement.querySelector('.popup__form');
let nameInput = formElement.querySelector('.popup__form-name');
let jobInput = formElement.querySelector('.popup__form-job');
let nameUser = document.querySelector('.profile__info-name');
let jobUser = document.querySelector('.profile__info-text');
const formButton = popupElement.querySelector('.popup__form-btn');

nameInput.value = nameUser.textContent;
jobInput.value = jobUser.textContent;

function handleFormSubmit (evt) {
  evt.preventDefault();
  nameUser.textContent = nameInput.value;
  jobUser.textContent = jobInput.value;
  closePopup();
}

formButton.addEventListener('click', handleFormSubmit);
