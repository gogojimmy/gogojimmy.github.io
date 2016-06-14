$( document ).ready(function() {

  //remove link dotted border
  $("a").focus(function(){
    $(this).blur();
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

});
