import { isEmailValid } from './utils';

export class BuyForm {
    constructor() {
        this.form = document.querySelector('#buy-form');
        this.fields = {
            name: {
                input: this.form.querySelector('#user-name'),
                error: this.form.querySelector('#user-name-error'),
                validate: this.validateName,
            },
            email: {
                input: this.form.querySelector('#user-email'),
                error: this.form.querySelector('#user-email-error'),
                validate: this.validateEmail,
            },
            address: {
                input: this.form.querySelector('#user-address'),
                error: this.form.querySelector('#user-address-error'),
                validate: this.validateAddress,
            },
        };
        this.successMessage = this.form.querySelector('#buy_success');


        this.form.addEventListener('submit', this.onSubmit);

        Object.entries(this.fields).forEach(([key, value]) => {
            const { input, validate } = value;
            input.value = '';
            this.hideError(key);
            input.addEventListener('blur', () => {
                if (input.value) {
                    validate();
                }
            });
        });
    }

    showError = (fieldName, message) => {
        const { input, error } = this.fields[fieldName];
        error.textContent = message;
        error.classList.add('is-visible');
        error.removeAttribute('aria-hidden');
        error.setAttribute('role', 'status');
        error.setAttribute('aria-live', 'polite');
        error.setAttribute('aria-label', message);
        input.setAttribute('aria-invalid', 'true');
        input.parentNode.classList.add('invalid');
        input.setAttribute('aria-describedby', error.id);
    }

    hideError = (fieldName) => {
        const { input, error } = this.fields[fieldName];
        input.setAttribute('aria-invalid', 'false');
        input.parentNode.classList.remove('invalid');
        input.removeAttribute('aria-describedby');
        error.textContent = '';
        error.classList.remove('is-visible');
        error.setAttribute('aria-hidden', 'true');
        error.removeAttribute('aria-live');
        error.removeAttribute('role');
        error.removeAttribute('aria-label');
    }

    validateName = () => {
        const errors = {
            empty: 'Это поле обязательно для заполнения.',
            invalid: 'Введите имя И фамилию.',
        }
        const name = this.fields.name.input.value;

        if (!name) {
            this.showError('name', errors.empty);
            return false;
        }

        if (name.indexOf(' ') < 2) {
            this.showError('name', errors.invalid);
            return false;
        }

        this.hideError('name');
        return true;
    }

    validateEmail = () => {
        const errors = {
            empty: 'Это поле обязательно для заполнения.',
            invalid: 'Введите корректный адрес почты',
        }
        const email = this.fields.email.input.value;

        if (!email) {
            this.showError('email', errors.empty);
            return false;
        }

        if (isEmailValid(email)) {
            this.hideError('email');
            return true;
        } else {
            this.showError('email', errors.invalid);
            return false;
        }
    }

    validateAddress = () => {
        const errors = {
            empty: 'Это поле обязательно для заполнения.',
        }

        if (!this.fields.address.input.value) {
            this.showError('address', errors.empty);
            return false;
        } else {
            this.hideError('address');
            return true;
        }
    }

    showMessage = (element, message) => {
        element.removeAttribute('hidden');
        element.setAttribute('role', 'status');
        element.setAttribute('aria-live', 'polite');
        element.setAttribute('aria-label', message);
        element.textContent = message;
    }

    hideMessage = (element) => {
        element.setAttribute('hidden', 'true');
        element.removeAttribute('role', 'status');
        element.removeAttribute('aria-live', 'polite');
        element.removeAttribute('aria-label');
        element.textContent = '';
    }

    reset() {
        this.hideMessage(this.successMessage);
    }

    onSubmit = (e) => {
        e.preventDefault();

        let focused = null;
        const fieldsValidate =  Object.values(this.fields).map(({ input, validate}) => {
            const isValid = validate();
            if (!isValid && !focused) {
                focused = input;
            }
            return isValid;
        });

        if (focused) {
            focused.focus();
        }
        
        console.log(fieldsValidate.every((valid) => valid));
        if (fieldsValidate.every((valid) => valid)) {
            console.log('true');
            this.showMessage(this.successMessage, 'Вы успешно оформили заказ!');
        }
    };
}
