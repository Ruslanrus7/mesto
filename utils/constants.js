import karachaevsk from '../images/karachaevsk.jpg';
import elbrus from '../images/elbrus.jpg';
import dombay from  '../images/dombay.jpg';
import altai from '../images/Altai.jpg';

export const initialCards = [
  {
    title: 'Карачаевск',
    link: karachaevsk
  },

  {
    title: 'Гора Эльбрус',
    link: elbrus
  },

  {
    title: 'Домбай',
    link: dombay
  },

  {
    title: 'Гора Эльбрус',
    link: elbrus
  },

  {
    title: 'Карачаево-Черкессия',
    link: karachaevsk
  },

  {
    title: 'Алтай',
    link: altai
  },
];

export const userInfoSelector = {
  nameUser: ".profile__info-name",
  infoUser: ".profile__info-text",
}

export const validationList = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__form-btn',
  inactiveButtonClass: 'popup__form-btn_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}

export const templateElements = document.querySelector('#template-elements');
export const popupAddButton = document.querySelector('.profile__button');
export const popupEditButton = document.querySelector('.profile__info-button');
export const popupAddSelector = '.popup_form_add';
export const popupProfileSelector = '.popup_form_edit';
export const userElementsSelector = '.elements';
export const popupImageSelector = '.popup-image';
export const formEditElement = document.querySelector('.popup__form_type_edit');
export const formAddElement = document.querySelector('.popup__form_type_add');
