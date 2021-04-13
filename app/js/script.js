// window.addEventListener('DOMContentLoaded', main);

$(document).ready(function () {
  var burger = $('.header__burger');
  var menu = $('.header__nav');
  var mobileHeight = 0;

  function toogleClasses() {
    mobileHeight = 75;
    burger.toggleClass('active');
    burger.children(':first-child').toggleClass('animation-burger__first');
    burger.children(':nth-child(2)').toggleClass('animation-burger__second');
    burger.children(':last-child').toggleClass('animation-burger__third');
    menu.toggleClass('active');
    $('body').toggleClass('lock');
    $('.section_style:not(header)').toggleClass('active');
    setTimeout(() => {
      $('.section_style:not(header)').toggleClass('z-index');
    }, 300);

    if (orientation() === 'landscape') {
      $('.header__upwear').toggleClass('active');
    }
  }

  function orientation() {
    if ($(window).width() > $(window).height() && $(window).width() < 900) {
      return 'landscape';
    } else {
      return 'portrait';
    }
  }

  burger.on('click', () => {
    if ($(window).width() < 900) {
      toogleClasses();
    }
  });

  //стили для появление стрелки наверх + фон меню при скроле
  $(document).scroll(function () {
    var pos = $(document).scrollTop();
    var arrow = $('.arrow');

    if (pos > 700) {
      arrow.css({
        opacity: '1'
      });
    } else {
      arrow.css({
        opacity: '0'
      });
    }

    if (orientation() === 'portrait') {
      $('.logo__img').css({
        color: '#fff'
      });
      burger.children().css({
        backgroundColor: '#fff'
      });

      if (pos > 758) {
        $('.header__upwear').addClass('active');
      } else {
        $('.header__upwear').removeClass('active');
      }
    } else if (orientation() === 'landscape') {
      $('.header__upwear').removeClass('active');
      $('.logo__img').css({
        color: '#000'
      });
      burger.children().css({
        backgroundColor: '#000'
      });
    }
  });

  $('a[href^="#"]').on('click', function (event) {
    event.preventDefault();

    var sc = $(this).attr("href"),
      dn = $(sc).offset().top - mobileHeight;

    $('html, body').animate({
      scrollTop: dn
    }, 800);

    if (!$(this).hasClass('arrow') && $(window).width() < 900) {
      toogleClasses();
    }
  });

  //фильтрация работ
  var workItems = $('.latest-works__item');
  var workBlocks = $('.latest-works__content');

  workItems.on('click', function () {
    var selector = '.' + $(this).attr('class').split(' ')[1];

    workBlocks.children().fadeOut(500);
    setTimeout(() => {
      workBlocks.children(selector).fadeIn(500);
    }, 800);
  });

  //! SLICK SLIDERS
  $('.slider__up').slick({
    arrows: false,
    infinite: true,
    autoplaySpeed: 1500,
    autoplay: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    responsive: [{
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          centerPadding: '30px',
          centerMode: true
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 2,
          centerPadding: '20px',
          centerMode: true
        }
      }
    ]
  });

  $('.sliders__down').slick({
    dots: true,
    infinite: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000
  });

  $('.slider').slick({
    slidesToShow: 4,
    infinite: true,
    slidesToScroll: 1,
    autoplay: true,
    dots: false,
    arrows: false,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3
        }
      }
    ]
  });
});
