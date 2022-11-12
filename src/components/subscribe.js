import { isEmailValid } from './utils';

export function subscribeValidation() {
    const form = document.querySelector('#subscribe');
    const emailInput = form.querySelector('input#email');
    const consentInput = form.querySelector('#consent');
    const subscribeSuccess = form.querySelector('#subscribe_success');

    const formFields = {
        email: {
            field: emailInput,
            error: form.querySelector('#email-error'),
        },
        consent: {
            field: consentInput,
            error: form.querySelector('#consent-error'),
        }
    }

    const validateEmail = () => {
        const errors = {
            empty: 'Введите адрес вашей электронной почты',
            invalid: 'Введите корректный адрес почты',
        }
        const email = emailInput.value;

        if (!email) {
            showError('email', errors.empty);
            return false;
        }

        if (isEmailValid(email)) {
            hideError('email');
            return true;
        } else {
            showError('email', errors.invalid);
            return false;
        }
    };

    const validateConsent = () => {
      if (consentInput.checked) {
            hideError('consent');
        } else {
            showError('consent', 'Чтобы продолжить, Вам необходимо подтвердить согласие');
        }
      return consentInput.checked;
    };

    const showError = (fieldName, message) => {
        const { field, error } = formFields[fieldName];
        field.setAttribute('aria-invalid', 'true');
        field.setAttribute('aria-describedby', error.id);
        error.classList.add('is-visible');
        error.removeAttribute('aria-hidden');
        error.setAttribute('role', 'status');
        error.setAttribute('aria-live', 'polite');
        error.textContent = message;
    }

    const hideError = (fieldName) => {
        const { field, error } = formFields[fieldName];
        field.setAttribute('aria-invalid', 'false');
        field.removeAttribute('aria-describedby');
        error.textContent = '';
        error.classList.remove('is-visible');
        error.setAttribute('aria-hidden', 'true');
        error.removeAttribute('aria-live');
        error.removeAttribute('role');
    }

    const onEmailBlur = () => {
        if (emailInput.value) {
            validateEmail();
        }
    }

    const onCheckboxChange = () => {
        if (consentInput.checked) {
            hideError('consent');
        }
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const isEmailValid = validateEmail();
        const isConsentValid = validateConsent();

        if (!isEmailValid) {
            emailInput.focus();
        } else if (!isConsentValid) {
            consentInput.focus();
        }

        if (isEmailValid && isConsentValid) {
            subscribeSuccess.removeAttribute('hidden');
            subscribeSuccess.setAttribute('role', 'status');
            subscribeSuccess.setAttribute('aria-live', 'polite');
            subscribeSuccess.textContent = 'Вы успешно подписаны на нашу рассылку.';
        }
    };

    form.addEventListener('submit', onSubmit)
    emailInput.addEventListener('blur', onEmailBlur);
    consentInput.addEventListener('change', onCheckboxChange);
}
