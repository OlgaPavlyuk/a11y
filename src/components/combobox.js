const SelectActions = {
  Close: 0,
  CloseSelect: 1,
  First: 2,
  Last: 3,
  Next: 4,
  Open: 5,
  PageDown: 6,
  PageUp: 7,
  Previous: 8,
  Select: 9,
  Type: 10,
};

function getActionFromKey(event, menuOpen) {
  const { key, altKey, ctrlKey, metaKey } = event;
  const openKeys = ['ArrowDown', 'ArrowUp', 'Enter', ' '];
  if (!menuOpen && openKeys.includes(key)) {
    return SelectActions.Open;
  }

  if (key === 'Home') {
    return SelectActions.First;
  }
  if (key === 'End') {
    return SelectActions.Last;
  }

  if (
    key === 'Backspace' ||
    key === 'Clear' ||
    (key.length === 1 && key !== ' ' && !altKey && !ctrlKey && !metaKey)
  ) {
    return SelectActions.Type;
  }

  if (menuOpen) {
    if (key === 'ArrowUp' && altKey) {
      return SelectActions.CloseSelect;
    } else if (key === 'ArrowDown' && !altKey) {
      return SelectActions.Next;
    } else if (key === 'ArrowUp') {
      return SelectActions.Previous;
    } else if (key === 'PageUp') {
      return SelectActions.PageUp;
    } else if (key === 'PageDown') {
      return SelectActions.PageDown;
    } else if (key === 'Escape') {
      return SelectActions.Close;
    } else if (key === 'Enter' || key === ' ') {
      return SelectActions.CloseSelect;
    }
  }
}

function filterOptions(options = [], filter, exclude = []) {
  return options.filter((option) => {
    const matches = option.toLowerCase().indexOf(filter.toLowerCase()) === 0;
    return matches && exclude.indexOf(option) < 0;
  });
}

function getIndexByLetter(options, filter, startIndex = 0) {
  const orderedOptions = [
    ...options.slice(startIndex),
    ...options.slice(0, startIndex),
  ];
  const firstMatch = filterOptions(orderedOptions, filter)[0];
  const allSameLetter = (array) => array.every((letter) => letter === array[0]);

  if (firstMatch) {
    return options.indexOf(firstMatch);
  }

  else if (allSameLetter(filter.split(''))) {
    const matches = filterOptions(orderedOptions, filter[0]);
    return options.indexOf(matches[0]);
  }

  else {
    return -1;
  }
}

function getUpdatedIndex(currentIndex, maxIndex, action) {
  const pageSize = 10;

  switch (action) {
    case SelectActions.First:
      return 0;
    case SelectActions.Last:
      return maxIndex;
    case SelectActions.Previous:
      return Math.max(0, currentIndex - 1);
    case SelectActions.Next:
      return Math.min(maxIndex, currentIndex + 1);
    case SelectActions.PageUp:
      return Math.max(0, currentIndex - pageSize);
    case SelectActions.PageDown:
      return Math.min(maxIndex, currentIndex + pageSize);
    default:
      return currentIndex;
  }
}

function isElementInView(element) {
  const bounding = element.getBoundingClientRect();

  return (
    bounding.top >= 0 &&
    bounding.left >= 0 &&
    bounding.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    bounding.right <=
      (window.innerWidth || document.documentElement.clientWidth)
  );
}

function isScrollable(element) {
  return element && element.clientHeight < element.scrollHeight;
}

function maintainScrollVisibility(activeElement, scrollParent) {
  const { offsetHeight, offsetTop } = activeElement;
  const { offsetHeight: parentOffsetHeight, scrollTop } = scrollParent;

  const isAbove = offsetTop < scrollTop;
  const isBelow = offsetTop + offsetHeight > scrollTop + parentOffsetHeight;

  if (isAbove) {
    scrollParent.scrollTo(0, offsetTop);
  } else if (isBelow) {
    scrollParent.scrollTo(0, offsetTop - parentOffsetHeight + offsetHeight);
  }
}

function findSelectedOption(options) {
    return [...options].findIndex((item) => item.getAttribute('aria-selected') === 'true');
}

