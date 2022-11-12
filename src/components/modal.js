import { createFocusTrap } from 'focus-trap';
import { BuyForm } from './buyForm';

export class Modal {
    constructor() {
        this.modal = document.querySelector('.dialogs');
        this.title = this.modal.querySelector('#product-name');
        this.backdrop = this.modal.querySelector('.js-backdrop');
        this.dialog = this.modal.querySelector('[aria-modal="true"]');
        this.closeBtn = this.modal.querySelector('.js-close');
        this.form = null;

        this.focusTrap = createFocusTrap('[aria-modal="true"]', {
            initialFocus: '.js-close',
            onDeactivate: () => {
                this.backdrop.classList.remove('active');
                document.body.classList.remove('has-modal');
                this.dialog.classList.add('hidden');
            }
        });
        this.closeBtn.addEventListener('click', this.close);
    }

    open = (element) => {
        this.title.textContent = element.currentTarget.dataset.productName;
        this.backdrop.classList.add('active');
        document.body.classList.add('has-modal');
        this.dialog.classList.remove('hidden');
        this.focusTrap.activate();
        this.form = new BuyForm();
    }

    close = () => {
        this.form.reset();
        this.focusTrap.deactivate();
    }
}