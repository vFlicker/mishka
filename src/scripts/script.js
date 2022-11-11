// --- Меню бургер ---
(function () {
    let burgerButton = document.querySelector('.main-nav__toggle');
    let elements = [];
    elements.push(document.querySelector('.main-nav__list'));
    elements.push(document.querySelector('.page-header__user-nav'));

    for (var i = 0; i < elements.length; i++) {
        elements[i].classList.remove('main-nav--nojs');
    };

    function onBurgerButtonClick() {
        for (var i = 0; i < elements.length; i++) {
            elements[i].classList.toggle('is-active');
        };
    }

    burgerButton.addEventListener('click', onBurgerButtonClick);
})();



// --- Пoп-ап ---
(function () {
    const modalLinks = document.querySelectorAll('.toggle-modal');
    const body = document.querySelector('body');
    const modalCloseIcon = document.querySelectorAll('.close-modal');
    const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const lockPadding = document.querySelectorAll(".lock-padding");
    const timeout = 200;
    let lockPaddingValue = window.innerWidth - body.offsetWidth + 'px';
    let unlock = true;

    if (modalLinks.length > 0) {
        for (let index = 0; index < modalLinks.length; index++) {
            const modalLink = modalLinks[index];
            modalLink.addEventListener("click", function (evt) {
                const modalName = this.getAttribute('data-target');
                const curentModal = document.querySelector(modalName);
                modalOpen(curentModal);
                evt.preventDefault();
            });
        }
    }

    function onModalEscPress(evt) {
        if (evt.keyCode === 27) {
            const modalActive = document.querySelector('.modal.open');
            modalClose(modalActive);
        }
    }

    function onModalOutsideClick(evt) {
        if (!evt.target.closest('.modal__content')) {
            modalClose(evt.target.closest('.modal'));
        }
    }

    function onModalTabClick(evt) {
        let isTabPressed = evt.key === 'Tab' || evt.keyCode === 9;
        const firstFocusableElement = this.querySelectorAll(focusableElements)[0];
        const focusableContent = this.querySelectorAll(focusableElements);
        const lastFocusableElement = focusableContent[focusableContent.length - 1];

        if (!isTabPressed) {
            return;
        }

        if (evt.shiftKey) {
            if (document.activeElement === firstFocusableElement) {
                console.log(firstFocusableElement);
                lastFocusableElement.focus();
                evt.preventDefault();
            }
        } else {
            if (document.activeElement === lastFocusableElement) {
                firstFocusableElement.focus();
                evt.preventDefault();
            }
        }
    }

    function modalOpen(curentModal) {
        var firstFocusableElement = curentModal.querySelectorAll(focusableElements)[0];

        if (curentModal && unlock) {
            const modalActive = document.querySelector('.modal.open');
            if (modalActive) {
                modalClose(modalActive, false);
            } else {
                bodyLock();
            }
            curentModal.classList.add('open');
            curentModal.addEventListener("click", onModalOutsideClick);
            document.addEventListener('keydown', onModalEscPress);
            curentModal.addEventListener('keydown', onModalTabClick);

            setTimeout(function () {
                firstFocusableElement.focus();
                firstFocusableElement.blur();
            }, timeout);
        }
    }

    if (modalCloseIcon.length > 0) {
        for (let index = 0; index < modalCloseIcon.length; index++) {
            var el = modalCloseIcon[index];
            el.addEventListener('click', function (evt) {
                modalClose(el.closest('.modal'));
                evt.preventDefault();
            });
        }
    }

    function modalClose(modalActive, doUnlock = true) {
        if (unlock) {
            modalActive.classList.remove('open');
            modalActive.removeEventListener("click", onModalOutsideClick);
            document.removeEventListener('keydown', onModalEscPress);
            if (doUnlock) {
                bodyUnLock();
            }
        }
    }

    function bodyLock() {
        /* Для фикса фиксированной шапки */
        if (lockPadding.length > 0) {
            for (let index = 0; index < lockPadding.length; index++) {
                const el = lockPadding[index];
                el.style.paddingRight = lockPaddingValue;
            }
        }
        body.style.paddingRight = lockPaddingValue;
        body.classList.add('lock');

        unlock = false;
        setTimeout(function () {
            unlock = true;
        }, timeout);
    }

    function bodyUnLock() {
        setTimeout(function () {
            if (lockPadding.length > 0) {
                for (let index = 0; index < lockPadding.length; index++) {
                    const el = lockPadding[index];
                    el.style.paddingRight = '0px';
                }
            }
            body.style.paddingRight = '0px';
            body.classList.remove('lock');
        }, timeout);

        unlock = false;
        setTimeout(function () {
            unlock = true;
        }, timeout);
    }

    (function () {
        // проверяем поддержку
        if (!Element.prototype.closest) {
            // реализуем
            Element.prototype.closest = function (css) {
                var node = this;
                while (node) {
                    if (node.matches(css)) return node;
                    else node = node.parentElement;
                }
                return null;
            };
        }
    })();

    (function () {
        // проверяем поддержку
        if (!Element.prototype.matches) {
            // определяем свойство
            Element.prototype.matches = Element.prototype.matchesSelector ||
                Element.prototype.webkitMatchesSelector ||
                Element.prototype.mozMatchesSelector ||
                Element.prototype.msMatchesSelector;
        }
    })();

})();



