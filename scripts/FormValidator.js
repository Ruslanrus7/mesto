export class FormValidator {
  constructor(validationList, validationForm) {
    this._validationList = validationList;
    this._validationForm = validationForm;
    this._formSelector = validationList.formSelector;
    this._inputSelector = validationList.inputSelector;
    this._submitButtonSelector = validationList.submitButtonSelector;
    this._inactiveButtonClass = validationList.inactiveButtonClass;
    this._inputErrorClass = validationList.inputErrorClass;
    this._errorClass = validationList.errorClass;
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

  _hasInvalidInput (inputList) {
    return inputList.some(function (inputElement){
      return !inputElement.validity.valid;
    })
  };

  toggleButtonState (inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._inactiveButtonClass);
      buttonElement.setAttribute('disabled', true)
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.removeAttribute('disabled');
    }
  };

  resetErorForm () {
    this._validationForm.querySelectorAll(this._inputSelector).forEach((input) =>{
      if (!input.validity.valid){
        this._hideInputError(this._validationForm, input);
      }
    })
  };

  _setEventListeners (formElement)  {
    const inputList = Array.from(formElement.querySelectorAll(this._inputSelector));
    const buttonElement = formElement.querySelector(this._submitButtonSelector);

    this.toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity (formElement, inputElement);
        this.toggleButtonState (inputList, buttonElement);
      })
    })
  };

  enableValidation () {
    const form = this._validationForm;
    form.addEventListener('submit', function(evt) {
        evt.preventDefault();
      });

    this._setEventListeners(form);
  };
}
