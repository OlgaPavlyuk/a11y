import { Select } from './combobox';

const sortingCatalog = (items, currentValue) => {
    switch (currentValue) {
        case 'sorting-price-up':
            return [...items]
              .sort((a, b) => {
                  return a.dataset.price > b.dataset.price ? 1 : -1
              })
        case 'sorting-popular':
            return [...items]
              .sort((a, b) => {
                  return a.dataset.popular > b.dataset.popular ? 1 : -1
              })
        case 'sorting-price-down':
            return [...items]
              .sort((a, b) => {
                  return a.dataset.price < b.dataset.price ? 1 : -1
              })
        case 'no-sorting':
        default:
            return [...items]
              .sort((a, b) => {
                  return a.dataset.key > b.dataset.key ? 1 : -1
              })
    }
}

const filteringCards = (items, currentValue) => {
    return items
              .filter((item) => item.dataset.category === currentValue)
}

export const sortingAndFiltering = () => {
    const catalog = document.querySelector('.catalog');
    const cards = document.querySelectorAll('.card');
    const filterStatus = document.querySelector('#filter-status');
    const sortingStatus = document.querySelector('#sorting-status');
    let currentItems = [...cards];
    let currentSorting = 'no-sorting';
    let currentFilter = 'no-filter';

    const renderCards = (reset) => {
        if (!currentItems.length) {
            catalog.innerHTML = 'Ничего не найдено. Попробуйте изменить параметры фильтра.';
            return;
        }
        if (reset) {
            catalog.innerHTML = '';
        }
        currentItems.forEach(card => catalog.appendChild(card));
    }

    const sortingCallback = (sorting, sortingName) => {
        if (currentSorting === sorting) {
            return;
        }
        currentItems = sortingCatalog(currentItems, sorting);
        currentSorting = sorting;
        sortingStatus.innerHTML = `Применена сортировка: ${sortingName}`;
        renderCards();
    }

    const filteringCallback = (filter) => {
        if (currentFilter === filter) {
            return;
        }
        currentFilter = filter;
        if (filter === 'no-filter') {
            currentItems = sortingCatalog([...cards], currentSorting);
        } else {
            currentItems = filteringCards(sortingCatalog([...cards], currentSorting), filter);
        }
        filterStatus.innerHTML = `Показано ${currentItems.length} товаров из ${cards.length}`;
        renderCards(true);
    }

    new Select(document.querySelector('.js-filter'), filteringCallback);
    new Select(document.querySelector('.js-sorting'), sortingCallback);
}
