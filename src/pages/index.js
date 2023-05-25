import '../pages/index.css';
import Card from "../components/Card.js";
import FormValidator from '../components/FormValidator.js';
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopapWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopapWithSubmit from "../components/PopapWithSubmit.js";
import Api from "../components/Api.js";
import UserInfo from "../components/UserInfo.js";
import {
  initialCards,
  userInfoSelector,
  validationList,
  templateElements,
  popupAddButton,
  popupEditButton,
  popupAddSelector,
  popupProfileSelector,
  userElementsSelector,
  popupImageSelector,
  formEditElement,
  formAddElement,
  popupAvatarSelector,
  popupAvatarButton,
  formAvatarElement,
  avatarElement,
  popupDeleteSelector,
} from "../utils/constants.js";

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-66',
  headers: {
    authorization: 'aabb8cb9-744a-41fd-bed2-9e4f12eba50f',
    'Content-Type': 'application/json'
  }
})

api.getUserInfo()
.then(res => {
  userInfo.setUserInfo(res);
})


function renderCard (item) {
  const card = new Card(item, templateElements, popupWithImage.open);
  const newCardElement = card.generateCard();
  section.addItem(newCardElement);
};

//подключает валидацию формы Add
const formValidateAdd = new FormValidator(validationList, formAddElement);
formValidateAdd.enableValidation();

// подключает валидацию формы Edit
const formValidateEdit = new FormValidator(validationList, formEditElement);
formValidateEdit.enableValidation();

// подключает валидацию формы Avatar
const formValidateAvatar = new FormValidator(validationList, formAvatarElement);
formValidateAvatar.enableValidation();

// создаем класс PopupWithImage
const popupWithImage = new PopupWithImage(popupImageSelector);
popupWithImage.setEventListeners();

// //создаем и добавляем карточки на страницу при загрузке
// const cardList = new Section({items: initialCards,
//   renderer: renderCard}, userElementsSelector);
// cardList.renderItems();

const section = new Section({renderer: renderCard}, userElementsSelector);

api.getInitialCards().then(res => {
  console.log(res)
  section.renderItems(res);
})


// создаем класс UserInfo
const userInfo = new UserInfo(userInfoSelector);

// создаем класс PopupWithForm для формы редактирования профиля
// const popupEdit = new PopupWithForm(popupProfileSelector, (inputValues) => {
//   userInfo.setUserInfo(inputValues);
// });
// popupEdit.setEventListeners();

const popupEdit = new PopupWithForm(popupProfileSelector, (inputValues) => {
  api.patchUserInfo(inputValues)
  .then(res => {
    console.log(res)
    userInfo.setUserInfo(res);
  })
});
popupEdit.setEventListeners();

// создаем класс PopapWithForm для формы редактирования аватарки
const popupAvatar = new PopupWithForm(popupAvatarSelector, (input)=>{
  console.log(input)
  api.patchUserAvatar(input)
  .then(res => {
    console.log(res)
    userInfo.setUserInfo(res);
  })
})
popupAvatar.setEventListeners();

// создаем класс PopupWithForm для формы добавления карточек
// const popupAdd = new PopupWithForm(popupAddSelector, renderCard)
// popupAdd.setEventListeners();
const popupAdd = new PopupWithForm(popupAddSelector, (card) => {
  api.createCard(card)
  .then(res => {
    renderCard(res);
  })
})
popupAdd.setEventListeners();

// const popupDelete = new PopapWithSubmit(popupDeleteSelector, ()=>{})
// popupDelete.setEventListeners();


// открытие попапа add
popupAddButton.addEventListener('click', function() {
  formValidateAdd.resetErorForm();
  formValidateAdd.toggleButtonState();
  popupAdd.open();
});


//кнопка открытия попапа edit
popupEditButton.addEventListener('click', function() {
  formValidateEdit.resetErorForm();
  formValidateEdit.toggleButtonState();
  popupEdit.open();
  popupEdit.setInputValues(userInfo.getUserInfo());
});

// кнопка открытие попапа avatar
popupAvatarButton.addEventListener('click', function() {
  formValidateAvatar.resetErorForm();
  formValidateAvatar.toggleButtonState();
  popupAvatar.open();
})


