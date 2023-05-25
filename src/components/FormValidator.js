export default class FormValidator {
  constructor(validationList, validationForm) {
    this._validationList = validationList;
    this._validationForm = validationForm;
    this._inputSelector = validationList.inputSelector;
    this._submitButtonSelector = validationList.submitButtonSelector;
    this._inactiveButtonClass = validationList.inactiveButtonClass;
    this._inputErrorClass = validationList.inputErrorClass;
    this._errorClass = validationList.errorClass;
    this._inputList = this._validationForm.querySelectorAll(this._inputSelector);
  }

  _showInputError (formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  };

  _hideInputError (formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  };

  _checkInputValidity (formElement, inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, inputElement.validationMessage)
    } else {
      this._hideInputError (formElement, inputElement);
    }
  };

  _hasInvalidInput () {
    return Array.from(this._inputList).some(function (inputElement){
      return !inputElement.validity.valid;
    })
  };

  toggleButtonState () {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.setAttribute('disabled', true)
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.removeAttribute('disabled');
    }
  };

  resetErorForm () {
    this._inputList.forEach((input) =>{
      if (!input.validity.valid){
        this._hideInputError(this._validationForm, input);
      }
    })
  };

  _setEventListeners ()  {
    this._buttonElement = this._validationForm.querySelector(this._submitButtonSelector);

    this.toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity (this._validationForm, inputElement);
        this.toggleButtonState ();
      })
    })
  };

  enableValidation () {
    this._validationForm.addEventListener('submit', function(evt) {
        evt.preventDefault();
      });

    this._setEventListeners();
  };
}
