class App {
  init() {
    this.initMobileMenu();
    this.initRange();
    this.initSliderReview();
    this.showHide()
    this.modal()
  }

  constructor() {
  }

  initMobileMenu() {
    const navMain = document.querySelector('.main-nav');
    const navToggle = document.querySelector('.main-nav__toggle');
    const navButtonText = document.querySelector('.main-nav__open-btn-text');

    const initJS = () => {
      navMain.classList.remove('main-nav--nojs');
    }

    const closeOpen = () => {
      navToggle.addEventListener('click', function () {
        if (navMain.classList.contains('main-nav--closed')) {
          navMain.classList.remove('main-nav--closed');
          navMain.classList.add('main-nav--opened');
          navButtonText.classList.add('visually-hidden');
        } else {
          navMain.classList.add('main-nav--closed');
          navMain.classList.remove('main-nav--opened');
        }
      });
    }

    const linksClick = () => {
      const mainNav = document.querySelector('.main-nav');
      const links = mainNav.querySelectorAll('a');

      const navLinckHandleClick = () => {
        navMain.classList.add('main-nav--closed');
        navMain.classList.remove('main-nav--opened');
      }

      links.forEach(link => {
        link.addEventListener('click', navLinckHandleClick)
      })
    }

    initJS();
    closeOpen();
    linksClick();
  }

  initRange() {
    function getMonthWord(number) {
      const lastDigit = number % 10;
      const lastTwoDigits = number % 100;

      if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
        return "месяцев";
      }

      switch (lastDigit) {
        case 1:
          return "месяц";
        case 2:
        case 3:
        case 4:
          return "месяца";
        default:
          return "месяцев";
      }
    }
    $(function () {
      $(".js-range-slider").ionRangeSlider({
        skin: "round",
        hide_min_max: false,
        hide_from_to: true,
        min: 250,
        max: 10000,
        from: 5000,
        postfix: " $",
        grid: false,
        onStart: function (data) {
          $("#calcResult").text('$ ' + data.from.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "));
        },
        onChange: function (data) {
          $("#profitValue").text('$ ' + Math.round((data.from * 0.32) + data.from).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "));
          $("#calcResult").text('$ ' + data.from.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "));
        },
      });
    });
    $(function () {
      $(".js-range-slider2").ionRangeSlider({
        skin: "round",
        hide_min_max: false,
        hide_from_to: true,
        min: 1,
        max: 12,
        from: 4,
        postfix: " месяц",
        grid: false,
        onStart: function () {
          setTimeout(function () {
            const slider = document.querySelector(".js-irs-1");
            if (slider) {
              const max = slider.querySelector(".irs-max");
              if (max) {
                max.textContent = "12 месяцев";
              }
            }
          }, 100);
        },
        onChange: function (data) {
          const monthWord = getMonthWord(data.from);
          $("#calcResult2").text(data.from.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + ' ' + monthWord);

          const summValue = document.querySelector('#profitValue');
          const value = summValue.textContent.replace('$', '').trim().replace(/ /g, '');
          summValue.textContent = `$ ${Math.round(Number(value * 1.02).toFixed(1)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}`;
        },
      });
    });
  }

  initSliderReview() {
    $(function () {
      const $slider = $('#slider-review');

      $slider.slick({
        arrows: true,
        slidesToShow: 4,
        variableWidth: true,
        centerMode: false,
        dots: false,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 2,
              variableWidth: true,
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              variableWidth: true,
            }
          },
        ]
      });

      $slider.on('wheel', function (event) {
        if (event.originalEvent.shiftKey || Math.abs(event.originalEvent.deltaX) > 0) {
          event.preventDefault();
          const $slickList = $(this).find('.slick-list');
          $slickList.scrollLeft($slickList.scrollLeft() + event.originalEvent.deltaY + event.originalEvent.deltaX);
        }
      });
    });
  }

  showHide() {
    document.querySelectorAll('.faq__container').forEach(container => {
      const button = container.querySelector('.faq__toggle-btn');
      const content = container.querySelector('.faq__dropdown-content');

      button.addEventListener('click', function () {
        content.classList.toggle('show');
        button.classList.toggle('show');
      });
    });
  }

  modal() {
    const buttons = document.querySelectorAll('[aria-label="openModal"]');
    const modal = document.querySelector('.modal');
    const closeBtn = modal.querySelector('.modal__close-btn');

    buttons.forEach(button => {
      button.addEventListener('click', () => {
        modal.classList.add('active');
      });
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
      }
    });

    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        modal.classList.remove('active');
      }
    });
  }
}

const app = new App();
document.addEventListener('DOMContentLoaded', app.init());
