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

//подключает валидацию формы Add
const formValidateAdd = new FormValidator(validationList, formAddElement);
formValidateAdd.enableValidation();

// подключает фалидация формы Edit
const formValidateEdit = new FormValidator(validationList, formEditElement);
formValidateEdit.enableValidation();

// создаем класс PopupWithImage
const popupWithImage = new PopupWithImage(popupImageSelector);
popupWithImage.setEventListeners();

// создаем и добавляем карточки на страницу при загрузке
const cardList = new Section({items: initialCards,
renderer: (item) => {
  const card = new Card(item, templateElements, popupWithImage.popupOpen);
  const newCardElement = card.generateCard();
  cardList.addItem(newCardElement);
}}, userElementsSelector);
cardList.renderItems();

// создаем класс UserInfo
const userInfo = new UserInfo(userInfoSelector);

// создаем класс PopupWithForm для формы редактирования профиля
const popupEdit = new PopupWithForm(popupProfileSelector, () => {
  userInfo.setUserInfo(popupEdit.getInputValues());
});
popupEdit.setEventListeners();

// создаем класс PopupWithForm для формы добавления карточек
const popupAdd = new PopupWithForm(popupAddSelector, () => {
  const card = new Card(popupAdd.getInputValues(), templateElements, popupWithImage.popupOpen);
  const newCardElement = card.generateCard();
  cardList.addItem(newCardElement);
})
popupAdd.setEventListeners();



// открытие попапа add
popupAddButton.addEventListener('click', function() {
  formValidateAdd.resetErorForm();
  formValidateAdd.toggleButtonState();
  popupAdd.popupOpen();
});


//кнопка открытия попапа edit
popupEditButton.addEventListener('click', function() {
  formValidateEdit.resetErorForm();
  formValidateEdit.toggleButtonState();
  popupEdit.popupOpen();
  popupEdit.setInputValues(userInfo.getUserInfo());
});