export class Select {
    constructor(el, onChangeCallback) {
        this.el = el;
        this.combobox = this.el.querySelector('[role=combobox]');
        this.listbox = this.el.querySelector('[role=listbox]');
        this.options = this.listbox.querySelectorAll('[role="option"]');
        this.optionsValues = Array.from(this.options).map(option => option.textContent)
        this.onChangeCallback = onChangeCallback;

        this.activeIndex = findSelectedOption(this.options);
        this.open = false;
        this.searchString = '';
        this.searchTimeout = null;

        if (this.el && this.combobox && this.listbox) {
            this.combobox.addEventListener('blur', this.onComboBlur);
            this.combobox.addEventListener('click', this.onComboClick);
            this.combobox.addEventListener('keydown', this.onComboKeyDown);
        }

        this.options.forEach((option, index) => {
            option.addEventListener('click', (event) => {
                event.stopPropagation();
                this.onOptionClick(index);
            });
            option.addEventListener('mousedown', this.onOptionMouseDown);
        });
    }

    updateMenuState = (open, callFocus = true) => {
        this.open = open;
        this.combobox.setAttribute('aria-expanded', `${open}`);
        open ? this.el.classList.add('open') : this.el.classList.remove('open');

        const activeID = open ? this.options[this.activeIndex].id : '';
        if (activeID) {
            this.combobox.setAttribute('aria-activedescendant', activeID);
        } else {
            this.combobox.removeAttribute('aria-activedescendant');
        }


        if (activeID === '' && !isElementInView(this.combobox)) {
            this.combobox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }

        if (!open) {
            this.onChangeCallback(this.options[this.activeIndex].id, this.options[this.activeIndex].textContent);
            this.combobox.removeAttribute('aria-activedescendant');
        }

        callFocus && this.combobox.focus();
    }

    selectOption = (index) => {
        this.activeIndex = index;

        this.combobox.innerHTML = this.options[index].textContent;

        [...this.options].forEach((optionEl) => {
            optionEl.setAttribute('aria-selected', 'false');
        });
        this.options[index].setAttribute('aria-selected', 'true');
    }

    getSearchString = (char) => {
        if (typeof this.searchTimeout === 'number') {
            window.clearTimeout(this.searchTimeout);
        }

        this.searchTimeout = window.setTimeout(() => {
            this.searchString = '';
        }, 500);

        this.searchString += char;
        return this.searchString;
    };

    onComboClick = () => {
        this.updateMenuState(!this.open, false);
    }

    onComboBlur = () => {
        if (this.ignoreBlur) {
            this.ignoreBlur = false;
            return;
        }
        if (this.open) {
            this.selectOption(this.activeIndex);
            this.updateMenuState(false, false);
        }
    }

    onComboKeyDown = (event) => {
        const { key } = event;
        const max = this.options.length - 1;
        const action = getActionFromKey(event, this.open);

        switch (action) {
            case SelectActions.Last:
            case SelectActions.First:
                this.updateMenuState(true);
            // intentional fallthrough
            case SelectActions.Next:
            case SelectActions.Previous:
            case SelectActions.PageUp:
            case SelectActions.PageDown:
                event.preventDefault();
                return this.onOptionChange(
                    getUpdatedIndex(this.activeIndex, max, action)
                );
            case SelectActions.CloseSelect:
                event.preventDefault();
                this.selectOption(this.activeIndex);
            // intentional fallthrough
            case SelectActions.Close:
                event.preventDefault();
                return this.updateMenuState(false);
            case SelectActions.Type:
                return this.onComboType(key);
            case SelectActions.Open:
                event.preventDefault();
                return this.updateMenuState(true);
        }
    }

    onComboType = (letter) => {
        this.updateMenuState(true);

        const searchString = this.getSearchString(letter);
        const searchIndex = getIndexByLetter(
            this.optionsValues,
            searchString,
            this.activeIndex + 1
        );

        if (searchIndex >= 0) {
            this.onOptionChange(searchIndex);
        } else {
            window.clearTimeout(this.searchTimeout);
            this.searchString = '';
        }
    };

    onOptionChange = function (index) {
        this.activeIndex = index;

        this.combobox.setAttribute('aria-activedescendant', this.options[index].id);
        this.combobox.setAttribute('data-value', this.options[index].id);

        [...this.options].forEach((option) => {
            option.classList.remove('option-current');
        });
        this.options[index].classList.add('option-current');

        if (isScrollable(this.listbox)) {
            maintainScrollVisibility(this.options[index], this.listbox);
        }

        if (!isElementInView(this.options[index])) {
            this.options[index].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    };

    onOptionClick = (index) => {
      this.onOptionChange(index);
      this.selectOption(index);
      this.updateMenuState(false);
    };

    onOptionMouseDown = () => {
        this.ignoreBlur = true;
    };
}