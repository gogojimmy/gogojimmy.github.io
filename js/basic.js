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
          $('span.take-chance a').replaceWith( "Take a chance on happiness." );
          $('span.take-chance').fadeIn('fast');
        });
    }
  });

  //tooltip
  $('[data-toggle="popover"]').popover()
  $('[data-toggle="tooltip"]').tooltip()

  //remove link dotted border
  $("a").focus(function(){
    $(this).blur();
  });

  //navbar hover
  $('ul.tabs li').mouseenter(function() {
    var $this = $(this),
      _clickTab = $this.find('a').attr('data');

      if ( !$.trim( $(_clickTab).html() ).length ) {
          $('.sub-menu').css('border-top', '0px');
      } else {
          $('.sub-menu').css('border-top', '1px solid #ee82ee');
      }

      $this.addClass('active').siblings('.active').removeClass('active');
      $(_clickTab).stop(false, true).fadeIn().siblings().hide();
      $('.tab_container').css('display', 'block');


    return false;
  });

  $('.abgne_tab').mouseleave(function() {
    var $this = $(this);
    $('.tab_container').css('display', 'none');
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

  //升級成會員效果
  $( ".into-member" ).click(function(){
    $( ".password-wrap" ).toggle();
  });

  //新增收貨地址效果
  if ( $( ".shipping-info-card" ).length ) {
    $(".same-with").hide();
    $(".shipping-info-form").hide();
  } else {
    $(".same-with").show();
    $(".shipping-info-form").show();
  }
  $( ".add-shipping-info" ).click(function() {
    $(".shipping-info-card").hide();
    $(".same-with").show();
    $(".shipping-info-form").show();
    $(".add-shipping-info").hide();
  });
  $( ".shipping-info-form .cancel" ).click(function() {
    $(".shipping-info-card").show();
    $(".same-with").hide();
    $(".shipping-info-form").hide();
    $(".add-shipping-info").show();
  });

  //我的帳戶的新增收貨地址效果
    var current_id = 0;
    $('#my-add-shipping-info').click(function(){
        nextElement($('#address-form_00'));
    })

    function nextElement(element){
        var newElement = element.clone();
        var id = current_id+1;
        current_id = id;
        if(id <10)id = "0"+id;
        newElement.attr("id",element.attr("id").split("_")[0]+"_"+id);
        newElement.appendTo($("#elements"));

        $( "#elements .large" ).text(function( index ) {
          return "寄送資訊 " + ( index + 1 );
        });
    }

  //加入會員效果
  $( ".join-btn" ).click(function() {
    $(".creat-account-wrap").hide();
    $(".join-form-wrap").show();
  });

  //性別選擇效果
  $( ".female-btn" ).click(function() {
    $(this).addClass("active");
    $(".male-btn").removeClass("active");
  });
  $( ".male-btn" ).click(function() {
    $(this).addClass("active");
    $(".female-btn").removeClass("active");
  });

  //商品說明展開效果
  $( ".click-more" ).click(function() {
      var $div = $( "div.product-description" );
      // 先取得是否有記錄在 .data('contentHeight') 中
      var contentHeight = $div.data('contentHeight');

      // 若沒有記錄
      if(!!!contentHeight){
        // 取得完整的高
        contentHeight = determineActualHeight($div);
        // 並記錄在 .data('contentHeight') 中
        $div.data('contentHeight', contentHeight);
      }
        $( ".click-more" ).toggleClass( "click-more-up" );

      // 進行折疊
      $div.stop().animate({
        height: (contentHeight == $div.height() ? 100 : contentHeight)
      }, 500);
  });

  function determineActualHeight($div) {
      var $clone = $div.clone().hide().css('height', 'auto').appendTo($div.parent()),
      height = $clone.height();
      $clone.remove();
      return height;
  }

  //產品縮圖切換效果
  $(function(){
    // 先取得相關的區塊及預設要先顯示那一個
    var $block = $('.product-detail-wrap'),
      $link = $block.find('.thumbnail-list span'),
      $showBox = $('.show-box'),
      _default = 0;

    // 當滑鼠移到 $link 上時
    $link.click(function(){
      var $this = $(this);

      // 修改 $showBox 中的超連結及圖片
      $showBox.html('<img class="img-responsive" src="'+$this.find('img').attr('src')+'" />');
      // 幫被滑鼠移上去的 li 加上 .on
      $this.addClass('on').siblings('.on').removeClass('on');
    }).click(function(){
      // 如果是點擊到 $link 時則取消連結功能
      return false;
    }).eq(_default).mouseover();
  });

  //購物金明細開合效果
  $( ".expand-detail" ).click(function(){
    $( ".points-detail-chart" ).toggle();
  });

});
