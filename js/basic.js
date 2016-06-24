$( document ).ready(function() {
  //menu fix
  var $menu = $('.navbar'),
    $logo = $('.logo'),
    _logo = $logo.offset().top;
    _top = $menu.offset().top;
  var $win = $(window).scroll(function(){
    if($win.scrollTop() >= _logo){
      if($menu.css('position')!='fixed'){
        $menu.css({
          position: 'fixed',
          top: 65,
          zIndex: 999,
          background: '#fff',
          width: '100%'
        });
        $('span.take-chance').fadeOut('fast').promise().done(function(logo) {
          $('span.take-chance span').replaceWith( "<span><a href='index.html'><img class='logo-white' src='images/logo-white.png'></a></span>" );
          $('span.take-chance').fadeIn('fast');
        });
      }
    }else{
      $menu.css({
        position: 'relative',
        top: 0
      });
        $('span.take-chance').fadeOut('fast').promise().done(function(logo) {
          $('span.take-chance img').replaceWith( "Take a chance on happiness." );
          $('span.take-chance').fadeIn('fast');
        });
    }
  });

  //tooltip
  $('[data-toggle="popover"]').popover()

  //remove link dotted border
  $("a").focus(function(){
    $(this).blur();
  });

  //navbar hover
  var _showTab = 0;
  $('.abgne_tab').mouseenter(function() {
    var $defaultLi = $('ul.tabs li').eq(_showTab).addClass('active');
    $($defaultLi.find('a').attr('data')).siblings().hide();
  });

  $('ul.tabs li').mouseenter(function() {
    var $this = $(this),
      _clickTab = $this.find('a').attr('data');
    $this.addClass('active').siblings('.active').removeClass('active');
    $(_clickTab).stop(false, true).fadeIn().siblings().hide();

    return false;
  });
  $('.abgne_tab').mouseleave(function() {
    var $this = $(this);
    $this.find('.active').removeClass('active');
  });

  //search click show
  $( ".show-search" ).click(function() {
    $( ".search-form" ).show( "slide");
  });

  //back to top
  $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.scrollup').fadeIn();
        } else {
            $('.scrollup').fadeOut();
        }
    });

    $('.scrollup').click(function () {
        $("html, body").animate({
            scrollTop: 0
        }, 600);
        return false;
  });

  //shop the story
  $('.toggle-wrap').hide();
  $('span.reveal').click(function(){
      $('.toggle-wrap').toggle('show');

      if ($.trim($(this).text()) === 'SHOP THE STORY ▼') {
          $(this).text('SHOP THE STORY ▲');
      } else {
          $(this).text('SHOP THE STORY ▼');
      }

      return false;
  });
  $("a[href='" + window.location.hash + "']").parent(".reveal").click();

  //gallery
  $('.responsive').slick({
            dots: false,
            infinite: false,
            speed: 300,
            slidesToShow: 4,
            slidesToScroll: 4,
            responsive: [
              {
                breakpoint: 1024,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 3,
                  infinite: true,
                  dots: false
                }
              },
              {
                breakpoint: 600,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 2
                }
              },
              {
                breakpoint: 480,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1
                }
              }
              // You can unslick at a given breakpoint now by adding:
              // settings: "unslick"
              // instead of a settings object
            ]
  });
  //購物車數量加減
  $('.btn-number').click(function(e){
      e.preventDefault();

      fieldName = $(this).attr('data-field');
      type      = $(this).attr('data-type');
      var input = $("input[name='"+fieldName+"']");
      var currentVal = parseInt(input.val());
      if (!isNaN(currentVal)) {
          if(type == 'minus') {

              if(currentVal > input.attr('min')) {
                  input.val(currentVal - 1).change();
              }
              if(parseInt(input.val()) == input.attr('min')) {
                  $(this).attr('disabled', true);
              }

          } else if(type == 'plus') {

              if(currentVal < input.attr('max')) {
                  input.val(currentVal + 1).change();
              }
              if(parseInt(input.val()) == input.attr('max')) {
                  $(this).attr('disabled', true);
              }

          }
      } else {
          input.val(0);
      }
  });
  $('.input-number').focusin(function(){
     $(this).data('oldValue', $(this).val());
  });
  $('.input-number').change(function() {

      minValue =  parseInt($(this).attr('min'));
      maxValue =  parseInt($(this).attr('max'));
      valueCurrent = parseInt($(this).val());

      name = $(this).attr('name');
      if(valueCurrent >= minValue) {
          $(".btn-number[data-type='minus'][data-field='"+name+"']").removeAttr('disabled')
      } else {
          alert('Sorry, the minimum value was reached');
          $(this).val($(this).data('oldValue'));
      }
      if(valueCurrent <= maxValue) {
          $(".btn-number[data-type='plus'][data-field='"+name+"']").removeAttr('disabled')
      } else {
          alert('Sorry, the maximum value was reached');
          $(this).val($(this).data('oldValue'));
      }


  });
  $(".input-number").keydown(function (e) {
          // Allow: backspace, delete, tab, escape, enter and .
          if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 190]) !== -1 ||
               // Allow: Ctrl+A
              (e.keyCode == 65 && e.ctrlKey === true) ||
               // Allow: home, end, left, right
              (e.keyCode >= 35 && e.keyCode <= 39)) {
                   // let it happen, don't do anything
                   return;
          }
          // Ensure that it is a number and stop the keypress
          if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
              e.preventDefault();
          }
  });
  //購物車details
      $(document).ready(function () {
          $(".btn-select").each(function (e) {
              var value = $(this).find("ul li.selected").html();
              if (value != undefined) {
                  $(this).find(".btn-select-input").val(value);
                  $(this).find(".btn-select-value").html(value);
              }
          });
      });

      $(document).on('click', '.btn-select', function (e) {
          e.preventDefault();
          var ul = $(this).find("ul");
          if ($(this).hasClass("active")) {
              if (ul.find("li").is(e.target)) {
                  var target = $(e.target);
                  target.addClass("selected").siblings().removeClass("selected");
                  var value = target.html();
                  $(this).find(".btn-select-input").val(value);
                  $(this).find(".btn-select-value").html(value);
              }
              ul.hide();
              $(this).removeClass("active");
          }
          else {
              $('.btn-select').not(this).each(function () {
                  $(this).removeClass("active").find("ul").hide();
              });
              ul.slideDown(300);
              $(this).addClass("active");
          }
      });

      $(document).on('click', function (e) {
          var target = $(e.target).closest(".btn-select");
          if (!target.length) {
              $(".btn-select").removeClass("active").find("ul").hide();
          }
      });

      $('.checkInp input:checkbox').on('click', function(e) {

    // prevents the event from bubbling up the DOM tree
    // eg the modal from cancelling the event
    e.stopImmediatePropagation();

    var checked = (e.currentTarget.checked) ? false : true;
    e.currentTarget.checked=(checked) ? false : checked.toString();
});

});
