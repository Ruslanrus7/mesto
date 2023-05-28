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
  popupDeleteSelector,
} from "../utils/constants.js";

// создаем объект из класса Апи
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-66',
  headers: {
    authorization: 'aabb8cb9-744a-41fd-bed2-9e4f12eba50f',
    'Content-Type': 'application/json'
  }
});

// создаем объект из класса PopapWithSubmit
const popupDelete = new PopapWithSubmit(popupDeleteSelector, (card, cardId)=>{
  popupDelete.renderLoading(true)
  api.deleteCard(cardId)
  .then(() => {
  card.handleDeleteCard();
  popupDelete.close();
  })
  .catch(err => {
    console.log(`Ошибка: ${err}`);
  })
  .finally(() => {
    popupDelete.renderLoading(false);
  })
});
popupDelete.setEventListeners();

function renderCard (item) {
  const card = new Card(item, templateElements, popupWithImage.open, popupDelete.open,

    (likeElement, cardId) => {
    if(likeElement.classList.contains('elements__card-btn_active')) {
      api.deleteLike(cardId)
      .then(res => {
        card.handleToggleLike(res.likes.length);
      })
      .catch(err => {
        console.log(`Ошибка: ${err}`);
      })
    } else {
      api.likeCard(cardId)
      .then(res => {
        card.handleToggleLike(res.likes.length);
      })
      .catch(err => {
        console.log(`Ошибка: ${err}`);
      })
    }}
    );

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

// создаем объект из класса PopupWithImage
const popupWithImage = new PopupWithImage(popupImageSelector);
popupWithImage.setEventListeners();

// создаем объект из класса Section
const section = new Section({renderer: renderCard}, userElementsSelector);

// создаем объект из класса UserInfo
const userInfo = new UserInfo(userInfoSelector);

// создаем объект из класса PopupWithForm для формы редактирования профиля
const popupEdit = new PopupWithForm(popupProfileSelector, (inputValues) => {
  popupEdit.renderLoading(true);
  api.patchUserInfo(inputValues)
  .then(res => {
    userInfo.setUserInfo(res);
    popupEdit.close();
  })
  .catch(err => {
    console.log(`Ошибка: ${err}`);
  })
  .finally(() => popupEdit.renderLoading(false));
});
popupEdit.setEventListeners();

// создаем объект из класса PopapWithForm для формы редактирования аватарки
const popupAvatar = new PopupWithForm(popupAvatarSelector, (input)=>{
  popupAvatar.renderLoading(true);
  api.patchUserAvatar(input)
  .then(res => {
    userInfo.setUserInfo(res);
    popupAvatar.close();
  })
  .catch(err => {
    console.log(`Ошибка: ${err}`);
  })
  .finally(() => popupAvatar.renderLoading(false));
})
popupAvatar.setEventListeners();

// создаем объект из класса PopupWithForm для формы добавления карточек
const popupAdd = new PopupWithForm(popupAddSelector, (card) => {
  popupAdd.renderLoading(true);
  api.createCard(card)
  .then((res) => {
    res.myId = res.owner._id;
    renderCard(res);
    popupAdd.close();
  })
  .catch(err => {
    console.log(`Ошибка: ${err}`);
  })
  .finally(() => popupAdd.renderLoading(false));
})
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

// кнопка открытие попапа avatar
popupAvatarButton.addEventListener('click', function() {
  formValidateAvatar.resetErorForm();
  formValidateAvatar.toggleButtonState();
  popupAvatar.open();
})

// получаем информацию о пользователе и карточках
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([dataUserInfo, dataInitialCards]) => {
    dataInitialCards.forEach(card => {
      card.myId = dataUserInfo._id;
    })

    userInfo.setUserInfo(dataUserInfo);
    section.renderItems(dataInitialCards);
  }
)
.catch(err => {
  console.log(`Ошибка: ${err}`);
})

