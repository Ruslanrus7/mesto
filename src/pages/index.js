import '../pages/index.css';
import Card from "../components/Card.js";
import FormValidator from '../components/FormValidator.js';
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopapWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
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
} from "../utils/constants.js";

function renderCard (item) {
  const card = new Card(item, templateElements, popupWithImage.open);
  const newCardElement = card.generateCard();
  cardList.addItem(newCardElement);
};

//подключает валидацию формы Add
const formValidateAdd = new FormValidator(validationList, formAddElement);
formValidateAdd.enableValidation();

// подключает фалидация формы Edit
const formValidateEdit = new FormValidator(validationList, formEditElement);
formValidateEdit.enableValidation();

// создаем класс PopupWithImage
const popupWithImage = new PopupWithImage(popupImageSelector);
popupWithImage.setEventListeners();

//создаем и добавляем карточки на страницу при загрузке
// const cardList = new Section({items: initialCards,
//   renderer: (item) => renderCard(item)}, userElementsSelector);
const cardList = new Section({items: initialCards,
  renderer: renderCard}, userElementsSelector);
cardList.renderItems();

// создаем класс UserInfo
const userInfo = new UserInfo(userInfoSelector);

// создаем класс PopupWithForm для формы редактирования профиля
const popupEdit = new PopupWithForm(popupProfileSelector, (inputValues) => {
  userInfo.setUserInfo(inputValues);
});
popupEdit.setEventListeners();

// создаем класс PopupWithForm для формы добавления карточек
// const popupAdd = new PopupWithForm(popupAddSelector, (inputValues) => {
//   renderCard(inputValues)})
const popupAdd = new PopupWithForm(popupAddSelector, renderCard)
popupAdd.setEventListeners();



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
