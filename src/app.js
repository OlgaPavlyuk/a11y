import { TabsManual } from './components/tabs';
import { Modal } from './components/modal';
import { subscribeValidation } from './components/subscribe';
import { sortingAndFiltering } from './components/cards';

document.addEventListener('DOMContentLoaded', () => {
    sortingAndFiltering();

    // buy button
    const modal = new Modal();
    const cardButtons = document.querySelectorAll('.js-buy-card');
    cardButtons.forEach((buyButton) => {
        buyButton.addEventListener('click', (e) => modal.open(e));
    });

     // tabs
    const tabLists = document.querySelectorAll('[role=tablist]');
    tabLists.forEach((tab) => {
       new TabsManual(tab);
    });

    // subscribe form
    subscribeValidation();
});
