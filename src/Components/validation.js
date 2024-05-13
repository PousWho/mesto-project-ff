//Валидация форм
const form = document.querySelector('.popup__form');
const submitButton = document.querySelector('.popup__button');
const nameError = document.getElementById('name-error');
const descriptionError = document.getElementById('description-error');

    form.addEventListener('input', function(event) {
      if (event.target === nameInputTitle || event.target === descriptionInput) {
        validateInput(event.target);
      }

      if (nameInputTitle.validity.valid && descriptionInput.validity.valid) {
        submitButton.classList.add('popup__button')
        submitButton.classList.remove('button-disabled');
        submitButton.removeAttribute('disabled');
      } else {
        submitButton.classList.remove('popup__button')
        submitButton.classList.add('button-disabled');
        submitButton.setAttribute('disabled', true);
      }
    });

    function validateInput(input) {
      if (!input.validity.valid) {
        if (input === nameInputTitle) {
          if (input.validity.valueMissing) {
            nameError.textContent = 'Поле "Имя" обязательно для заполнения.';
          } else if (input.validity.tooShort || input.validity.tooLong) {
            nameError.textContent = 'Имя должно содержать от 2 до 40 символов.';
          } else if (input.validity.patternMismatch) {
            nameError.textContent = 'Имя может содержать только латинские и кириллические буквы, знаки дефиса и пробелы.';
          }
        } else if (input === descriptionInput) {
          if (input.validity.valueMissing) {
            descriptionError.textContent = 'Поле "О себе" обязательно для заполнения.';
          } else if (input.validity.tooShort || input.validity.tooLong) {
            descriptionError.textContent = 'Описание должно содержать от 2 до 200 символов.';
          } else if (input.validity.patternMismatch) {
            descriptionError.textContent = 'Описание может содержать только латинские и кириллические буквы, знаки дефиса и пробелы.';
          }
        }
      } else {
        if (input === nameInputTitle) {
          nameError.textContent = '';
        } else if (input === descriptionInput) {
          descriptionError.textContent = '';
        }
      }
    }