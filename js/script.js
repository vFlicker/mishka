"use strict";

// --- Меню бургер ---
(function () {
  var burgerButton = document.querySelector('.main-nav__toggle');
  var elements = [];
  elements.push(document.querySelector('.main-nav__list'));
  elements.push(document.querySelector('.page-header__user-nav'));

  for (var i = 0; i < elements.length; i++) {
    elements[i].classList.remove('main-nav--nojs');
  }

  ;

  function onBurgerButtonClick() {
    for (var i = 0; i < elements.length; i++) {
      elements[i].classList.toggle('is-active');
    }

    ;
  }

  burgerButton.addEventListener('click', onBurgerButtonClick);
})(); // --- ! Меню бургера ---
// --- Пoп-ап ---


(function () {
  var modalLinks = document.querySelectorAll('.toggle-modal');
  var body = document.querySelector('body');
  var modalCloseIcon = document.querySelectorAll('.close-modal');
  var focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
  var lockPadding = document.querySelectorAll(".lock-padding");
  var timeout = 200;
  var lockPaddingValue = window.innerWidth - body.offsetWidth + 'px';
  var unlock = true;

  if (modalLinks.length > 0) {
    for (var index = 0; index < modalLinks.length; index++) {
      var modalLink = modalLinks[index];
      modalLink.addEventListener("click", function (evt) {
        var modalName = this.getAttribute('data-target');
        var curentModal = document.querySelector(modalName);
        modalOpen(curentModal);
        evt.preventDefault();
      });
    }
  }

  function onModalEscPress(evt) {
    if (evt.keyCode === 27) {
      var modalActive = document.querySelector('.modal.open');
      modalClose(modalActive);
    }
  }

  function onModalOutsideClick(evt) {
    if (!evt.target.closest('.modal__content')) {
      modalClose(evt.target.closest('.modal'));
    }
  }

  function onModalTabClick(evt) {
    var isTabPressed = evt.key === 'Tab' || evt.keyCode === 9;
    var firstFocusableElement = this.querySelectorAll(focusableElements)[0];
    var focusableContent = this.querySelectorAll(focusableElements);
    var lastFocusableElement = focusableContent[focusableContent.length - 1];

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
      var modalActive = document.querySelector('.modal.open');

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
    for (var _index = 0; _index < modalCloseIcon.length; _index++) {
      var el = modalCloseIcon[_index];
      el.addEventListener('click', function (evt) {
        modalClose(el.closest('.modal'));
        evt.preventDefault();
      });
    }
  }

  function modalClose(modalActive) {
    var doUnlock = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

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
      for (var _index2 = 0; _index2 < lockPadding.length; _index2++) {
        var _el = lockPadding[_index2];
        _el.style.paddingRight = lockPaddingValue;
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
        for (var _index3 = 0; _index3 < lockPadding.length; _index3++) {
          var _el2 = lockPadding[_index3];
          _el2.style.paddingRight = '0px';
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
          if (node.matches(css)) return node;else node = node.parentElement;
        }

        return null;
      };
    }
  })();

  (function () {
    // проверяем поддержку
    if (!Element.prototype.matches) {
      // определяем свойство
      Element.prototype.matches = Element.prototype.matchesSelector || Element.prototype.webkitMatchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector;
    }
  })();
})(); // --- !Пoп-ап ---